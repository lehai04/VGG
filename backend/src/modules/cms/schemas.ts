import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { env } from "../../config/environment.js";
const status = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
const slug = z
  .string()
  .trim()
  .min(2)
  .max(190)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const newsCategory = z.enum([
  "ADMISSIONS",
  "VAN_LANG_UNIVERSITY",
  "UNIVERSITY_EVENT",
  "VAN_LANG_LIFE",
  "INTERNATIONAL_COOPERATION",
  "RESEARCH_PROJECT",
  "RESEARCH_PUBLICATION",
]);
const imagePath = z
  .string()
  .trim()
  .max(1000)
  .refine(
    (value) =>
      (value.startsWith("/") && !value.startsWith("//")) ||
      /^https:\/\//.test(value),
    "Ảnh phải là URL hoặc đường dẫn bắt đầu bằng /.",
  );
const safeCssColor = [
  /^#[0-9a-f]{3,8}$/i,
  /^rgba?\([\d\s,.%]+\)$/i,
  /^hsla?\([\d\s,.%]+\)$/i,
  /^[a-z]+$/i,
];
const safeCssLength = [/^-?\d+(?:\.\d+)?(?:px|em|rem|%|pt)?$/i];
export const cleanNewsHtml = (value: string) =>
  sanitizeHtml(value, {
    allowedTags: [
      "p",
      "div",
      "span",
      "br",
      "hr",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "sub",
      "sup",
      "font",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "img",
      "figure",
      "figcaption",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      "*": ["style", "align"],
      a: ["href", "target", "rel"],
      img: ["src", "srcset", "sizes", "alt", "width", "height"],
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
        "text-decoration": [
          /^(?:none|underline|line-through|overline)(?:\s+(?:underline|line-through|overline))*$/,
        ],
        "text-align": [/^(?:left|right|center|justify|start|end)$/],
        "text-align-last": [/^(?:auto|left|right|center|justify|start|end)$/],
        width: safeCssLength,
        height: safeCssLength,
        "word-spacing": [/^(?:normal|-?\d+(?:\.\d+)?(?:px|em|rem|pt)?)$/i],
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
    transformTags: {

      a: (_tagName, attributes) => {
        const href = attributes.href ?? "";
        let external = href.startsWith("//");
        try {
          const destination = new URL(href, env.PUBLIC_APP_URL);
          external ||=
            destination.origin !== new URL(env.PUBLIC_APP_URL).origin;
        } catch {
          /* Invalid links are removed by sanitize-html's allowed schemes. */
        }
        const shouldOpenNewTab = external || attributes.target === "_blank";
        return {
          tagName: "a",
          attribs: shouldOpenNewTab
            ? { ...attributes, target: "_blank", rel: "noopener noreferrer" }
            : attributes,
        };
      },
    },
  }).trim();
const newsContent = z
  .string()
  .transform(cleanNewsHtml)
  .refine(
    (value) => sanitizeHtml(value, { allowedTags: [] }).trim().length >= 20,
    "Nội dung phải có ít nhất 20 ký tự.",
  );
const canonicalUrl = z
  .string()
  .trim()
  .max(1000)
  .optional()
  .nullable()
  .refine((value) => {
    if (!value) return true;
    if (value.startsWith("/") && !value.startsWith("//")) return true;
    try {
      const target = new URL(value);
      const site = new URL(env.PUBLIC_APP_URL);
      return target.protocol === "https:" && target.origin === site.origin;
    } catch {
      return false;
    }
  }, "Canonical phải là đường dẫn trên website hoặc URL HTTPS cùng domain.");
const customJsonLd = z
  .record(z.string(), z.unknown())
  .optional()
  .nullable()
  .refine(
    (value) => !value || JSON.stringify(value).length <= 20_000,
    "Schema tùy chỉnh không được vượt quá 20 KB.",
  );
export const newsInput = z.object({
  slug,
  locale: z.enum(["vi", "en"]).default("vi"),
  category: newsCategory.default("VAN_LANG_UNIVERSITY"),
  title: z.string().trim().min(2).max(250),
  authorName: z.string().trim().min(2).max(120),
  excerpt: z.string().trim().min(10).max(1000),
  content: newsContent,
  enTitle: z.string().trim().min(2).max(250).nullish(),
  enExcerpt: z.string().trim().min(10).max(1000).nullish(),
  enContent: newsContent.nullish(),
  coverImage: imagePath.optional().nullable(),
  coverImageAlt: z.string().trim().max(500).optional().nullable(),
  metaTitle: z.string().trim().max(250).optional().nullable(),
  metaDescription: z.string().trim().max(1000).optional().nullable(),
  canonicalUrl,
  robotsIndex: z.boolean().default(true),
  robotsFollow: z.boolean().default(true),
  ogTitle: z.string().trim().max(250).optional().nullable(),
  ogDescription: z.string().trim().max(1000).optional().nullable(),
  ogImage: imagePath.optional().nullable(),
  ogImageAlt: z.string().trim().max(500).optional().nullable(),
  customJsonLd,
  publishedAt: z.coerce.date().optional(),
  status: status.default("DRAFT"),
}).superRefine((post, context) => {
  const english = [post.enTitle, post.enExcerpt, post.enContent];
  if (english.some(Boolean) && (post.locale !== "vi" || !english.every(Boolean))) {
    context.addIssue({
      code: "custom",
      path: ["enTitle"],
      message: "Bản EN cần đủ tiêu đề, tóm tắt và nội dung trong bài tiếng Việt.",
    });
  }
});
const resourceType = z.enum([
  "DIRECTIVE_DOCUMENT",
  "EXECUTION_DOCUMENT",
  "BROCHURE",
  "PDF_DOCUMENT",
]);
const resourceDocumentType = z.enum([
  "REGULATION",
  "RULE",
  "PROCESS",
  "NOTICE",
  "GUIDELINE",
]);
const allowedResourceFiles = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
]);
export const resourceInput = z
  .object({
    locale: z.enum(["vi", "en"]).default("vi"),
    title: z.string().trim().min(2).max(250),
    enTitle: z.string().trim().max(250).transform((value) => value || null).nullish(),
    description: z.string().trim().max(2000).optional().nullable(),
    categoryId: z.string().trim().min(1),
    resourceType,
    documentType: resourceDocumentType.optional().nullable(),
    documentNumber: z.string().trim().max(100).optional().nullable(),
    issueDate: z.coerce.date().optional().nullable(),
    issuingOrganization: z.string().trim().max(250).optional().nullable(),
    fileUrl: z
      .string()
      .max(1000)
      .refine(
        (value) => value.startsWith("/api/media/"),
        "Đường dẫn file phải thuộc kho nội bộ.",
      ),
    fileName: z.string().trim().min(1).max(255),
    fileType: z
      .string()
      .trim()
      .refine(
        (value) => allowedResourceFiles.has(value),
        "Định dạng file không được hỗ trợ.",
      ),
    fileSize: z.coerce
      .number()
      .int()
      .positive()
      .max(100 * 1024 * 1024),
    status: status.default("PUBLISHED"),
  })
  .superRefine((value, context) => {
    if (
      value.fileType !== "application/pdf" &&
      value.fileSize > 50 * 1024 * 1024
    )
      context.addIssue({
        code: "custom",
        path: ["fileSize"],
        message: "File không phải PDF tối đa 50 MB.",
      });
    const isDocument =
      value.resourceType === "DIRECTIVE_DOCUMENT" ||
      value.resourceType === "EXECUTION_DOCUMENT";
    if (isDocument && !value.documentNumber)
      context.addIssue({
        code: "custom",
        path: ["documentNumber"],
        message: "Số văn bản là bắt buộc.",
      });
    if (isDocument && !value.issueDate)
      context.addIssue({
        code: "custom",
        path: ["issueDate"],
        message: "Ngày ban hành là bắt buộc.",
      });
    if (isDocument && !value.issuingOrganization)
      context.addIssue({
        code: "custom",
        path: ["issuingOrganization"],
        message: "Đơn vị ban hành là bắt buộc.",
      });
    if (value.resourceType === "EXECUTION_DOCUMENT" && !value.documentType)
      context.addIssue({
        code: "custom",
        path: ["documentType"],
        message: "Loại văn bản là bắt buộc.",
      });
    if (
      (value.resourceType === "BROCHURE" ||
        value.resourceType === "PDF_DOCUMENT") &&
      value.fileType !== "application/pdf"
    )
      context.addIssue({
        code: "custom",
        path: ["fileType"],
        message: "Loại tài nguyên này chỉ chấp nhận file PDF.",
      });
  });
export const resourceCategoryInput = z.object({
  name: z.string().trim().min(1, "Tên danh mục không được để trống.").max(120),
  enName: z.string().trim().max(120).transform((value) => value || null).nullish(),
});
