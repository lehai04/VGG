// Curated industry illustrations. Original academic content is left intact.
import type { Programme } from "../programmes";
export const programmeImageLibrary = {
  laboratory: {
    src: "/images/programme-library/laboratory.jpg",
    alt: "Thao tác phân tích mẫu trong phòng thí nghiệm",
    source: "https://unsplash.com/photos/a-scientist-is-working-in-a-laboratory-476mHdnj8dM",
  },
  energyLab: {
    src: "/images/programme-library/energyLab.jpg",
    alt: "Nhà nghiên cứu làm việc trong phòng thí nghiệm năng lượng",
    source: "https://unsplash.com/photos/scientist-using-laptop-in-laboratory-8yS04veb1TQ",
  },
  logistics: {
    src: "/images/programme-library/logistics.jpg",
    alt: "Container hàng hóa tại cảng logistics",
    source: "https://unsplash.com/photos/stacks-of-shipping-containers-at-a-port-2mnOE-OPn-k",
  },
  law: {
    src: "/images/programme-library/law.jpg",
    alt: "Không gian thư viện và tài liệu pháp luật",
    source: "https://unsplash.com/photos/a-library-with-books-on-shelves-3K6Qcxm6Jig",
  },
  hotel: {
    src: "/images/programme-library/hotel.jpg",
    alt: "Không gian sảnh và dịch vụ khách sạn",
    source: "https://unsplash.com/photos/empty-hotel-lobby-FPS7a7XQZ0w",
  },
  accounting: {
    src: "/images/programme-library/accounting.jpg",
    alt: "Đối chiếu chứng từ và tính toán kế toán",
    source:
      "https://unsplash.com/photos/person-reviewing-documents-with-calculator-and-laptop-0oZpRxG5Hkk",
  },
  marketing: {
    src: "/images/programme-library/marketing.jpg",
    alt: "Nhóm chuyên môn trao đổi chiến dịch marketing",
    source: "https://unsplash.com/photos/three-men-using-macbooks-_S7-KX8geL0",
  },
  forest: {
    src: "/images/programme-library/forest.jpg",
    alt: "Hệ sinh thái rừng và dòng sông nhìn từ trên cao",
    source:
      "https://unsplash.com/photos/an-aerial-view-of-a-river-running-through-a-forest-1oEnl6GQxWE",
  },
  automotive: {
    src: "/images/programme-library/automotive.jpg",
    alt: "Kỹ thuật viên kiểm tra ô tô trong xưởng",
    source:
      "https://unsplash.com/photos/mechanic-working-on-a-car-engine-in-a-workshop-XP8o9_Arwqg",
  },
  art: {
    src: "/images/programme-library/art.jpg",
    alt: "Nghệ sĩ thực hành hội họa trong xưởng sáng tạo",
    source:
      "https://unsplash.com/photos/artist-paints-on-canvas-in-a-light-filled-studio-eD8AGdTTlQc",
  },
  communication: {
    src: "/images/programme-library/communication.jpg",
    alt: "Micro phục vụ sự kiện và truyền thông",
    source:
      "https://unsplash.com/photos/a-microphone-stands-on-a-stand-in-an-empty-room-Wce1i00U8eM",
  },
  coding: {
    src: "/images/programme-library/coding.jpg",
    alt: "Mã nguồn trên màn hình máy tính",
    source:
      "https://unsplash.com/photos/computer-screen-displaying-code-and-terminal-output-fmH6yLBwEPw",
  },
  architecture: {
    src: "/images/programme-library/architecture.jpg",
    alt: "Bản vẽ kiến trúc và dụng cụ thiết kế",
    source: "https://unsplash.com/photos/architectural-blueprints-with-drafting-tools-Yn8D5B8C-eY",
  },
  tourism: {
    src: "/images/programme-library/tourism.jpg",
    alt: "Trao đổi kế hoạch hành trình trên bản đồ",
    source:
      "https://unsplash.com/photos/two-women-planning-a-journey-pointing-at-a-detailed-map-FkSchPMHSBg",
  },
  classroom: {
    src: "/images/programme-library/classroom.jpg",
    alt: "Người học đọc tài liệu trong lớp học",
    source: "https://unsplash.com/photos/students-reading-textbooks-in-classroom-BCBGahg0MH0",
  },
  gallery: {
    src: "/images/programme-library/gallery.jpg",
    alt: "Trưng bày tác phẩm trong không gian mỹ thuật",
    source:
      "https://unsplash.com/photos/art-gallery-interior-with-paintings-and-seating-EzfHCR-0bGo",
  },
  construction: {
    src: "/images/programme-library/construction.jpg",
    alt: "Kỹ sư trao đổi tại công trình xây dựng",
    source:
      "https://unsplash.com/photos/construction-workers-review-plans-at-a-job-site-qjxlAZYkGpU",
  },
  finance: {
    src: "/images/programme-library/finance.jpg",
    alt: "Bảng dữ liệu thị trường tài chính",
    source:
      "https://unsplash.com/photos/financial-stock-market-data-displayed-on-a-screen-EuIqk6LpUU0",
  },
  water: {
    src: "/images/programme-library/water.jpg",
    alt: "Cơ sở xử lý nước nhìn từ trên cao",
    source:
      "https://unsplash.com/photos/aerial-view-of-a-water-treatment-plant-with-surrounding-fields-T-q7fVaJgHA",
  },
  commerce: {
    src: "/images/programme-library/commerce.jpg",
    alt: "Hoạt động kinh doanh bán lẻ",
    source: "https://unsplash.com/photos/woman-shopping-for-clothes-in-a-boutique-WUXaLGUkNs8",
  },
  management: {
    src: "/images/programme-library/management.jpg",
    alt: "Nhóm quản lý phân tích số liệu kinh doanh",
    source:
      "https://unsplash.com/photos/team-discussing-charts-during-a-business-meeting-3B5Hf9_PLpU",
  },
} as const;
export const programmeImageSelections = {
  "cong-nghe-thong-tin": ["coding", "management", "coding"],
  marketing: ["marketing", "management", "commerce"],
  "khoa-hoc-moi-truong": ["energyLab", "forest", "water"],
  "ky-thuat-moi-truong": ["water", "energyLab", "construction"],
  "quan-ly-tai-nguyen-moi-truong": ["forest", "water", "energyLab"],
  "cong-nghe-sinh-hoc": ["laboratory", "energyLab", "classroom"],
  "ky-thuat-xay-dung": ["construction", "architecture", "construction"],
  "ky-thuat-o-to": ["automotive", "coding", "automotive"],
  "quan-tri-kinh-doanh": ["management", "marketing", "accounting"],
  "kinh-doanh-thuong-mai": ["commerce", "logistics", "management"],
  "tai-chinh-ngan-hang": ["finance", "accounting", "management"],
  "ke-toan": ["accounting", "finance", "management"],
  logistics: ["logistics", "management", "commerce"],
  "quan-tri-du-lich": ["tourism", "hotel", "management"],
  "quan-tri-khach-san": ["hotel", "tourism", "management"],
  "luat-kinh-te": ["law", "management", "accounting"],
  "quan-he-cong-chung": ["communication", "marketing", "management"],
  "ngon-ngu-anh": ["classroom", "law", "communication"],
  "kien-truc": ["architecture", "construction", "gallery"],
  "my-thuat-ung-dung": ["art", "gallery", "architecture"],
  "ly-luan-lich-su-my-thuat": ["gallery", "art", "classroom"],
} as const;

