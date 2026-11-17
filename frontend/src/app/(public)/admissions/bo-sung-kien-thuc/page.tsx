import type { Metadata } from "next";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { KnowledgeRegistrationForm } from "@/features/admissions/KnowledgeRegistrationForm";

export const metadata: Metadata = {
  title: "Đăng ký học bổ sung kiến thức",
};

export default function KnowledgeRegistrationPage() {
  return (
    <>
      <SiteHeader compact />
      <KnowledgeRegistrationForm />
      <SiteFooter />
    </>
  );
}
