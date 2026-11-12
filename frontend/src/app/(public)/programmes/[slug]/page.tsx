import { redirect } from "next/navigation";
import { localizedRedirectPath } from "@/lib/serverLocale";
import type { Metadata } from "next";
import {withPageSeo} from '@/lib/page-seo';
import { ProgrammeDetailPage } from "@/features/programmes/components/ProgrammeDetailPage";
import { websiteLayout,websiteProgrammes } from '@/lib/website-content';
import { requestLanguage, requestProgrammeCopy } from "@/i18n/request-copy";
import { websiteCopy } from "@/i18n/website-copy";
import { ProgrammeCopyProvider } from "@/i18n/components/WebsiteCopy";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const programme = (await websiteProgrammes()).find(item => item.id === slug);
  const { locale, pathname } = await requestLanguage();
  if (locale === "en" && programme) {
    const t = websiteCopy(locale, pathname, await requestProgrammeCopy());
    const title = t(programme.title, programme.englishTitle ?? programme.title);
    return withPageSeo({
      title,
      description: t(programme.summary ?? "", `Explore the ${title} program at Van Lang University.`),
    });
  }
  const isInformationTechnology = programme?.id === "cong-nghe-thong-tin";
  const isMarketing = programme?.id === "marketing";
  return withPageSeo(programme ? {
    title: isInformationTechnology
      ? "Thạc sĩ Công nghệ Thông tin | Viện Sau đại học Văn Lang"
      : isMarketing
      ? "Thạc sĩ Marketing | Viện Sau đại học Văn Lang"
      : `${programme.degree} ${programme.title}`,
    description: isInformationTechnology
      ? "Tìm hiểu Thạc sĩ Công nghệ Thông tin tại Văn Lang: mã ngành 480201, định hướng và thời gian đào tạo, ngành đầu vào và thông tin học phí."
      : isMarketing
      ? "Tìm hiểu Thạc sĩ Marketing tại Văn Lang: mã ngành 340115, định hướng và thời gian đào tạo, ngành đầu vào và thông tin học phí."
      : `Khám phá ngành ${programme.title} tại Viện Sau đại học Văn Lang: chương trình đào tạo, triển vọng nghề nghiệp và thông tin tư vấn tuyển sinh.`,
  } : { title: "Chương trình đào tạo" });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = (await websiteProgrammes()).find(item => item.id === slug);
  if (programme) {
    const [dictionary, layout] = await Promise.all([
      requestProgrammeCopy(),
      websiteLayout(`programme:${programme.id}`),
    ]);
    return (
      <ProgrammeCopyProvider dictionary={dictionary}>
        <ProgrammeDetailPage key={programme.id} layout={layout} programme={programme} />
      </ProgrammeCopyProvider>
    );
  }
  const degree = slug === "thac-si" ? "Thạc sĩ" : slug === "tien-si" ? "Tiến sĩ" : undefined;
  redirect(await localizedRedirectPath(degree ? `/programmes?degree=${encodeURIComponent(degree)}` : "/programmes"));
}
