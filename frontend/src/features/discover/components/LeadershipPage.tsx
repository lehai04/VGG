import Image from "next/image";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { DiscoverMore } from "@/features/discover/components/DiscoverMore";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { LeadershipFloatingGuard } from "./LeadershipFloatingGuard";
import styles from "./LeadershipPage.module.css";

const leadershipProfiles = [
  {
    name: "PGS.TS. NGUYỄN VĂN THÀNH",
    title: "Phó Viện Trưởng phụ trách Viện Sau Đại học\nTrường Đại học Văn Lang",
    quote: "Tại Trường Đại học Văn Lang, chúng tôi tin rằng giá trị lớn nhất của đào tạo sau đại học không chỉ nằm ở văn bằng, mà ở sự trưởng thành của người học. Đó là những con người có tư duy chiến lược; biết kết nối tri thức với công nghệ, dữ liệu và đổi mới sáng tạo; có năng lực nghiên cứu, phản biện và ra quyết định dựa trên bằng chứng; đồng thời tạo ra giá trị mới cho tổ chức và cộng đồng.",
    image: "/images/pages/discover/leadership/thay2.png",
  },
] as const;

export interface DepartmentLeader {
  id: string;
  name: string;
  role: string;
  image?: string;
}
/* Thêm thông tin lãnh đạo */
const departmentHeads: DepartmentLeader[] = [
  {
    id: "tuyen-sinh-truyen-thong",
    name: "Đang cập nhật",
    role: "Trưởng bộ phận tuyển sinh và truyền thông",
    image: "/images/pages/discover/leadership/Lanh đạo 2.png",
  },
  {
    id: "cham-soc-hoc-vien",
    name: "Đang cập nhật",
    role: "Trưởng bộ phận chăm sóc học viên",
    image: "/images/pages/discover/leadership/Lanh đạo 2.png",
  },
  {
    id: "dao-tao-thac-si",
    name: "Đang cập nhật",
    role: "Trưởng bộ phận phụ trách chương trình Đào tạo Thạc sĩ",
    image: "/images/pages/discover/leadership/Lanh đạo 2.png",
  },
  {
    id: "dao-tao-tien-si",
    name: "Đang cập nhật",
    role: "Trưởng bộ phận phụ trách chương trình Đào tạo Tiến sĩ",
    image: "/images/pages/discover/leadership/Lanh đạo 2.png",
  },
  {
    id: "crm-he-thong",
    name: "Đang cập nhật",
    role: "Trưởng bộ phận phụ trách CRM và Hệ thống",
    image: "/images/pages/discover/leadership/Lanh đạo 2.png",
  },
];

export function LeadershipPage() {
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <RevealOnScroll />
      <LeadershipFloatingGuard />
      <SiteHeader compact />

      {/* Hero giữ nguyên ngôn ngữ hình ảnh của nhóm trang Discover hiện tại. */}
      <section className={styles.hero} aria-labelledby="leadership-title">
        <Image src="/images/pages/discover/content/campus.jpg" alt="Khuôn viên Trường Đại học Văn Lang" fill priority sizes="100vw" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroTitle}>
          <p>DISCOVER Viện Sau Đại học · 03</p>
          <h1 id="leadership-title">Lãnh đạo</h1>
          <span>Leadership</span>
        </div>
      </section>

      {/* Lãnh đạo viện phụ trách chung */}
      <div className={styles.profileList}>
        {leadershipProfiles.map((profile, index) => (
          <section className={styles.leaderProfile} aria-labelledby={`leader-profile-${index}`} key={profile.name}>
            <div className={styles.profileCopy} data-reveal>
              <h2 id={`leader-profile-${index}`}>{profile.name}</h2>
              <p>{profile.title}</p>
              <blockquote>“{profile.quote}”</blockquote>
            </div>
            <figure className={styles.profileImage} data-leadership-portrait data-reveal>
              <Image
                src={profile.image}
                alt={`Chân dung ${profile.name}`}
                fill
                quality={95}
                sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 520px, (max-width: 1280px) 44vw, 620px"
              />
            </figure>
          </section>
        ))}
      </div>

      {/* KHỐI TRƯỞNG CÁC BỘ PHẬN CHUYÊN TRÁCH (5 VỊ TRÍ) */}
      <section className={styles.deptSection} aria-labelledby="dept-leadership-title">
        <div className={styles.deptContainer}>
          <div className={styles.deptHeader} data-reveal>
            <span className={styles.deptEyebrow}>BAN ĐIỀU HÀNH & QUẢN LÝ CHUYÊN TRÁCH</span>
            <h2 id="dept-leadership-title">Trưởng các bộ phận Viện Sau Đại học</h2>
            <p>
              Đội ngũ phụ trách các mảng công tác trọng tâm đồng hành và hỗ trợ toàn diện cho học viên,
              nghiên cứu sinh trong suốt quá trình đào tạo và phát triển học thuật.
            </p>
          </div>

          <div className={styles.deptGrid}>
            {departmentHeads.map((leader) => (
              <article className={styles.deptCard} key={leader.id} data-reveal>
                <div className={styles.deptPhotoSlot}>
                  {leader.image ? (
                    <Image
                      src={leader.image}
                      alt={`Chân dung ${leader.name} - ${leader.role}`}
                      fill
                      quality={90}
                      sizes="(max-width: 680px) 50vw, (max-width: 1280px) 25vw, 20vw"
                    />
                  ) : (
                    <div className={styles.photoPlaceholder} title="Vị trí hình ảnh chân dung">
                      <svg
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.avatarSvg}
                      >
                        <circle cx="40" cy="40" r="38" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                        <path
                          d="M40 42C45.5228 42 50 37.5228 50 32C50 26.4772 45.5228 22 40 22C34.4772 22 30 26.4772 30 32C30 37.5228 34.4772 42 40 42Z"
                          fill="#94a3b8"
                        />
                        <path
                          d="M23 58C23 50.8203 30.6112 47 40 47C49.3888 47 57 50.8203 57 58C57 59.1046 56.1046 60 55 60H25C23.8954 60 23 59.1046 23 58Z"
                          fill="#94a3b8"
                        />
                      </svg>
                      <span className={styles.photoUploadHint}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                        Ảnh chân dung
                      </span>
                    </div>
                  )}
                </div>

                <div className={styles.deptCardInfo}>
                  <h3 className={styles.deptCardName}>{leader.name}</h3>
                  <p className={styles.deptCardRole}>{leader.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DiscoverMore activeSlug="lanh-dao" />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
