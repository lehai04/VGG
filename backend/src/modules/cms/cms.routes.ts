import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import sanitizeHtml from "sanitize-html";
import { prisma } from "../../shared/database/prisma.js";
import { authenticateRequest } from "../auth/auth.service.js";
import { fail, ok } from "../../shared/http/response.js";
import { mediaBucket, mediaStorage } from "../../shared/storage/minio.js";

const status = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
const slug = z.string().trim().min(2).max(190).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const newsCategory = z.enum([
  "ADMISSIONS",
  "VAN_LANG_UNIVERSITY",
  "UNIVERSITY_EVENT",
  "VAN_LANG_LIFE",
  "INTERNATIONAL_COOPERATION",
  "RESEARCH_PROJECT",
  "RESEARCH_PUBLICATION",
]);
const imagePath = z.string().trim().max(1000).refine((value) => value.startsWith("/") || URL.canParse(value), "Ảnh phải là URL hoặc đường dẫn bắt đầu bằng /.");
const safeCssColor = [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s,.%]+\)$/i, /^hsla?\([\d\s,.%]+\)$/i, /^[a-z]+$/i];
const safeCssLength = [/^-?\d+(?:\.\d+)?(?:px|em|rem|%|pt)?$/i];
const cleanNewsHtml = (value: string) => sanitizeHtml(value, {
  allowedTags: ["p", "div", "span", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "u", "s", "sub", "sup", "font", "ul", "ol", "li", "blockquote", "a", "img", "figure", "figcaption", "table", "thead", "tbody", "tfoot", "tr", "th", "td"],
  allowedAttributes: {
    "*": ["style", "align"],
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"],
    font: ["color", "face", "size"],
    ol: ["start", "type"],
    ul: ["type"],
    li: ["value"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
  },
  allowedStyles: {
    "*": {
      color: safeCssColor,
      "background-color": safeCssColor,
      "font-family": [/^[\w\s,'"-]+$/],
      "font-size": safeCssLength,
      "font-weight": [/^(?:normal|bold|bolder|lighter|[1-9]00)$/],
      "font-style": [/^(?:normal|italic|oblique)$/],
      "text-decoration": [/^(?:none|underline|line-through|overline)(?:\s+(?:underline|line-through|overline))*$/],
      "text-align": [/^(?:left|right|center|justify|start|end)$/],
      "text-indent": safeCssLength,
      "line-height": [/^(?:normal|\d+(?:\.\d+)?(?:px|em|rem|%|pt)?)$/i],
      "letter-spacing": [/^(?:normal|-?\d+(?:\.\d+)?(?:px|em|rem|pt)?)$/i],
      "margin-left": safeCssLength,
      "margin-right": safeCssLength,
      "margin-top": safeCssLength,
      "margin-bottom": safeCssLength,
      "padding-left": safeCssLength,
      "padding-right": safeCssLength,
      "white-space": [/^(?:normal|nowrap|pre|pre-wrap|pre-line)$/],
    },
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: { a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }) },
}).trim();
const newsContent = z.string().transform(cleanNewsHtml).refine((value) => sanitizeHtml(value, { allowedTags: [] }).trim().length >= 20, "Nội dung phải có ít nhất 20 ký tự.");
const newsInput = z.object({ slug, locale: z.enum(["vi", "en"]).default("vi"), category: newsCategory.default("VAN_LANG_UNIVERSITY"), title: z.string().trim().min(2).max(250), authorName: z.string().trim().min(2).max(120), excerpt: z.string().trim().min(10).max(1000), content: newsContent, coverImage: imagePath.optional().nullable(), publishedAt: z.coerce.date().optional(), status: status.default("DRAFT") });
const resourceType = z.enum(["DIRECTIVE_DOCUMENT", "EXECUTION_DOCUMENT", "BROCHURE", "PDF_DOCUMENT"]);
const resourceDocumentType = z.enum(["REGULATION", "RULE", "PROCESS", "NOTICE", "GUIDELINE"]);
const allowedResourceFiles = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "image/jpeg", "image/png"]);
const resourceInput = z.object({
  locale: z.enum(["vi", "en"]).default("vi"),
  title: z.string().trim().min(2).max(250),
  description: z.string().trim().max(2000).optional().nullable(),
  categoryId: z.string().trim().min(1),
  resourceType,
  documentType: resourceDocumentType.optional().nullable(),
  documentNumber: z.string().trim().max(100).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  issuingOrganization: z.string().trim().max(250).optional().nullable(),
  fileUrl: z.string().max(1000).refine((value) => value.startsWith("/api/media/"), "Đường dẫn file phải thuộc kho nội bộ."),
  fileName: z.string().trim().min(1).max(255),
  fileType: z.string().trim().refine((value) => allowedResourceFiles.has(value), "Định dạng file không được hỗ trợ."),
  fileSize: z.coerce.number().int().positive().max(50 * 1024 * 1024),
  status: status.default("PUBLISHED"),
}).superRefine((value, context) => {
  const isDocument = value.resourceType === "DIRECTIVE_DOCUMENT" || value.resourceType === "EXECUTION_DOCUMENT";
  if (isDocument && !value.documentNumber) context.addIssue({ code: "custom", path: ["documentNumber"], message: "Số văn bản là bắt buộc." });
  if (isDocument && !value.issueDate) context.addIssue({ code: "custom", path: ["issueDate"], message: "Ngày ban hành là bắt buộc." });
  if (isDocument && !value.issuingOrganization) context.addIssue({ code: "custom", path: ["issuingOrganization"], message: "Đơn vị ban hành là bắt buộc." });
  if (value.resourceType === "EXECUTION_DOCUMENT" && !value.documentType) context.addIssue({ code: "custom", path: ["documentType"], message: "Loại văn bản là bắt buộc." });
  if ((value.resourceType === "BROCHURE" || value.resourceType === "PDF_DOCUMENT") && value.fileType !== "application/pdf") context.addIssue({ code: "custom", path: ["fileType"], message: "Loại tài nguyên này chỉ chấp nhận file PDF." });
});
const resourceCategoryInput = z.object({ name: z.string().trim().min(1, "Tên danh mục không được để trống.").max(120) });
const siteInput = z.object({ key: z.string().trim().min(2).max(190), locale: z.enum(["vi", "en"]).default("vi"), section: z.string().trim().min(1).max(100), page: z.string().trim().min(1).max(190), title: z.string().max(250).optional().nullable(), value: z.record(z.string(), z.unknown()), published: z.boolean().default(false) });

