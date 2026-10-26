/**
 * Trang chủ `/`.
 * Chỉ ghép thứ tự section — sửa nội dung trong components/home hoặc ProgrammeFinder.
 * Style: app/home.css (class .home-page).
 */
import {
  Footer,
  Header,
  Hero,
  News,
  ProgrammeCatalog,
  Programmes,
  Research,
  ResourcesConsultation,
} from "@/features/home/components";
import { ScrollReveal } from "@/features/home/components/ScrollReveal";
import ProgrammeSearch from "@/features/programmes/components/ProgrammeSearch";
import { websiteContent, websiteLayout } from '@/lib/website-content';
import {CmsPageSections,CmsSlot} from '@/shared/components/CmsPageSections';
import { homeContent } from '@/data/home-content';
export default async function Home() {
  const content = await websiteContent('home', homeContent);
  const layout=await websiteLayout('home');
  return (
    <main id="main-content" className="home-page">
      <ScrollReveal />
      {/* Header dùng liên kết trực tiếp; mobile mở bằng nút MENU */}
      <Header />
      <CmsPageSections layout={layout}>
      <CmsSlot slot="hero"><Hero /></CmsSlot>
      {/* Bộ lọc chương trình dùng chung với /programmes */}
      <CmsSlot slot="search"><ProgrammeSearch content={content.programmeSearch} /></CmsSlot>
      <CmsSlot slot="overview"><Programmes /></CmsSlot>
      <CmsSlot slot="research"><Research /></CmsSlot>
      <CmsSlot slot="programmes"><ProgrammeCatalog /></CmsSlot>
      {/* Năm bài viết đã xuất bản gần nhất từ CMS */}
      <CmsSlot slot="news"><News /></CmsSlot>
      {/* Form POST tới /api/consultations */}
      <CmsSlot slot="consultation"><ResourcesConsultation /></CmsSlot>
      </CmsPageSections>
      <Footer />
    </main>
  );
}
