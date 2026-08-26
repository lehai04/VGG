/**
 * Root layout — bọc mọi page.
 * - Dùng bộ font sans-serif toàn hệ thống từ globals.css
 * - Metadata mặc định (SEO); page con ghi đè title/description
 * - StickyActions (AI / Facebook / Zalo / Apply) hiện trên mọi trang
 */
import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import "./globals.css";
import "./home.css";
import { StickyActions } from "@/shared/components/layout/SiteFooter";
import { LocaleProvider } from "@/i18n/components/LocaleProvider";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { VisitTracker } from "@/shared/analytics/components/VisitTracker";

const inter = localFont({ src: "./fonts/Inter-Variable.ttf", weight: "400 700", display: "swap", variable: "--font-inter" });

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
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <VisitTracker />
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