const programmePhotos: Record<string, {
  folder: string;
  hero?: string;
  overview?: { filename: string; alt: string };
  audience?: Record<string, string>;
  audienceFolder?: string;
  audienceIllustration?: string;
  career?: string;
}> = {
  "cong-nghe-thong-tin": {
    folder: "Cong-nghe_thong_tin",
    hero: "hero-quality-20261120.webp",
    overview: { filename: "overview-quality-20261120.webp", alt: "Thực hành và nghiên cứu Công nghệ Thông tin trong phòng máy tại Văn Lang" },
    audience: {
      "Người có nền tảng CNTT": "Người có nền tảng CNTT.jpg",
      "Người tốt nghiệp ngành gần": "Người tốt nghiệp ngành gần.jpg",
      "Người hướng đến nghiên cứu": "Người hướng đến nghiên cứu.jpg",
    },
    career: "career-quality-20261120.webp",
  },
  "ke-toan": {
    folder: "Ke_toan",
    overview: { filename: "overview-quality-20261120.webp", alt: "Giảng dạy và thực hành kế toán trên máy tính tại Văn Lang" },
    hero: "hero-quality-20261120.webp",
    audience: {
      "Người đang làm kế toán, kiểm toán": "People working in accounting and auditing.jpg",
      "Người làm tài chính, kiểm soát và quản trị": "Finance, control and management professionals.jpg",
      "Người muốn phát triển chuyên môn sâu": "People who want to develop deep expertise.jpg",
    },
    career: "career-quality-20261120.webp",
  },
  "khoa-hoc-moi-truong": {
    folder: "Khoa_hoc_moi_truong",
    hero: "hero-hd-20261119.webp",
    overview: { filename: "Định hướng đào tạo.jpg", alt: "Minh họa định hướng đào tạo Khoa học Môi trường" },
    audience: {
      "Năng lực chuyên môn": "Năng lực chuyên môn.jpg",
      "Nghiên cứu và ra quyết định": "Nghiên cứu và ra quyết định.jpg",
      "Hợp tác và truyền đạt tri thức": "Hợp tác và truyền đạt tri thức.jpg",
    },
    career: "Cơ hội nghề nghiệp và phát triển.jpg",
  },
  "ky-thuat-moi-truong": {
    folder: "Ky_thuat_moi_truong",
    hero: "hero-quality-20261120.webp",
    overview: { filename: "Tổng quan.jpg", alt: "Minh họa tổng quan ngành Kỹ thuật Môi trường" },
    audience: {
      "Người làm kỹ thuật và công nghệ môi trường": "Người làm kỹ thuật và công nghệ môi trường.jpg",
      "Người làm tư vấn và quản lý môi trường": "Người làm tư vấn và quản lý môi trường.jpg",
      "Người theo đuổi nghiên cứu chuyên sâu": "Người theo đuổi nghiên cứu chuyên sâu.jpg",
    },
    career: "career-quality-20261120.webp",
  },
  "kien-truc": {
    folder: "Kien_truc",
    overview: { filename: "overview-quality-20261120.webp", alt: "Thực hành nghiên cứu và phát triển ý tưởng kiến trúc tại Văn Lang" },
    hero: "hero.jpg",
    audience: {
      "Kiến trúc sư và người làm thiết kế": "Kiến trúc sư và người làm thiết kế.jpg",
      "Người làm tư vấn và quản lý dự án": "Người làm tư vấn và quản lý dự án.jpg",
      "Người quan tâm nghiên cứu và phát triển chuyên môn": "Người quan tâm nghiên cứu và phát triển chuyên môn.jpg",
    },
    career: "career-quality-20261120.webp",
  },
  logistics: {
    folder: "Logistics",
    career: "career-quality-20261120.webp",
    hero: "hero-quality-20261120.webp",
    overview: { filename: "overview-quality-20261120.webp", alt: "Trao đổi kiến thức chuyên môn Logistics và Quản lý chuỗi cung ứng" },
    audience: {
      "Người làm vận hành logistics và chuỗi cung ứng": "Người làm vận hành logistics và chuỗi cung ứng.jpg",
      "Người tham gia phân tích và cải tiến hệ thống": "Người tham gia phân tích và cải tiến hệ thống.jpg",
      "Người định hướng nghiên cứu chuyên sâu": "Người định hướng nghiên cứu chuyên sâu.jpg",
    },
  },
  "ky-thuat-xay-dung": {
    folder: "Ky_thuat_xay_dung",
    hero: "hero-quality-20261120.webp",
    overview: { filename: "overview-quality-20261120.webp", alt: "Thực hành đọc bản vẽ và kỹ thuật xây dựng tại Văn Lang" },
    audience: {
      "Năng lực chuyên môn": "Năng lực chuyên môn.jpg",
      "Nghiên cứu và ra quyết định": "Nghiên cứu và ra quyết định.png",
      "Hợp tác và truyền đạt tri thức": "Hợp tác và truyền đạt tri thức.jpg",
    },
    career: "career-quality-20261120.webp",
  },
  "my-thuat-ung-dung": {
    folder: "My_thuat_ung_dung",
    hero: "hero-quality-20261120.webp",
    overview: { filename: "tổng quan.jpg", alt: "Minh họa tổng quan ngành Mỹ thuật ứng dụng" },
    audience: {
      "Nhà thiết kế & chuyên gia sáng tạo": "Nhà thiết kế & chuyên gia sáng tạo.jpg",
      "Người làm việc trong ngành sáng tạo": "Người làm việc trong ngành sáng tạo.jpg",
      "Người định hướng giảng dạy hoặc khởi nghiệp": "Người định hướng giảng dạy hoặc khởi nghiệp.jpg",
    },
    career: "career-quality-20261120.webp",
  },
  "ly-luan-lich-su-my-thuat": {
    folder: "Ly_luan_va_lich_su_MTUD",
    hero: "hero-hd-20261120.webp",
    overview: { filename: "Tổng quan.jpg", alt: "Minh họa tổng quan ngành Lý luận và Lịch sử Mỹ thuật ứng dụng" },
    career: "career-quality-20261120.webp",
    audienceFolder: "My_thuat_ung_dung",
    audience: {
      "Người làm việc trong thiết kế": "Người làm việc trong thiết kế.avif",
      "Người quan tâm nghiên cứu mỹ thuật ứng dụng": "Người quan tâm nghiên cứu mỹ thuật ứng dụng.avif",
      "Người định hướng giảng dạy và đào tạo": "Người định hướng giảng dạy và đào tạo.avif",
    },
  },
  "ky-thuat-o-to": {
    folder: "Ky_thuat_o_to",
    career: "career-quality-20261120.webp",
    overview: { filename: "overview-quality-20261120.webp", alt: "Thực hành kỹ thuật điều khiển và thiết bị tại Văn Lang" },
    hero: "hero-quality-20261120.webp",
    audience: {
      "Người làm kỹ thuật và công nghệ ô tô": "Người làm kỹ thuật và công nghệ ô tô.jpg",
      "Người hướng đến quản lý kỹ thuật": "Người hướng đến quản lý kỹ thuật.jpg",
      "Người quan tâm nghiên cứu và R&D": "Người quan tâm nghiên cứu và R&D.jpg",
    },
  },
  marketing: {
    folder: "Marketting",
    overview: { filename: "overview-quality-20261120.webp", alt: "Trao đổi chuyên môn và hoạt động học thuật tại Văn Lang" },
    hero: "hero-quality-20261120.webp",
    audience: {
      "Người làm Marketing và kinh doanh": "Người làm Marketing và kinh doanh.jpg",
      "Người hướng đến tư vấn và khởi nghiệp": "Người hướng đến tư vấn và khởi nghiệp.png",
      "Người theo đuổi nghiên cứu và giảng dạy": "Người theo đuổi nghiên cứu và giảng dạy-20261119.webp",
    },
    career: "career-hd-20261119.webp",
  },
  "luat-kinh-te": {
    folder: "Luat_kinh_te",
    hero: "hero.jpg",
    audience: {
      "Nhóm ngành Luật": "audience-law-quality-20261120.webp",
      "Nhóm ngành phù hợp khác": "Nhóm ngành phù hợp khác.jpg",
    },
    career: "career-quality-20261120.webp",
  },
  "cong-nghe-sinh-hoc": {
    folder: "Cong_nghe_sinh_hoc",
    career: "career-quality-20261120.webp",
    overview: { filename: "overview-quality-20261120.webp", alt: "Thiết bị và thực hành phân tích mẫu trong phòng thí nghiệm Văn Lang" },
    hero: "hero-quality-20261120.webp",
    audience: {
      "Người muốn đi sâu vào nghiên cứu": "Người muốn đi sâu vào nghiên cứu.avif",
      "Người làm việc trong lĩnh vực liên quan": "Người làm việc trong lĩnh vực liên quan.jpg",
      "Người hướng đến giảng dạy và học tiếp": "Người hướng đến giảng dạy và học tiếp.avif",
    },
  },
  "ngon-ngu-anh": {
    folder: "Ngon_ngu_anh",
    hero: "hero-hd-20261119.webp",
    overview: { filename: "overview-hd-20261119.webp", alt: "Minh họa tổng quan ngành Ngôn ngữ Anh" },
    audienceIllustration: "chương trình phù hợp với ai.jpg",
    career: "career-hd-20261119.webp",
  },
  "quan-he-cong-chung": {
    folder: "QHCC",
    hero: "hero-hd-20261119.webp",
    overview: { filename: "overview-hd-20261119.webp", alt: "Minh họa tổng quan ngành Quan hệ công chúng" },
    audienceIllustration: "chương trình phù hợp với ai.jpg",
    career: "Cơ hội nghề nghiệp và phát triển-20261119.webp",
  },
  "quan-ly-tai-nguyen-moi-truong": {
    folder: "Quan_ly_tai_nguyen_Moi_truong",
    hero: "hero-quality-20261120.webp",
    overview: { filename: "Tổng quan.jpg", alt: "Minh họa tổng quan ngành Quản lý tài nguyên và môi trường" },
    audienceIllustration: "chương trìnhhphuf hợp với ai.jpg",
    career: "career-quality-20261120.webp",
  },
  "quan-tri-khach-san": {
    folder: "Quan_tri_Khach_san",
    hero: "hero.jpg",
    overview: { filename: "Tổng  quan.png", alt: "Minh họa tổng quan ngành Quản trị Khách sạn" },
    career: "career-quality-20261120.webp",
    audienceIllustration: "Chương trìnhhphuf hợp với au.jpg",
  },
  "quan-tri-kinh-doanh": {
    folder: "Quan_tri_kinh_doanh",
    hero: "Hero.jpg",
    overview: { filename: "Tổng quan chương trình.jpg", alt: "Minh họa tổng quan ngành Quản trị kinh doanh" },
    audienceIllustration: "Chương trình phù hợp với ai.jpg",
    career: "Cơ hội nghề nghiệp và phát triển.jpg",
  },
  "tai-chinh-ngan-hang": {
    folder: "Tai_chinh_ngan_hang",
    career: "career-quality-20261120.webp",
    hero: "hero-20261119.jpg",
    overview: { filename: "Tổng quan.jpg", alt: "Minh họa tổng quan ngành Tài chính – Ngân hàng" },
    audienceIllustration: "chương trình phùuhopwj với ai.jpg",
  },
  "kinh-doanh-thuong-mai": {
    folder: "Kinh_doanh_thuong_mai",
    overview: { filename: "overview-quality-20261120.webp", alt: "Học tập và phân tích dữ liệu kinh doanh tại Văn Lang" },
    hero: "hero-quality-20261120.webp",
    career: "career-hd-20261119.webp",
    audience: {
      "Người đang làm kinh doanh, thương mại": "Người đang làm kinh doanh, thương mại.png",
      "Người hướng đến vai trò quản lý": "Người hướng đến vai trò quản lý.png",
      "Người muốn phát triển trong kinh doanh số": "kinh-doanh-so-20261120.jpg",
    },
  },
};

