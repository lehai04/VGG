import type { Programme } from "./programmes";

export type CurriculumCourse = {
  name: string;
  englishName?: string;
  credits?: number;
  elective?: boolean;
};

export type CurriculumGroup = {
  title: string;
  englishTitle?: string;
  courses: CurriculumCourse[];
};

export type CurriculumTrack = {
  number: string;
  title: string;
  subtitle?: string;
  groups: CurriculumGroup[];
};

const environmentalEngineeringFoundationCourses: CurriculumCourse[] = [
  { name: "Kỹ thuật phân tích nước và nước thải", credits: 2 },
  { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
  { name: "Hóa học khí quyển và chất lượng môi trường không khí", credits: 2, elective: true },
  { name: "Hóa học trong môi trường nước", credits: 2, elective: true },
  { name: "Đánh giá rủi ro và đánh giá tác động môi trường", credits: 3, elective: true },
  { name: "Biến đổi khí hậu và tăng trưởng xanh", credits: 3, elective: true },
  { name: "Quản lý chất lượng môi trường", credits: 2, elective: true },
  { name: "Phân tích và đánh giá dữ liệu môi trường", credits: 3, elective: true },
  { name: "Mô hình hóa môi trường", credits: 3, elective: true },
  { name: "Độc chất học môi trường", credits: 3, elective: true },
];

const environmentalEngineeringSpecialisedCourses: CurriculumCourse[] = [
  { name: "Các quá trình xử lý bậc cao trong công nghệ môi trường", credits: 4 },
  { name: "Kiểm soát ô nhiễm không khí nâng cao", credits: 3 },
  { name: "Công nghệ xử lý nước thải bậc cao", credits: 3 },
  { name: "Công nghệ tái chế chất thải rắn", credits: 3 },
  { name: "Thực tập xử lý chất thải", credits: 2 },
  { name: "Vi sinh ứng dụng", credits: 2, elective: true },
  { name: "Công nghệ xử lý nước cấp bậc cao", credits: 3, elective: true },
  { name: "Kỹ thuật xử lý chất thải nguy hại", credits: 3, elective: true },
  { name: "Chính sách quản lý tài nguyên và môi trường", credits: 2, elective: true },
  { name: "Tư vấn chính sách môi trường quốc tế", credits: 6, elective: true },
  { name: "Các giải pháp công nghệ thích ứng với biến đổi khí hậu", credits: 3, elective: true },
  { name: "Năng lượng và năng lượng tái tạo", credits: 3, elective: true },
  { name: "Quản lý tổng hợp lưu vực sông", credits: 2, elective: true },
  { name: "Công nghệ màng và ứng dụng", credits: 3, elective: true },
  { name: "Kiểm toán môi trường", credits: 2, elective: true },
  { name: "Kinh tế tài nguyên môi trường", credits: 2, elective: true },
  { name: "Quy hoạch môi trường", credits: 2, elective: true },
  { name: "Quản lý carbon cho môi trường bền vững", credits: 3, elective: true },
  { name: "Ứng dụng trí tuệ nhân tạo trong môi trường", credits: 3, elective: true },
];

const resourceManagementFoundationCourses: CurriculumCourse[] = [
  { name: "Biến đổi khí hậu và tăng trưởng xanh", credits: 3 },
  { name: "Mô hình hóa môi trường", credits: 3 },
  { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
  { name: "Quản lý chất lượng môi trường", credits: 3 },
  { name: "Kỹ thuật phân tích nước và nước thải", credits: 2, elective: true },
  { name: "Độc chất học môi trường", credits: 3, elective: true },
  { name: "Vi sinh ứng dụng", credits: 2, elective: true },
  { name: "Năng lượng và năng lượng tái tạo", credits: 3, elective: true },
  { name: "Kỹ thuật xử lý chất thải nguy hại", credits: 3, elective: true },
];

const resourceManagementRequiredCourses: CurriculumCourse[] = [
  { name: "Chính sách quản lý tài nguyên và môi trường", credits: 2 },
  { name: "Kinh tế tài nguyên môi trường", credits: 2 },
  { name: "Quản lý tổng hợp lưu vực sông", credits: 2 },
  { name: "Phân tích hệ thống môi trường", credits: 3 },
];

const resourceManagementElectiveCourses: CurriculumCourse[] = [
  { name: "Quy hoạch môi trường", credits: 2, elective: true },
  { name: "Quản lý môi trường: Giải pháp cho các đô thị thông minh", credits: 3, elective: true },
  {
    name: "Viễn thám và GIS ứng dụng trong Quản lý Tài nguyên và Môi trường",
    credits: 3,
    elective: true,
  },
  { name: "Tư vấn chính sách môi trường quốc tế", credits: 6, elective: true },
  { name: "Kiểm soát ô nhiễm không khí nâng cao", credits: 3, elective: true },
  { name: "Công nghệ xử lý nước thải bậc cao", credits: 3, elective: true },
  { name: "Công nghệ tái chế chất thải rắn", credits: 3, elective: true },
  { name: "Công nghệ màng và ứng dụng", credits: 3, elective: true },
  { name: "Đánh giá rủi ro và đánh giá tác động môi trường", credits: 3, elective: true },
  { name: "Phân tích và đánh giá dữ liệu môi trường", credits: 3, elective: true },
  { name: "Quản lý carbon cho môi trường bền vững", credits: 3, elective: true },
  { name: "Ứng dụng trí tuệ nhân tạo trong môi trường", credits: 3, elective: true },
];

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
    englishName: "Remote Sensing and GIS Applications in Natural Resources and Environmental Management",
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

const businessAdministrationGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
];

const businessAdministrationFoundationCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp nghiên cứu trong kinh doanh",
    englishName: "Business Research Methods",
    credits: 3,
  },
  {
    name: "Kinh tế học cho nhà quản lý",
    englishName: "Economics for Manager",
    credits: 3,
  },
  {
    name: "Tài chính và kế toán cho nhà quản lý",
    englishName: "Finance and Accounting for Manager",
    credits: 3,
  },
];

const businessAdministrationCoreCourses: CurriculumCourse[] = [
  {
    name: "Quản lý chiến lược và chuyển đổi số",
    englishName: "Strategic Management and Digital Transformation",
    credits: 3,
  },
  {
    name: "Quản trị Con người và Tổ chức",
    englishName: "Managing People and Organization",
    credits: 3,
  },
  {
    name: "Quản trị vận hành và chuỗi cung ứng",
    englishName: "Operation and Supply Chain Management",
    credits: 3,
  },
  {
    name: "Lãnh đạo và quản trị doanh nghiệp",
    englishName: "Leadership and Governance",
    credits: 3,
  },
  {
    name: "Phân tích kinh doanh",
    englishName: "Business Analytics",
    credits: 4,
  },
  {
    name: "Chiến lược Marketing trong bối cảnh toàn cầu",
    englishName: "Marketing Strategy in the Global context",
    credits: 3,
  },
];

const businessAdministrationAppliedElectiveCourses: CurriculumCourse[] = [
  {
    name: "Khởi nghiệp, đổi mới sáng tạo và phát triển bền vững",
    englishName: "Enterpreneurship, Innovations and Sustainable Development",
    credits: 3,
    elective: true,
  },
  {
    name: "Marketing kỹ thuật số",
    englishName: "Digital Marketing",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị sự thay đổi",
    englishName: "Change Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản lý dự án",
    englishName: "Project Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Phân tích dữ liệu lớn trong kinh doanh và quản lý",
    englishName: "Big Data Analytics for Business and Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề tự chọn",
    englishName: "Special Study",
    credits: 3,
    elective: true,
  },
  {
    name: "Các vấn đề đương đại trong Quản lý Kinh doanh 1",
    englishName: "Contemporary issues in Business & Management 1",
    credits: 1,
    elective: true,
  },
  {
    name: "Các vấn đề đương đại trong Quản lý Kinh doanh 2",
    englishName: "Contemporary issues in Business & Management 2",
    credits: 1,
    elective: true,
  },
];

const businessAdministrationResearchElectiveCourses: CurriculumCourse[] = [
  {
    name: "Chuyên đề về Khởi nghiệp, đổi mới sáng tạo và phát triển bền vững",
    englishName: "Seminar in Enterpreneurship, Innovations and Sustainable Development",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề về Marketing kỹ thuật số",
    englishName: "Seminar in Digital Marketing",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề về Quản trị sự thay đổi",
    englishName: "Seminar in Change Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề về Quản lý dự án",
    englishName: "Seminar in Project Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề về Phân tích dữ liệu lớn trong kinh doanh và quản lý",
    englishName: "Seminar in Big Data Analytics for Business and Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề tự chọn",
    englishName: "Special Study",
    credits: 3,
    elective: true,
  },
  {
    name: "Các vấn đề đương đại trong Quản lý Kinh doanh 1",
    englishName: "Contemporary issues in Business & Management 1",
    credits: 1,
    elective: true,
  },
];

const commercialBusinessGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 3 },
];

const commercialBusinessFoundationCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp nghiên cứu khoa học ứng dụng",
    englishName: "Applied Scientific Research Methods",
    credits: 3,
  },
  {
    name: "Kinh doanh kỹ thuật số",
    englishName: "Digital Business",
    credits: 4,
  },
  {
    name: "Thấu hiểu khách hàng và hành vi tiêu dùng kỹ thuật số",
    englishName: "Customer Insight and Digital Consumer Behavior",
    credits: 4,
  },
];

const commercialBusinessSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Quản trị kinh doanh số",
    englishName: "Digital Business Management",
    credits: 4,
  },
  {
    name: "Lãnh đạo số và Quản trị sự thay đổi",
    englishName: "Digital Leadership and Change Management",
    credits: 4,
  },
  {
    name: "Thiết kế Marketing số và Tối ưu hiệu suất",
    englishName: "Digital Marketing Design and Performance Optimization",
    credits: 4,
  },
  {
    name: "Nghiên cứu kinh doanh",
    englishName: "Business Research",
    credits: 4,
  },
  {
    name: "Các vấn đề đương đại trong thương mại và kinh doanh",
    englishName: "Contemporary Issues in Business Commerce",
    credits: 4,
  },
  {
    name: "Dự án kinh doanh (kết hợp field trip)",
    englishName: "Business Project (with Field Trip)",
    credits: 2,
  },
  {
    name: "ESG và Kinh doanh số bền vững",
    englishName: "ESG and Sustainable Digital Business",
    credits: 4,
    elective: true,
  },
  {
    name: "Dữ liệu lớn và Trí tuệ nhân tạo trong kinh doanh số",
    englishName: "Big Data and AI in Digital Business",
    credits: 4,
    elective: true,
  },
  {
    name: "Vận hành kênh Omni và Thương mại tích hợp",
    englishName: "Omnichannel Operations and Integrated Commerce",
    credits: 4,
    elective: true,
  },
  {
    name: "Quản trị rủi ro trong vận hành số",
    englishName: "Risk Management in Digital Operations",
    credits: 4,
    elective: true,
  },
  {
    name: "Quản trị sản phẩm và đổi mới sáng tạo",
    englishName: "Digital Product and Innovation Management",
    credits: 4,
    elective: true,
  },
  {
    name: "Phân tích dữ liệu ứng dụng trong kinh doanh số",
    englishName: "Applied Digital Business Analytics",
    credits: 4,
    elective: true,
  },
];

