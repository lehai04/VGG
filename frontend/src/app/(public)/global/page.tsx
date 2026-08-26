import { redirect } from "next/navigation";

/** Route cũ được giữ để chuyển người dùng tới phần Cơ hội quốc tế trong trang gộp. */
export default function GlobalPage() {
  redirect("/research#trao-doi");
}
