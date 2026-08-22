import { ImmersiveVideo } from "./ImmersiveVideo";
import { CountUp } from "./CountUp";

/** HOMEPAGE SECTION: Giới thiệu VGG bằng video và các số liệu đào tạo. */
export function Programmes() {
  return (
    // Tổng quan VGG gồm video giới thiệu và số liệu nổi bật.
    <section className="overview" id="about">
      <div className="overviewFeature" id="programmes">
        <div className="overviewIntro">
          <div className="overviewCopy">
            <p>VGG · VAN LANG GLOBAL GRADUATE</p>
            <h2>
              Tri thức. Thực tiễn.
              <br />
              <em>Đổi mới sáng tạo.</em>
            </h2>
          </div>
          <p className="overviewDescription">
            VGG kết nối tri thức chuyên sâu với thực tiễn nghề nghiệp, nuôi dưỡng tư duy nghiên cứu
            và năng lực lãnh đạo để người học tạo ra những giá trị tích cực cho cộng đồng.
          </p>
        </div>
      </div>

      <ImmersiveVideo />

      <div className="graduateStats" aria-label="Thống kê chương trình đào tạo">
        <div className="graduateStatsGrid">
          <article>
            <CountUp end={18} />
            <p>
              Chương trình
              <br />
              Thạc sĩ năm 2026
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
            <CountUp end={5} />
            <p>
              Nhóm ngành
              <br />
              đào tạo đa lĩnh vực
            </p>
          </article>
          <article>
            <CountUp end={3} />
            <p>
              Chương trình Thạc sĩ
              <br />
              đạt kiểm định quốc gia
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