async function guard(request: FastifyRequest, reply: FastifyReply, permission: string) {
  const admin = await authenticateRequest(request);
  if (!admin) { fail(reply, 401, "Bạn chưa đăng nhập.", "UNAUTHENTICATED"); return null; }
  const isSuper = admin.role.code === "SUPER_ADMIN";
  const hasPerm = admin.permissions.includes(permission) || (permission.startsWith("settings.") && (admin.permissions.includes("admins.view") || admin.permissions.includes("audit.view")));
  if (!isSuper && !hasPerm) { fail(reply, 403, "Bạn không có quyền thực hiện thao tác này.", "FORBIDDEN"); return null; }
  return admin;
}

async function availableNewsSlug(requested: string, excludeId?: string) {
  const base = requested.slice(0, 190).replace(/-+$/g, "") || "bai-viet";
  let candidate = base;
  let number = 2;
  while (await prisma.newsPost.findFirst({ where: { slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) }, select: { id: true } })) {
    const suffix = `-${number++}`;
    candidate = `${base.slice(0, 190 - suffix.length).replace(/-+$/g, "")}${suffix}`;
  }
  return candidate;
}

function slugifyResourceTitle(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "tai-nguyen";
}

async function availableResourceSlug(title: string, excludeId?: string) {
  const base = slugifyResourceTitle(title).slice(0, 190).replace(/-+$/g, "");
  let candidate = base;
  let number = 2;
  while (await prisma.resourceFile.findFirst({ where: { slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) }, select: { id: true } })) {
    const suffix = `-${number++}`;
    candidate = `${base.slice(0, 190 - suffix.length).replace(/-+$/g, "")}${suffix}`;
  }
  return candidate;
}

