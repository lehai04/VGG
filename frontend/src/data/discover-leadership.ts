// Existing profiles and original portrait paths, shared without changing personnel.
export const leadershipProfiles = [
  {
    name: "PGS. TS. Nguyễn Văn Thành",
    title: "Phó Viện trưởng Phụ trách Viện Sau Đại học",
    quote:
      "Tại Trường Đại học Văn Lang, chúng tôi tin rằng giá trị lớn nhất của đào tạo sau đại học không chỉ nằm ở văn bằng, mà ở sự trưởng thành của người học. Đó là những con người có tư duy chiến lược; biết kết nối tri thức với công nghệ, dữ liệu và đổi mới sáng tạo; có năng lực nghiên cứu, phản biện và ra quyết định dựa trên bằng chứng; đồng thời tạo ra giá trị mới cho tổ chức và cộng đồng.",
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
export const departmentHeads: DepartmentLeader[] = [
  {
    id: "dao-tao-tien-si",
    name: "TS. Huỳnh Tấn Lợi",
    role: "Trưởng Bộ phận Phát triển chương trình Tiến sĩ và Quốc tế",
    image: "/images/pages/discover/leadership/huynh-tan-loi-portrait.png",
  },
  {
    id: "dao-tao-thac-si",
    name: "ThS. Nguyễn Viết Tịnh",
    role: "Trưởng Bộ phận Phát triển chương trình Thạc sĩ",
    image: "/images/pages/discover/leadership/nguyen-viet-tinh-portrait.png",
  },
  {
    id: "thanh-cong-nguoi-hoc",
    name: "ThS. Phạm Quốc Anh",
    role: "Trưởng Bộ phận Thành công người học",
    image: "/images/pages/discover/leadership/pham-quoc-anh-portrait.png",
  },
  {
    id: "chuyen-doi-so-quan-tri-du-lieu",
    name: "ThS. Tống Chí Thông",
    role: "Phụ trách Chuyển đổi số và Quản trị dữ liệu",
    image: "/images/pages/discover/leadership/tong-chi-thong-portrait.png",
  },
  {
    id: "tuyen-sinh-truyen-thong",
    name: "Cô Nguyễn Thu Hiền",
    role: "Trưởng Bộ phận Tuyển sinh và Truyền thông",
    image: "/images/pages/discover/leadership/nguyen-thu-hien-portrait.png",
  },
];
