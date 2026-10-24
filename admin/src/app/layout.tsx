import type { Metadata } from "next";
import "./styles.css";
import "../../../shared/styles/typography.css";

export const metadata: Metadata = {
  title: { default: "VGG Administration", template: "%s | VGG Administration" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
