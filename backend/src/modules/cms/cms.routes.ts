import {
  cleanDeletedResource,
  retryResourceCleanup,
} from "./resource-deletion.js";
import type { FastifyInstance } from "fastify";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { prisma } from "../../shared/database/prisma.js";
import { fail, ok } from "../../shared/http/response.js";
import { staffFor } from "../consultation-admin/access.js";
import { newsInput, resourceInput, resourceCategoryInput } from "./schemas.js";
import { dashboardData } from "./dashboard.js";
import { uploadRoutes } from "./uploads.js";
const ids = z.object({ id: z.string().min(1).max(100) });
const pageInput = z.object({
  page: z.coerce.number().int().min(1).max(100000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().max(190).default(""),
});
const revisionInput = z.object({ revision: z.string().datetime() });
const json = (value: unknown) =>
  JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
class Conflict extends Error {}
export async function restoredCmsRoutes(app: FastifyInstance) {
  let cleanupRunning = false;
  const retry = async () => {
    if (cleanupRunning) return;
    cleanupRunning = true;
    try {
      await retryResourceCleanup();
    } catch (error) {
      app.log.error({ err: error }, "Resource cleanup failed");
    } finally {
      cleanupRunning = false;
    }
  };
  const timer = setInterval(() => void retry(), 30_000);
  timer.unref();
  app.addHook("onClose", async () => clearInterval(timer));
  // The parent adds no-store, exact-origin CSRF and private request logging rules.
  app.addHook("onRequest", async (request, reply) => {
    const user = await staffFor(request);
    if (!user)
      return fail(reply, 401, "Vui lòng đăng nhập.", "UNAUTHENTICATED");
    const route = request.url.split("?")[0];
    if (
      !route.startsWith("/api/admin/consultation-workspace") &&
      route !== "/api/admin/dashboard" &&
      !user.canManageContent
    )
      return fail(
        reply,
        403,
        "Chỉ quản trị nội dung được thực hiện thao tác này.",
        "FORBIDDEN",
      );
  });
  app.setErrorHandler(
    (error: Error & { code?: string; statusCode?: number }, request, reply) => {
      if (error instanceof Conflict)
        return fail(
          reply,
          409,
          "Dữ liệu đã thay đổi. Tải lại trước khi lưu.",
          "CONFLICT",
        );
      if (error instanceof z.ZodError)
        return fail(
          reply,
          400,
          error.issues[0]?.message || "Dữ liệu không hợp lệ.",
          "VALIDATION_ERROR",
        );
      if (error.code === "P2002")
        return fail(reply, 409, "Tên hoặc đường dẫn đã tồn tại.", "DUPLICATE");
      if (error.code === "P2003")
        return fail(
          reply,
          409,
          "Danh mục hoặc tài khoản đang được sử dụng/không tồn tại.",
          "RELATED_DATA",
        );
      if (error.code === "P2025")
        return fail(reply, 404, "Không tìm thấy dữ liệu.", "NOT_FOUND");
      request.log.error(error);
      return fail(
        reply,
        error.statusCode && error.statusCode < 500 ? error.statusCode : 500,
        "Không thể thực hiện thao tác. Vui lòng thử lại.",
        "CMS_ERROR",
      );
    },
  );
  app.get("/api/admin/dashboard", async (request, reply) =>
    ok(reply, await dashboardData(request.query)),
  );
  app.get("/api/admin/news", async (request, reply) => {
    const q = pageInput
      .extend({ limit: z.coerce.number().int().min(1).max(1000).default(1000) })
      .parse(request.query);
    const where = {
      ...(q.q
        ? { title: { contains: q.q, mode: "insensitive" as const } }
        : {}),
    };
    const [posts, total] = await prisma.$transaction([
      prisma.newsPost.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        skip: (q.page - 1) * q.limit,
        take: q.limit,
      }),
      prisma.newsPost.count({ where }),
    ]);
    return ok(reply, {
      posts: posts.map((post) => ({
        ...post,
        author: { fullName: post.authorName || "Viện Sau Đại học" },
      })),
      pagination: { total, page: q.page, limit: q.limit },
    });
  });
  app.get("/api/admin/news/:id", async (request, reply) => {
    const { id } = ids.parse(request.params);
    const post = await prisma.newsPost.findUnique({ where: { id } });
    return post
      ? ok(reply, {
          post: {
            ...post,
            author: { fullName: post.authorName || "Viện Sau Đại học" },
          },
        })
      : fail(reply, 404, "Không tìm thấy bài viết.", "NOT_FOUND");
  });
  app.post("/api/admin/news", async (request, reply) => {
    const input = newsInput.parse(request.body);
    const user = (await staffFor(request))!;
    const post = await prisma.$transaction(async (tx) => {
      const row = await tx.newsPost.create({
        data: {
          ...input,
          customJsonLd: input.customJsonLd
            ? json(input.customJsonLd)
            : Prisma.DbNull,
          publishedAt:
            input.status === "PUBLISHED"
              ? (input.publishedAt ?? new Date())
              : input.publishedAt,
        },
      });
      await tx.cmsRevision.create({
        data: {
          entityType: "news",
          entityId: row.id,
          actorName: user.fullName,
          action: "created",
          snapshot: json(row),
        },
      });
      return row;
    });
    return reply
      .code(201)
      .send({ success: true, data: { post }, message: "Đã lưu bài viết." });
  });
  app.put("/api/admin/news/:id", async (request, reply) => {
    const { id } = ids.parse(request.params),
      input = newsInput.parse(request.body),
      { revision } = revisionInput.parse(request.body);
    const user = (await staffFor(request))!;
    const post = await prisma.$transaction(async (tx) => {
      const before = await tx.newsPost.findUnique({ where: { id } });
      if (!before) return null;
      const update = await tx.newsPost.updateMany({
        where: { id, updatedAt: new Date(revision) },
        data: {
          ...input,
          customJsonLd: input.customJsonLd
            ? json(input.customJsonLd)
            : Prisma.DbNull,
        },
      });
      if (!update.count) throw new Conflict();
      await tx.cmsRevision.create({
        data: {
          entityType: "news",
          entityId: id,
          actorName: user.fullName,
          action: "updated",
          snapshot: json(before),
        },
      });
      return tx.newsPost.findUnique({ where: { id } });
    });
    return post
      ? ok(reply, { post })
      : fail(reply, 404, "Không tìm thấy bài viết.", "NOT_FOUND");
  });
  app.delete("/api/admin/news/:id", async (request, reply) => {
    const { id } = ids.parse(request.params);
    const user = (await staffFor(request))!;
    await prisma.$transaction(async (tx) => {
      const row = await tx.newsPost.findUnique({ where: { id } });
      if (!row) return;
      await tx.cmsRevision.create({
        data: {
          entityType: "news",
          entityId: id,
          actorName: user.fullName,
          action: "deleted",
          snapshot: json(row),
        },
      });
      await tx.newsPost.delete({ where: { id } });
    });
    return ok(reply, {});
  });
  app.post("/api/admin/news/bulk-delete", async (request, reply) => {
    const { ids: list } = z
      .object({ ids: z.array(z.string().min(1).max(100)).min(1).max(1000) })
      .parse(request.body);
    const user = (await staffFor(request))!;
    await prisma.$transaction(async (tx) => {
      const rows = await tx.newsPost.findMany({ where: { id: { in: list } } });
      for (const row of rows)
        await tx.cmsRevision.create({
          data: {
            entityType: "news",
            entityId: row.id,
            actorName: user.fullName,
            action: "deleted",
            snapshot: json(row),
          },
        });
      await tx.newsPost.deleteMany({ where: { id: { in: list } } });
    });
    return ok(reply, {});
  });
  app.get("/api/admin/resources", async (request, reply) => {
    const q = pageInput
      .extend({
        categoryId: z.string().optional(),
        resourceType: z
          .enum([
            "DIRECTIVE_DOCUMENT",
            "EXECUTION_DOCUMENT",
            "BROCHURE",
            "PDF_DOCUMENT",
          ])
          .optional(),
        documentType: z
          .enum(["REGULATION", "RULE", "PROCESS", "NOTICE", "GUIDELINE"])
          .optional(),
      })
      .parse(request.query);
    const where: Prisma.ResourceFileWhereInput = {
      ...(q.q ? { title: { contains: q.q, mode: "insensitive" } } : {}),
      ...(q.categoryId ? { categoryId: q.categoryId } : {}),
      ...(q.resourceType ? { resourceType: q.resourceType } : {}),
      ...(q.documentType ? { documentType: q.documentType } : {}),
    };
    const [resources, total] = await prisma.$transaction([
      prisma.resourceFile.findMany({
        where,
        include: { category: true },
        orderBy: { updatedAt: "desc" },
        skip: (q.page - 1) * q.limit,
        take: q.limit,
      }),
      prisma.resourceFile.count({ where }),
    ]);
    return ok(reply, {
      resources,
      pagination: { total, page: q.page, limit: q.limit },
    });
  });
  app.post("/api/admin/resources", async (request, reply) => {
    const input = resourceInput.parse(request.body);
    const user = (await staffFor(request))!;
    const resource = await prisma.$transaction(async (tx) => {
      const row = await tx.resourceFile.create({
        data: {
          ...input,
          slug: `tai-lieu-${randomUUID()}`,
          publishedAt: input.status === "PUBLISHED" ? new Date() : null,
        },
        include: { category: true },
      });
      await tx.cmsRevision.create({
        data: {
          entityType: "resource",
          entityId: row.id,
          actorName: user.fullName,
          action: "created",
          snapshot: json(row),
        },
      });
      return row;
    });
    return reply.code(201).send({
      success: true,
      data: { resource },
      message: "Đã lưu tài nguyên.",
    });
  });
  app.put("/api/admin/resources/:id", async (request, reply) => {
    const { id } = ids.parse(request.params),
      input = resourceInput.parse(request.body),
      { revision } = revisionInput.parse(request.body);
    const user = (await staffFor(request))!;
    const resource = await prisma.$transaction(async (tx) => {
      const row = await tx.resourceFile.findUnique({ where: { id } });
      if (!row) return null;
      const changed = await tx.resourceFile.updateMany({
        where: { id, updatedAt: new Date(revision) },
        data: {
          ...input,
          publishedAt:
            input.status === "PUBLISHED"
              ? (row.publishedAt ?? new Date())
              : null,
        },
      });
      if (!changed.count) throw new Conflict();
      await tx.cmsRevision.create({
        data: {
          entityType: "resource",
          entityId: id,
          actorName: user.fullName,
          action: "updated",
          snapshot: json(row),
        },
      });
      return tx.resourceFile.findUnique({
        where: { id },
        include: { category: true },
      });
    });
    return resource
      ? ok(reply, { resource })
      : fail(reply, 404, "Không tìm thấy tài nguyên.", "NOT_FOUND");
  });
  app.delete("/api/admin/resources/:id", async (request, reply) => {
    const { id } = ids.parse(request.params),
      { revision } = revisionInput.parse(request.query);
    const user = (await staffFor(request))!;
    const job = await prisma.$transaction(async (tx) => {
      const row = await tx.resourceFile.findUnique({ where: { id } });
      if (!row)
        return tx.cmsRevision.findFirst({
          where: { entityType: "resource_deletion", entityId: id },
        });
      const versions = await tx.cmsRevision.findMany({
        where: { entityType: "resource", entityId: id },
        select: { snapshot: true },
      });
      const urls = new Set([row.fileUrl]);
      for (const version of versions) {
        const old = version.snapshot as { fileUrl?: unknown };
        if (typeof old.fileUrl === "string") urls.add(old.fileUrl);
      }
      const changed = await tx.resourceFile.deleteMany({
        where: { id, updatedAt: new Date(revision) },
      });
      if (!changed.count) throw new Conflict();
      await tx.cmsRevision.deleteMany({
        where: { entityType: "resource", entityId: id },
      });
      return tx.cmsRevision.create({
        data: {
          entityType: "resource_deletion",
          entityId: id,
          actorName: user.fullName,
          action: "pending",
          snapshot: { urls: [...urls], retained: [] },
        },
      });
    });
    if (!job) return ok(reply, {});
    try {
      const result = await cleanDeletedResource(job.id);
      return reply.send({
        success: true,
        data: result,
        message: result.retained
          ? "Đã xóa vĩnh viễn tài nguyên. File đang được nội dung khác dùng được giữ lại."
          : "Đã xóa vĩnh viễn tài nguyên và file gốc.",
      });
    } catch (error) {
      request.log.error({ err: error }, "Resource storage cleanup pending");
      return reply
        .code(202)
        .send({
          success: true,
          data: { pending: true },
          message:
            "Đã xóa tài nguyên khỏi CMS. Kho file chưa xóa được; hệ thống sẽ tự thử lại. Kiểm tra quyền DeleteObject nếu trạng thái kéo dài.",
        });
    }
  });
  app.get("/api/admin/resources/:id/versions", async (request, reply) => {
    const { id } = ids.parse(request.params),
      { page } = pageInput.parse(request.query);
    const where = { entityType: "resource", entityId: id };
    const [rows, total] = await prisma.$transaction([
      prisma.cmsRevision.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * 10,
        take: 10,
      }),
      prisma.cmsRevision.count({ where }),
    ]);
    return ok(reply, {
      versions: rows.map((row) => ({
        id: row.id,
        createdAt: row.createdAt,
        value: { resource: row.snapshot },
      })),
      total,
    });
  });
  app.get("/api/admin/resource-categories", async (_request, reply) =>
    ok(reply, {
      categories: await prisma.resourceCategory.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { resources: true } } },
      }),
    }),
  );
  app.post("/api/admin/resource-categories", async (request, reply) =>
    ok(reply, {
      category: await prisma.resourceCategory.create({
        data: resourceCategoryInput.parse(request.body),
      }),
    }),
  );
  app.put("/api/admin/resource-categories/:id", async (request, reply) =>
    ok(reply, {
      category: await prisma.resourceCategory.update({
        where: ids.parse(request.params),
        data: resourceCategoryInput.parse(request.body),
      }),
    }),
  );
  app.delete("/api/admin/resource-categories/:id", async (request, reply) => {
    await prisma.resourceCategory.delete({ where: ids.parse(request.params) });
    return ok(reply, {});
  });
  await app.register(uploadRoutes);
  await app.register(workspaceRoutes);
}
async function workspaceRoutes(app: FastifyInstance) {
  const shape = (row: NonNullable<Awaited<ReturnType<typeof detail>>>) => ({
    ...row,
    assignedAdminId: row.assignedStaffId,
    assignedAdmin: row.assignedStaff,
    followUp: { outcome: row.outcome, nextContactAt: row.nextContactAt },
    notes: row.history.flatMap((h) => {
      const m = h.metadata as { note?: string; actorName?: string } | null;
      return m?.note
        ? [
            {
              id: h.id,
              content: m.note,
              createdAt: h.createdAt,
              admin: { fullName: m.actorName || "Cán bộ" },
            },
          ]
        : [];
    }),
    history: row.history.map((h) => ({
      ...h,
      admin: {
        fullName:
          (h.metadata as { actorName?: string } | null)?.actorName || "Website",
      },
    })),
  });
  const detail = (id: string) =>
    prisma.consultation.findUnique({
      where: { id },
      include: {
        assignedStaff: { select: { id: true, fullName: true } },
        history: { orderBy: { createdAt: "desc" }, take: 100 },
      },
    });
  app.get("/api/admin/consultation-workspace", async (request, reply) => {
    const q = z
      .object({
        search: z.string().max(190).default(""),
        status: z
          .enum([
            "ALL",
            "NEW",
            "RECEIVED",
            "CONTACTING",
            "CONSULTED",
            "COMPLETED",
            "UNREACHABLE",
            "CANCELLED",
          ])
          .default("ALL"),
        page: z.coerce.number().int().min(1).max(100000).default(1),
        due: z.enum(["", "1"]).default(""),
        assigned: z.string().max(100).default(""),
      })
      .parse(request.query);
    const where: Prisma.ConsultationWhereInput = {
      ...(q.status !== "ALL" ? { status: q.status } : {}),
      ...(q.due
        ? {
            nextContactAt: { lte: new Date() },
            AND: [{ status: { notIn: ["COMPLETED", "CANCELLED"] } }],
          }
        : {}),
      ...(q.assigned
        ? { assignedStaffId: q.assigned === "unassigned" ? null : q.assigned }
        : {}),
      ...(q.search
        ? {
            OR: ["fullName", "phone", "email", "programme"].map((field) => ({
              [field]: { contains: q.search, mode: "insensitive" },
            })),
          }
        : {}),
    };
    const [rows, total] = await prisma.$transaction([
      prisma.consultation.findMany({
        where,
        include: {
          assignedStaff: { select: { id: true, fullName: true } },
          history: { orderBy: { createdAt: "desc" }, take: 100 },
        },
        orderBy: { createdAt: "desc" },
        skip: (q.page - 1) * 25,
        take: 25,
      }),
      prisma.consultation.count({ where }),
    ]);
    return ok(reply, {
      consultations: rows.map(shape),
      total,
    });
  });
  app.delete(
    "/api/admin/consultation-workspace/bulk",
    async (request, reply) => {
      const user = (await staffFor(request))!;
      if (!user.canManageContent)
        return fail(
          reply,
          403,
          "Chỉ quản trị viên được xóa hồ sơ tư vấn.",
          "FORBIDDEN",
        );
      const { ids: selectedIds } = z
        .object({ ids: z.array(z.string().min(1).max(100)).min(1).max(5000) })
        .parse(request.body);
      const result = await prisma.consultation.deleteMany({
        where: { id: { in: [...new Set(selectedIds)] } },
      });
      return ok(reply, { deleted: result.count });
    },
  );
  app.get(
    "/api/admin/consultation-workspace/assignees",
    async (_request, reply) =>
      ok(reply, {
        admins: await prisma.consultationStaff.findMany({
          where: { disabled: false, canUpdate: true },
          select: { id: true, fullName: true },
        }),
      }),
  );
  app.get("/api/admin/consultation-workspace/:id", async (request, reply) => {
    const row = await detail(ids.parse(request.params).id);
    return row
      ? ok(reply, { consultation: shape(row) })
      : fail(reply, 404, "Không tìm thấy hồ sơ.", "NOT_FOUND");
  });
  app.patch("/api/admin/consultation-workspace/:id", async (request, reply) => {
    const user = (await staffFor(request))!;
    if (!user.canUpdate)
      return fail(reply, 403, "Tài khoản chỉ xem.", "FORBIDDEN");
    const { id } = ids.parse(request.params);
    const input = z
      .object({
        revision: z.string().datetime(),
        status: z.enum([
          "NEW",
          "RECEIVED",
          "CONTACTING",
          "CONSULTED",
          "COMPLETED",
          "UNREACHABLE",
          "CANCELLED",
        ]),
        assignedAdminId: z.string().nullable().optional(),
        note: z.string().trim().max(5000).default(""),
        followUp: z.object({
          outcome: z
            .enum(["UNDECIDED", "INTERESTED", "APPLIED", "NOT_INTERESTED"])
            .nullable(),
          nextContactAt: z.string().datetime().nullable(),
        }),
      })
      .parse(request.body);
    await prisma.$transaction(async (tx) => {
      const before = await tx.consultation.findUnique({ where: { id } });
      if (!before) throw new Conflict();
      if (
        input.assignedAdminId !== undefined &&
        input.assignedAdminId !== before.assignedStaffId &&
        !user.canManageContent
      )
        throw Object.assign(new Error("Không được phân công."), {
          statusCode: 403,
        });
      if (
        input.assignedAdminId &&
        !(await tx.consultationStaff.findFirst({
          where: {
            id: input.assignedAdminId,
            disabled: false,
            canUpdate: true,
          },
        }))
      )
        throw new Conflict();
      const changed = await tx.consultation.updateMany({
        where: { id, updatedAt: new Date(input.revision) },
        data: {
          status: input.status,
          ...(user.canManageContent && input.assignedAdminId !== undefined
            ? { assignedStaffId: input.assignedAdminId }
            : {}),
          outcome: input.followUp.outcome,
          nextContactAt: input.followUp.nextContactAt
            ? new Date(input.followUp.nextContactAt)
            : null,
        },
      });
      if (!changed.count) throw new Conflict();
      await tx.consultationHistory.create({
        data: {
          consultationId: id,
          action: "workspace_updated",
          oldStatus: before.status,
          newStatus: input.status,
          metadata: {
            actorName: user.fullName,
            actorId: user.id,
            note: input.note,
            followUp: input.followUp,
          },
        },
      });
    });
    return ok(reply, { consultation: shape((await detail(id))!) });
  });
}
