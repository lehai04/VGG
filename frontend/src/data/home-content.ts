import cards from './home-cards.json';
import { catalogueCopy } from './programmes/catalogue-copy';
export const homeContent = {
  ...cards,
  programmeSearch: catalogueCopy.ProgrammeSearch,
  hero: { label: 'CHƯƠNG TRÌNH SAU ĐẠI HỌC', title: 'Nâng tầm tri thức', emphasis: 'Chủ động dẫn đầu.', intro: 'Trường Đại học Văn Lang mang đến 20 chương trình thạc sĩ và 01 chương trình tiến sĩ, 01 chương trình liên kết quốc tế giúp bạn phát triển chuyên môn, nâng cao năng lực nghiên cứu và mở rộng cơ hội nghề nghiệp.', posterImage: '/images/pages/home/banner/banner-01.jpg', primary: { label: 'Khám phá chương trình →', href: '#programmes' }, secondary: { label: 'Thông tin tuyển sinh →', href: '/admissions' } },
  overview: { label: 'Viện Sau Đại học · VAN LANG GLOBAL GRADUATE', title: 'Nâng tầm tri thức,', emphasis: 'Chủ động dẫn đầu.', text: 'Tại Viện Sau đại học Trường Đại học Văn Lang, mỗi hành trình học tập là cơ hội để đào sâu tri thức, mở rộng tư duy và phát triển năng lực lãnh đạo. Gắn kết đào tạo với nghiên cứu và thực tiễn nghề nghiệp, Viện đồng hành cùng người học chuyển hóa ý tưởng thành giải pháp, tạo nên những bước tiến trong sự nghiệp và những đóng góp thiết thực cho cộng đồng.' },
  research: { image: '/images/pages/home/sections/campus.jpg', alt: 'Sinh viên và giảng viên cùng nghiên cứu', caption: 'LEARN · RESEARCH · INNOVATE · IMPACT', label: 'RESEARCH & INNOVATION', title: 'Nghiên cứu từ thực tiễn', emphasis: 'Đổi mới vì cộng đồng', text: 'Viện Sau đại học kết nối người học với giảng viên, nhà nghiên cứu và doanh nghiệp để cùng tìm lời giải cho những vấn đề thực tiễn, phát triển tri thức và đề xuất các giải pháp có giá trị ứng dụng.' },
};
