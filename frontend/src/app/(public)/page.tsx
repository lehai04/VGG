/**
 * Trang chủ `/`.
 * Chỉ ghép thứ tự section — sửa nội dung trong components/home hoặc ProgrammeFinder.
 * Style: app/home.css (class .home-page).
 */
import {
  Admissions,
  Footer,
  Header,
  Hero,
  ProgrammeCatalog,
  Programmes,
  Research,
  ResourcesConsultation,
  StudentSuccess,
} from "@/features/home/components";
import { ScrollReveal } from "@/features/home/components/ScrollReveal";
import ProgrammeSearch from "@/features/programmes/components/ProgrammeSearch";
export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <ScrollReveal />
      {/* Header homepage: mega menu, trên mobile mở bằng nút MENU */}
      <Header />
      <Hero />
      {/* Bộ lọc chương trình dùng chung với /programmes */}
      <ProgrammeSearch />
      <Programmes />
      <Research />
      <ProgrammeCatalog />
      <Admissions />
      <StudentSuccess />
      {/* Form POST tới /api/consultations */}
      <ResourcesConsultation />
      <Footer />
    </main>
  );
}
