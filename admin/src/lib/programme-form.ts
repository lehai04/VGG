export type ProgrammeFormValues = {
  id: string; title: string; heroTitle: string; summary: string; bannerImage: string;
  englishTitle: string; code: string; credits: string; degree: string; field: string;
  orientation: string; duration: string; tuition: string; studyMode: string; intake: string;
  overviewImage: string; careerImage: string; consultationTitle: string; consultationBody: string;
};
export const emptyProgrammeForm: ProgrammeFormValues = {
  id: "", title: "", heroTitle: "", summary: "", bannerImage: "", englishTitle: "", code: "", credits: "0",
  degree: "Thạc sĩ", field: "Kinh doanh & Quản lý", orientation: "Đang cập nhật",
  duration: "Đang cập nhật", tuition: "Chưa công bố", studyMode: "Đang cập nhật", intake: "",
  overviewImage: "", careerImage: "", consultationTitle: "Tìm hiểu chương trình", consultationBody: "Liên hệ Viện để được tư vấn.",
};
export function programmeFormPayload(form: ProgrammeFormValues, lists: Record<string, Record<string,string>[]>) {
  const { heroTitle, overviewImage, careerImage, consultationTitle, consultationBody, ...input } = form;
  const values: Record<string,string> = {
    title: form.title, englishTitle: form.englishTitle, summary: form.summary,
    duration: form.duration, tuition: form.tuition, studyMode: form.studyMode, intake: form.intake,
    bannerImage: form.bannerImage,
    "pageContent.hero.heroTitle": heroTitle || form.title,
    "pageContent.hero.heroLead": form.summary,
    "pageContent.hero.heroImage": form.bannerImage,
    "pageContent.hero.imageAlt": form.title,
    "pageContent.section01.overviewImage": overviewImage || form.bannerImage,
    "pageContent.section04.careerImage": careerImage || form.bannerImage,
    "pageContent.consultation.ctaHeading.0": consultationTitle,
    "pageContent.consultation.ctaBody": consultationBody,
    "$list:cmsBasics": JSON.stringify([{ code: form.code, credits: form.credits, degree: form.degree, field: form.field, orientation: form.orientation }]),
    "$list:pageContent.facts.quickFactsDetailed": JSON.stringify([
      { label: "Mã ngành", value: form.code, detail: "" },
      { label: "Khối lượng chương trình", value: Number(form.credits) > 0 ? `${form.credits} tín chỉ` : "Đang cập nhật", detail: form.duration },
      { label: "Định hướng đào tạo", value: form.orientation, detail: "" },
      { label: "Hình thức đào tạo", value: form.studyMode, detail: "" },
      { label: "Ngôn ngữ đào tạo", value: "Đang cập nhật", detail: "" },
      { label: "Học phí toàn khóa", value: form.tuition, detail: "" },
    ]),
  };
  for (const [path, rows] of Object.entries(lists)) {
    if (path === "pageContent.facts.quickFactsDetailed" && !rows.length) continue;
    values[`$list:${path}`] = JSON.stringify(rows);
  }
  return { ...input, credits: Number(form.credits), values };
}
