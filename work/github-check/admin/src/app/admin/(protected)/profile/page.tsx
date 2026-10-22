import { redirect } from "next/navigation";

export default function ProfileRedirectPage() {
  redirect("/admin/profile/security");
}
