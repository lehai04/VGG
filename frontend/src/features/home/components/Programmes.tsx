import { requestCopy, requestLanguage } from "@/i18n/request-copy";
import publishedCounts from "@/data/programmes/published-counts.json";
import { CountUp } from "./CountUp";
import { homeContent } from '@/data/home-content';
import { websiteContent } from '@/lib/website-content';

/** HOMEPAGE SECTION: Giới thiệu Viện Sau đại học và các số liệu đào tạo. */
export async function Programmes() {
  const t = await requestCopy();
  const { locale } = await requestLanguage();
  const { overview } = await websiteContent('home', homeContent);
  return (
    // Tổng quan Viện Sau đại học gồm phần giới thiệu và số liệu nổi bật.
    <section className="overview" id="about">
      <div className="overviewFeature">
        <div className="overviewIntro">
          <div className="overviewCopy">
            <p data-section-label>{t(overview.label.replace(/\s*[·|–—-]?\s*van lang global graduate/gi, "").trim())}</p>
            <h3 data-section-subtitle>
              {t(overview.title)}
              {" "}
              <em>{t(overview.emphasis)}</em>
            </h3>
          </div>
          <p className="overviewDescription">
            {t(overview.text)}
          </p>
        </div>
      </div>

      <div className="graduateStats" aria-label="Thống kê chương trình đào tạo">
        <div className="graduateStatsGrid">
          <article>
            <CountUp end={publishedCounts.master} suffix={publishedCounts.masterSuffix} />
            <p>
              {locale === "en" ? t("Chương trình Thạc sĩ") : <>Chương trình<br />Thạc sĩ</>}
            </p>
          </article>
          <article>
            <CountUp end={publishedCounts.doctoral} />
            <p>
              {locale === "en" ? t("Chương trình Tiến sĩ Khoa học Môi trường") : <>Chương trình Tiến sĩ<br />Khoa học Môi trường</>}
            </p>
          </article>
          <article>
            <CountUp end={publishedCounts.internationalMaster} />
            <p>{locale === "en" ? t("Chương trình Thạc sĩ liên kết quốc tế") : <>Chương trình Thạc sĩ<br />liên kết quốc tế</>}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
