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

/** PAGE LỚN: Trang chủ (/). File này chỉ ghép thứ tự các section trong components/home. */
export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <ScrollReveal />
      <Header />
      <Hero />
      <Programmes />
      <Research />
      <ProgrammeCatalog />
      <Admissions />
      <StudentSuccess />
      <News />
      <ResourcesConsultation />
      <Footer />
    </main>
  );
}
