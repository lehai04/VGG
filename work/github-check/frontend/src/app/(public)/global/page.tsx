import { redirect } from "next/navigation";
import { localizedRedirectPath } from "@/lib/serverLocale";

/** Route cũ được giữ để chuyển người dùng tới phần Hợp tác quốc tế trong trang gộp. */
export default async function GlobalPage() {
  redirect(await localizedRedirectPath("/research#trao-doi"));
}
