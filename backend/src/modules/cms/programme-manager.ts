import { z } from "zod";
import template from "./programme-template.json" with { type: "json" };
export const programmeInput = z
  .object({
    id: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .refine((value) => !["thac-si", "tien-si"].includes(value), "Đường dẫn dành riêng cho danh mục trình độ.")
      .max(100),
    title: z.string().trim().min(2).max(190),
    englishTitle: z.string().max(190).default(""),
    code: z.string().trim().min(1).max(30),
    degree: z.enum(["Thạc sĩ", "Tiến sĩ"]),
    field: z.enum([
      "Kinh doanh & Quản lý",
      "Kỹ thuật, Môi trường & Công nghệ",
      "Du lịch & Khách sạn",
      "Luật, Nhân văn & Truyền thông",
      "Thiết kế & Mỹ thuật Ứng dụng",
    ]),
    orientation: z.enum([
      "Ứng dụng",
      "Nghiên cứu",
      "Ứng dụng và nghiên cứu",
      "Đang cập nhật",
    ]),
    credits: z.number().int().min(0).max(300),
    duration: z.string().min(1).max(100),
    tuition: z.string().min(1).max(100),
    studyMode: z.string().min(1).max(100),
    intake: z.string().max(100),
    summary: z.string().max(3000),
    bannerImage: z.string().min(1).max(1000),
  })
  .strict();
export function programmeDefinition(input: z.infer<typeof programmeInput>) {
  const pageContent = structuredClone(template);
  Object.assign(pageContent.hero, { heroTitle: input.title, heroImage: input.bannerImage, imageAlt: input.title });
  Object.assign(pageContent.section01, { overviewImage: input.bannerImage, imageFallback: input.bannerImage, imageAlt: input.title });
  pageContent.section02.highlights = [];
  pageContent.section03.audience = [];
  pageContent.section04.careers = [];
  pageContent.faq.faqs = [];
  pageContent.hero.heroLead = input.summary;
  pageContent.section01.overview = [
    input.summary || "Vui lòng liên hệ Viện để được tư vấn.",
  ];
  return {
    id: `programme:${input.id}`,
    path: `/programmes/${input.id}`,
    title: `${input.degree} ${input.title}`,
    kind: "programme",
    locales: ["vi", "en"],
    defaults: { ...input, cmsCurriculum: [], curriculaPending: true, pageContent },
  };
}