const commercialBusinessGraduationCourses: CurriculumCourse[] = [
  {
    name: "Thực tập tốt nghiệp",
    englishName: "Graduation Internship",
    credits: 6,
  },
  {
    name: "Đề án tốt nghiệp",
    englishName: "Graduation Project",
    credits: 9,
  },
];

const financeBankingAppliedGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
];

const financeBankingResearchGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
  {
    name: "Chuyên đề Kinh tế học về Tài chính & Ngân hàng",
    englishName: "Proseminar in Economics of Finance & Banking",
    credits: 3,
  },
];

const financeBankingAppliedFoundationCourses: CurriculumCourse[] = [
  {
    name: "Chuyên đề Kinh tế học về Tài chính & Ngân hàng",
    englishName: "Proseminar in Economics of Finance & Banking",
    credits: 3,
  },
  {
    name: "Tiền tệ, ngân hàng và thị trường tài chính",
    englishName: "Money, Banking and Financial Markets",
    credits: 3,
  },
  {
    name: "Phương pháp định lượng trong tài chính",
    englishName: "Quantitative Research Methods for Finance",
    credits: 3,
  },
  {
    name: "Tinh thần doanh nhân",
    englishName: "Entrepreneurship",
    credits: 3,
  },
  {
    name: "Tài chính khởi nghiệp",
    englishName: "Entrepreneurial Finance",
    credits: 3,
  },
  {
    name: "Tài chính hành vi",
    englishName: "Behavioral Finance",
    credits: 2,
    elective: true,
  },
  {
    name: "Chuyên đề công nghệ tài chính",
    englishName: "Proseminar in Financial Technology",
    credits: 2,
    elective: true,
  },
];

const financeBankingResearchFoundationCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp định lượng trong tài chính",
    englishName: "Quantitative Research Methods for Finance",
    credits: 3,
  },
  {
    name: "Ứng dụng AI trong nghiên cứu",
    englishName: "Application Artificial Intelligence in Research",
    credits: 3,
  },
  {
    name: "Tiền tệ, ngân hàng và thị trường tài chính",
    englishName: "Money, Banking and Financial Markets",
    credits: 3,
  },
  {
    name: "Tài chính hành vi",
    englishName: "Behavioral Finance",
    credits: 2,
    elective: true,
  },
  {
    name: "Chuyên đề công nghệ tài chính",
    englishName: "Proseminar in Financial Technology",
    credits: 2,
    elective: true,
  },
  {
    name: "Tinh thần doanh nhân",
    englishName: "Entrepreneurship",
    credits: 3,
  },
  {
    name: "Tài chính khởi nghiệp",
    englishName: "Entrepreneurial Finance",
    credits: 0,
  },
];

const financeBankingSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Quản trị rủi ro doanh nghiệp",
    englishName: "Enterprise Risk Management",
    credits: 3,
  },
  {
    name: "Quản trị ngân hàng",
    englishName: "Bank Management",
    credits: 3,
  },
  {
    name: "Quản trị tài chính",
    englishName: "Financial Management",
    credits: 3,
  },
  {
    name: "Quản trị đổi mới sáng tạo",
    englishName: "Innovation Management",
    credits: 3,
  },
  {
    name: "Hệ thống thông tin quản lý",
    englishName: "Management Information Systems",
    credits: 3,
  },
  {
    name: "Chuyên đề ngân hàng và các định chế tài chính phi ngân hàng",
    englishName: "Proseminar in Financial Intermediaries",
    credits: 3,
    elective: true,
  },
  {
    name: "Nghệ thuật lãnh đạo trong tài chính",
    englishName: "Leadership in Finance",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề tài chính doanh nghiệp",
    englishName: "Proseminar in Corporate Finance",
    credits: 3,
    elective: true,
  },
];

const accountingGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
];

const accountingFoundationCourses: CurriculumCourse[] = [
  { name: "Lý thuyết kế toán", englishName: "Accounting Theory", credits: 3 },
  { name: "Quản trị tài chính doanh nghiệp", englishName: "Corporate Financial Management", credits: 3 },
  {
    name: "Trí tuệ nhân tạo và dữ liệu lớn trong kinh doanh",
    englishName: "Artificial Intelligence and Big Data in Business",
    credits: 3,
    elective: true,
  },
  {
    name: "Công nghệ Blockchain và ứng dụng",
    englishName: "Blockchain Technology and Applications",
    credits: 3,
    elective: true,
  },
  {
    name: "An toàn thông tin kế toán nâng cao",
    englishName: "Advanced Accounting Information Security",
    credits: 3,
    elective: true,
  },
  {
    name: "Đạo đức nghề nghiệp kế toán, kiểm toán trong môi trường số",
    englishName: "Professional Ethics in Accounting and Auditing in the Digital Environment",
    credits: 3,
    elective: true,
  },
];

const accountingSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Báo cáo tài chính hợp nhất nâng cao",
    englishName: "Advanced Consolidated Financial Reporting",
    credits: 3,
  },
  {
    name: "Kế toán quản trị nâng cao",
    englishName: "Advanced Management Accounting",
    credits: 3,
  },
  {
    name: "Hệ thống thông tin quản lý trong kế toán nâng cao",
    englishName: "Advanced Management Information Systems in Accounting",
    credits: 3,
  },
  {
    name: "Kiểm toán và các dịch vụ đảm bảo nâng cao",
    englishName: "Advanced Auditing and Assurance Services",
    credits: 3,
  },
  {
    name: "Báo cáo ESG và tạo lập giá trị tổ chức",
    englishName: "ESG Reporting and Organizational Value Creation",
    credits: 3,
  },
  {
    name: "Kế toán công nâng cao",
    englishName: "Advanced Public Sector Accounting",
    credits: 3,
    elective: true,
  },
  {
    name: "Kế toán phát triển bền vững",
    englishName: "Sustainability Accounting",
    credits: 3,
    elective: true,
  },
  {
    name: "Kế toán điều tra số",
    englishName: "Digital Forensic Accounting",
    credits: 3,
    elective: true,
  },
  {
    name: "Kế toán quốc tế nâng cao",
    englishName: "Advanced International Accounting",
    credits: 3,
    elective: true,
  },
  {
    name: "Phân tích chính sách thuế",
    englishName: "Business Tax Policy Analysis",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản lý rủi ro tuân thủ thuế nâng cao",
    englishName: "Advanced Tax Compliance Risk Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị rủi ro thuế trong môi trường số",
    englishName: "Tax Risk Management in the Digital Environment",
    credits: 3,
    elective: true,
  },
  {
    name: "Kiểm soát nội bộ nâng cao",
    englishName: "Advanced Internal Controls",
    credits: 3,
    elective: true,
  },
  {
    name: "Kiểm soát quản lý",
    englishName: "Management Control",
    credits: 3,
    elective: true,
  },
  {
    name: "Kiểm toán hoạt động",
    englishName: "Operational Auditing",
    credits: 3,
    elective: true,
  },
  {
    name: "Sáp nhập, mua lại và tái cấu trúc doanh nghiệp",
    englishName: "Mergers, Acquisitions, and Corporate Restructuring",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị chiến lược",
    englishName: "Strategic Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị rủi ro doanh nghiệp",
    englishName: "Enterprise Risk Management",
    credits: 3,
    elective: true,
  },
];

const accountingGraduationCourses: CurriculumCourse[] = [
  { name: "Thực tập", englishName: "Internship", credits: 6 },
  { name: "Đề án tốt nghiệp", englishName: "Graduation Project", credits: 8 },
];

const tourismGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
];

const tourismFoundationCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp nghiên cứu trong du lịch",
    englishName: "Research Methods in Tourism",
    credits: 4,
  },
  {
    name: "Marketing nâng cao trong du lịch - khách sạn",
    englishName: "Advanced Marketing in Tourism and Hospitality",
    credits: 4,
  },
  {
    name: "Quản trị bền vững và ESG trong du lịch - khách sạn",
    englishName: "Sustainable and ESG Management in Tourism & Hospitality",
    credits: 3,
  },
  {
    name: "Quản trị nhân lực quốc tế trong du lịch",
    englishName: "International Human Resource Management in Tourism",
    credits: 4,
  },
  {
    name: "Kinh tế du lịch",
    englishName: "Tourism Economics",
    credits: 4,
  },
];

const tourismAppliedSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Quản trị kinh doanh lữ hành",
    englishName: "Travel Business Management",
    credits: 4,
  },
  {
    name: "Quản trị tài chính trong doanh nghiệp du lịch - khách sạn",
    englishName: "Financial Management in Tourism and Hospitality Enterprises",
    credits: 4,
  },
  {
    name: "Ứng dụng công nghệ số trong du lịch - khách sạn",
    englishName: "Digital Technology in Tourism and Hospitality",
    credits: 3,
  },
  {
    name: "Quản trị chiến lược nâng cao doanh nghiệp du lịch",
    englishName: "Advanced Strategic Management for Tourism Businesses",
    credits: 3,
  },
  {
    name: "Di sản văn hoá trong du lịch",
    englishName: "Cultural Heritage in Tourism",
    credits: 4,
  },
  {
    name: "Quản trị lễ hội và sự kiện du lịch",
    englishName: "Tourism Festival and Event Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị rủi ro và xử lý khủng hoảng trong du lịch",
    englishName: "Risk and Crisis Management in Tourism",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị dịch vụ cao cấp",
    englishName: "Luxury Service Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị dự án đầu tư du lịch",
    englishName: "Managing Tourism Investment Projects",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị vận hành khách sạn",
    englishName: "Hospitality Operations Management",
    credits: 3,
    elective: true,
  },
];

const tourismResearchSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Quản trị tài chính trong doanh nghiệp du lịch - khách sạn",
    englishName: "Financial Management in Tourism and Hospitality Enterprises",
    credits: 4,
  },
  {
    name: "Di sản văn hoá trong du lịch",
    englishName: "Cultural Heritage in Tourism",
    credits: 4,
  },
  {
    name: "Quản trị lễ hội và sự kiện du lịch",
    englishName: "Tourism Festival and Event Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị rủi ro và xử lý khủng hoảng trong du lịch",
    englishName: "Risk and Crisis Management in Tourism",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị dịch vụ cao cấp",
    englishName: "Luxury Service Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị dự án đầu tư du lịch",
    englishName: "Managing Tourism Investment Projects",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị vận hành khách sạn",
    englishName: "Hospitality Operations Management",
    credits: 3,
    elective: true,
  },
];

