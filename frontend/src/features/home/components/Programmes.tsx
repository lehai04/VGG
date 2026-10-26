import { CountUp } from "./CountUp";
import { homeContent } from '@/data/home-content';
import { websiteContent } from '@/lib/website-content';

/** HOMEPAGE SECTION: Giới thiệu Viện Sau Đại học và các số liệu đào tạo. */
export async function Programmes() {
  const { overview } = await websiteContent('home', homeContent);
  return (
    // Tổng quan Viện Sau Đại học gồm phần giới thiệu và số liệu nổi bật.
    <section className="overview" id="about">
      <div className="overviewFeature">
        <div className="overviewIntro">
          <div className="overviewCopy">
            <p>{overview.label}</p>
            <h2>
              {overview.title}
              {" "}
              <em>{overview.emphasis}</em>
            </h2>
          </div>
          <p className="overviewDescription">
            {overview.text}
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
