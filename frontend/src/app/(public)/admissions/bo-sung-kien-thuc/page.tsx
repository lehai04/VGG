import type { Metadata } from "next";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { KnowledgeRegistrationForm } from "@/features/admissions/KnowledgeRegistrationForm";
import { knowledgeTranslate } from "@/features/admissions/knowledge-registration-copy";
import { requestLanguage } from "@/i18n/request-copy";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await requestLanguage();
  return { title: knowledgeTranslate(locale)("Đăng ký học bổ sung kiến thức") };
}

export default function KnowledgeRegistrationPage() {
  return (
    <>
      <SiteHeader compact />
      <KnowledgeRegistrationForm />
      <SiteFooter />
    </>
  );
}