const tourismAppliedGraduationCourses: CurriculumCourse[] = [
  { name: "Thực tập", englishName: "Internship", credits: 6 },
  { name: "Đề án tốt nghiệp", englishName: "Applied Graduation Project", credits: 8 },
];

const tourismResearchGraduationCourses: CurriculumCourse[] = [
  {
    name: "Nghiên cứu marketing trong du lịch - khách sạn",
    englishName: "Marketing Research in Tourism and Hospitality",
    credits: 4,
  },
  {
    name: "Phương pháp viết và xuất bản nghiên cứu khoa học",
    englishName: "Research Writing and Publication",
    credits: 3,
  },
  {
    name: "Chuyên đề về ứng dụng công nghệ số trong du lịch - khách sạn",
    englishName: "Seminar in Digital Technology in Tourism and Hospitality",
    credits: 3,
  },
  {
    name: "Chuyên đề về quản trị kinh doanh lữ hành",
    englishName: "Seminar in Travel Business Management",
    credits: 4,
  },
  {
    name: "Luận văn tốt nghiệp",
    englishName: "Graduation Research Thesis",
    credits: 15,
  },
];

const hospitalityAppliedSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Quản trị vận hành khách sạn",
    englishName: "Hospitality Operations Management",
    credits: 3,
  },
  {
    name: "Quản trị tài chính trong doanh nghiệp du lịch - khách sạn",
    englishName: "Financial Management in Tourism and Hospitality Enterprises",
    credits: 4,
  },
  {
    name: "Ứng dụng công nghệ số trong du lịch - khách sạn",
    englishName: "Digital Technology in Tourism and Hospitality",
    credits: 3,
  },
  {
    name: "Quản trị chiến lược nâng cao trong khách sạn",
    englishName: "Advanced Strategic Management in Hospitality",
    credits: 3,
  },
  {
    name: "Dự án phát triển khách sạn",
    englishName: "Hospitality Development Project",
    credits: 4,
  },
  {
    name: "Quản trị doanh thu khách sạn",
    englishName: "Hospitality Revenue Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị rủi ro và xử lý khủng hoảng trong du lịch",
    englishName: "Risk and Crisis Management in Tourism",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị dịch vụ cao cấp",
    englishName: "Luxury Service Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Lãnh đạo hiệu quả trong môi trường đa văn hóa",
    englishName: "Effective Leadership in a Multicultural Environment",
    credits: 3,
    elective: true,
  },
];

const hospitalityResearchSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Quản trị vận hành khách sạn",
    englishName: "Hospitality Operations Management",
    credits: 3,
  },
  {
    name: "Quản trị tài chính trong doanh nghiệp du lịch - khách sạn",
    englishName: "Financial Management in Tourism and Hospitality Enterprises",
    credits: 4,
  },
  {
    name: "Quản trị chiến lược nâng cao trong khách sạn",
    englishName: "Advanced Strategic Management in Hospitality",
    credits: 3,
  },
  {
    name: "Quản trị doanh thu khách sạn",
    englishName: "Hospitality Revenue Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị rủi ro và xử lý khủng hoảng trong du lịch",
    englishName: "Risk and Crisis Management in Tourism",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị dịch vụ cao cấp",
    englishName: "Luxury Service Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Lãnh đạo hiệu quả trong môi trường đa văn hóa",
    englishName: "Effective Leadership in a Multicultural Environment",
    credits: 3,
    elective: true,
  },
];

const hospitalityResearchGraduationCourses: CurriculumCourse[] = [
  {
    name: "Nghiên cứu marketing trong du lịch - khách sạn",
    englishName: "Marketing Research in Tourism and Hospitality",
    credits: 4,
  },
  {
    name: "Phương pháp viết và xuất bản nghiên cứu khoa học",
    englishName: "Research Writing and Publication",
    credits: 3,
  },
  {
    name: "Chuyên đề về ứng dụng công nghệ số trong du lịch - khách sạn",
    englishName: "Seminar in Digital Technology in Tourism and Hospitality",
    credits: 3,
  },
  {
    name: "Chuyên đề về dự án phát triển khách sạn",
    englishName: "Seminar in Hospitality Development Project",
    credits: 4,
  },
  {
    name: "Luận văn tốt nghiệp",
    englishName: "Graduation Research Thesis",
    credits: 15,
  },
];

const economicLawGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
  { name: "Tư duy pháp lý", englishName: "Legal Reasoning", credits: 3 },
];

const economicLawSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Áp dụng pháp luật doanh nghiệp trong hoạt động của doanh nghiệp",
    englishName: "The application of law on enterprises in business activities",
    credits: 3,
  },
  {
    name: "Pháp luật về đầu tư trong thời kỳ hội nhập",
    englishName: "Investment Law in the integration facilitation",
    credits: 3,
  },
  {
    name: "Pháp luật về thương mại trong điều kiện hội nhập",
    englishName: "Commercial Law in the integration facilitation",
    credits: 3,
  },
  {
    name: "Pháp luật về xác lập quyền sử dụng đất của chủ thể kinh doanh",
    englishName: "Law on the assertion of land use rights of business entitites",
    credits: 3,
  },
  {
    name: "Pháp luật về cạnh tranh trong nền kinh tế thị trường",
    englishName: "Competition law in the market economy",
    credits: 3,
  },
  {
    name: "Chuyên đề thực hành 1: Kỹ năng nhận diện và giải quyết tranh chấp hợp đồng mua bán hàng hóa quốc tế",
    englishName: "Internship and Practical module 1: Skills of identification and dispute resolution of contracts for the international sale of goods",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề thực hành 2: Trọng tài giả định",
    englishName: "Internship and Practical module 2: Moot Court",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề thực hành 3: Kỹ năng soạn thảo, đàm phán, ký kết hợp đồng thương mại",
    englishName: "Internship and Practical module 3: Skills of drafting, negotiating and signing commercial contracts",
    credits: 3,
    elective: true,
  },
  {
    name: "Áp dụng pháp luật lao động trong doanh nghiệp",
    englishName: "The application of labor law in enterprises",
    credits: 3,
    elective: true,
  },
  {
    name: "Tội phạm kinh tế",
    englishName: "Economic Crime",
    credits: 3,
    elective: true,
  },
  {
    name: "Một số vấn đề pháp lý về thị trường bất động sản",
    englishName: "Some legal issues on the real estate market",
    credits: 3,
    elective: true,
  },
  {
    name: "Xử phạt vi phạm hành chính trong lĩnh vực kinh tế",
    englishName: "Administrative Sanctions in the Economic Sector",
    credits: 3,
    elective: true,
  },
  {
    name: "Pháp luật về nghĩa vụ thuế của chủ thể kinh doanh",
    englishName: "Law on tax duty of business entities",
    credits: 3,
    elective: true,
  },
  {
    name: "Kiểm soát rủi ro pháp lý trong doanh nghiệp",
    englishName: "Legal risk control in enterprises",
    credits: 3,
    elective: true,
  },
];

const economicLawGraduationCourses: CurriculumCourse[] = [
  { name: "Thực tập", englishName: "Internship", credits: 8 },
  { name: "Đề án tốt nghiệp", englishName: "Graduation Project", credits: 9 },
];

const englishGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
];

const englishAppliedFoundationCourses: CurriculumCourse[] = [
  { name: "Viết nghiên cứu", englishName: "Research Writing", credits: 4 },
  { name: "Phương pháp Nghiên cứu khoa học nâng cao", englishName: "Graduate Research and Methodology", credits: 4 },
  { name: "Thụ đắc ngôn ngữ thứ hai", englishName: "Second Language Acquisition", credits: 3 },
  { name: "Dẫn luận Ngôn ngữ học ứng dụng", englishName: "Introduction to Applied Linguistics", credits: 3 },
  { name: "Tiếng Anh toàn cầu", englishName: "World Englishes", credits: 3, elective: true },
  { name: "Giao tiếp giao văn hoá", englishName: "Cross-cultural communication", credits: 3, elective: true },
  { name: "Ngôn ngữ học đối chiếu", englishName: "Contrastive Linguistics", credits: 3, elective: true },
  { name: "Ngôn ngữ Máy tính", englishName: "Computational Linguistics", credits: 3, elective: true },
  { name: "CNTT trong Giảng dạy tiếng Anh", englishName: "IT in Foreign Language Teaching", credits: 3, elective: true },
];

const englishAppliedSpecialisedCourses: CurriculumCourse[] = [
  { name: "Phương pháp Giảng dạy Ngôn ngữ nâng cao", englishName: "Advanced Methods of Teaching Language", credits: 3 },
  { name: "Phân tích diễn ngôn", englishName: "Discourse Analysis", credits: 3 },
  { name: "Ngôn ngữ học tri nhận", englishName: "Cognitive Linguistics", credits: 3 },
  { name: "Phát triển Chương trình giảng dạy", englishName: "Curriculum Development", credits: 3 },
  { name: "Thực tập tại doanh nghiệp", englishName: "Teaching Practicum", credits: 6 },
  { name: "Thực hành giảng dạy ngôn ngữ", englishName: "Practice of Language Teaching", credits: 3 },
  { name: "Ngôn ngữ học xã hội", englishName: "Sociolinguistics", credits: 3, elective: true },
  { name: "Cấu trúc ngôn ngữ", englishName: "Structuralism in Linguistics", credits: 3, elective: true },
  { name: "Ngữ dụng học", englishName: "Pragmatics", credits: 3, elective: true },
  { name: "Tiếng Anh chuyên ngành", englishName: "English for Specific Purposes", credits: 3, elective: true },
  { name: "Lý thuyết dịch", englishName: "Advanced Translation Theories", credits: 3, elective: true },
  { name: "Kiểm tra và đánh giá ngôn ngữ", englishName: "Language Testing and Evaluation", credits: 3, elective: true },
];

const englishResearchFoundationCourses: CurriculumCourse[] = [
  { name: "Viết nghiên cứu", englishName: "Research Writing", credits: 4 },
  { name: "Dẫn luận Ngôn ngữ học ứng dụng", englishName: "Introduction to Applied Linguistics", credits: 3 },
  { name: "Chuyên đề về Nghiên cứu định lượng và định tính", englishName: "Seminar on Quantitative and Qualitative Research", credits: 4 },
  { name: "Thụ đắc ngôn ngữ thứ hai", englishName: "Seminar on Second Language Acquisition", credits: 3 },
  { name: "Tiếng Anh toàn cầu", englishName: "World Englishes", credits: 3, elective: true },
  { name: "Giao tiếp giao văn hoá", englishName: "Cross-cultural communication", credits: 3, elective: true },
  { name: "Ngôn ngữ học đối chiếu", englishName: "Contrastive Linguistics", credits: 3, elective: true },
  { name: "Ngôn ngữ Máy tính", englishName: "Computational Linguistics", credits: 3, elective: true },
  { name: "CNTT trong giảng dạy ngôn ngữ", englishName: "IT in Foreign Language Teaching", credits: 3, elective: true },
];

