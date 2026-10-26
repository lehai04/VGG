/**
 * Root layout — bọc mọi page.
 * - Dùng bộ font sans-serif toàn hệ thống từ globals.css
 * - Metadata mặc định (SEO); page con ghi đè title/description
 * - StickyActions (Facebook / Zalo / Apply) hiện trên mọi trang
 */
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./home.css";
import "../../../shared/styles/typography.css";
import "./content-format.css";
import { StickyActions } from "@/shared/components/layout/SiteFooter";
import { LocaleProvider } from "@/i18n/components/LocaleProvider";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { VisitTracker } from "@/shared/analytics/components/VisitTracker";
import { CmsVisualBridge } from "@/shared/components/CmsVisualBridge";
import { metadataForPageSeo, requestPageSeo } from "@/lib/page-seo";
import { websiteContent, websitePreviewStatus, websiteProgrammes } from '@/lib/website-content';
import viMessages from '@/messages/vi.json';
import enMessages from '@/messages/en.json';
import { chromeContent } from '@/data/chrome-content';
import { WebsiteChromeProvider } from '@/shared/components/layout/WebsiteChromeProvider';
import { programmes } from '@/data/programmes';
import { programmes as defaultProgrammeOptions } from '@/data/site';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Metadata nền tảng được mọi route kế thừa; từng page chỉ cần ghi đè title/description riêng.
const baseMetadata: Metadata = {
  metadataBase: new URL(process.env.PUBLIC_APP_URL || "https://vgg.vlu.edu.vn"),
  title: {
    default: "Viện Sau Đại học Văn Lang",
    template: "%s | Viện Sau Đại học",
  },
  description: "Cổng thông tin Viện Sau Đại học, Trường Đại học Văn Lang.",
  applicationName: "Van Lang Global Graduate",
  keywords: ["Viện Sau Đại học", "Văn Lang", "sau đại học", "thạc sĩ", "tiến sĩ"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Van Lang Global Graduate",
    title: "Viện Sau Đại học Văn Lang",
    description:
      "Cổng thông tin chương trình sau đại học, tuyển sinh, nghiên cứu và dịch vụ người học Viện Sau Đại học.",
  },
  twitter: {
    card: "summary",
    title: "Viện Sau Đại học Văn Lang",
    description:
      "Cổng thông tin chương trình sau đại học, tuyển sinh, nghiên cứu và dịch vụ người học Viện Sau Đại học.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale, routePath, seo } = await requestPageSeo();
  return {
    ...baseMetadata,
    ...metadataForPageSeo(seo, locale),
    alternates: {
      canonical: seo.canonicalUrl || `/${locale}${routePath}`,
      ...(seo.hreflang && Object.keys(seo.hreflang).length ? { languages: seo.hreflang } : {}),
    },
  };
}

async function PageSeoJsonLd() {
  const { routePath, seo } = await requestPageSeo();
  if (!seo.customJsonLd || routePath.startsWith("/news/")) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(seo.customJsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-vgg-locale");
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const messages = await websiteContent(`shared:${locale}`, locale === 'en' ? enMessages : viMessages);
  const chrome = await websiteContent('chrome', chromeContent);
  const resolvedProgrammes=await websiteProgrammes();
  const labels = new Map(programmes.map(programme=>[programme.title,resolvedProgrammes.find(item=>item.id===programme.id)?.title??programme.title]));
  const programmeOptions = [...defaultProgrammeOptions.filter(title => !programmes.some(source => source.title === title && !resolvedProgrammes.some(item => item.id === source.id))).map(title => labels.get(title) ?? title),...resolvedProgrammes.filter(item=>!programmes.some(source=>source.id===item.id)).map(item=>item.title)];
  const preview = await websitePreviewStatus();
  return (
    // Trình duyệt/extension có thể chèn thuộc tính vào html hoặc body trước hydration.
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {preview && !preview.editor && <aside role="status" style={{ padding: '12px 20px', background: '#fff0d1', color: '#553300', position: 'relative', zIndex: 9999 }}>{preview.valid ? 'BẢN XEM TRƯỚC · Nội dung này chưa được xuất bản.' : 'Bản xem trước đã hết hạn hoặc không đúng trang. Đang hiển thị nội dung công khai.'}</aside>}
        {!preview && <VisitTracker />}
        {preview?.editor && <CmsVisualBridge context={preview.editor} />}
        <a className="skip-link" href="#main-content">
          Bỏ qua điều hướng
        </a>
        <LocaleProvider locale={locale} messages={messages}>
          <WebsiteChromeProvider value={{ ...chrome, programmeOptions }}>
          <PageSeoJsonLd />
          {children}
          <StickyActions />
          </WebsiteChromeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
