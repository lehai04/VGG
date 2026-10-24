// ==================================================
// NGÀNH: KHOA HỌC MÔI TRƯỜNG
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const khoaHocMoiTruongPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Tiến sĩ Khoa học Môi trường cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
    heroSlogan: "FUTURE",
    heroImage:
      "https://images.unsplash.com/photo-1564035105550-e1f02aa8556b?auto=format&fit=crop&w=2400&q=85",
  },

  // --------------------------------------------------
  // NỘI DUNG THÔNG TIN NHANH
  // --------------------------------------------------
  facts: {
    ...programmeSharedContent.facts,
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 01 - TỔNG QUAN CHƯƠNG TRÌNH
  // --------------------------------------------------
  section01: {
    sectionNumber: "01",
    overviewTitle: "Tổng quan chương trình",
    overview: [
      "Chương trình Tiến sĩ Khoa học Môi trường cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
      "Chương trình cập nhật, kết hợp nền tảng học thuật với các vấn đề thực tiễn Đội ngũ giảng viên giàu kinh nghiệm cùng môi trường học tập hiện đại Kết nối nghiên cứu, doanh nghiệp và mạng lưới chuyên gia trong lĩnh vực",
    ],
    ...programmeSharedContent.overview,
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 02 - ĐIỂM NỔI BẬT
  // --------------------------------------------------
  section02: {
    sectionNumber: "02",
    highlights: [
      {
        title: "Học thuật gắn với thực tiễn",
        text: "Chương trình cập nhật, kết hợp nền tảng học thuật với các vấn đề thực tiễn",
      },
      {
        title: "Đội ngũ giảng viên",
        text: "Đội ngũ giảng viên giàu kinh nghiệm cùng môi trường học tập hiện đại",
      },
      {
        title: "Kết nối chuyên môn",
        text: "Kết nối nghiên cứu, doanh nghiệp và mạng lưới chuyên gia trong lĩnh vực",
      },
    ],
    ...programmeSharedContent.highlights,
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 03 - ĐỐI TƯỢNG
  // --------------------------------------------------
  section03: {
    sectionNumber: "03",
    audienceHeading: "Năng lực phát triển qua chương trình",
    audience: [
      {
        title: "Năng lực chuyên môn",
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Khoa học Môi trường",
        image:
          "https://images.unsplash.com/photo-1764795850513-fa8a469a4600?auto=format&fit=crop&w=1200&q=85",
      },
      {
        title: "Nghiên cứu và ra quyết định",
        text: "Phát triển năng lực nghiên cứu, tư duy phản biện và ra quyết định",
        image:
          "https://images.unsplash.com/photo-1589793463357-5fb813435467?auto=format&fit=crop&w=1200&q=85",
      },
      {
        title: "Hợp tác và truyền đạt tri thức",
        text: "Làm việc độc lập, hợp tác liên ngành và truyền đạt tri thức chuyên môn",
        image:
          "https://images.unsplash.com/photo-1758876021840-0209f3bd38f4?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 04 - NGHỀ NGHIỆP
  // --------------------------------------------------
  section04: {
    sectionNumber: "04",
    careerHeading: "Cơ hội nghề nghiệp và phát triển",
    careers: [
      {
        title:
          "Đảm nhận các vị trí chuyên môn và quản lý tại doanh nghiệp, tổ chức trong và ngoài nước",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Khoa học Môi trường",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Khoa học Môi trường",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Khoa học Môi trường",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Khoa học Môi trường được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Khoa học Môi trường được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
    ],
    ...programmeSharedContent.curriculum,
  },

  // --------------------------------------------------
  // NỘI DUNG TƯ VẤN
  // --------------------------------------------------
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước tiến mới", "trong sự nghiệp của bạn?"],
    ctaBody:
      "Đăng ký tư vấn để được cung cấp thông tin chi tiết về chương trình, điều kiện tuyển sinh và lộ trình học tập.",
  },

  // --------------------------------------------------
  // NỘI DUNG FAQ VÀ LIÊN HỆ
  // --------------------------------------------------
  faq: {
    ...programmeSharedContent.faq,
    faqs: [
      {
        question: "Điều kiện tuyển sinh là gì?",
        answer:
          "Tuyển sinh theo hình thức xét tuyển hồ sơ tốt nghiệp đại học ngành đúng, phù hợp hoặc ngành gần và đáp ứng chuẩn tiếng Anh đầu vào theo quy định.",
      },
      {
        question: "Chương trình có học bổng không?",
        answer:
          "Trường Đại học Văn Lang có nhiều chính sách học bổng hấp dẫn từ 10% đến 30% dành cho cựu sinh viên, đối tượng chính sách và học viên xuất sắc.",
      },
      {
        question: "Lịch học được sắp xếp như thế nào?",
        answer:
          "Lịch học được sắp xếp ngoài giờ hành chính vào các buổi tối trong tuần hoặc cuối tuần nhằm tạo điều kiện thuận lợi cho học viên vừa học vừa làm.",
      },
    ],
  },
};

export const khoaHocMoiTruongProgramme: Programme = {
  id: "khoa-hoc-moi-truong",
  code: "D-01",

  title: "Khoa học Môi trường",
  englishTitle: "Doctor of Philosophy in Environmental Science",

  degree: "Tiến sĩ",

  field: "Kỹ thuật, Môi trường & Công nghệ",

  orientation: "Nghiên cứu",

  credits: 90,

  duration: "36–48 tháng",

  studyMode: "Theo kế hoạch đào tạo",

  intake: "Theo thông báo tuyển sinh",

  tuition: "145.000.000 VNĐ",
};

const environmentalDoctoralCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp nghiên cứu khoa học",
    englishName: "Research Methodology",
    credits: 3,
  },
  {
    name: "Khoa học môi trường",
    englishName: "Environmental Science",
    credits: 3,
  },
  {
    name: "Khoa học về ô nhiễm môi trường",
    englishName: "Environmental Pollution Science",
    credits: 3,
  },
  {
    name: "Chính sách quản lý tài nguyên và môi trường",
    englishName: "Environmental and Natural Resources Management Policy",
    credits: 2,
  },
  {
    name: "Biến đổi khí hậu và tăng trưởng xanh",
    englishName: "Climate Change and Green Growth",
    credits: 3,
  },
  {
    name: "Mô hình hóa môi trường",
    englishName: "Environmental Modelling",
    credits: 3,
  },
  {
    name: "Kinh tế tài nguyên và môi trường",
    englishName: "Environmental and Natural Resource Economics",
    credits: 2,
  },
  {
    name: "Quản lý chất lượng môi trường",
    englishName: "Environmental Quality Management",
    credits: 2,
  },
  {
    name: "Quy hoạch môi trường",
    englishName: "Environmental Planning",
    credits: 2,
  },
  {
    name: "Quản lý tổng hợp lưu vực sông",
    englishName: "Integrated River Basin Management",
    credits: 3,
  },
  {
    name: "Năng lượng và năng lượng tái tạo",
    englishName: "Energy and Renewable Energy",
    credits: 3,
  },
  {
    name: "Viễn thám và GIS ứng dụng trong Quản lý Tài nguyên và Môi trường",
    englishName:
      "Remote Sensing and GIS Applications in Natural Resources and Environmental Management",
    credits: 3,
  },
  {
    name: "Các quá trình xử lý bậc cao trong công nghệ môi trường",
    englishName: "Advanced Treatment Processes in Environmental Engineering",
    credits: 4,
  },
  {
    name: "Công nghệ xử lý nước thải bậc cao",
    englishName: "Advanced Wastewater Treatment Technologies",
    credits: 3,
  },
  {
    name: "Công nghệ tái chế chất thải rắn",
    englishName: "Solid Waste Recycling Technologies",
    credits: 3,
  },
  {
    name: "Vi sinh ứng dụng",
    englishName: "Applied Microbiology",
    credits: 2,
  },
  {
    name: "Công nghệ xử lý nước cấp bậc cao",
    englishName: "Advanced Drinking Water Treatment Technologies",
    credits: 3,
  },
  {
    name: "Các giải pháp công nghệ thích ứng với biến đổi khí hậu",
    englishName: "Technological Solutions for Climate Change Adaptation",
    credits: 2,
  },
  {
    name: "Công nghệ xử lý chất thải nguy hại",
    englishName: "Hazardous Waste Treatment Technologies",
    credits: 3,
  },
  {
    name: "Công nghệ màng và ứng dụng",
    englishName: "Membrane Technology and Applications",
    credits: 3,
  },
  {
    name: "Kiểm soát ô nhiễm không khí nâng cao",
    englishName: "Advanced Air Pollution Control",
    credits: 3,
  },
  {
    name: "Kỹ thuật phân tích nước và nước thải",
    englishName: "Water and Wastewater Analysis Techniques",
    credits: 2,
  },
  {
    name: "Tư vấn chính sách môi trường quốc tế",
    englishName: "International Environmental Policy Consulting",
    credits: 4,
  },
  {
    name: "Chuyên đề 1",
    englishName: "Special Topics 1",
    credits: 3,
  },
  {
    name: "Chuyên đề 2",
    englishName: "Special Topics 2",
    credits: 3,
  },
  {
    name: "Tiểu luận tổng quan",
    englishName: "Literature Review",
    credits: 3,
  },
  {
    name: "Luận án Tiến sĩ",
    englishName: "Doctoral Dissertation",
    credits: 70,
  },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getKhoaHocMoiTruongCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo",
      subtitle: "Curriculum",
      groups: [
        {
          title: "Chương trình đào tạo",
          englishTitle: "Curriculum",
          courses: environmentalDoctoralCourses,
        },
      ],
    },
  ];
}