const englishResearchSpecialisedCourses: CurriculumCourse[] = [
  { name: "Phương pháp Giảng dạy Ngôn ngữ nâng cao", englishName: "Seminar on Advanced Methods of Teaching Language", credits: 3 },
  { name: "Chuyên đề về Phân tích diễn ngôn", englishName: "Seminar on Discourse Analysis", credits: 3 },
  { name: "Ngôn ngữ học tri nhận", englishName: "Cognitive Linguistics", credits: 3 },
  { name: "Phát triển Chương trình giảng dạy", englishName: "Curriculum Development", credits: 3 },
  { name: "Thực hành giảng dạy ngôn ngữ", englishName: "Practice of Language Teaching", credits: 3 },
  { name: "Ngôn ngữ học xã hội", englishName: "Sociolinguistics", credits: 3, elective: true },
  { name: "Cấu trúc ngôn ngữ", englishName: "Structuralism in Linguistics", credits: 3, elective: true },
  { name: "Ngữ dụng học", englishName: "Pragmatics", credits: 3, elective: true },
  { name: "Tiếng Anh chuyên ngành", englishName: "English for Specific Purposes", credits: 3, elective: true },
  { name: "Lý thuyết dịch", englishName: "Advanced Translation Theories", credits: 3, elective: true },
  { name: "Kiểm tra và đánh giá ngôn ngữ", englishName: "Language Testing and Evaluation", credits: 3, elective: true },
  { name: "Thực tập tại doanh nghiệp", englishName: "Teaching Practicum", credits: 3, elective: true },
];

const prGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
];

const prAppliedFoundationCourses: CurriculumCourse[] = [
  { name: "Kỹ thuật truyền thông", englishName: "Media Technologies", credits: 3 },
  { name: "Đạo đức, luật pháp và Quy định truyền thông", englishName: "Media Law And Regulation", credits: 3 },
  { name: "Chiến lược Quan hệ Công chúng", englishName: "Public Relations Campaign Planning and Execution", credits: 4 },
];

const prAppliedSpecialisedCourses: CurriculumCourse[] = [
  { name: "Truyền thông số", englishName: "Digital Media and Public Relations", credits: 4 },
  { name: "Công chúng truyền thông", englishName: "Media Audiences and Users", credits: 3 },
  { name: "Phát triển nội dung Quan hệ Công chúng", englishName: "Public Relations Writing and Content Creation", credits: 3 },
  { name: "Quản trị danh tiếng và khủng hoảng", englishName: "Crisis and Reputation Management", credits: 3 },
  { name: "Quản trị kinh tế truyền thông", englishName: "Media Economics", credits: 3 },
  { name: "Thực tập 1: Trải nghiệm quốc tế truyền thông", credits: 2 },
  { name: "Thực tập 2: Thực tập tại doanh nghiệp", credits: 4 },
  { name: "Truyền thông và lãnh đạo", englishName: "Communications and Leadership", credits: 3, elective: true },
  { name: "Thẩm định tin tức", englishName: "Media Literacy", credits: 3, elective: true },
  { name: "Lý thuyết Quan hệ công chúng đương đại", englishName: "Contemporary Public Relations Theory", credits: 3, elective: true },
  { name: "Truyền thông toàn cầu", englishName: "Global Communication Theories and Application", credits: 3, elective: true },
  { name: "Truyền thông sức khoẻ", englishName: "Health Communication and Advocacy", credits: 3, elective: true },
  { name: "Quan hệ giới truyền thông", englishName: "Media Relations", credits: 3, elective: true },
  { name: "Quan hệ nội bộ và Nhà đầu tư", englishName: "Employee and Investor Relations", credits: 3, elective: true },
  { name: "Quan hệ công chúng trong tổ chức Phi chính phủ", englishName: "Public Relations and Advocacy for Nonprofit Organizations", credits: 3, elective: true },
  { name: "Thuyết trình chuyên nghiệp", englishName: "Academic and professional presentation skills", credits: 3, elective: true },
  { name: "Quản trị thương hiệu cá nhân", englishName: "Personal Branding Management", credits: 3, elective: true },
  { name: "Truyền thông đa phương tiện", englishName: "Creative Media Design & Expression", credits: 3, elective: true },
];

const prResearchFoundationCourses: CurriculumCourse[] = [
  { name: "Lý thuyết Quan hệ công chúng đương đại", englishName: "Contemporary Public Relations Theory", credits: 3 },
  { name: "Nghiên cứu Quan hệ Công chúng", englishName: "Research on Public Relations", credits: 3 },
  { name: "Đạo đức, luật pháp và Quy định truyền thông", englishName: "Media Law And Regulation", credits: 3 },
  { name: "Chiến lược Quan hệ Công chúng", englishName: "Public Relations Campaign Planning and Execution", credits: 3 },
];

const prResearchSpecialisedCourses: CurriculumCourse[] = [
  { name: "Truyền thông số", englishName: "Digital Media and Public Relations", credits: 3 },
  { name: "Công chúng truyền thông", englishName: "Media Audiences and Users", credits: 3 },
  { name: "Quản trị danh tiếng và khủng hoảng", englishName: "Crisis and Reputation Management", credits: 3 },
  { name: "Quản trị kinh tế truyền thông", englishName: "Media Economics", credits: 3 },
  { name: "Trải nghiệm quốc tế Truyền thông", credits: 2 },
  { name: "Truyền thông và lãnh đạo", englishName: "Communications and Leadership", credits: 3, elective: true },
  { name: "Thẩm định tin tức", englishName: "Media Literacy", credits: 3, elective: true },
  { name: "Kỹ thuật truyền thông", englishName: "Media Technologies", credits: 3, elective: true },
  { name: "Truyền thông toàn cầu", englishName: "Global Communication Theories and Application", credits: 3, elective: true },
  { name: "Quan hệ giới truyền thông", englishName: "Media Relations", credits: 3, elective: true },
  { name: "Quan hệ nội bộ và Nhà đầu tư", englishName: "Employee and Investor Relations", credits: 3, elective: true },
  { name: "Quan hệ công chúng trong tổ chức Phi chính phủ", englishName: "Public Relations and Advocacy for Nonprofit Organizations", credits: 3, elective: true },
  { name: "Phát triển nội dung Quan hệ Công chúng", englishName: "Public Relations Writing and Content Creation", credits: 3, elective: true },
  { name: "Thuyết trình chuyên nghiệp", englishName: "Academic and professional presentation skills", credits: 3, elective: true },
  { name: "Quản trị thương hiệu cá nhân", englishName: "Personal Branding Management", credits: 3, elective: true },
  { name: "Truyền thông sức khoẻ", englishName: "Health Communication and Advocacy", credits: 3, elective: true },
  { name: "Báo chí", englishName: "Understanding Journalism", credits: 3, elective: true },
  { name: "Quảng cáo và tiếp thị kỹ thuật số", englishName: "Advertising and Promotion in the Digital Age", credits: 3, elective: true },
  { name: "Truyền thông đa phương tiện", englishName: "Creative Media Design & Expression", credits: 3, elective: true },
];

const appliedArtsGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 3 },
];

const appliedArtsFoundationCourses: CurriculumCourse[] = [
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Scientific Research Methods", credits: 3 },
  { name: "Văn hóa dân tộc học nghệ thuật", englishName: "Ethnology for Artistic Culture", credits: 3 },
  { name: "Mỹ thuật học", englishName: "Art Studies", credits: 3 },
  { name: "Thiết kế cộng đồng", englishName: "Social Design", credits: 3 },
  { name: "Thiết kế trải nghiệm người dùng", englishName: "User Experience Design", credits: 3 },
  { name: "Phương pháp nghiên cứu lịch sử Mỹ thuật", englishName: "Methods of Studying History of Arts", credits: 3, elective: true },
  { name: "Tâm lý thiết kế", englishName: "Psychology of Design", credits: 3, elective: true },
  { name: "Phương tiện truyền thông tích hợp", englishName: "Integrated Media", credits: 3, elective: true },
  { name: "Thiết kế sản phẩm tương tác", englishName: "Interaction Design", credits: 3, elective: true },
  { name: "Công nghệ và chất liệu", englishName: "Technology and Materials", credits: 3, elective: true },
  { name: "Tư duy thiết kế", englishName: "Design Thinking", credits: 3, elective: true },
];

const appliedArtsSpecialisedCourses: CurriculumCourse[] = [
  { name: "Phương pháp luận sáng tạo", englishName: "Creativity Methodology", credits: 3 },
  { name: "Lý thuyết văn hóa thị giác", englishName: "Theory of Visual Culture", credits: 3 },
  { name: "Cơ sở lý luận đề tài", englishName: "Thesis Proposal", credits: 2 },
  { name: "Phát triển sản phẩm", englishName: "Product Development", credits: 3, elective: true },
  { name: "Phân tích dữ liệu", englishName: "Data Analysis", credits: 3, elective: true },
  { name: "Thiết kế đương đại", englishName: "Contemporary Design", credits: 3, elective: true },
  { name: "Thiết kế bền vững", englishName: "Sustainable Design", credits: 3, elective: true },
  { name: "Workshop - Chuyên ngành thiết kế", englishName: "Specialized Design Workshop", credits: 3, elective: true },
  { name: "Lịch sử và thẩm mỹ công nghiệp", englishName: "Industrial Aesthetic History", credits: 3, elective: true },
];

const appliedArtsMandatoryRequirements: CurriculumCourse[] = [
  {
    name: "Hoàn thành bài báo thứ nhất đăng trên tạp chí khoa học",
    englishName: "First Scientific Journal Publication",
    credits: 0,
  },
  {
    name: "Chứng nhận trải nghiệm thực tiễn",
    englishName: "Certificate of International Practical Experience",
    credits: 0,
  },
  {
    name: "Chứng nhận tham gia 2 hội thảo khoa học hoặc triển lãm quốc tế phù hợp với chuyên ngành",
    englishName: "Certificates of Participation in Two International Scientific Conferences / Exhibitions",
    credits: 0,
  },
  {
    name: "Hoàn thành bài báo thứ hai đăng trên tạp chí khoa học",
    englishName: "Second Scientific Journal Publication",
    credits: 0,
  },
];

const appliedArtsGraduationCourses: CurriculumCourse[] = [
  { name: "Thực tập tốt nghiệp", englishName: "Internship", credits: 6 },
  { name: "Đề án tốt nghiệp", englishName: "Graduation Project", credits: 9 },
];

const artTheoryGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 3 },
];

