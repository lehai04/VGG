/**
 * data/research.ts — nội dung chi tiết cho từng subpage của /research.
 * Không nhét nội dung này vào data/site.ts vì quá dài và research-specific.
 * ResearchSubpage component đọc dữ liệu này theo slug.
 */

export type ResearchStat = {
  value: string;
  label: string;
};

export type ResearchHighlight = {
  index: string;
  title: string;
  body: string;
};

export type ResearchSubpageData = {
  slug: string;
  eyebrow: string;
  title: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  stats: ResearchStat[];
  highlights: ResearchHighlight[];
  quote: string;
  quoteAttrib: string;
};

export const researchSubpages: readonly ResearchSubpageData[] = [
  {
    slug: "cum-nghien-cuu",
    eyebrow: "Research & Innovation / 01",
    title: "Các cụm nghiên cứu",
    headline: "Kiến thức liên ngành, giải pháp toàn diện.",
    intro:
      "VGG tổ chức nghiên cứu theo mô hình cụm liên ngành — nơi các học giả từ kinh tế, kỹ thuật, khoa học xã hội và nghệ thuật cùng đặt câu hỏi và cùng kiếm tìm lời giải. Cách tiếp cận này tạo ra những phát hiện mà một ngành riêng lẻ không thể đạt được.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Không gian phòng thí nghiệm nghiên cứu hiện đại",
    stats: [
      { value: "12", label: "Cụm nghiên cứu" },
      { value: "180+", label: "Nhà nghiên cứu" },
      { value: "6", label: "Lĩnh vực trọng điểm" },
      { value: "34", label: "Dự án đang triển khai" },
    ],
    highlights: [
      {
        index: "01",
        title: "Kinh doanh & Phát triển bền vững",
        body: "Nghiên cứu mô hình kinh tế tuần hoàn, quản trị doanh nghiệp có trách nhiệm và chiến lược tăng trưởng dài hạn phù hợp bối cảnh Việt Nam và khu vực.",
      },
      {
        index: "02",
        title: "Công nghệ & Đô thị thông minh",
        body: "Ứng dụng AI, dữ liệu lớn và kỹ thuật số vào quy hoạch đô thị, logistics, y tế và dịch vụ công — hướng tới chất lượng sống cao hơn cho cộng đồng.",
      },
      {
        index: "03",
        title: "Văn hóa, Sáng tạo & Bản sắc",
        body: "Khám phá vị trí của bản sắc Việt trong dòng chảy toàn cầu hóa, qua lăng kính thiết kế, truyền thông, ngôn ngữ và di sản văn hóa.",
      },
    ],
    quote:
      "Những thách thức phức tạp nhất của thế kỷ 21 không nằm trong một ngành học — chúng cần con người từ nhiều lĩnh vực cùng nhìn, cùng nghĩ và cùng hành động.",
    quoteAttrib: "VGG Research Direction",
  },
  {
    slug: "du-an",
    eyebrow: "Research & Innovation / 02",
    title: "Dự án nghiên cứu",
    headline: "Nghiên cứu gắn với thực tiễn, tác động đo được.",
    intro:
      "Mỗi dự án nghiên cứu tại VGG bắt đầu từ một vấn đề thực tế — không phải từ lý thuyết trừu tượng. Người học, giảng viên và đối tác doanh nghiệp cùng định nghĩa câu hỏi, thiết kế phương pháp và đánh giá kết quả theo tiêu chuẩn quốc tế.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Nhóm nghiên cứu thảo luận và cộng tác",
    stats: [
      { value: "34", label: "Dự án đang triển khai" },
      { value: "8", label: "Dự án quốc tế" },
      { value: "₫42B+", label: "Tổng ngân sách R&D" },
      { value: "96%", label: "Hoàn thành đúng tiến độ" },
    ],
    highlights: [
      {
        index: "01",
        title: "Phương pháp nghiêm túc",
        body: "Mỗi dự án trải qua quy trình review độc lập, thiết kế nghiên cứu rõ ràng và tiêu chí đánh giá minh bạch — đảm bảo kết quả có giá trị và tái lập được.",
      },
      {
        index: "02",
        title: "Học viên là đồng nghiên cứu",
        body: "Chương trình thạc sĩ và tiến sĩ của VGG tích hợp nghiên cứu thực tiễn vào chương trình học — người học không quan sát mà trực tiếp tham gia tạo ra tri thức mới.",
      },
      {
        index: "03",
        title: "Kết quả chuyển hóa thành hành động",
        body: "Từ báo cáo chính sách đến prototype sản phẩm, VGG kết nối kết quả nghiên cứu với những người có thể đưa chúng vào thực tiễn.",
      },
    ],
    quote:
      "Nghiên cứu tốt không kết thúc khi bài báo được đăng. Nó mở ra cuộc đối thoại, thay đổi cách nhìn và đôi khi thay đổi cả cách chúng ta sống.",
    quoteAttrib: "VGG Research Ethics",
  },
  {
    slug: "cong-bo",
    eyebrow: "Research & Innovation / 03",
    title: "Công bố khoa học",
    headline: "Tri thức được chia sẻ, ảnh hưởng lan rộng.",
    intro:
      "Công bố khoa học là thước đo và di sản của nghiên cứu. VGG khuyến khích công bố trên các tạp chí uy tín quốc tế, đồng thời ưu tiên truy cập mở — để tri thức không bị giới hạn bởi tường lửa chi phí.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Thư viện học thuật và các ấn phẩm nghiên cứu",
    stats: [
      { value: "240+", label: "Bài báo khoa học / năm" },
      { value: "48", label: "Tạp chí Scopus/ISI" },
      { value: "1,800+", label: "Lượt trích dẫn" },
      { value: "60%", label: "Open Access" },
    ],
    highlights: [
      {
        index: "01",
        title: "Tiêu chuẩn quốc tế",
        body: "Các nhà nghiên cứu VGG công bố trên tạp chí Scopus, ISI và các hội nghị khoa học hàng đầu trong ngành — đưa tên Văn Lang vào bản đồ học thuật toàn cầu.",
      },
      {
        index: "02",
        title: "Cơ sở dữ liệu mở",
        body: "VGG duy trì repository học thuật mở, nơi các công trình nghiên cứu được lưu trữ và chia sẻ tự do — thúc đẩy văn hóa open science trong cộng đồng.",
      },
      {
        index: "03",
        title: "Hỗ trợ xuất bản",
        body: "Từ viết đề xuất đến biên tập ngôn ngữ học thuật, VGG cung cấp hỗ trợ toàn diện để giảng viên và học viên có thể công bố tốt nhất có thể.",
      },
    ],
    quote:
      "Tri thức chỉ thật sự có giá trị khi được chia sẻ. Một công trình xuất sắc nằm trong ngăn kéo không làm thay đổi được gì.",
    quoteAttrib: "VGG Open Knowledge Initiative",
  },
  {
    slug: "hoi-thao",
    eyebrow: "Research & Innovation / 04",
    title: "Hội thảo & Sự kiện khoa học",
    headline: "Không gian gặp gỡ, đối thoại và đổi mới.",
    intro:
      "Hội thảo khoa học là nơi ý tưởng được thử thách và làm sắc nét. VGG tổ chức và tham gia các sự kiện học thuật quốc tế — từ seminar nhỏ đến hội nghị lớn — để kết nối cộng đồng nghiên cứu vượt qua biên giới địa lý và ngành học.",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Hội thảo khoa học quốc tế tại khuôn viên Văn Lang",
    stats: [
      { value: "28", label: "Hội thảo / năm" },
      { value: "15+", label: "Diễn giả quốc tế" },
      { value: "1,200+", label: "Người tham dự" },
      { value: "8", label: "Quốc gia đối tác" },
    ],
    highlights: [
      {
        index: "01",
        title: "VGG Annual Research Forum",
        body: "Sự kiện học thuật lớn nhất năm của VGG — tập hợp nhà nghiên cứu, doanh nghiệp, nhà hoạch định chính sách và học viên xung quanh các chủ đề nghiên cứu trọng điểm.",
      },
      {
        index: "02",
        title: "Monthly Colloquium Series",
        body: "Chuỗi seminar hàng tháng với diễn giả trong và ngoài nước, tập trung vào các phát hiện nghiên cứu mới nhất — mở cửa cho toàn cộng đồng VGG.",
      },
      {
        index: "03",
        title: "Workshop & Masterclass",
        body: "Các workshop chuyên sâu về phương pháp nghiên cứu, kỹ năng viết học thuật và trình bày khoa học — được thiết kế đặc biệt cho học viên sau đại học.",
      },
    ],
    quote:
      "Khoa học tiến bộ không chỉ qua những bài báo — mà qua những cuộc trò chuyện bên lề hội nghị, nơi các ý tưởng va chạm và đốt cháy nhau.",
    quoteAttrib: "VGG Academic Community",
  },
  {
    slug: "doi-moi-sang-tao",
    eyebrow: "Research & Innovation / 05",
    title: "Đổi mới sáng tạo",
    headline: "Từ ý tưởng đến giải pháp có giá trị.",
    intro:
      "Đổi mới không phải là sản phẩm của may mắn — đó là kết quả của tư duy có phương pháp, môi trường an toàn để thử nghiệm và văn hóa sẵn sàng học từ thất bại. VGG xây dựng hệ sinh thái đổi mới kết nối học thuật, công nghệ và nhu cầu thực tiễn.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Công nghệ và đổi mới sáng tạo trong nghiên cứu",
    stats: [
      { value: "18", label: "Startup được ươm mầm" },
      { value: "6", label: "Bằng sáng chế" },
      { value: "3", label: "Innovation Lab" },
      { value: "₫15B+", label: "Đầu tư nhận được" },
    ],
    highlights: [
      {
        index: "01",
        title: "VGG Innovation Hub",
        body: "Không gian co-working và lab thực hành — nơi học viên, giảng viên và doanh nghiệp cùng thử nghiệm ý tưởng, phát triển prototype và kết nối với nhà đầu tư.",
      },
      {
        index: "02",
        title: "Design Thinking & Lean Research",
        body: "Phương pháp luận đổi mới được tích hợp vào chương trình học — học viên học cách xác định vấn đề thực sự, thử nghiệm nhanh và lặp để đến giải pháp hiệu quả nhất.",
      },
      {
        index: "03",
        title: "Startup Launchpad",
        body: "Chương trình ươm tạo dành riêng cho học viên VGG — cung cấp mentorship, kết nối đối tác và cơ hội trình bày trước cộng đồng startup và quỹ đầu tư.",
      },
    ],
    quote:
      "Đổi mới thực sự không phải là tạo ra điều mới lạ vì mới lạ — mà là tìm cách tốt hơn để giải quyết vấn đề mà người thật đang gặp phải.",
    quoteAttrib: "VGG Innovation Philosophy",
  },
  {
    slug: "hop-tac-doanh-nghiep",
    eyebrow: "Research & Innovation / 06",
    title: "Hợp tác doanh nghiệp",
    headline: "Học thuật và thực tiễn cùng tạo tác động.",
    intro:
      "Ranh giới giữa đại học và doanh nghiệp ngày càng mờ dần — và đó là điều tốt. VGG xây dựng quan hệ đối tác chiến lược với các doanh nghiệp dẫn đầu ngành để nghiên cứu đáp ứng nhu cầu thực tế và người học được chuẩn bị tốt nhất cho thị trường lao động.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Đối tác doanh nghiệp và học thuật làm việc cùng nhau",
    stats: [
      { value: "60+", label: "Đối tác doanh nghiệp" },
      { value: "22", label: "Dự án R&D hợp tác" },
      { value: "85%", label: "SV có việc làm ngay" },
      { value: "12", label: "Chương trình đồng tài trợ" },
    ],
    highlights: [
      {
        index: "01",
        title: "Research-on-Demand",
        body: "Doanh nghiệp đặt hàng nghiên cứu — VGG cung cấp năng lực học thuật và độc lập khoa học. Mô hình này đảm bảo kết quả vừa ứng dụng được vừa có chất lượng học thuật.",
      },
      {
        index: "02",
        title: "Industry Advisory Boards",
        body: "Lãnh đạo doanh nghiệp tham gia hội đồng tư vấn chương trình đào tạo và nghiên cứu — đảm bảo VGG luôn đi đúng hướng với nhu cầu thực tế của nền kinh tế.",
      },
      {
        index: "03",
        title: "Học viên là cầu nối",
        body: "Nhiều học viên VGG đang làm việc tại doanh nghiệp đối tác — mang tri thức học thuật vào thực tiễn và mang thách thức thực tiễn trở lại phòng học.",
      },
    ],
    quote:
      "Đại học tốt nhất không phải là nơi xa lánh thế giới thực — mà là nơi hiểu thế giới thực sâu sắc hơn bất kỳ ai và đặt câu hỏi về nó nghiêm túc hơn bất kỳ ai.",
    quoteAttrib: "VGG Partnership Vision",
  },
];

export function findResearchSubpage(slug: string): ResearchSubpageData | undefined {
  return researchSubpages.find((p) => p.slug === slug);
}
