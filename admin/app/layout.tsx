import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = { title: "VGG Admin", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
