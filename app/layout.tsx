import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./home.css";
import { StickyActions } from "@/components/layout/SiteFooter";

const maisonNeue = localFont({
  variable: "--font-maison-neue",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  src: [
    { path: "./fonts/MaisonNeue-Book.otf", weight: "400", style: "normal" },
    { path: "./fonts/MaisonNeue-BookItalic.otf", weight: "400", style: "italic" },
    { path: "./fonts/MaisonNeue-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/MaisonNeue-Demi.otf", weight: "600", style: "normal" },
    { path: "./fonts/MaisonNeue-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/MaisonNeue-BoldItalic.otf", weight: "700", style: "italic" },
  ],
});

// Metadata nền tảng được mọi route kế thừa; từng page chỉ cần ghi đè title/description riêng.
export const metadata: Metadata = {
  metadataBase: new URL("https://vgg.vlu.edu.vn"),
  title: {
    default: "VGG – Viện Sau đại học Văn Lang",
    template: "%s | VGG",
  },
  description:
    "Cổng thông tin Van Lang Global Graduate (VGG) – Viện Sau đại học, Trường Đại học Văn Lang.",
  applicationName: "Van Lang Global Graduate",
  keywords: ["VGG", "Văn Lang", "sau đại học", "thạc sĩ", "tiến sĩ"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Van Lang Global Graduate",
    title: "VGG – Viện Sau đại học Văn Lang",
    description:
      "Cổng thông tin chương trình sau đại học, tuyển sinh, nghiên cứu và dịch vụ học viên VGG.",
  },
  twitter: {
    card: "summary",
    title: "VGG – Viện Sau đại học Văn Lang",
    description:
      "Cổng thông tin chương trình sau đại học, tuyển sinh, nghiên cứu và dịch vụ học viên VGG.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Trình duyệt/extension có thể chèn thuộc tính vào html hoặc body trước hydration.
    <html lang="vi" suppressHydrationWarning>
      <body className={`${maisonNeue.variable} antialiased`} suppressHydrationWarning>
        <a className="skip-link" href="#main-content">
          Bỏ qua điều hướng
        </a>
        {children}
        <StickyActions />
      </body>
    </html>
  );
}
