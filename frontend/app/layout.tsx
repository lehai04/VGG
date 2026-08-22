/**
 * Root layout — bọc mọi page.
 * - Nạp font Maison Neue (file trong app/fonts), gán CSS variable --font-maison-neue
 * - Metadata mặc định (SEO); page con ghi đè title/description
 * - StickyActions (AI / Facebook / Zalo / Apply) hiện trên mọi trang
 */
import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import "./globals.css";
import "./home.css";
import { StickyActions } from "@/components/layout/SiteFooter";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { defaultLocale, isLocale } from "@/lib/i18n";

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
const baseMetadata: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-vgg-locale");
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const localizedPath = requestHeaders.get("x-vgg-pathname") ?? `/${locale}`;
  const routePath = localizedPath.replace(/^\/(vi|en)/, "") || "";
  return {
    ...baseMetadata,
    alternates: {
      canonical: `/${locale}${routePath}`,
      languages: { vi: `/vi${routePath}`, en: `/en${routePath}`, "x-default": `/vi${routePath}` },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-vgg-locale");
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  return (
    // Trình duyệt/extension có thể chèn thuộc tính vào html hoặc body trước hydration.
    <html lang={locale} suppressHydrationWarning>
      <body className={`${maisonNeue.variable} antialiased`} suppressHydrationWarning>
        <a className="skip-link" href="#main-content">
          Bỏ qua điều hướng
        </a>
        <LocaleProvider locale={locale}>
          {children}
          <StickyActions />
        </LocaleProvider>
      </body>
    </html>
  );
}
