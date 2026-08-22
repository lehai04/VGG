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
  News,
  ProgrammeCatalog,
  Programmes,
  Research,
  ResourcesConsultation,
  StudentSuccess,
} from "@/components/home";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import ProgrammeSearch from "@/components/sections/ProgrammeSearch";
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
      <News />
      {/* Form POST tới /api/consultations */}
      <ResourcesConsultation />
      <Footer />
    </main>
  );
}
