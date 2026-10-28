import { z } from "zod";

export type ContentSection = {
  id: string;
  title: string;
  domId?: string;
  selector?: string;
  fields: string[];
};
export function contentSections(id: string): ContentSection[] {
  if (id.startsWith("programme:"))
    return [
      {
        id: "hero",
        title: "Banner",
        selector: "main > section:first-of-type",
        fields: ["hero", "general"],
      },
      {
        id: "facts",
        title: "Thông tin tóm tắt",
        selector: '[data-content-slot="facts"]',
        fields: ["facts"],
      },
      {
        id: "overview",
        title: "Tổng quan chương trình",
        domId: "tong-quan",
        fields: ["section01"],
      },
      {
        id: "highlights",
        title: "Điểm nổi bật",
        domId: "diem-noi-bat",
        fields: ["section02"],
      },
      {
        id: "audience",
        title: "Chương trình phù hợp với ai?",
        domId: "doi-tuong",
        fields: ["section03"],
      },
      {
        id: "careers",
        title: "Hướng phát triển",
        domId: "nghe-nghiep",
        fields: ["section04"],
      },
      {
        id: "curriculum",
        title: "Chương trình đào tạo",
        domId: "chuong-trinh",
        fields: ["section05"],
      },
      { id: "fees", title: "Học phí", domId: "hoc-phi", fields: ["fees"] },
      { id: "application", title: "Hồ sơ và quy trình đăng ký", domId: "ho-so-dang-ky", fields: ["contentApplication"] },
      { id: "support", title: "Học bổng và chính sách hỗ trợ", domId: "chinh-sach-ho-tro", fields: ["contentSupport"] },
      { id: "faq", title: "Câu hỏi thường gặp", domId: "faq", fields: ["faq"] },
      {
        id: "consultation",
        title: "Liên hệ tư vấn",
        selector: "#consultation",
        fields: ["consultation"],
      },
    ];
  const section = (
    id: string,
    title: string,
    fields: string[],
    domId?: string,
    selector?: string,
  ): ContentSection => ({ id, title, fields, domId, selector });
  if (id === "home")
    return [
      section("hero", "Banner", ["hero"], "top"),
      section("search", "Tìm chương trình", ["programmeSearch"]),
      section("overview", "Van Lang Global Graduate", ["overview"], "about"),
      section(
        "research",
        "Nghiên cứu",
        ["research", "researchLinks"],
        "research",
      ),
      section("programmes", "Nhóm chương trình", ["fields"], "programmes"),
      section("news", "Tin tức", []),
      section("consultation", "Tư vấn", [], "consultation"),
    ];
  if (id === "discover")
    return [
      section(
        "hero",
        "Banner",
        ["hero", "media", "actions"],
        undefined,
        "main > section:first-of-type",
      ),
      section(
        "introduction",
        "Giới thiệu Viện",
        ["introduction"],
        "gioi-thieu",
      ),
      section(
        "vision",
        "Tầm nhìn và sứ mệnh",
        ["vision", "mission"],
        "tam-nhin-su-menh",
      ),
      section(
        "philosophy",
        "Triết lý giáo dục",
        ["philosophy"],
        "triet-ly-giao-duc",
      ),
      section("values", "Giá trị cốt lõi", ["values"], "gia-tri-cot-loi"),
      section("benefits", "Lợi thế người học", ["benefits"], "vi-sao-chon-vgg"),
      section(
        "strategy",
        "Định hướng phát triển",
        ["strategy"],
        "dinh-huong-2030",
      ),
      section(
        "leadership",
        "Đội ngũ lãnh đạo",
        ["leadership", "leaders"],
        "doi-ngu-lanh-dao",
      ),
      section(
        "closing",
        "Hành trình tiếp theo",
        ["closing"],
        undefined,
        "main > section:last-of-type",
      ),
    ];
  if (id === "research")
    return [
      section(
        "hero",
        "Banner",
        ["hero"],
        undefined,
        "main > section:first-of-type",
      ),
      section("overview", "Tổng quan", ["overview"], "overview"),
      section(
        "goals",
        "Mục tiêu nghiên cứu",
        ["goalsHeading", "goals"],
        "goals",
      ),
      section(
        "fields",
        "Lĩnh vực nghiên cứu",
        ["fieldsHeading", "researchFields"],
        "fields",
      ),
      section(
        "partners",
        "Đối tác",
        ["partnersHeading", "partners"],
        undefined,
        'section[aria-labelledby="strategic-partners-title"]',
      ),
      section(
        "industry",
        "Hợp tác doanh nghiệp",
        ["industry"],
        "hop-tac-doanh-nghiep",
      ),
    ];
  if (id === "student-success")
    return [
      section(
        "hero",
        "Banner",
        ["hero"],
        undefined,
        "main > section:first-of-type",
      ),
      section("learning", "Học tập và phát triển", ["learning"]),
      section("community", "Cộng đồng", ["community"]),
      section("experience", "Dịch vụ người học", ["experience", "services"]),
      section("moments", "Khoảnh khắc", ["moments"]),
    ];
  if (id === "catalogue")
    return [
      section(
        "hero",
        "Banner chương trình",
        ["ProgrammesPage"],
        undefined,
        "main > section:first-of-type",
      ),
      section(
        "directory",
        "Danh mục ngành",
        ["ProgrammeDirectory"],
        undefined,
        "#programme-directory",
      ),
    ];
  if (id === "admissions")
    return [
      section(
        "hero",
        "Banner tuyển sinh",
        ["introduction"],
        undefined,
        ".hero",
      ),
      section(
        "notices",
        "Thông báo và lịch tuyển sinh",
        ["thong-bao-lich-tuyen-sinh"],
        "thong-bao-lich-tuyen-sinh",
      ),
      section(
        "conditions",
        "Điều kiện dự tuyển",
        ["dieu-kien-phuong-thuc"],
        "dieu-kien-phuong-thuc",
      ),
      section(
        "fees",
        "Học phí và học bổng",
        ["hoc-phi-hoc-bong"],
        "hoc-phi-hoc-bong",
      ),
      section(
        "documents",
        "Hồ sơ dự tuyển",
        ["ho-so-du-tuyen"],
        "ho-so-du-tuyen",
      ),
      section(
        "process",
        "Quy trình",
        ["quy-trinh-tuyen-sinh", "masterProcess", "doctorProcess"],
        "quy-trinh-tuyen-sinh",
      ),
      section(
        "faq",
        "Câu hỏi thường gặp",
        ["cau-hoi-thuong-gap", "masterFaq", "doctorFaq"],
        "cau-hoi-thuong-gap",
      ),
      section("consultation", "Đăng ký tư vấn", ["tu-van"], "tu-van"),
    ];
  if (id === "chrome")
    return [
      section(
        "header",
        "Header",
        ["brand", "navigationGroups"],
        undefined,
        "header",
      ),
      section(
        "footer",
        "Footer",
        [
          "contactItems",
          "aboutLinks",
          "quickLinks",
          "socialLinks",
          "locations",
          "legalLinks",
          "application",
        ],
        undefined,
        "footer",
      ),
    ];
  return [];
}
const short = z.string().max(500);
const text = z.string().max(20000);
const itemId = z.string().regex(/^[a-z0-9][a-z0-9-]{0,79}$/);
const card = z
  .object({
    title: short,
    text,
    image: z.string().max(1000).optional(),
    alt: short.optional(),
    href: z.string().max(1000).optional(),
  })
  .strict();
