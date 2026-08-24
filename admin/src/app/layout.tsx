import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles.css";

const inter = localFont({ src: "./fonts/Inter-Variable.ttf", weight: "400 700", display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "VGG Administration", template: "%s | VGG Administration" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" suppressHydrationWarning><body className={inter.variable} suppressHydrationWarning>{children}</body></html>;
}
