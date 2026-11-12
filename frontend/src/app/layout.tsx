import "../../../shared/styles/cms-rich-content.css";
import { publicSiteOrigin } from "@/lib/public-site";
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
import "./content-format.css";
import "./banner-layout.css";
import "./motion.css";
import "./typography.css";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { StickyActions } from "@/shared/components/layout/SiteFooter";
import { LocaleProvider } from "@/i18n/components/LocaleProvider";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { VisitTracker } from "@/shared/analytics/components/VisitTracker";
import { metadataForPageSeo, requestPageSeo } from "@/lib/page-seo";
import { websiteContent, websiteProgrammes } from '@/lib/website-content';
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
  metadataBase: new URL(publicSiteOrigin()),
  title: {
    default: "Viện Sau đại học Văn Lang",
    template: "%s | Viện Sau đại học",
  },
  description: "Cổng thông tin Viện Sau đại học, Trường Đại học Văn Lang.",
  applicationName: "Viện Sau đại học",
  keywords: ["Viện Sau đại học", "Văn Lang", "sau đại học", "Thạc sĩ", "Tiến sĩ"],
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
    siteName: "Viện Sau đại học",
    title: "Viện Sau đại học Văn Lang",
    description:
      "Cổng thông tin chương trình sau đại học, tuyển sinh, nghiên cứu và dịch vụ người học Viện Sau đại học.",
  },
  twitter: {
    card: "summary",
    title: "Viện Sau đại học Văn Lang",
    description:
      "Cổng thông tin chương trình sau đại học, tuyển sinh, nghiên cứu và dịch vụ người học Viện Sau đại học.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale, routePath, seo } = await requestPageSeo();
  const englishTitle = "Van Lang Institute of Postgraduate Education";
  const englishDescription = "Postgraduate programs, admissions, research and student services at Van Lang University.";
  const languageMetadata: Metadata = locale === "en" ? {
    title: { default: englishTitle, template: "%s | Institute of Postgraduate Education" },
    description: englishDescription,
    applicationName: englishTitle,
    keywords: ["Van Lang University", "postgraduate education", "master’s programs", "doctoral programs"],
    openGraph: { type: "website", locale: "en_US", siteName: englishTitle, title: englishTitle, description: englishDescription },
    twitter: { card: "summary", title: englishTitle, description: englishDescription },
  } : {};
  const alternatePath = routePath === "/" ? "" : routePath;
  return {
    ...baseMetadata,
    ...languageMetadata,
    ...metadataForPageSeo(seo, locale),
    alternates: {
      canonical: seo.canonicalUrl || `/${locale}${routePath}`,
      languages: seo.hreflang && Object.keys(seo.hreflang).length ? seo.hreflang : {
        vi: `/vi${alternatePath}`,
        en: `/en${alternatePath}`,
      },
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
  return (
    // Trình duyệt/extension có thể chèn thuộc tính vào html hoặc body trước hydration.
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <VisitTracker />
        <a className="skip-link" href="#main-content">
          {locale === "en" ? "Skip navigation" : "Bỏ qua điều hướng"}
        </a>
        <LocaleProvider locale={locale} messages={messages}>
          <WebsiteChromeProvider value={{ ...chrome, programmeOptions }}>
          <PageSeoJsonLd />
          <RevealOnScroll />
          {children}
          <StickyActions />
          </WebsiteChromeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
