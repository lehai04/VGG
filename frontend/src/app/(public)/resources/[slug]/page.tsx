import { redirect } from "next/navigation";
import { localizedRedirectPath } from "@/lib/serverLocale";

export default async function Page() {
  redirect(await localizedRedirectPath("/resources"));
}