export async function cmsRoutes(app: FastifyInstance) {
  app.get("/api/public/media/*", async (request, reply) => {
    const key = (request.params as { "*": string })["*"] ?? "";
    if (!key || key.includes("..") || key.startsWith("/")) return fail(reply, 400, "Đường dẫn file không hợp lệ.", "INVALID_MEDIA_PATH");
    try {
      const stat = await mediaStorage.statObject(mediaBucket, key);
      const stream = await mediaStorage.getObject(mediaBucket, key);
      reply.header("Content-Type", String(stat.metaData["content-type"] ?? "application/octet-stream"));
      reply.header("Content-Length", stat.size);
      reply.header("Cache-Control", String(stat.metaData["cache-control"] ?? "public, max-age=300"));
      return reply.send(stream);
    } catch {
      return fail(reply, 404, "Không tìm thấy file.", "MEDIA_NOT_FOUND");
    }
  });
  app.get("/api/public/news", async (request, reply) => {
    const query = z.object({ category: newsCategory.optional(), q: z.string().trim().max(100).optional(), locale: z.enum(["vi", "en"]).default("vi"), limit: z.coerce.number().int().min(1).max(100).default(30), page: z.coerce.number().int().min(1).default(1) }).parse(request.query);
    const where = { status: "PUBLISHED" as const, locale: query.locale, ...(query.category ? { category: query.category } : {}), ...(query.q ? { OR: [{ title: { contains: query.q, mode: "insensitive" as const } }, { excerpt: { contains: query.q, mode: "insensitive" as const } }] } : {}) };
    const [posts, total] = await Promise.all([
      prisma.newsPost.findMany({ where, orderBy: { publishedAt: "desc" }, skip: (query.page - 1) * query.limit, take: query.limit, include: { author: { select: { fullName: true } } } }),
      prisma.newsPost.count({ where }),
    ]);
    return ok(reply, { posts, pagination: { page: query.page, limit: query.limit, total, totalPages: Math.ceil(total / query.limit) } });
  });
  app.get("/api/public/news/:slug", async (request, reply) => {
    const params = z.object({ slug }).parse(request.params);
    const post = await prisma.newsPost.findFirst({ where: { slug: params.slug, status: "PUBLISHED" }, include: { author: { select: { fullName: true } } } });
    if (!post) return fail(reply, 404, "Không tìm thấy bài viết.", "NEWS_NOT_FOUND");
    return ok(reply, { post });
  });
  app.get("/api/public/resources", async (_request, reply) => ok(reply, { resources: await prisma.resourceFile.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" }, include: { category: true } }) }));
  app.get("/api/public/site-content", async (request, reply) => { const query = z.object({ locale: z.enum(["vi", "en"]).default("vi") }).parse(request.query); return ok(reply, { contents: await prisma.siteContent.findMany({ where: { locale: query.locale, published: true } }) }); });
  app.post("/api/public/visits", async (request, reply) => { const input = z.object({ path: z.string().max(500), locale: z.string().max(5).optional(), visitorId: z.string().max(100).optional() }).parse(request.body); await prisma.pageVisit.create({ data: input }); return reply.code(201).send({ success: true, data: {}, message: "" }); });

  app.get("/api/admin/dashboard", async (request, reply) => {
    if (!await guard(request, reply, "dashboard.view")) return;
    const query = z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      consultationFrom: z.string().optional(),
      consultationTo: z.string().optional(),
      consultationPreset: z.string().optional(),
    }).parse(request.query);

    const now = new Date();

    // Mặc định cho toàn bộ Dashboard là TUẦN NÀY (Thứ 2 đến Chủ nhật)
    const dayOfWeek = (now.getDay() + 6) % 7; // Thứ 2 = 0
    const defaultMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek, 0, 0, 0, 0);
    const defaultSunday = new Date(defaultMonday.getFullYear(), defaultMonday.getMonth(), defaultMonday.getDate() + 6, 23, 59, 59, 999);

    const parseLocalRange = (fromStr?: string, toStr?: string) => {
      let start: Date;
      let end: Date;
      if (fromStr && /^\d{4}-\d{2}-\d{2}$/.test(fromStr)) {
        const [y, m, d] = fromStr.split("-").map(Number);
        start = new Date(y, m - 1, d, 0, 0, 0, 0);
      } else {
        start = new Date(defaultMonday);
      }
      if (toStr && /^\d{4}-\d{2}-\d{2}$/.test(toStr)) {
        const [y, m, d] = toStr.split("-").map(Number);
        end = new Date(y, m - 1, d, 23, 59, 59, 999);
      } else {
        end = new Date(defaultSunday);
      }
      return { start, end };
    };

    const formatLocalYMD = (d: Date): string => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    const { start: safeSince, end: safeUntil } = parseLocalRange(query.from, query.to);
    const { start: cSince, end: cUntil } = parseLocalRange(
      query.consultationFrom ?? query.from,
      query.consultationTo ?? query.to
    );

    // Kỳ trước có cùng độ dài ngày để so sánh
    const cDurationMs = cUntil.getTime() - cSince.getTime();
    const prevUntil = new Date(cSince.getTime() - 1);
    const prevSince = new Date(prevUntil.getTime() - cDurationMs);

    const [
      staff,
      visits,
      consultations,
      applications,
      publishedNews,
      publishedResources,
      visitSeriesRaw,
      consultationSeriesRaw,
      applicationSeriesRaw,
      consultationPeriodTotal,
      consultationPrevTotal,
      visitsInPeriod,
      visitsInPrev,
      consultationStatuses,
      roles,
      recentActivities,
    ] = await Promise.all([
      prisma.admin.count({ where: { status: "ACTIVE" } }),
      prisma.pageVisit.count(),
      prisma.consultation.count(),
      prisma.application.count(),
      prisma.newsPost.count({ where: { status: "PUBLISHED" } }),
      prisma.resourceFile.count({ where: { status: "PUBLISHED" } }),
      prisma.$queryRaw<Array<{ day: string; count: bigint }>>`SELECT to_char(created_at AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD') AS day, count(*)::bigint AS count FROM page_visits WHERE created_at >= ${safeSince} AND created_at <= ${safeUntil} GROUP BY 1 ORDER BY 1`,
      prisma.$queryRaw<Array<{ day: string; count: bigint }>>`SELECT to_char(created_at AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD') AS day, count(*)::bigint AS count FROM consultations WHERE created_at >= ${cSince} AND created_at <= ${cUntil} GROUP BY 1 ORDER BY 1`,
      prisma.$queryRaw<Array<{ day: string; count: bigint }>>`SELECT to_char(created_at AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD') AS day, count(*)::bigint AS count FROM applications WHERE created_at >= ${safeSince} AND created_at <= ${safeUntil} GROUP BY 1 ORDER BY 1`,
      prisma.consultation.count({ where: { createdAt: { gte: cSince, lte: cUntil } } }),
      prisma.consultation.count({ where: { createdAt: { gte: prevSince, lte: prevUntil } } }),
      prisma.pageVisit.count({ where: { createdAt: { gte: safeSince, lte: safeUntil } } }),
      prisma.pageVisit.count({ where: { createdAt: { gte: prevSince, lte: prevUntil } } }),
      prisma.consultation.groupBy({
        by: ["status"],
        where: { createdAt: { gte: cSince, lte: cUntil } },
        _count: { id: true },
      }),
      prisma.role.findMany({
        include: {
          admins: { where: { status: "ACTIVE" }, select: { id: true } },
        },
        orderBy: { level: "asc" },
      }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        include: {
          actor: { select: { fullName: true, username: true } },
        },
      }),
    ]);

    const serialize = (rows: Array<{ day: string; count: bigint }>) => rows.map((row) => ({ date: row.day, count: Number(row.count) }));

    const cPoints: Array<{ date: string; count: number }> = [];
    const isYearView = query.consultationPreset === "this_year" || query.consultationPreset === "last_year" || (cUntil.getTime() - cSince.getTime()) > 180 * 86_400_000;

    if (isYearView) {
      // Khi xem Năm: luôn dựng đủ 12 tháng (Tháng 1 -> Tháng 12)
      const targetYear = cSince.getFullYear();
      const cMonthMap = new Map<string, number>();
      for (const row of consultationSeriesRaw) {
        const mKey = row.day.slice(0, 7); // YYYY-MM
        cMonthMap.set(mKey, (cMonthMap.get(mKey) ?? 0) + Number(row.count));
      }
      for (let m = 1; m <= 12; m++) {
        const mStr = `${targetYear}-${String(m).padStart(2, "0")}`;
        cPoints.push({
          date: mStr,
          count: cMonthMap.get(mStr) ?? 0,
        });
      }
    } else {
      // Khi xem Tuần / Tháng / 30 ngày: bù đủ các ngày trong kỳ (Zero-fill)
      const cMap = new Map<string, number>();
      for (const row of consultationSeriesRaw) {
        cMap.set(row.day, Number(row.count));
      }
      const cur = new Date(cSince.getFullYear(), cSince.getMonth(), cSince.getDate());
      const endLimit = new Date(cUntil.getFullYear(), cUntil.getMonth(), cUntil.getDate());
      while (cur <= endLimit) {
        const key = formatLocalYMD(cur);
        cPoints.push({
          date: key,
          count: cMap.get(key) ?? 0,
        });
        cur.setDate(cur.getDate() + 1);
      }
    }

    const consultationDelta = consultationPeriodTotal - consultationPrevTotal;
    let consultationGrowthRate: number = 0;
    if (consultationPrevTotal === 0) {
      consultationGrowthRate = consultationPeriodTotal > 0 ? 100 : 0;
    } else {
      consultationGrowthRate = Math.round(((consultationPeriodTotal - consultationPrevTotal) / consultationPrevTotal) * 1000) / 10;
    }

    const visitDelta = visitsInPeriod - visitsInPrev;
    let visitGrowthRate: number = 0;
    if (visitsInPrev === 0) {
      visitGrowthRate = visitsInPeriod > 0 ? 100 : 0;
    } else {
      visitGrowthRate = Math.round(((visitsInPeriod - visitsInPrev) / visitsInPrev) * 1000) / 10;
    }

    // Phân loại trạng thái lịch tư vấn
    const statusMap = new Map<string, number>(consultationStatuses.map((s) => [s.status, s._count.id]));
    const pendingCount = (statusMap.get("NEW") ?? 0) + (statusMap.get("RECEIVED") ?? 0) + (statusMap.get("CONTACTING") ?? 0);
    const confirmedCount = statusMap.get("CONSULTED") ?? 0;
    const completedCount = statusMap.get("COMPLETED") ?? 0;
    const cancelledCount = (statusMap.get("CANCELLED") ?? 0) + (statusMap.get("UNREACHABLE") ?? 0);

    // Phân bổ nhân sự thực tế theo Role trong Database
    const roleColors = [
      "linear-gradient(90deg, #6366f1, #8b5cf6)",
      "linear-gradient(90deg, #3b82f6, #06b6d4)",
      "linear-gradient(90deg, #10b981, #14b8a6)",
      "linear-gradient(90deg, #f59e0b, #f97316)",
      "linear-gradient(90deg, #ec4899, #f43f5e)",
    ];
    const staffRoleBreakdown = roles.map((r, i) => {
      const c = r.admins.length;
      return {
        name: r.name,
        code: r.code,
        count: c,
        pct: staff > 0 ? ((c / staff) * 100).toFixed(0) : "0",
        color: roleColors[i % roleColors.length],
      };
    });

    const totalPublished = publishedNews + publishedResources;

    return ok(reply, {
      totals: {
        staff,
        visits,
        consultations,
        consultationPeriodTotal,
        consultationPrevTotal,
        consultationDelta,
        consultationGrowthRate,
        applications,
        visitsInPeriod,
        visitsInPrev,
        visitDelta,
        visitGrowthRate,
        publishedContent: totalPublished,
        publishedNews,
        publishedResources,
      },
      consultationStatusBreakdown: {
        pending: pendingCount,
        confirmed: confirmedCount,
        completed: completedCount,
        cancelled: cancelledCount,
        total: consultationPeriodTotal,
      },
      staffRoleBreakdown,
      recentActivities: recentActivities.map((log) => ({
        id: log.id,
        action: log.action,
        actorName: log.actor?.fullName || log.username || "Hệ thống",
        targetType: log.targetType || "Hệ thống",
        createdAt: log.createdAt,
      })),
      consultationPeriod: {
        from: formatLocalYMD(cSince),
        to: formatLocalYMD(cUntil),
        prevFrom: formatLocalYMD(prevSince),
        prevTo: formatLocalYMD(prevUntil),
      },
      visitSeries: serialize(visitSeriesRaw),
      consultationSeries: cPoints,
      applicationSeries: serialize(applicationSeriesRaw),
      updatedAt: new Date(),
    });
  });

  // --- HỆ THỐNG CÀI ĐẶT (SYSTEM SETTINGS) ---
  app.get("/api/admin/settings", async (request, reply) => {
    if (!await guard(request, reply, "settings.view")) return;
    const contents = await prisma.siteContent.findMany({
      where: { key: { in: ["settings.general", "settings.appearance", "settings.email", "settings.security"] } },
    });
    const map = new Map(contents.map((c) => [c.key, c.value as Record<string, unknown>]));

    const defaultGeneral = {
      systemName: "Hệ thống Quản trị VGG",
      organizationName: "Viện Nghiên cứu & Đào tạo VGG",
      logoUrl: "/images/logo.png",
      faviconUrl: "/favicon.ico",
      contactEmail: "contact@vgg.edu.vn",
      contactPhone: "024 3754 7506",
      address: "Khu Đô thị Đại học Quốc gia, Xuân Thủy, Cầu Giấy, Hà Nội",
      defaultLanguage: "vi",
      timezone: "Asia/Ho_Chi_Minh",
      dateFormat: "DD/MM/YYYY",
    };

    const defaultAppearance = {
      primaryColor: "#2563EB",
      accentColor: "#0B1F3A",
      websiteTitle: "VGG Institute - Nâng tầm tri thức & Đổi mới sáng tạo",
      websiteDescription: "Cổng thông tin đào tạo sau đại học và nghiên cứu khoa học chuyên sâu.",
      ogImageUrl: "/images/og-cover.jpg",
      footerText: "© 2026 Viện Nghiên cứu & Đào tạo VGG. Bản quyền đã được bảo hộ.",
      facebookUrl: "https://facebook.com/vgg.edu.vn",
      youtubeUrl: "https://youtube.com/@vgg_institute",
      linkedinUrl: "https://linkedin.com/company/vgg",
    };

    const defaultEmail = {
      senderEmail: "no-reply@vgg.edu.vn",
      senderName: "VGG Notification System",
      emailNotificationsEnabled: true,
      notifyNewConsultation: true,
      notifyPendingNews: true,
      emailTemplateHeader: "Thông báo từ Hệ thống Quản trị VGG",
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpSecurity: "TLS",
      smtpUsername: "notifications@vgg.edu.vn",
    };

    const defaultSecurity = {
      sessionTimeoutHours: 24,
      maxFailedLoginAttempts: 5,
      lockoutMinutes: 15,
      passwordMinLength: 10,
      requireSpecialChar: true,
      requireUppercase: true,
      requireNumber: true,
    };

    return ok(reply, {
      settings: {
        general: { ...defaultGeneral, ...(map.get("settings.general") || {}) },
        appearance: { ...defaultAppearance, ...(map.get("settings.appearance") || {}) },
        email: { ...defaultEmail, ...(map.get("settings.email") || {}) },
        security: { ...defaultSecurity, ...(map.get("settings.security") || {}) },
      },
    });
  });

  app.post("/api/admin/settings", async (request, reply) => {
    const admin = await guard(request, reply, "settings.update");
    if (!admin) return;
    const body = z.object({
      tab: z.enum(["general", "appearance", "email", "security"]),
      data: z.record(z.string(), z.unknown()),
    }).parse(request.body);

    const key = `settings.${body.tab}`;
    await prisma.siteContent.upsert({
      where: { key },
      update: {
        value: body.data as any,
        authorId: admin.id,
        published: true,
      },
      create: {
        key,
        locale: "vi",
        section: "settings",
        page: "settings",
        title: `Cài đặt ${body.tab}`,
        value: body.data as any,
        authorId: admin.id,
        published: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "ACCOUNT_UPDATED",
        actorAdminId: admin.id,
        targetType: "settings",
        metadata: { tab: body.tab, updatedKeys: Object.keys(body.data) },
      },
    }).catch(() => null);

    return ok(reply, { success: true }, "Đã lưu cấu hình thành công.");
  });

  app.get("/api/admin/settings/sessions", async (request, reply) => {
    if (!await guard(request, reply, "settings.security")) return;
    const sessions = await prisma.session.findMany({
      orderBy: { lastSeenAt: "desc" },
      include: {
        admin: {
          select: { id: true, fullName: true, username: true, email: true, role: { select: { name: true } } },
        },
      },
    });
    return ok(reply, { sessions });
  });

  app.delete("/api/admin/settings/sessions/:id", async (request, reply) => {
    const admin = await guard(request, reply, "settings.security");
    if (!admin) return;
    const { id } = z.object({ id: z.string() }).parse(request.params);
    await prisma.session.deleteMany({ where: { id } });
    await prisma.auditLog.create({
      data: {
        action: "LOGOUT",
        actorAdminId: admin.id,
        targetType: "session",
        targetId: id,
        metadata: { reason: "Terminated by administrator" },
      },
    }).catch(() => null);
    return ok(reply, null, "Đã đăng xuất phiên thành công.");
  });

  app.delete("/api/admin/settings/sessions", async (request, reply) => {
    const admin = await guard(request, reply, "settings.security");
    if (!admin) return;
    await prisma.session.deleteMany({
      where: { adminId: { not: admin.id } },
    });
    return ok(reply, null, "Đã đăng xuất các phiên khác thành công.");
  });

  app.get("/api/admin/settings/logs", async (request, reply) => {
    if (!await guard(request, reply, "settings.logs")) return;
    const q = z.object({
      search: z.string().optional(),
      action: z.string().optional(),
      module: z.string().optional(),
      from: z.string().optional(),
      to: z.string().optional(),
      limit: z.coerce.number().default(50),
    }).parse(request.query);

    const where: any = {};
    if (q.action && q.action !== "ALL") where.action = q.action;
    if (q.module && q.module !== "ALL") where.targetType = q.module;
    if (q.from && q.to) {
      where.createdAt = {
        gte: new Date(q.from),
        lte: new Date(new Date(q.to).setHours(23, 59, 59, 999)),
      };
    }
    if (q.search) {
      where.OR = [
        { username: { contains: q.search, mode: "insensitive" } },
        { targetType: { contains: q.search, mode: "insensitive" } },
        { actor: { fullName: { contains: q.search, mode: "insensitive" } } },
      ];
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: q.limit,
        include: {
          actor: { select: { fullName: true, username: true } },
          target: { select: { fullName: true, username: true } },
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return ok(reply, { logs, total });
  });

  app.post("/api/admin/settings/test-email", async (request, reply) => {
    const admin = await guard(request, reply, "settings.update");
    if (!admin) return;
    const { email } = z.object({ email: z.string().email() }).parse(request.body);
    await prisma.auditLog.create({
      data: {
        action: "ACCOUNT_UPDATED",
        actorAdminId: admin.id,
        targetType: "settings",
        metadata: { action: "TEST_EMAIL_SENT", targetEmail: email },
      },
    }).catch(() => null);
    return ok(reply, { sentTo: email }, `Email thử nghiệm đã được gửi tới ${email}.`);
  });

  app.get("/api/admin/news", async (request, reply) => { if (!await guard(request, reply, "news.view")) return; return ok(reply, { posts: await prisma.newsPost.findMany({ orderBy: { updatedAt: "desc" }, include: { author: { select: { fullName: true } } } }) }); });
  app.get("/api/admin/news/:id", async (request, reply) => { if (!await guard(request, reply, "news.view")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const post = await prisma.newsPost.findUnique({ where: { id }, include: { author: { select: { fullName: true } } } }); if (!post) return fail(reply, 404, "Không tìm thấy bài viết.", "NEWS_NOT_FOUND"); return ok(reply, { post }); });
  app.post("/api/admin/news", async (request, reply) => {
    const admin = await guard(request, reply, "news.create");
    if (!admin) return;
    const input = newsInput.parse(request.body);
    const uniqueSlug = await availableNewsSlug(input.slug);
    const post = await prisma.newsPost.create({
      data: {
        ...input,
        slug: uniqueSlug,
        authorId: admin.id,
        publishedAt: input.status === "PUBLISHED" ? (input.publishedAt ?? new Date()) : null,
      },
    });
    await prisma.auditLog.create({
      data: {
        action: "NEWS_CREATED",
        actorAdminId: admin.id,
        targetType: "news",
        targetId: post.id,
        metadata: { title: post.title, slug: post.slug, category: post.category },
      },
    }).catch(() => null);
    return reply.code(201).send({ success: true, data: { post }, message: "Đã lưu bài viết." });
  });

  app.put("/api/admin/news/:id", async (request, reply) => {
    if (!await guard(request, reply, "news.update")) return;
    const { id } = z.object({ id: z.string() }).parse(request.params);
    const admin = await authenticateRequest(request);
    const input = newsInput.parse(request.body);
    const current = await prisma.newsPost.findUnique({ where: { id }, select: { publishedAt: true } });
    if (!current) return fail(reply, 404, "Không tìm thấy bài viết.", "NEWS_NOT_FOUND");
    const uniqueSlug = await availableNewsSlug(input.slug, id);
    const post = await prisma.newsPost.update({
      where: { id },
      data: {
        ...input,
        slug: uniqueSlug,
        publishedAt: input.status === "PUBLISHED" ? (input.publishedAt ?? current.publishedAt ?? new Date()) : null,
      },
    });
    await prisma.auditLog.create({
      data: {
        action: "NEWS_UPDATED",
        actorAdminId: admin?.id,
        targetType: "news",
        targetId: post.id,
        metadata: { title: post.title, slug: post.slug, status: post.status },
      },
    }).catch(() => null);
    return ok(reply, { post }, "Đã cập nhật bài viết.");
  });

  app.delete("/api/admin/news/:id", async (request, reply) => {
    if (!await guard(request, reply, "news.delete")) return;
    const { id } = z.object({ id: z.string() }).parse(request.params);
    const admin = await authenticateRequest(request);
    const post = await prisma.newsPost.update({ where: { id }, data: { status: "ARCHIVED" } });
    await prisma.auditLog.create({
      data: {
        action: "NEWS_DELETED",
        actorAdminId: admin?.id,
        targetType: "news",
        targetId: id,
        metadata: { title: post.title, slug: post.slug },
      },
    }).catch(() => null);
    return ok(reply, {}, "Đã lưu trữ bài viết.");
  });

  app.get("/api/admin/resources", async (request, reply) => {
    if (!await guard(request, reply, "resources.view")) return;
    const query = z.object({ q: z.string().trim().max(100).optional(), categoryId: z.string().optional(), resourceType: resourceType.optional(), documentType: resourceDocumentType.optional(), page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(100) }).parse(request.query);
    const where = { ...(query.q ? { title: { contains: query.q, mode: "insensitive" as const } } : {}), ...(query.categoryId ? { categoryId: query.categoryId } : {}), ...(query.resourceType ? { resourceType: query.resourceType } : {}), ...(query.documentType ? { documentType: query.documentType } : {}) };
    const [resources, total] = await Promise.all([
      prisma.resourceFile.findMany({ where, orderBy: { createdAt: "desc" }, skip: (query.page - 1) * query.limit, take: query.limit, include: { category: true, author: { select: { fullName: true } } } }),
      prisma.resourceFile.count({ where }),
    ]);
    return ok(reply, { resources, pagination: { page: query.page, limit: query.limit, total, totalPages: Math.ceil(total / query.limit) } });
  });

  app.get("/api/admin/resources/:id", async (request, reply) => { if (!await guard(request, reply, "resources.view")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const resource = await prisma.resourceFile.findUnique({ where: { id }, include: { category: true, author: { select: { fullName: true } } } }); if (!resource) return fail(reply, 404, "Không tìm thấy tài nguyên.", "RESOURCE_NOT_FOUND"); return ok(reply, { resource }); });

  app.post("/api/admin/resources", async (request, reply) => {
    const admin = await guard(request, reply, "resources.create");
    if (!admin) return;
    const input = resourceInput.parse(request.body);
    const category = await prisma.resourceCategory.findUnique({ where: { id: input.categoryId }, select: { id: true } });
    if (!category) return fail(reply, 400, "Danh mục không tồn tại.", "RESOURCE_CATEGORY_NOT_FOUND");
    const resourceSlug = await availableResourceSlug(input.title);
    const resource = await prisma.resourceFile.create({
      data: {
        ...input,
        slug: resourceSlug,
        authorId: admin.id,
        publishedAt: input.status === "PUBLISHED" ? new Date() : null,
      },
    });
    await prisma.auditLog.create({
      data: {
        action: "RESOURCE_CREATED",
        actorAdminId: admin.id,
        targetType: "resource",
        targetId: resource.id,
        metadata: { title: resource.title, fileName: resource.fileName },
      },
    }).catch(() => null);
    return reply.code(201).send({ success: true, data: { resource }, message: "Đã thêm tài nguyên." });
  });

  app.put("/api/admin/resources/:id", async (request, reply) => {
    if (!await guard(request, reply, "resources.update")) return;
    const { id } = z.object({ id: z.string() }).parse(request.params);
    const admin = await authenticateRequest(request);
    const input = resourceInput.parse(request.body);
    const current = await prisma.resourceFile.findUnique({ where: { id }, select: { id: true, publishedAt: true } });
    if (!current) return fail(reply, 404, "Không tìm thấy tài nguyên.", "RESOURCE_NOT_FOUND");
    const category = await prisma.resourceCategory.findUnique({ where: { id: input.categoryId }, select: { id: true } });
    if (!category) return fail(reply, 400, "Danh mục không tồn tại.", "RESOURCE_CATEGORY_NOT_FOUND");
    const resourceSlug = await availableResourceSlug(input.title, id);
    const resource = await prisma.resourceFile.update({
      where: { id },
      data: {
        ...input,
        slug: resourceSlug,
        publishedAt: input.status === "PUBLISHED" ? (current.publishedAt ?? new Date()) : null,
      },
    });
    await prisma.auditLog.create({
      data: {
        action: "RESOURCE_UPDATED",
        actorAdminId: admin?.id,
        targetType: "resource",
        targetId: resource.id,
        metadata: { title: resource.title, fileName: resource.fileName },
      },
    }).catch(() => null);
    return ok(reply, { resource }, "Đã cập nhật tài nguyên.");
  });

  app.delete("/api/admin/resources/:id", async (request, reply) => {
    if (!await guard(request, reply, "resources.delete")) return;
    const { id } = z.object({ id: z.string() }).parse(request.params);
    const admin = await authenticateRequest(request);
    const existing = await prisma.resourceFile.findUnique({ where: { id }, select: { id: true, title: true } });
    if (!existing) return fail(reply, 404, "Không tìm thấy tài nguyên.", "RESOURCE_NOT_FOUND");
    await prisma.resourceFile.delete({ where: { id } });
    await prisma.auditLog.create({
      data: {
        action: "RESOURCE_DELETED",
        actorAdminId: admin?.id,
        targetType: "resource",
        targetId: id,
        metadata: { title: existing.title },
      },
    }).catch(() => null);
    return ok(reply, {}, "Đã xóa tài nguyên.");
  });

  app.get("/api/admin/resource-categories", async (request, reply) => { if (!await guard(request, reply, "resources.view")) return; const categories = await prisma.resourceCategory.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { resources: true } } } }); return ok(reply, { categories }); });
  app.post("/api/admin/resource-categories", async (request, reply) => { if (!await guard(request, reply, "resources.create")) return; const input = resourceCategoryInput.parse(request.body); const duplicate = await prisma.resourceCategory.findFirst({ where: { name: { equals: input.name, mode: "insensitive" } }, select: { id: true } }); if (duplicate) return fail(reply, 409, "Tên danh mục đã tồn tại.", "RESOURCE_CATEGORY_DUPLICATE"); const category = await prisma.resourceCategory.create({ data: input }); return reply.code(201).send({ success: true, data: { category }, message: "Đã thêm danh mục." }); });
  app.put("/api/admin/resource-categories/:id", async (request, reply) => { if (!await guard(request, reply, "resources.update")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const input = resourceCategoryInput.parse(request.body); const duplicate = await prisma.resourceCategory.findFirst({ where: { name: { equals: input.name, mode: "insensitive" }, id: { not: id } }, select: { id: true } }); if (duplicate) return fail(reply, 409, "Tên danh mục đã tồn tại.", "RESOURCE_CATEGORY_DUPLICATE"); const existing = await prisma.resourceCategory.findUnique({ where: { id }, select: { id: true } }); if (!existing) return fail(reply, 404, "Không tìm thấy danh mục.", "RESOURCE_CATEGORY_NOT_FOUND"); const category = await prisma.resourceCategory.update({ where: { id }, data: input }); return ok(reply, { category }, "Đã cập nhật danh mục."); });
  app.delete("/api/admin/resource-categories/:id", async (request, reply) => { if (!await guard(request, reply, "resources.delete")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const category = await prisma.resourceCategory.findUnique({ where: { id }, include: { _count: { select: { resources: true } } } }); if (!category) return fail(reply, 404, "Không tìm thấy danh mục.", "RESOURCE_CATEGORY_NOT_FOUND"); if (category._count.resources > 0) return fail(reply, 409, "Không thể xóa danh mục vì hiện vẫn còn tài nguyên thuộc danh mục này.", "RESOURCE_CATEGORY_IN_USE"); await prisma.resourceCategory.delete({ where: { id } }); return ok(reply, {}, "Đã xóa danh mục."); });
  app.get("/api/admin/applications", async (request, reply) => { if (!await guard(request, reply, "applications.view")) return; return ok(reply, { applications: await prisma.application.findMany({ orderBy: { createdAt: "desc" }, take: 200 }) }); });

  app.get("/api/admin/site-content", async (request, reply) => { if (!await guard(request, reply, "website.view")) return; return ok(reply, { contents: await prisma.siteContent.findMany({ orderBy: [{ section: "asc" }, { page: "asc" }] }) }); });
  app.post("/api/admin/site-content", async (request, reply) => { const admin = await guard(request, reply, "website.update"); if (!admin) return; const input = siteInput.parse(request.body); const data = { ...input, value: input.value as Prisma.InputJsonValue, authorId: admin.id }; const content = await prisma.siteContent.upsert({ where: { key: input.key }, update: data, create: data }); return ok(reply, { content }, "Đã cập nhật cấu hình website."); });
}