const artTheoryFoundationCourses: CurriculumCourse[] = [
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
  { name: "Phương pháp luận sáng tạo", englishName: "Creativity Methodology", credits: 2 },
  { name: "Phương pháp nghiên cứu lịch sử Mỹ thuật", englishName: "Research Methodology of Fine Arts", credits: 3 },
  { name: "Lịch sử Design", englishName: "Design History", credits: 3 },
  { name: "Tư duy thiết kế", englishName: "Design Thinking", credits: 3 },
  { name: "Mỹ thuật học", englishName: "Art Studies", credits: 3, elective: true },
  { name: "Lý luận và phê bình Mỹ thuật ứng dụng", englishName: "Art theory and criticism", credits: 3, elective: true },
  { name: "Văn hóa dân tộc học nghệ thuật", englishName: "Ethnographic culture", credits: 3, elective: true },
  { name: "Đồ án thiết kế cộng đồng", englishName: "Social design project", credits: 3, elective: true },
  { name: "Chuyên đề công nghệ", englishName: "Thematic of technology", credits: 3, elective: true },
  { name: "Lý luận dạy học đại học", englishName: "Theory of university teaching", credits: 3, elective: true },
  { name: "Lý thuyết văn hoá thị giác", englishName: "Theory of visual culture", credits: 2, elective: true },
  { name: "Nghiên cứu lịch sử Mỹ thuật thế giới", englishName: "The world art history", credits: 3, elective: true },
];

const artTheorySpecialisedCourses: CurriculumCourse[] = [
  { name: "Lịch sử và Thẩm mỹ Công nghiệp", englishName: "Industrial Aesthetic History", credits: 3 },
  { name: "Cơ sở lý luận đề tài", englishName: "Premis of Thesis", credits: 3 },
  { name: "Lý luận Mỹ thuật ứng dụng Việt Nam", englishName: "Theory of Applied Art in Vietnam", credits: 2 },
  { name: "Nghiên cứu chuyên đề", englishName: "Thematic Research", credits: 3 },
  { name: "Mỹ thuật ứng dụng Đông Nam Á", englishName: "Applied Arts in Southeast Asian", credits: 3, elective: true },
  { name: "Mỹ thuật và môi trường", englishName: "Art and Environment", credits: 3, elective: true },
  { name: "Phương pháp luận design", englishName: "Design Methodology", credits: 3, elective: true },
  { name: "Chuyên đề phát triển sản phẩm", englishName: "Product development Theme", credits: 3, elective: true },
  { name: "Workshop - Thiết kế bền vững", englishName: "Workshop - sustainable design", credits: 3, elective: true },
  { name: "Dự án thiết kế trải nghiệm người dùng", englishName: "User Experience", credits: 3, elective: true },
];

const artTheoryGraduationCourses: CurriculumCourse[] = [
  { name: "Luận văn tốt nghiệp", englishName: "Thesis", credits: 15 },
];

const biotechnologyFoundationCourses: CurriculumCourse[] = [
  { name: "Hóa sinh trong sức khỏe và bệnh tật", credits: 3 },
  { name: "Tin sinh học ứng dụng", credits: 3 },
  { name: "Miễn dịch học ứng dụng", credits: 3 },
  { name: "Truyền tải tín hiệu ở tế bào", credits: 3 },
  { name: "Liệu pháp gene", credits: 3 },
];

const biotechnologySpecialisedCourses: CurriculumCourse[] = [
  { name: "Liệu pháp tế bào", credits: 3, elective: true },
  { name: "Vắc xin", credits: 3, elective: true },
  { name: "Chẩn đoán phân tử", credits: 3, elective: true },
  { name: "Sinh học ung thư", credits: 3, elective: true },
  { name: "Cơ sở phân tử trong tương tác vật chủ - tác nhân gây bệnh", credits: 3, elective: true },
  { name: "Vi sinh vật học ứng dụng trong sản xuất", credits: 3, elective: true },
  { name: "Công nghệ sinh học nano", credits: 3, elective: true },
  { name: "Công nghệ sinh học và phát triển bền vững", credits: 3, elective: true },
  { name: "Đổi mới sáng tạo trong công nghệ sinh học", credits: 3, elective: true },
];

const architectureCoreCourses: CurriculumCourse[] = [
  { name: "Lý thuyết và thực hành kiến trúc đương đại", credits: 2 },
  { name: "Kiến trúc và Thiết kế bền vững", credits: 2 },
  {
    name: "Mô hình thông tin công trình (BIM) trong thiết kế và quản lý công trình kiến trúc",
    credits: 2,
  },
  { name: "Lý luận bảo tồn di sản văn hóa – kiến trúc", credits: 2 },
  { name: "Đồ án thiết kế kiến trúc nâng cao", credits: 3 },
  { name: "Đồ án Hình thái đô thị và kiến trúc", credits: 3 },
  { name: "Tham quan – phân tích, đánh giá và phê bình kiến trúc", credits: 2 },
  { name: "Lý thuyết tổ hợp không gian kiến trúc hiện đại", credits: 2, elective: true },
  { name: "Kiến trúc cảnh quan", credits: 2, elective: true },
  { name: "Mối quan hệ giữa kiến trúc và các ngành nghệ thuật khác", credits: 2, elective: true },
  { name: "Tổ chức không gian kiến trúc môi trường ở", credits: 2, elective: true },
  { name: "Lý thuyết và ứng dụng Hình Thái học đô thị", credits: 2, elective: true },
  { name: "Thiết kế đô thị", credits: 2, elective: true },
  { name: "Lý luận phát triển không gian đô thị", credits: 2, elective: true },
  { name: "Tổ chức môi trường dịch vụ công cộng đô thị", credits: 2, elective: true },
  { name: "Lý luận quy hoạch vùng và đô thị", credits: 2, elective: true },
  { name: "Quản lý quy hoạch, kiến trúc và xây dựng", credits: 2, elective: true },
  { name: "Kiến trúc bền vững: mô phỏng và thiết kế công trình", credits: 2, elective: true },
  { name: "Công trình xanh: thiết kế và tiêu chuẩn đánh giá", credits: 2, elective: true },
  { name: "Công nghệ mới trong kỹ thuật công trình", credits: 2, elective: true },
];

const architectureGraduationCourses: CurriculumCourse[] = [
  { name: "Vật liệu và công nghệ xây dựng mới", credits: 2, elective: true },
  { name: "Quản lý và phát triển dự án kiến trúc", credits: 6 },
  { name: "Thực tập 1 (Chuyên gia và năng lực quản lý chuyên ngành)", credits: 6 },
  { name: "Thực tập 2 (Dự án nghiên cứu và Đề cương tốt nghiệp)", credits: 3 },
  { name: "Đề án tốt nghiệp", credits: 9 },
];

const automotiveGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 3 },
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Scientific Research Methods", credits: 3 },
];

const automotiveAppliedFoundationCourses: CurriculumCourse[] = [
  { name: "Công nghệ chế tạo và lắp ráp ô tô hiện đại", englishName: "Advanced Automotive Manufacturing and Assembly Technology", credits: 3 },
  { name: "Phương pháp phần tử hữu hạn", englishName: "Finite Element Method (FEM)", credits: 3 },
  { name: "Tính toán và tối ưu hóa thiết kế hệ thống ô tô", englishName: "Automotive Systems Design and Optimization", credits: 3 },
  { name: "Động lực học ô tô nâng cao", englishName: "Advanced Vehicle Dynamics", credits: 3 },
  { name: "Kỹ thuật va chạm ô tô và phân tích an toàn", englishName: "Automotive Crash Engineering and Safety Analysis", credits: 3 },
  { name: "Mô phỏng và mô hình hóa trong thiết kế ô tô", englishName: "Modeling and Simulation in Automotive Design", credits: 3 },
  { name: "Công nghệ chẩn đoán và sửa chữa ô tô hiện đại", englishName: "Advanced Automotive Diagnostics and Repair", credits: 3 },
  { name: "Công nghệ tái chế và quản lý bền vững trong ngành ô tô", englishName: "Recycling and Sustainable Management in the Automotive Industry", credits: 3 },
];

const automotiveResearchFoundationCourses: CurriculumCourse[] = [
  { name: "Công nghệ chế tạo và lắp ráp ô tô hiện đại", englishName: "Advanced Automotive Manufacturing and Assembly Technology", credits: 3 },
  { name: "Phương pháp phần tử hữu hạn", englishName: "Finite Element Method (FEM)", credits: 3 },
  { name: "Tính toán và tối ưu hóa thiết kế hệ thống ô tô", englishName: "Automotive Systems Design and Optimization", credits: 3 },
  { name: "Động lực học ô tô nâng cao", englishName: "Advanced Vehicle Dynamics", credits: 3 },
  { name: "Kỹ thuật va chạm ô tô và phân tích an toàn", englishName: "Automotive Crash Engineering and Safety Analysis", credits: 3 },
  { name: "Mô phỏng và mô hình hóa trong thiết kế ô tô", englishName: "Modeling and Simulation in Automotive Design", credits: 3 },
  { name: "Công nghệ chẩn đoán và sửa chữa ô tô hiện đại", englishName: "Advanced Automotive Diagnostics and Repair", credits: 3 },
  { name: "Vi xử lý và hệ thống nhúng trong ô tô", englishName: "Microprocessors and Embedded Systems in Automotive Applications", credits: 3 },
];

const automotiveAppliedSpecialisedCourses: CurriculumCourse[] = [
  { name: "Mô phỏng và tối ưu hóa hệ thống động lực học ô tô", englishName: "Simulation and Optimization of Vehicle Dynamic Systems", credits: 3 },
  { name: "Công nghệ pin và quản lý năng lượng trong xe điện", englishName: "Battery Technology and Energy Management in Electric Vehicles", credits: 3 },
  { name: "Vi xử lý và hệ thống nhúng trong ô tô", englishName: "Microprocessors and Embedded Systems in Automotive Applications", credits: 3 },
  { name: "Công nghệ xe điện (EV), xe lai và trạm sạc", englishName: "Electric Vehicles (EVs), Hybrids, and Charging Station Technologies", credits: 3 },
  { name: "AI và ứng dụng Deep Learning trong kỹ thuật ô tô", englishName: "AI and Deep Learning Applications in Automotive Engineering", credits: 3 },
  { name: "Công nghệ vật liệu mới dùng trên ô tô", englishName: "Advanced Automotive Materials Technology", credits: 3, elective: true },
  { name: "Nhiên liệu và năng lượng tái tạo trong giao thông vận tải", englishName: "Renewable Fuels and Sustainable Energy in Transportation", credits: 3, elective: true },
  { name: "Động học lưu chất tính toán (CFD)", englishName: "Computational Fluid Dynamics (CFD) in Vehicle Design", credits: 3, elective: true },
  { name: "Quản lý kỹ thuật và dịch vụ trong ngành công nghiệp ô tô", englishName: "Engineering and Service Management in the Automotive Industry", credits: 3, elective: true },
  { name: "Xe tự hành và các công nghệ liên quan", englishName: "Autonomous Vehicles Technologies", credits: 3, elective: true },
  { name: "Hệ thống giao thông thông minh và công nghệ kết nối", englishName: "Smart Transportation Systems and Connectivity Technologies", credits: 3, elective: true },
  { name: "Hệ thống điện - điện tử ô tô hiện đại", englishName: "Advanced Automotive Electrical and Electronic Systems", credits: 3, elective: true },
];

