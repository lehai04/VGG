import { CountUp } from "./CountUp";

/** HOMEPAGE SECTION: Giới thiệu Viện Sau Đại học và các số liệu đào tạo. */
export function Programmes() {
  return (
    // Tổng quan Viện Sau Đại học gồm phần giới thiệu và số liệu nổi bật.
    <section className="overview" id="about">
      <div className="overviewFeature">
        <div className="overviewIntro">
          <div className="overviewCopy">
            <p>Viện Sau Đại học · VAN LANG GLOBAL GRADUATE</p>
            <h2>
              Nâng tầm tri thức,
              {" "}
              <em>Chủ động dẫn đầu.</em>
            </h2>
          </div>
          <p className="overviewDescription">
            Tại Viện Sau đại học Trường Đại học Văn Lang, mỗi hành trình học tập là cơ hội để đào sâu tri thức, mở rộng tư duy và phát triển năng lực lãnh đạo. Gắn kết đào tạo với nghiên cứu và thực tiễn nghề nghiệp, Viện đồng hành cùng người học chuyển hóa ý tưởng thành giải pháp, tạo nên những bước tiến trong sự nghiệp và những đóng góp thiết thực cho cộng đồng.
          </p>
        </div>
      </div>

      <div className="graduateStats" aria-label="Thống kê chương trình đào tạo">
        <div className="graduateStatsGrid">
          <article>
            <CountUp end={20} />
            <p>
              Chương trình
              <br />
              Thạc sĩ
            </p>
          </article>
          <article>
            <CountUp end={1} />
            <p>
              Chương trình Tiến sĩ
              <br />
              Khoa học Môi trường
            </p>
          </article>
          <article>
            <CountUp end={1} />
            <p>Chương trình<br />liên kết quốc tế</p>
          </article>
        </div>
      </div>
    </section>
  );
}
