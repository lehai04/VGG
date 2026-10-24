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
export function withProgrammeImages(programme: Programme): Programme {
  const selected = programmeImageSelections[programme.id as keyof typeof programmeImageSelections];
  const page = programme.pageContent;
  if (!selected || !page) return programme;
  const pictures = selected.map((key) => programmeImageLibrary[key]);
  const primary = pictures[0];
  const overview = pictures[1];
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
        ...(genericHero
          ? {
              heroImage: primary.src,
              imageAlt: primary.alt,
              imageCredit: { text: "Ảnh minh họa · Unsplash", href: primary.source },
            }
          : {}),
      },
      section01: {
        ...page.section01,
        ...(genericOverview
          ? {
              overviewImage: overview.src,
              imageAlt: overview.alt,
              imageCredit: { text: "Ảnh minh họa · Unsplash", href: overview.source },
            }
          : {}),
      },
      section03: {
        ...page.section03,
        illustration: page.section03.audience.length ? undefined : primary,
        audience: page.section03.audience.map((item, index) => ({
          ...item,
          image: pictures[index % pictures.length].src,
          alt: pictures[index % pictures.length].alt,
          imageSource: pictures[index % pictures.length].source,
        })),
      },
      section04: { ...page.section04, careerImage: primary.src },
    },
  };
}