const custom = z
  .object({
    schemaVersion: z.literal(1).default(1),
    id: itemId,
    template: z.enum(["text", "text-image", "cards", "faq"]),
    title: short,
    body: text,
    image: z.string().max(1000).optional(),
    alt: short.optional(),
    items: z.array(card).max(12).default([]),
  })
  .strict();
export const compositionSchema = z
  .object({
    schemaVersion: z.literal(1).default(1),
    order: z.array(itemId).max(60),
    hidden: z.array(itemId).max(40),
    added: z.array(custom).max(20),
  })
  .strict();
export type ContentComposition = z.infer<typeof compositionSchema>;
export const bannerSchema = z
  .object({
    kind: z.enum(["image", "video"]),
    src: z.string().min(1).max(1000),
    poster: z.string().max(1000).optional(),
    alt: short.default(""),
  })
  .strict();
export type ContentBanner = z.infer<typeof bannerSchema>;
export function collectionSchemas(id: string): Record<string, z.ZodType> {
  if (id === "discover")
    return {
      leaders: z
        .array(
          z
            .object({
              id: itemId.optional(),
              name: short.min(1),
              role: short.min(1),
              image: z.string().min(1).max(1000),
            })
            .strict(),
        )
        .max(60),
    };
  if (id.startsWith("programme:"))
    return {
      contentBasics: z.array(z.object({
        code: short.min(1),
        credits: z.string().regex(/^\d{1,3}$/).refine((value) => Number(value) <= 300).optional(),
        degree: z.enum(["Thạc sĩ", "Tiến sĩ"]),
        field: z.enum(["Kinh doanh & Quản lý", "Kỹ thuật, Môi trường & Công nghệ", "Du lịch & Khách sạn", "Luật, Nhân văn & Truyền thông", "Thiết kế & Mỹ thuật Ứng dụng"]),
        orientation: z.enum(["Ứng dụng", "Nghiên cứu", "Ứng dụng và nghiên cứu", "Đang cập nhật"]),
      }).strict()).length(1),
      contentObjectives: z.array(z.object({ title: short.min(1), text }).strict()).max(30),
      contentRequirements: z.array(z.object({ title: short.min(1), text }).strict()).max(30),
      contentApplication: z.array(z.object({ title: short.min(1), text }).strict()).max(30),
      contentSupport: z.array(z.object({ title: short.min(1), text }).strict()).max(30),
      "pageContent.facts.quickFactsDetailed": z.array(z.object({ label: short.min(1), value: short.min(1), detail: short.optional() }).strict()).min(1).max(12),
      contentCurriculum: z.array(z.object({
        name: short.min(1),
        credits: z.string().regex(/^(?:[0-9]|[1-4][0-9]|50)(?:\.5)?$/),
        group: short.min(1),
        track: z.enum(["Ứng dụng", "Nghiên cứu"]),
        note: text,
      }).strict()).max(200),
      contentOverview: z.array(z.object({ html: z.string().max(20000) }).strict()).max(1),
      "pageContent.section02.highlights": z
        .array(z.object({ title: short.min(1), text }).strict())
        .max(24),
      "pageContent.section03.audience": z
        .array(
          z
            .object({
              title: short.min(1),
              text,
              image: z.string().max(1000).optional(),
              alt: short.optional(),
              imageSource: z.string().max(1000).optional(),
            })
            .strict(),
        )
        .max(24),
      "pageContent.section04.careers": z
        .array(
          z
            .object({ title: short.min(1), sub: text, group: short.optional() })
            .strict(),
        )
        .max(24),
      "pageContent.faq.faqs": z
        .array(z.object({ question: short.min(1), answer: text, hidden: z.enum(["true", "false"]).optional() }).strict())
        .max(40),
    };
  if (id === "research")
    return {
      goals: z.array(z.object({ title: short, text }).strict()).max(24),
      researchFields: z
        .array(
          z
            .object({ name: short, image: z.string(), href: z.string() })
            .strict(),
        )
        .max(24),
      partners: z
        .array(z.object({ name: short, logo: z.string() }).strict())
        .min(1)
        .max(40),
    };
  if (id === "student-success")
    return {
      services: z
        .array(
          z
            .object({
              id: itemId,
              title: short,
              text,
              href: z.string(),
              image: z.string(),
            })
            .strict(),
        )
        .max(30),
    };
  return {};
}
export function parseComposition(
  id: string,
  raw?: string,
): ContentComposition | undefined {
  if (!raw) return undefined;
  try {
    const value = compositionSchema.parse(JSON.parse(raw));
    const allowed = new Set([
      ...contentSections(id).map((s) => s.id),
      ...value.added.map((s) => s.id),
    ]);
    if (
      !contentSections(id).length ||
      value.order.some((key) => !allowed.has(key)) ||
      value.hidden.some((key) => !allowed.has(key)) ||
      new Set(value.order).size !== value.order.length ||
      new Set(value.added.map((s) => s.id)).size !== value.added.length ||
      value.added.some((s) => !s.id.startsWith("custom-"))
    )
      return undefined;
    return value;
  } catch {
    return undefined;
  }
}
export function applyCollections<T>(
  defaults: T,
  patch: Record<string, string>,
  id: string,
): T {
  const result = structuredClone(defaults);
  for (const [path, schema] of Object.entries(collectionSchemas(id))) {
    const raw = patch[`$list:${path}`];
    if (!raw) continue;
    try {
      const items = schema.parse(JSON.parse(raw));
      const keys = path.split(".");
      let target = result as Record<string, unknown>;
      for (const key of keys.slice(0, -1)) {
        if (!target[key] || typeof target[key] !== "object") target[key] = {};
        target = target[key] as Record<string, unknown>;
      }
      if (target) target[keys.at(-1)!] = items;
    } catch {
      /* Invalid persisted structures do not replace source defaults. */
    }
  }
  if (id.startsWith("programme:")) {
    const programme = result as Record<string, unknown>;
    const basics = programme.contentBasics as Array<Record<string, string>> | undefined;
    if (basics?.[0]) {
      Object.assign(programme, basics[0]);
      if (basics[0].credits !== undefined) programme.credits = Number(basics[0].credits);
      programme.orientations = basics[0].orientation === "Ứng dụng và nghiên cứu" ? ["Ứng dụng", "Nghiên cứu"] : [basics[0].orientation].filter((value) => ["Ứng dụng", "Nghiên cứu"].includes(value));
    }
    const content = programme.pageContent as Record<string, Record<string, unknown>> | undefined;
    const objectives = programme.contentObjectives as Array<{ title: string; text: string }> | undefined;
    if (objectives && content?.section02) content.section02.learningOutcomes = objectives.length ? { intro: "", items: objectives.map((item, index) => ({ code: String(index + 1).padStart(2, "0"), ...item })) } : undefined;
    const requirements = programme.contentRequirements as Array<{ title: string; text: string }> | undefined;
    if (requirements && content?.section03) content.section03.requirements = requirements.map((item) => ({ title: item.title, paragraphs: [item.text] }));
  }
  return result;
}