const programmePhotoRoot = "/images_programes/";

export function isProgrammePhoto(src?: string | null): boolean {
  return src?.startsWith(programmePhotoRoot) ?? false;
}

export function withProgrammeImages(programme: Programme): Programme {
  const selected = programmeImageSelections[programme.id as keyof typeof programmeImageSelections];
  const page = programme.pageContent;
  if (!selected || !page) return programme;
  const pictures = selected.map((key) => programmeImageLibrary[key]);
  const primary = pictures[0];
  const overview = pictures[1];
  const photos = programmePhotos[programme.id];
  const photoPath = (filename: string, folder = photos.folder) =>
    `${programmePhotoRoot}${folder}/${encodeURIComponent(filename)}`;
  const audienceIllustration = photos?.audienceIllustration
    ? {
        src: photoPath(photos.audienceIllustration),
        alt: `Ảnh minh họa đối tượng dự tuyển ngành ${programme.title}`,
      }
    : page.section03.audience.length ? undefined : primary;
  const genericHero =
    !page.hero.heroImage ||
    page.hero.heroImage.includes("photo-1564035105550") ||
    page.hero.heroImage.includes("logistics/campus-building");
  const genericOverview =
    !page.section01.overviewImage ||
    page.section01.overviewImage.includes("logistics/campus-building") ||
    page.section01.imageAlt === "Trường Đại học Văn Lang cơ sở Đặng Thùy Trâm";
  return {
    ...programme,
    pageContent: {
      ...page,
      hero: {
        ...page.hero,
        ...(photos?.hero
          ? {
              heroImage: photoPath(photos.hero),
              imageAlt: `Ảnh giới thiệu ngành ${programme.title}`,
              imageCredit: undefined,
            }
          : genericHero
          ? {
              heroImage: primary.src,
              imageAlt: primary.alt,
              imageCredit: { text: "Ảnh minh họa · Unsplash", href: primary.source },
            }
          : {}),
      },
      section01: {
        ...page.section01,
        ...(photos?.overview
          ? {
              overviewImage: photoPath(photos.overview.filename),
              imageAlt: photos.overview.alt,
              imageCredit: undefined,
            }
          : genericOverview
          ? {
              overviewImage: overview.src,
              imageAlt: overview.alt,
              imageCredit: { text: "Ảnh minh họa · Unsplash", href: overview.source },
            }
          : {}),
      },
      section03: {
        ...page.section03,
        illustration: audienceIllustration,
        audience: page.section03.audience.map((item, index) => {
          const filename = photos?.audience?.[item.title];
          const illustration = pictures[index % pictures.length];
          return {
            ...item,
            image: filename ? photoPath(filename, photos.audienceFolder) : illustration.src,
            alt: filename ? item.title : illustration.alt,
            imageSource: filename ? undefined : illustration.source,
          };
        }),
      },
      section04: {
        ...page.section04,
        careerImage: photos?.career ? photoPath(photos.career) : primary.src,
      },
    },
  };
}
