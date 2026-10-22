import { CreateAdminForm } from "@/components/users/CreateAdminForm";
import { requireAdmin } from "@/lib/auth/authorization";
import { redirect } from "next/navigation";
export const metadata = { title: "Thêm quản trị viên" };
export default async function CreateAdminPage() { const admin = await requireAdmin(); if (!admin.permissionCodes.includes("admins.create")) redirect("/admin/dashboard"); return <div className="admin-page"><header className="admin-page__head"><div><span className="eyebrow">ADMIN USERS / CREATE</span><h1>Thêm tài khoản</h1></div></header><section className="admin-card"><CreateAdminForm /></section></div>; }

