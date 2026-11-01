import { notFound } from "next/navigation";
import { ConsultationAdmin } from "@/features/consultation-admin/ConsultationAdmin";
export default async function Page({params}:{params:Promise<{section:string[]}>}) {
 const {section}=await params;
 if(!["dashboard","consultations","news","news/create","resources"].includes(section.join("/")))notFound();
 return <ConsultationAdmin />;
}
