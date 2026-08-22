// data/programmes.ts

/* =========================================================
   PROGRAMME TYPES
   ========================================================= */

export const programmeDegrees = [
  "Thạc sĩ",
  "Tiến sĩ",
] as const;

export type ProgrammeDegree =
  (typeof programmeDegrees)[number];


export const programmeFields = [
  "Kinh doanh & Quản lý",
  "Kỹ thuật, Môi trường & Công nghệ",
  "Du lịch & Khách sạn",
  "Luật, Nhân văn & Truyền thông",
  "Thiết kế & Mỹ thuật Ứng dụng",
] as const;

export type ProgrammeField =
  (typeof programmeFields)[number];


export const programmeOrientations = [
  "Ứng dụng",
  "Nghiên cứu",
] as const;

export type ProgrammeOrientation =
  (typeof programmeOrientations)[number];


/* =========================================================
   PROGRAMME MODEL
   ========================================================= */

export type Programme = {
  id: string;
  code: string;

  title: string;
  englishTitle: string;

  degree: ProgrammeDegree;
  field: ProgrammeField;
  orientation: ProgrammeOrientation;

  credits: number;
  duration: string;

  studyMode: string;
  intake: string;
};


/* =========================================================
   PROGRAMME DATA
   ========================================================= */

export const programmes: Programme[] = [
  /* ==============================
     TIẾN SĨ
     ============================== */

  {
    id: "khoa-hoc-moi-truong",
    code: "D-01",

    title: "Khoa học Môi trường",
    englishTitle:
      "Doctor of Philosophy in Environmental Science",

    degree: "Tiến sĩ",

    field:
      "Kỹ thuật, Môi trường & Công nghệ",

    orientation: "Nghiên cứu",

    credits: 90,

    duration: "36–48 tháng",

    studyMode:
      "Theo kế hoạch đào tạo",

    intake:
      "Theo thông báo tuyển sinh",
  },


  /* ==============================
     KỸ THUẬT · MÔI TRƯỜNG
     ============================== */

  {
    id: "ky-thuat-moi-truong",
    code: "S-01",

    title: "Kỹ thuật Môi trường",
    englishTitle:
      "Master of Environmental Engineering",

    degree: "Thạc sĩ",

    field:
      "Kỹ thuật, Môi trường & Công nghệ",

    orientation: "Nghiên cứu",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "quan-ly-tai-nguyen-moi-truong",
    code: "S-02",

    title:
      "Quản lý Tài nguyên và Môi trường",

    englishTitle:
      "Master of Natural Resources and Environmental Management",

    degree: "Thạc sĩ",

    field:
      "Kỹ thuật, Môi trường & Công nghệ",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "cong-nghe-sinh-hoc",
    code: "S-03",

    title: "Công nghệ Sinh học",
    englishTitle:
      "Master of Biotechnology",

    degree: "Thạc sĩ",

    field:
      "Kỹ thuật, Môi trường & Công nghệ",

    orientation: "Nghiên cứu",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "ky-thuat-xay-dung",
    code: "S-04",

    title: "Kỹ thuật Xây dựng",
    englishTitle:
      "Master of Civil Engineering",

    degree: "Thạc sĩ",

    field:
      "Kỹ thuật, Môi trường & Công nghệ",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "ky-thuat-o-to",
    code: "S-05",

    title: "Kỹ thuật ô tô",
    englishTitle:
      "Master of Automotive Engineering",

    degree: "Thạc sĩ",

    field:
      "Kỹ thuật, Môi trường & Công nghệ",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },


  /* ==============================
     KINH DOANH
     ============================== */

  {
    id: "quan-tri-kinh-doanh",
    code: "S-06",

    title: "Quản trị Kinh doanh",
    englishTitle:
      "Master of Business Administration",

    degree: "Thạc sĩ",

    field:
      "Kinh doanh & Quản lý",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "kinh-doanh-thuong-mai",
    code: "S-07",

    title: "Kinh doanh Thương mại",
    englishTitle:
      "Master of Commercial Business",

    degree: "Thạc sĩ",

    field:
      "Kinh doanh & Quản lý",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "tai-chinh-ngan-hang",
    code: "S-08",

    title: "Tài chính - Ngân hàng",
    englishTitle:
      "Master of Finance and Banking",

    degree: "Thạc sĩ",

    field:
      "Kinh doanh & Quản lý",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "ke-toan",
    code: "S-09",

    title: "Kế toán",
    englishTitle:
      "Master of Accounting",

    degree: "Thạc sĩ",

    field:
      "Kinh doanh & Quản lý",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "logistics",
    code: "S-10",

    title:
      "Logistics và Quản lý chuỗi cung ứng",

    englishTitle:
      "Master of Logistics and Supply Chain Management",

    degree: "Thạc sĩ",

    field:
      "Kinh doanh & Quản lý",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },


  /* ==============================
     DU LỊCH
     ============================== */

  {
    id: "quan-tri-du-lich",
    code: "S-11",

    title:
      "Quản trị Dịch vụ Du lịch và Lữ hành",

    englishTitle:
      "Master of Tourism and Travel Service Management",

    degree: "Thạc sĩ",

    field:
      "Du lịch & Khách sạn",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "quan-tri-khach-san",
    code: "S-12",

    title: "Quản trị Khách sạn",
    englishTitle:
      "Master of Hospitality Management",

    degree: "Thạc sĩ",

    field:
      "Du lịch & Khách sạn",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },


  /* ==============================
     LUẬT · TRUYỀN THÔNG
     ============================== */

  {
    id: "luat-kinh-te",
    code: "S-13",

    title: "Luật Kinh tế",
    englishTitle:
      "Master of Economic Law",

    degree: "Thạc sĩ",

    field:
      "Luật, Nhân văn & Truyền thông",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "quan-he-cong-chung",
    code: "S-14",

    title: "Quan hệ Công chúng",
    englishTitle:
      "Master of Public Relations",

    degree: "Thạc sĩ",

    field:
      "Luật, Nhân văn & Truyền thông",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "ngon-ngu-anh",
    code: "S-15",

    title: "Ngôn ngữ Anh",
    englishTitle:
      "Master of English Language",

    degree: "Thạc sĩ",

    field:
      "Luật, Nhân văn & Truyền thông",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },


  /* ==============================
     THIẾT KẾ
     ============================== */

  {
    id: "kien-truc",
    code: "S-16",

    title: "Kiến trúc",
    englishTitle:
      "Master of Architecture",

    degree: "Thạc sĩ",

    field:
      "Thiết kế & Mỹ thuật Ứng dụng",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "my-thuat-ung-dung",
    code: "S-17",

    title: "Mỹ thuật Ứng dụng",
    englishTitle:
      "Master of Applied Arts",

    degree: "Thạc sĩ",

    field:
      "Thiết kế & Mỹ thuật Ứng dụng",

    orientation: "Ứng dụng",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },

  {
    id: "ly-luan-lich-su-my-thuat",
    code: "S-18",

    title:
      "Lý luận và Lịch sử Mỹ thuật Ứng dụng",

    englishTitle:
      "Master of Theory and History of Applied Arts",

    degree: "Thạc sĩ",

    field:
      "Thiết kế & Mỹ thuật Ứng dụng",

    orientation: "Nghiên cứu",

    credits: 60,

    duration: "18–24 tháng",

    studyMode: "Linh hoạt",

    intake:
      "Theo thông báo tuyển sinh",
  },
];