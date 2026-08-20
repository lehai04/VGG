import Image from "next/image";

// Dữ liệu bài viết; đặt ảnh tương ứng trong thư mục public/images/content.
const NEWS_ITEMS = [
  {
    category: "TUYỂN SINH",
    date: "18.08.2026",
    title: "Thông tin tuyển sinh trình độ thạc sĩ đợt 3 năm 2026",
    image: null,
  },
  {
    category: "HỌC THUẬT",
    date: "12.08.2026",
    title: "Hành trình nghiên cứu bắt đầu từ một câu hỏi có giá trị",
    image: "/images/hero/campus-hero.jpg",
  },
  {
    category: "SỰ KIỆN",
    date: "06.08.2026",
    title: "Graduate Discovery Day — khám phá chương trình sau đại học",
    image: "/images/hero/campus-hero.jpg",
  },
] as const;

export function News() {
  return (
    // Khu vực tin tức và sự kiện mới nhất.
    <section className="newsSection" id="news">
      <div className="newsHeading">
        <div>
          <p>NEWS &amp; EVENTS · TIN TỨC &amp; SỰ KIỆN</p>
          <h2>
            Dòng chảy
            <br />
            <em>học thuật.</em>
          </h2>
        </div>

        <a href="#news">
          Xem tất cả <span>↗</span>
        </a>
      </div>

      <div className="newsGrid">
        {NEWS_ITEMS.map((item) => (
          <article className={item.image ? "newsCard" : "newsCard newsCardText"} key={item.title}>
            <div className="newsMedia">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              )}
              <span>{item.category}</span>
            </div>
            <small>{item.date}</small>
            <h3>{item.title}</h3>
            <a href="#news">Đọc thêm →</a>
          </article>
        ))}
      </div>
    </section>
  );
}
