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
export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <ScrollReveal />
      {/* Header dùng liên kết trực tiếp; mobile mở bằng nút MENU */}
      <Header />
      <Hero />
      {/* Bộ lọc chương trình dùng chung với /programmes */}
      <ProgrammeSearch />
      <Programmes />
      <Research />
      <ProgrammeCatalog />
      {/* Năm bài viết đã xuất bản gần nhất từ CMS */}
      <News />
      {/* Form POST tới /api/consultations */}
      <ResourcesConsultation />
      <Footer />
    </main>
  );
}
