import { redirect } from "next/navigation";
import { localizedRedirectPath } from "@/lib/serverLocale";
import type { Metadata } from "next";
import { programmes } from "@/data/programmes";
import { ProgrammeDetailPage } from "@/features/programmes/components/ProgrammeDetailPage";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmes.find(item => item.id === slug);
  return programme ? {
    title: `${programme.degree} ${programme.title}`,
    description: `Khám phá ngành ${programme.title} tại Viện Sau Đại học Văn Lang: chương trình đào tạo, triển vọng nghề nghiệp và thông tin tư vấn tuyển sinh.`,
  } : { title: "Chương trình đào tạo" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = programmes.find(item => item.id === slug);
  if (programme) return <ProgrammeDetailPage key={programme.id} programme={programme} />;
  redirect(await localizedRedirectPath(`/programmes#${slug}`));
}