const automotiveResearchSpecialisedCourses: CurriculumCourse[] = [
  { name: "Mô phỏng và tối ưu hóa hệ thống động lực học ô tô", englishName: "Simulation and Optimization of Vehicle Dynamic Systems", credits: 3 },
  { name: "Công nghệ pin và quản lý năng lượng trong xe điện", englishName: "Battery Technology and Energy Management in Electric Vehicles", credits: 3 },
  { name: "Công nghệ xe điện (EV), xe lai và trạm sạc", englishName: "Electric Vehicles (EVs), Hybrids, and Charging Station Technologies", credits: 3 },
  { name: "Công nghệ tái chế và quản lý bền vững trong ngành ô tô", englishName: "Recycling and Sustainable Management in the Automotive Industry", credits: 3, elective: true },
  { name: "Công nghệ vật liệu mới dùng trên ô tô", englishName: "Advanced Automotive Materials Technology", credits: 3, elective: true },
  { name: "Nhiên liệu và năng lượng tái tạo trong giao thông vận tải", englishName: "Renewable Fuels and Sustainable Energy in Transportation", credits: 3, elective: true },
  { name: "Quản lý kỹ thuật và dịch vụ trong ngành công nghiệp ô tô", englishName: "Engineering and Service Management in the Automotive Industry", credits: 3, elective: true },
  { name: "Hệ thống giao thông thông minh và công nghệ kết nối", englishName: "Smart Transportation Systems and Connectivity Technologies", credits: 3, elective: true },
  { name: "Hệ thống điện - điện tử ô tô hiện đại", englishName: "Advanced Automotive Electrical and Electronic Systems", credits: 3, elective: true },
  { name: "Động học lưu chất tính toán (CFD)", englishName: "Computational Fluid Dynamics (CFD) in Vehicle Design", credits: 3, elective: true },
  { name: "Xe tự hành và các công nghệ liên quan", englishName: "Autonomous Vehicles Technologies", credits: 3, elective: true },
  { name: "AI và ứng dụng Deep Learning trong kỹ thuật ô tô", englishName: "AI and Deep Learning Applications in Automotive Engineering", credits: 3, elective: true },
];

