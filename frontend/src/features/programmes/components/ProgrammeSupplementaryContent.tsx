"use client";

import { useState } from "react";
import Link from "@/i18n/components/LocalizedLink";
import type { CurriculumTrack } from "@/data/curricula";
import {
  getProgrammeGraduationRequirements,
  getProgrammeTuition,
  type Programme,
  type ProgrammeInformationBlock,
} from "@/data/programmes";
import { ProgrammeCurriculumGroups } from "./ProgrammeCurriculumGroups";
import styles from "./ProgrammeSupplementaryContent.module.css";
import detailStyles from "./ProgrammeDetailPage.module.css";

function InformationBody({ block }: { block: ProgrammeInformationBlock }) {
  return (
    <>
      {block.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {!!block.points?.length && (
        <ul>
          {block.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      {block.groups?.map((group) => (
        <InformationBlock block={group} key={group.title} />
      ))}
    </>
  );
}

function InformationBlock({ block }: { block: ProgrammeInformationBlock }) {
  return (
    <details className={styles.admissionAccordion}>
      <summary>{block.title}</summary>
      <div className={styles.admissionAccordionBody}>
        <InformationBody block={block} />
      </div>
    </details>
  );
}

export function ProgrammeAdmissions({ blocks }: { blocks?: readonly ProgrammeInformationBlock[] }) {
  const content = blocks ?? [
    {
      title: "Ngành tốt nghiệp có phù hợp?",
      paragraphs: [
        "Trao đổi với Viện về văn bằng, bảng điểm và mục tiêu học tập của bạn để được hướng dẫn đối chiếu ngành đầu vào với chương trình quan tâm.",
      ],
    },
    {
      title: "Phương thức tuyển sinh",
      paragraphs: [
        "Liên hệ đội ngũ tư vấn để nhận thông báo tuyển sinh và hướng dẫn chuẩn bị hồ sơ của ngành trong đợt dự tuyển bạn quan tâm.",
      ],
    },
    {
      title: "Yêu cầu ngoại ngữ đầu vào",
      paragraphs: [
        "Trao đổi với Viện về văn bằng, chứng chỉ ngoại ngữ hiện có để được hướng dẫn đối chiếu yêu cầu của ngành và đợt dự tuyển.",
      ],
    },
    {
      title: "Bổ sung kiến thức đầu vào",
      paragraphs: [
        "Gửi thông tin ngành tốt nghiệp và bảng điểm cho đội ngũ tư vấn để tìm hiểu trường hợp của bạn có cần bổ sung kiến thức. Danh mục học phần và khối lượng cần được xác nhận riêng theo hồ sơ.",
      ],
    },
  ];
  const eligibility = content.filter((block) => block.title === "Ngành tốt nghiệp có phù hợp?");
  const cards = content.filter((block) =>
    [
      "Phương thức tuyển sinh",
      "Yêu cầu ngoại ngữ đầu vào",
      "Yêu cầu ngoại ngữ",
      "Ngoại ngữ theo ngôn ngữ đào tạo",
    ].includes(block.title),
  );
  const bridge = content.find((block) => block.title === "Bổ sung kiến thức đầu vào");
  const other = content.filter(
    (block) => !eligibility.includes(block) && !cards.includes(block) && block !== bridge,
  );
  return (
    <div className={styles.admissions} aria-label="Điều kiện dự tuyển và bổ sung kiến thức">
      {eligibility.map((block) => (
        <article className={styles.eligibilitySummary} key={block.title}>
          <h3>{block.title}</h3>
          <InformationBody block={block} />
        </article>
      ))}
      {!!cards.length && (
        <div className={styles.entryCards}>
          {cards.map((block) => (
            <article className={styles.entryCard} key={block.title}>
              <h3>{block.title}</h3>
              <InformationBody block={block} />
            </article>
          ))}
        </div>
      )}
      {other.map((block) => (
        <InformationBlock key={block.title} block={block} />
      ))}
      {bridge && (
        <article className={styles.bridgePanel}>
          <h3>{bridge.title}</h3>
          {bridge.paragraphs
            ?.filter((paragraph) => !paragraph.startsWith("Kết quả bổ sung"))
            .map((paragraph) => (
              <p
                className={paragraph.includes("nằm ngoài") ? styles.bridgeNotice : undefined}
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          {!!bridge.points?.length && (
            <ul>
              {bridge.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
          {bridge.groups?.map((group) => (
            <InformationBlock block={group} key={group.title} />
          ))}
          {bridge.paragraphs
            ?.filter((paragraph) => paragraph.startsWith("Kết quả bổ sung"))
            .map((paragraph) => (
              <p className={styles.admissionFootnote} key={paragraph}>
                {paragraph}
              </p>
            ))}
          <Link className={styles.admissionLink} href="#consultation">
            Tư vấn về ngành đầu vào ↗
          </Link>
        </article>
      )}
    </div>
  );
}

export function ProgrammeSemesterPlan({
  programme,
  track,
}: {
  programme: Programme;
  track?: CurriculumTrack;
}) {
  const plan = track?.semesters ?? programme.pageContent?.section05.semesters;
  if (!plan) return null;
  return (
    <details className={styles.block}>
      <summary>{plan.heading}</summary>
      <div className={styles.blockBody}>
        <p>{plan.intro}</p>
        {plan.items.map((semester) => (
          <section className={styles.semester} key={semester.title} aria-label={semester.title}>
            <h3>{semester.title}</h3>
            <p>{semester.subtitle}</p>
            <ProgrammeCurriculumGroups groups={semester.groups} />
          </section>
        ))}
      </div>
    </details>
  );
}

export function ProgrammeCompletion({
  programme,
  track,
}: {
  programme: Programme;
  track?: CurriculumTrack;
}) {
  const completion = track?.completion ?? programme.pageContent?.section05.completion;
  return (
    <div className={styles.completion}>
      <h3>{completion?.heading ?? "Hoàn thành chương trình"}</h3>
      <ul>
        {(completion?.items ?? getProgrammeGraduationRequirements(programme)).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/** Chỉ bổ sung lịch thanh toán/khoản thu khi chính ngành có nguồn chi tiết. */
export function ProgrammeFees({ programme }: { programme: Programme }) {
  const content = programme.pageContent?.fees;
  const [variantIndex, setVariantIndex] = useState(0);
  const selectedFee = content?.variants?.[variantIndex] ?? content;
  return (
    <section id="hoc-phi" className={styles.feesSection} aria-labelledby="programme-fees-title">
      <div className={detailStyles.container}>
        <div className={styles.feesGrid}>
          <div>
            <h2 id="programme-fees-title">{content?.heading ?? "Học phí chương trình"}</h2>
            {content?.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {content && (
              <details className={`${styles.block} ${styles.feeDisclosure}`}>
                <summary>Các khoản thu riêng khi áp dụng</summary>
                <div className={styles.blockBody}>
                  <dl className={styles.additionalFees}>
                    {content.additionalFees.map((fee) => (
                      <div key={fee.title}>
                        <dt>{fee.title}</dt>
                        <dd>
                          <strong>{fee.amount}</strong>
                          <p>{fee.note}</p>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </details>
            )}
            {content?.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
            <Link className={styles.link} href="/admissions#hoc-phi">
              Xem thông tin tuyển sinh ↗
            </Link>
          </div>
          <aside className={styles.feeCard} aria-label="Học phí toàn khóa">
            <p>{content?.intake ?? programme.intake}</p>
            {!!content?.variants?.length && (
              <label className={styles.feeLanguage}>
                <span>Ngôn ngữ đào tạo</span>
                <select
                  value={variantIndex}
                  onChange={(event) => setVariantIndex(Number(event.target.value))}
                >
                  {content.variants.map((variant, index) => (
                    <option value={index} key={variant.language}>
                      {variant.language} · {variant.total}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <h3>Học phí toàn khóa{selectedFee ? ` · ${selectedFee.language}` : ""}</h3>
            <strong className={styles.total} aria-live="polite" aria-atomic="true">
              {selectedFee?.total ?? getProgrammeTuition(programme)}
            </strong>
            {selectedFee && (
              <table className={styles.paymentTable}>
                <caption>Ba đợt thanh toán học phí</caption>
                <tbody>
                  {selectedFee.installments.map((installment) => (
                    <tr key={installment.label}>
                      <th scope="row">{installment.label}</th>
                      <td>{installment.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <Link href="#consultation" className={styles.link}>
              Tư vấn về học phí ↗
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
