import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../shared/database/prisma.js";
import { fail, ok } from "../../shared/http/response.js";

const prefix = "/api/admin/knowledge-registrations";
const idInput = z.object({ id: z.uuid() });
const exportDetails = z.object({
  courses: z.array(z.string()).optional(),
  estimatedTuition: z.number().int().nonnegative().optional(),
});

export async function knowledgeAdminRoutes(app: FastifyInstance) {
  app.get(prefix, async (_request, reply) => {
    const items = await prisma.knowledgeRegistration.findMany({
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        graduateMajor: true,
        masterProgramme: true,
        createdAt: true,
        details: true,
      },
    });
    return ok(reply, {
      items: items.map(({ details, ...item }) => ({
        ...item,
        ...exportDetails.safeParse(details).data,
      })),
    });
  });
  app.get(`${prefix}/:id`, async (request, reply) => {
    const { id } = idInput.parse(request.params);
    const item = await prisma.knowledgeRegistration.findUnique({
      where: { id },
      include: {
        attachments: { select: { id: true, filename: true, field: true } },
      },
    });
    return item
      ? ok(reply, { item })
      : fail(reply, 404, "Không tìm thấy hồ sơ.", "NOT_FOUND");
  });
  app.get(`${prefix}/file/:id`, async (request, reply) => {
    const { id } = idInput.parse(request.params);
    const file = await prisma.knowledgeAttachment.findUnique({ where: { id } });
    if (!file) return fail(reply, 404, "Không tìm thấy tệp.", "NOT_FOUND");
    return reply
      .type(file.mediaType)
      .header(
        "Content-Disposition",
        `attachment; filename*=UTF-8''${encodeURIComponent(Buffer.from(file.filename).toString("utf8")).replace(/['()*]/g, (char) => "%" + char.charCodeAt(0).toString(16))}`,
      )
      .send(Buffer.from(file.bytes));
  });
}
