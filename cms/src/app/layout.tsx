import "../../../shared/styles/cms-rich-content.css";
import type { Metadata } from "next";
import "./globals.css";
import "./restored.css";
import "./cms-readability.css";
import "./cms-buttons.css";
export const metadata: Metadata = { title: "CMS | Viện Sau Đại học", robots: { index: false, follow: false } };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="vi"><body>{children}</body></html>; }
