import { redirect } from "next/navigation";
import { localizedRedirectPath } from "@/lib/serverLocale";
import type { Metadata } from "next";
import { programmes } from "@/data/programmes";
import { ProgrammeDetailPage } from "@/features/programmes/components/ProgrammeDetailPage";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmes.find(item => item.id === slug);
  const isInformationTechnology = programme?.id === "cong-nghe-thong-tin";
  const isMarketing = programme?.id === "marketing";
  return programme ? {
    title: isInformationTechnology
      ? "Thạc sĩ Công nghệ thông tin | Viện Sau đại học Văn Lang"
      : isMarketing
      ? "Thạc sĩ Marketing | Viện Sau đại học Văn Lang"
      : `${programme.degree} ${programme.title}`,
    description: isInformationTechnology
      ? "Tìm hiểu Thạc sĩ Công nghệ thông tin tại Văn Lang: mã ngành 480201, định hướng và thời gian đào tạo, ngành đầu vào và thông tin học phí."
      : isMarketing
      ? "Tìm hiểu Thạc sĩ Marketing tại Văn Lang: mã ngành 340115, định hướng và thời gian đào tạo, ngành đầu vào và thông tin học phí."
      : `Khám phá ngành ${programme.title} tại Viện Sau Đại học Văn Lang: chương trình đào tạo, triển vọng nghề nghiệp và thông tin tư vấn tuyển sinh.`,
  } : { title: "Chương trình đào tạo" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = programmes.find(item => item.id === slug);
  if (programme) return <ProgrammeDetailPage key={programme.id} programme={programme} />;
  const degree = slug === "thac-si" ? "Thạc sĩ" : slug === "tien-si" ? "Tiến sĩ" : undefined;
  redirect(await localizedRedirectPath(degree ? `/programmes?degree=${encodeURIComponent(degree)}` : "/programmes"));
}