const civilEngineeringSharedCourses: CurriculumCourse[] = [
  { name: "Triết học nâng cao", credits: 3 },
  { name: "Động lực học kết cấu và động đất", credits: 3 },
  { name: "Quản lý dự án đầu tư và xây dựng", credits: 3 },
  { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
  { name: "Kết cấu liên hợp", credits: 3, elective: true },
  { name: "Quan trắc và biến dạng công trình", credits: 3, elective: true },
  { name: "Phân tích định lượng trong quản lý xây dựng", credits: 3, elective: true },
  { name: "Kết cấu bê tông cốt thép nâng cao", credits: 3 },
  { name: "Công nghệ xây dựng và xu thế phát triển", credits: 3 },
  { name: "Phương pháp phần tử hữu hạn trong phân tích kết cấu", credits: 3 },
  { name: "Cơ kết cấu nâng cao", credits: 3, elective: true },
  { name: "Kết cấu cao tầng và tải trọng ngang", credits: 3, elective: true },
  { name: "Sửa chữa và nâng cấp công trình", credits: 3, elective: true },
  { name: "Kiểm định khai thác và thí nghiệm kết cấu công trình", credits: 3, elective: true },
  { name: "Kết cấu bê tông cốt thép ứng lực trước", credits: 3, elective: true },
  { name: "Quản lý An toàn và môi trường trong xây dựng", credits: 3, elective: true },
  { name: "Kết cấu thép nâng cao", credits: 3 },
  { name: "Kỹ thuật nền móng nâng cao", credits: 3 },
  { name: "Ứng dụng tin học trong nghiên cứu", credits: 3 },
  { name: "Quản lý dự án xây dựng nâng cao", credits: 3 },
  { name: "Kết cấu tấm và vỏ", credits: 3 },
];

const civilEngineeringAppliedCourses: CurriculumCourse[] = [
  ...civilEngineeringSharedCourses,
  { name: "Thực tập chuyên ngành", credits: 3 },
  { name: "Quản lý tài chính trong Doanh nghiệp xây dựng nâng cao", credits: 3 },
  { name: "Đề án tốt nghiệp", credits: 9 },
  { name: "Chuyên đề tự chọn 1", credits: 3, elective: true },
  { name: "Chuyên đề tự chọn 2", credits: 3, elective: true },
  { name: "Quản lý rủi ro trong xây dựng nâng cao", credits: 3, elective: true },
  { name: "Kinh tế đầu tư xây dựng nâng cao", credits: 3, elective: true },
];

const civilEngineeringResearchCourses: CurriculumCourse[] = [
  ...civilEngineeringSharedCourses,
  { name: "Chuyên đề tự chọn 1", credits: 3, elective: true },
  { name: "Chuyên đề tự chọn 1", credits: 3, elective: true },
  { name: "Quản lý dự án xây dựng nâng cao", credits: 3, elective: true },
  { name: "Kết cấu tấm và vỏ", credits: 3, elective: true },
  { name: "Quản lý tài chính trong Doanh nghiệp xây dựng nâng cao", credits: 3, elective: true },
  { name: "Chuyên đề tự chọn 2", credits: 3, elective: true },
  { name: "Quản lý rủi ro trong xây dựng nâng cao", credits: 3, elective: true },
  { name: "Thực tập chuyên ngành", credits: 3, elective: true },
  { name: "Luận văn tốt nghiệp", credits: 15 },
];

const specialisedCourses: Record<string, string[]> = {
  "khoa-hoc-moi-truong": [
    "Phân tích hệ thống môi trường",
    "Sinh thái học nâng cao",
    "Quản trị rủi ro môi trường",
    "Mô hình hóa và dự báo môi trường",
  ],
  "ky-thuat-moi-truong": [
    "Các quá trình xử lý bậc cao",
    "Kiểm soát ô nhiễm không khí nâng cao",
    "Công nghệ xử lý nước thải bậc cao",
    "Công nghệ tái chế chất thải rắn",
  ],
  "quan-ly-tai-nguyen-moi-truong": [
    "Quản lý tổng hợp tài nguyên",
    "Chính sách môi trường",
    "Kinh tế tài nguyên và môi trường",
    "Quy hoạch môi trường",
  ],
  "cong-nghe-sinh-hoc": [
    "Sinh học phân tử nâng cao",
    "Công nghệ gen",
    "Tin sinh học",
    "Công nghệ sinh học ứng dụng",
  ],
  "ky-thuat-xay-dung": [
    "Kết cấu công trình nâng cao",
    "Quản lý dự án xây dựng",
    "Vật liệu xây dựng mới",
    "Mô hình thông tin công trình",
  ],
  "ky-thuat-o-to": [
    "Động lực học ô tô",
    "Điều khiển điện tử ô tô",
    "Công nghệ xe điện",
    "Chẩn đoán và bảo trì thông minh",
  ],
  "quan-tri-kinh-doanh": [
    "Quản trị chiến lược",
    "Lãnh đạo và hành vi tổ chức",
    "Quản trị đổi mới",
    "Phân tích kinh doanh",
  ],
  "kinh-doanh-thuong-mai": [
    "Chiến lược thương mại",
    "Quản trị bán lẻ",
    "Thương mại điện tử",
    "Kinh doanh quốc tế",
  ],
  "tai-chinh-ngan-hang": [
    "Quản trị tài chính nâng cao",
    "Phân tích đầu tư",
    "Quản trị rủi ro ngân hàng",
    "Công nghệ tài chính",
  ],
  "ke-toan": [
    "Kế toán quản trị nâng cao",
    "Phân tích báo cáo tài chính",
    "Kiểm toán nâng cao",
    "Hệ thống thông tin kế toán",
  ],
  logistics: [
    "Quản trị chuỗi cung ứng",
    "Vận tải đa phương thức",
    "Phân tích dữ liệu logistics",
    "Thiết kế mạng lưới phân phối",
  ],
  "quan-tri-du-lich": [
    "Quản trị điểm đến",
    "Marketing du lịch",
    "Du lịch bền vững",
    "Thiết kế trải nghiệm du khách",
  ],
  "quan-tri-khach-san": [
    "Quản trị vận hành khách sạn",
    "Quản trị doanh thu",
    "Quản trị dịch vụ cao cấp",
    "Đổi mới trải nghiệm khách hàng",
  ],
  "luat-kinh-te": [
    "Pháp luật doanh nghiệp nâng cao",
    "Pháp luật thương mại quốc tế",
    "Giải quyết tranh chấp kinh doanh",
    "Quản trị tuân thủ",
  ],
  "quan-he-cong-chung": [
    "Chiến lược quan hệ công chúng",
    "Quản trị danh tiếng",
    "Truyền thông khủng hoảng",
    "Phân tích dữ liệu truyền thông",
  ],
  "ngon-ngu-anh": [
    "Ngôn ngữ học ứng dụng",
    "Phân tích diễn ngôn",
    "Phương pháp giảng dạy tiếng Anh",
    "Giao tiếp liên văn hóa",
  ],
  "kien-truc": [
    "Lý luận kiến trúc đương đại",
    "Thiết kế đô thị",
    "Kiến trúc bền vững",
    "Công nghệ số trong kiến trúc",
  ],
  "my-thuat-ung-dung": [
    "Phương pháp sáng tác",
    "Thiết kế và văn hóa thị giác",
    "Nghệ thuật số",
    "Quản trị dự án sáng tạo",
  ],
  "ly-luan-lich-su-my-thuat": [
    "Lý luận mỹ thuật nâng cao",
    "Lịch sử mỹ thuật Việt Nam",
    "Phê bình nghệ thuật",
    "Phương pháp nghiên cứu mỹ thuật",
  ],
};

export function getProgrammeCurricula(programme: Programme): CurriculumTrack[] {
  if (programme.id === "khoa-hoc-moi-truong") {
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

  if (programme.id === "quan-tri-kinh-doanh") {
    const sharedGroups: CurriculumGroup[] = [
      {
        title: "Kiến thức chung",
        englishTitle: "General knowledge",
        courses: businessAdministrationGeneralCourses,
      },
      {
        title: "Kiến thức cơ sở",
        englishTitle: "Foundation knowledge",
        courses: businessAdministrationFoundationCourses,
      },
    ];

    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          ...sharedGroups,
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: [
              ...businessAdministrationCoreCourses,
              ...businessAdministrationAppliedElectiveCourses,
            ],
          },
          {
            title: "Tốt nghiệp",
            englishTitle: "Graduation requirements",
            courses: [
              { name: "Thực tập tốt nghiệp 1", englishName: "Internship 1", credits: 2 },
              { name: "Thực tập tốt nghiệp 2", englishName: "Internship 2", credits: 4 },
              { name: "Đề án tốt nghiệp", englishName: "Final Project", credits: 9 },
            ],
          },
        ],
      },
      {
        number: "06",
        title: "Chương trình đào tạo nghiên cứu",
        subtitle: "Research curriculum",
        groups: [
          ...sharedGroups,
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: [
              ...businessAdministrationCoreCourses,
              ...businessAdministrationResearchElectiveCourses,
            ],
          },
          {
            title: "Tốt nghiệp",
            englishTitle: "Graduation requirements",
            courses: [
              { name: "Luận văn tốt nghiệp", englishName: "Thesis", credits: 15 },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "kinh-doanh-thuong-mai") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: commercialBusinessGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: commercialBusinessFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: commercialBusinessSpecialisedCourses,
          },
          {
            title: "Tốt nghiệp",
            englishTitle: "Graduation Project",
            courses: commercialBusinessGraduationCourses,
          },
        ],
      },
    ];
  }

  if (programme.id === "tai-chinh-ngan-hang") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: financeBankingAppliedGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: financeBankingAppliedFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: financeBankingSpecialisedCourses,
          },
          {
            title: "Tốt nghiệp",
            englishTitle: "Graduation requirements",
            courses: [
              {
                name: "Thực tập (Báo cáo thực tập và Đề cương Đề án)",
                englishName: "Internship (Internship Report and Project Outline)",
                credits: 6,
              },
              {
                name: "Đề án tốt nghiệp",
                englishName: "Final Project",
                credits: 9,
              },
            ],
          },
        ],
      },
      {
        number: "06",
        title: "Chương trình đào tạo nghiên cứu",
        subtitle: "Research curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: financeBankingResearchGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: financeBankingResearchFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: financeBankingSpecialisedCourses,
          },
          {
            title: "Tốt nghiệp",
            englishTitle: "Graduation requirements",
            courses: [
              {
                name: "Luận văn tốt nghiệp",
                englishName: "Master's thesis",
                credits: 12,
              },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "ke-toan") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: accountingGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: accountingFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: accountingSpecialisedCourses,
          },
          {
            title: "Chuyên đề, Thực tập & Đề án tốt nghiệp",
            englishTitle: "Capstone, Internship & Graduation Project",
            courses: accountingGraduationCourses,
          },
        ],
      },
    ];
  }

  if (programme.id === "quan-tri-du-lich") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: tourismGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: tourismFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: tourismAppliedSpecialisedCourses,
          },
          {
            title: "Kiến thức ứng dụng",
            englishTitle: "Applied knowledge",
            courses: tourismAppliedGraduationCourses,
          },
        ],
      },
      {
        number: "06",
        title: "Chương trình đào tạo nghiên cứu",
        subtitle: "Research curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: tourismGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: tourismFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: tourismResearchSpecialisedCourses,
          },
          {
            title: "Kiến thức nghiên cứu",
            englishTitle: "Research knowledge",
            courses: tourismResearchGraduationCourses,
          },
        ],
      },
    ];
  }

  if (programme.id === "quan-tri-khach-san") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: tourismGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: tourismFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: hospitalityAppliedSpecialisedCourses,
          },
          {
            title: "Kiến thức ứng dụng",
            englishTitle: "Applied knowledge",
            courses: tourismAppliedGraduationCourses,
          },
        ],
      },
      {
        number: "06",
        title: "Chương trình đào tạo nghiên cứu",
        subtitle: "Research curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: tourismGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: tourismFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: hospitalityResearchSpecialisedCourses,
          },
          {
            title: "Kiến thức nghiên cứu",
            englishTitle: "Research knowledge",
            courses: hospitalityResearchGraduationCourses,
          },
        ],
      },
    ];
  }

  if (programme.id === "luat-kinh-te") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: economicLawGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở ngành và chuyên ngành",
            englishTitle: "Major Foundation Knowledge & Specialized Knowledge",
            courses: economicLawSpecialisedCourses,
          },
          {
            title: "Kiến thức ứng dụng/Nghiên cứu khoa học",
            englishTitle: "Applied and Research Knowledge",
            courses: economicLawGraduationCourses,
          },
        ],
      },
    ];
  }

  if (programme.id === "ngon-ngu-anh") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: englishGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: englishAppliedFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: englishAppliedSpecialisedCourses,
          },
          {
            title: "Tốt nghiệp",
            englishTitle: "Graduation requirements",
            courses: [
              { name: "Đề án tốt nghiệp", englishName: "Graduation Project", credits: 9 },
            ],
          },
        ],
      },
      {
        number: "06",
        title: "Chương trình đào tạo nghiên cứu",
        subtitle: "Research curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: englishGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: englishResearchFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: englishResearchSpecialisedCourses,
          },
          {
            title: "Tốt nghiệp",
            englishTitle: "Graduation requirements",
            courses: [
              { name: "Luận văn tốt nghiệp", englishName: "Thesis", credits: 12 },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "quan-he-cong-chung") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: prGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: prAppliedFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: prAppliedSpecialisedCourses,
          },
          {
            title: "Tốt nghiệp",
            englishTitle: "Graduation requirements",
            courses: [
              { name: "Đề án tốt nghiệp", englishName: "Graduation Project", credits: 9 },
            ],
          },
        ],
      },
      {
        number: "06",
        title: "Chương trình đào tạo nghiên cứu",
        subtitle: "Research curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: prGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: prResearchFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: prResearchSpecialisedCourses,
          },
          {
            title: "Tốt nghiệp",
            englishTitle: "Graduation requirements",
            courses: [
              { name: "Luận văn tốt nghiệp", englishName: "Thesis", credits: 13 },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "logistics") {
    const sharedGroups: CurriculumGroup[] = [
      {
        title: "Kiến thức chung",
        englishTitle: "General knowledge",
        courses: [
          { name: "Triết học", englishName: "Philosophy", credits: 3 },
          { name: "Phương pháp nghiên cứu khoa học", englishName: "Scientific Research Methods", credits: 3 },
        ],
      },
      {
        title: "Kiến thức cơ sở",
        englishTitle: "Foundation knowledge",
        courses: [
          { name: "Kỹ thuật hệ thống", englishName: "Systems Engineering", credits: 3 },
          { name: "Kinh tế kỹ thuật", englishName: "Engineering Economy", credits: 3 },
          { name: "Vận trù học", englishName: "Operations Research", credits: 3 },
          { name: "Thống kê trong công nghiệp", englishName: "Industrial Statistics", credits: 3 },
          { name: "Kiểm soát và quản lý chất lượng", englishName: "Quality Control and Management", credits: 3 },
        ],
      },
      {
        title: "Kiến thức chuyên ngành",
        englishTitle: "Specialised knowledge",
        courses: [
          { name: "Quản lý thu mua", englishName: "Procurement Management", credits: 3 },
          { name: "Quản lý vận tải Logistics", englishName: "Logistics Transportation Management", credits: 3 },
          { name: "Hoạch định tồn kho và vật tư", englishName: "Inventory and Warehouse Planning", credits: 3 },
          { name: "Tinh gọn trong chuỗi cung ứng", englishName: "Lean Management in Supply Chain Systems", credits: 3 },
          { name: "Hệ thống thông tin quản lý", englishName: "Management Information Systems", credits: 3, elective: true },
          { name: "Hoạch định nguồn lực ERP", englishName: "Enterprise Resources Planning", credits: 3, elective: true },
          { name: "Kỹ thuật thiết kế mặt bằng công nghiệp", englishName: "Facility Layout and Planning", credits: 3, elective: true },
          { name: "Đánh giá kinh tế và quản lý dự án", englishName: "Economic evaluation & Project management", credits: 3, elective: true },
          { name: "Kế toán quản trị", englishName: "Management Accounting", credits: 3, elective: true },
          { name: "Quản trị nguồn nhân lực", englishName: "Human Resources Management", credits: 3, elective: true },
        ],
      },
    ];

    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          ...sharedGroups,
          {
            title: "Thực tập tốt nghiệp và Đề án tốt nghiệp",
            englishTitle: "Graduation internship and graduation project",
            courses: [
              { name: "Thực tập tốt nghiệp", englishName: "Graduation Internship", credits: 6 },
              { name: "Đề án tốt nghiệp", englishName: "Graduation Project", credits: 9 },
            ],
          },
        ],
      },
      {
        number: "06",
        title: "Chương trình đào tạo nghiên cứu",
        subtitle: "Research curriculum",
        groups: [
          ...sharedGroups,
          {
            title: "Luận văn tốt nghiệp và chuyên đề nghiên cứu",
            englishTitle: "Graduation thesis and research seminars",
            courses: [
              { name: "Chuyên đề Quản lý chuỗi cung ứng 1", englishName: "Special topic on Supply Chain Management 1", credits: 6 },
              { name: "Chuyên đề Quản lý chuỗi cung ứng 2", englishName: "Special topic on Supply Chain Management 2", credits: 6 },
              { name: "Luận văn tốt nghiệp", englishName: "Graduation Thesis" },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "ky-thuat-o-to") {
    const generalKnowledge: CurriculumGroup = {
      title: "Kiến thức chung",
      englishTitle: "General knowledge",
      courses: automotiveGeneralCourses,
    };

    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          generalKnowledge,
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: automotiveAppliedFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: automotiveAppliedSpecialisedCourses,
          },
          {
            title: "Chuyên đề, thực tập và luận văn tốt nghiệp",
            englishTitle: "Special studies, internship and graduation requirements",
            courses: [
              {
                name: "Chuyên đề công nghệ mới trên ô tô",
                englishName: "Special Studies on Novel Automotive Technology",
                credits: 3,
              },
              {
                name: "Thực tập chuyên môn nâng cao",
                englishName: "Advanced Professional Internship",
                credits: 6,
              },
              {
                name: "Đề án tốt nghiệp",
                englishName: "Capstone project",
                credits: 6,
              },
            ],
          },
        ],
      },
      {
        number: "06",
        title: "Chương trình đào tạo nghiên cứu",
        subtitle: "Research curriculum",
        groups: [
          generalKnowledge,
          {
            title: "Kiến thức cơ sở",
            englishTitle: "Foundation knowledge",
            courses: automotiveResearchFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: automotiveResearchSpecialisedCourses,
          },
          {
            title: "Luận văn tốt nghiệp và chuyên đề nghiên cứu",
            englishTitle: "Graduation thesis and research seminars",
            courses: [
              {
                name: "Chuyên đề cơ sở ngành",
                englishName: "Special Studies on Automotive Engineering",
                credits: 3,
              },
              {
                name: "Chuyên đề công nghệ mới trên ô tô",
                englishName: "Special Studies on Novel Automotive Technology",
                credits: 3,
              },
              {
                name: "Luận văn tốt nghiệp",
                englishName: "Graduation Thesis",
                credits: 15,
              },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "ky-thuat-xay-dung") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        groups: [{ title: "Nội dung chương trình", courses: civilEngineeringAppliedCourses }],
      },
      {
        number: "06",
        title: "Chương trình đào tạo nghiên cứu",
        groups: [{ title: "Nội dung chương trình", courses: civilEngineeringResearchCourses }],
      },
    ];
  }

  if (programme.id === "kien-truc") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        groups: [
          {
            title: "Kiến thức chung",
            courses: [
              { name: "Triết học", credits: 3 },
              { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
            ],
          },
          { title: "Kiến thức cơ sở và chuyên ngành", courses: architectureCoreCourses },
          { title: "Thực tập và Đề án tốt nghiệp", courses: architectureGraduationCourses },
        ],
      },
    ];
  }

  if (programme.id === "my-thuat-ung-dung") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        subtitle: "Applied curriculum",
        groups: [
          {
            title: "Kiến thức chung",
            englishTitle: "General knowledge",
            courses: appliedArtsGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở ngành",
            englishTitle: "Foundation knowledge",
            courses: appliedArtsFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialised knowledge",
            courses: appliedArtsSpecialisedCourses,
          },
          {
            title: "Điều kiện bắt buộc",
            englishTitle: "Mandatory Requirements",
            courses: appliedArtsMandatoryRequirements,
          },
          {
            title: "Chuyên đề, Thực tập & Đề án tốt nghiệp",
            englishTitle: "Capstone, Internship & Graduation Project",
            courses: appliedArtsGraduationCourses,
          },
        ],
      },
    ];
  }

  if (programme.id === "ly-luan-lich-su-my-thuat") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo nghiên cứu",
        subtitle: "Research curriculum",
        groups: [
          {
            title: "Kiến thức chung của ngành",
            englishTitle: "General knowledge",
            courses: artTheoryGeneralCourses,
          },
          {
            title: "Kiến thức cơ sở ngành",
            englishTitle: "Major Foundation Knowledge",
            courses: artTheoryFoundationCourses,
          },
          {
            title: "Kiến thức chuyên ngành",
            englishTitle: "Specialized Knowledge",
            courses: artTheorySpecialisedCourses,
          },
          {
            title: "Luận văn tốt nghiệp",
            englishTitle: "Thesis",
            courses: artTheoryGraduationCourses,
          },
        ],
      },
    ];
  }

  if (programme.id === "cong-nghe-sinh-hoc") {
    return [
      {
        number: "05",
        title: "Chương trình đào tạo nghiên cứu",
        groups: [
          {
            title: "Kiến thức chung",
            courses: [
              { name: "Triết học", credits: 3 },
              { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
            ],
          },
          { title: "Kiến thức cơ sở", courses: biotechnologyFoundationCourses },
          { title: "Kiến thức chuyên ngành", courses: biotechnologySpecialisedCourses },
          {
            title: "Kiến thức Nghiên cứu khoa học",
            courses: [
              { name: "Chuyên đề nghiên cứu 1", credits: 6 },
              { name: "Chuyên đề nghiên cứu 2", credits: 6 },
              { name: "Luận văn", credits: 15 },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "quan-ly-tai-nguyen-moi-truong") {
    const sharedGroups: CurriculumGroup[] = [
      { title: "Kiến thức chung", courses: [{ name: "Triết học", credits: 3 }] },
      { title: "Kiến thức cơ sở", courses: resourceManagementFoundationCourses },
    ];
    const specialised = (proposal: string, includeAudit = false): CurriculumGroup => ({
      title: "Kiến thức chuyên ngành",
      courses: [
        ...resourceManagementRequiredCourses,
        { name: proposal, credits: 2 },
        ...(includeAudit ? [{ name: "Kiểm toán môi trường", credits: 2, elective: true }] : []),
        ...resourceManagementElectiveCourses,
      ],
    });

    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        groups: [
          ...sharedGroups,
          specialised("Đề cương thực hiện Đề án tốt nghiệp và bảo vệ đề cương"),
          {
            title: "Tốt nghiệp",
            courses: [
              { name: "Thực tập chuyên ngành", credits: 6 },
              { name: "Đề án tốt nghiệp", credits: 9 },
            ],
          },
        ],
      },
      {
        number: "06",
        title: "Chương trình đào tạo nghiên cứu",
        groups: [
          ...sharedGroups,
          specialised("Đề cương thực hiện Luận văn tốt nghiệp và bảo vệ đề cương", true),
          {
            title: "Tốt nghiệp",
            courses: [
              { name: "Chuyên đề nghiên cứu", credits: 15 },
              { name: "Luận văn tốt nghiệp", credits: 15 },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "ky-thuat-moi-truong") {
    const sharedGroups: CurriculumGroup[] = [
      { title: "Kiến thức chung", courses: [{ name: "Triết học", credits: 3 }] },
      { title: "Kiến thức cơ sở", courses: environmentalEngineeringFoundationCourses },
    ];

    return [
      {
        number: "05",
        title: "Chương trình đào tạo ứng dụng",
        groups: [
          ...sharedGroups,
          {
            title: "Kiến thức chuyên ngành",
            courses: [
              ...environmentalEngineeringSpecialisedCourses.slice(0, 5),
              {
                name: "Đề cương thực hiện Đề án tốt nghiệp và bảo vệ Đề cương",
                credits: 2,
              },
              ...environmentalEngineeringSpecialisedCourses.slice(5),
            ],
          },
          {
            title: "Tốt nghiệp",
            courses: [
              { name: "Thực tập chuyên ngành", credits: 6 },
              { name: "Đề án tốt nghiệp", credits: 9 },
            ],
          },
        ],
      },
      {
        number: "06",
        title: "Chương trình đào tạo nghiên cứu",
        groups: [
          ...sharedGroups,
          {
            title: "Kiến thức chuyên ngành",
            courses: [
              ...environmentalEngineeringSpecialisedCourses.slice(0, 5),
              {
                name: "Đề cương thực hiện Luận văn tốt nghiệp và bảo vệ Đề cương",
                credits: 2,
              },
              ...environmentalEngineeringSpecialisedCourses.slice(5),
            ],
          },
          {
            title: "Tốt nghiệp",
            courses: [
              { name: "Chuyên đề nghiên cứu", credits: 15 },
              { name: "Luận văn tốt nghiệp", credits: 15 },
            ],
          },
        ],
      },
    ];
  }

  const graduationCourses: CurriculumCourse[] =
    programme.degree === "Tiến sĩ"
      ? [
          { name: "Chuyên đề tiến sĩ", credits: 12 },
          { name: "Luận án tiến sĩ", credits: 60 },
        ]
      : programme.orientation === "Nghiên cứu"
        ? [
            { name: "Chuyên đề nghiên cứu", credits: 15 },
            { name: "Luận văn tốt nghiệp", credits: 15 },
          ]
        : [
            { name: "Thực tập chuyên ngành", credits: 6 },
            { name: "Đề án tốt nghiệp", credits: 9 },
          ];

  return [
    {
      number: "05",
      title: "Chương trình đào tạo",
      groups: [
        {
          title: "Kiến thức chung",
          courses: [{ name: "Triết học", credits: 3 }],
        },
        {
          title: "Kiến thức cơ sở",
          courses: [
            { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
            { name: "Phân tích và xử lý dữ liệu", credits: 3 },
            { name: "Chuyên đề liên ngành", credits: 2, elective: true },
          ],
        },
        {
          title: "Kiến thức chuyên ngành",
          courses: (specialisedCourses[programme.id] ?? []).map((name, index) => ({
            name,
            credits: index === 0 ? 4 : 3,
            elective: index > 1,
          })),
        },
        { title: "Tốt nghiệp", courses: graduationCourses },
      ],
    },
  ];
}

export function getProgrammeDetails(programme: Programme) {
  if (programme.id === "ky-thuat-moi-truong") {
    return {
      intro:
        "Chương trình đào tạo Thạc sĩ Kỹ thuật Môi trường trang bị cho người học hiểu biết sâu về kiến thức chuyên ngành môi trường, lý thuyết đi đôi với thực hành. Dựa vào các kết quả nghiên cứu khoa học, người học đề xuất các giải pháp kỹ thuật, góp phần giải quyết các yêu cầu về môi trường sống.",
      highlights: [
        "Thư viện chuyên ngành với các giáo trình chuyên sâu và được cập nhật thường xuyên",
        "Hệ thống phòng thí nghiệm hiện đại, liên kết với các trung tâm nghiên cứu tiên tiến",
        "Đội ngũ giảng viên được đào tạo đúng chuyên môn tại các trường đại học ở nước ngoài",
      ],
      outcomes: [
        "Phát triển tư duy nghiên cứu, ứng dụng và truyền đạt tri thức trong lĩnh vực kỹ thuật môi trường",
        "Làm việc và nghiên cứu bằng tiếng Anh đạt chuẩn CEFR B2",
        "Đề xuất sáng kiến và cải tiến các quy trình công nghệ môi trường",
      ],
      careers: [
        "Dẫn dắt hoạt động nghiên cứu, ứng dụng và chuyển giao công nghệ môi trường",
        "Đảm nhận vị trí quản lý, nghiên cứu và phát triển công nghệ mới",
        "Nghiên cứu, giảng dạy hoặc tiếp tục chương trình tiến sĩ trong và ngoài nước",
      ],
    };
  }

  return {
    intro: `Chương trình ${programme.degree} ${programme.title} cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực ${programme.field.toLowerCase()}.`,
    highlights: [
      "Chương trình cập nhật, kết hợp nền tảng học thuật với các vấn đề thực tiễn",
      "Đội ngũ giảng viên giàu kinh nghiệm cùng môi trường học tập hiện đại",
      "Kết nối nghiên cứu, doanh nghiệp và mạng lưới chuyên gia trong lĩnh vực",
    ],
    outcomes: [
      `Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành ${programme.title}`,
      "Phát triển năng lực nghiên cứu, tư duy phản biện và ra quyết định",
      "Làm việc độc lập, hợp tác liên ngành và truyền đạt tri thức chuyên môn",
    ],
    careers: [
      "Đảm nhận các vị trí chuyên môn và quản lý tại doanh nghiệp, tổ chức trong và ngoài nước",
      "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
      "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
    ],
  };
}
