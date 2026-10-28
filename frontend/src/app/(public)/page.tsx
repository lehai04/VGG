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
import {ContentPageSections,ContentSlot} from '@/shared/components/ContentPageSections';
import { homeContent } from '@/data/home-content';
export default async function Home() {
  const content = await websiteContent('home', homeContent);
  const layout=await websiteLayout('home');
  return (
    <main id="main-content" className="home-page">
      <ScrollReveal />
      {/* Header dùng liên kết trực tiếp; mobile mở bằng nút MENU */}
      <Header />
      <ContentPageSections layout={layout}>
      <ContentSlot slot="hero"><Hero /></ContentSlot>
      {/* Bộ lọc chương trình dùng chung với /programmes */}
      <ContentSlot slot="search"><ProgrammeSearch content={content.programmeSearch} /></ContentSlot>
      <ContentSlot slot="overview"><Programmes /></ContentSlot>
      <ContentSlot slot="research"><Research /></ContentSlot>
      <ContentSlot slot="programmes"><ProgrammeCatalog /></ContentSlot>
      {/* Năm bài viết đã xuất bản gần nhất từ content */}
      <ContentSlot slot="news"><News /></ContentSlot>
      {/* Form POST tới /api/consultations */}
      <ContentSlot slot="consultation"><ResourcesConsultation /></ContentSlot>
      </ContentPageSections>
      <Footer />
    </main>
  );
}
