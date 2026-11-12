import { useWebsiteCopy } from "@/i18n/components/WebsiteCopy";
import { useLocale } from "@/i18n/components/LocaleProvider";
import { ChevronRight } from "lucide-react";
import type { CurriculumGroup } from "@/data/curricula";
import { programmeSharedContent } from "@/data/programmes/shared-content";
import styles from "./ProgrammeDetailPage.module.css";

/** Cùng một danh sách học phần cho khung chương trình và kế hoạch từng học kỳ. */
export function ProgrammeCurriculumGroups({ groups }: { groups: readonly CurriculumGroup[] }) {
  const t = useWebsiteCopy();
  const { locale } = useLocale();
  const copy = programmeSharedContent.curriculum;
  return (
    <div className={styles.moduleList}>
      {groups.map((group) => (
        <details className={styles.moduleCard} key={group.title}>
          <summary className={styles.moduleHeader}>
            <span className={styles.moduleTitleRow}>
              <ChevronRight size={18} className={styles.moduleChevron} aria-hidden="true" />
              <span>
                {t(group.title, group.englishTitle ?? group.title)}
                {locale === "vi" && group.englishTitle && (
                  <span className={styles.courseEnglish} lang="en">
                    {group.englishTitle}
                  </span>
                )}
              </span>
            </span>
            <span className={styles.moduleCredits}>
              {t(group.totalCreditsLabel ??
                (group.courses.some((course) => course.elective)
                  ? copy.elective
                  : group.courses.some((course) => course.credits !== undefined)
                    ? `${group.courses.reduce((sum, course) => sum + (course.credits ?? 0), 0)} ${copy.creditUnit}`
                    : null))}
            </span>
          </summary>
          <div className={styles.moduleBody}>
            {group.description?.map((paragraph) => (
              <p key={paragraph}>{t(paragraph)}</p>
            ))}
            <ul className={styles.courseList}>
              {group.courses.map((course, index) => (
                <li key={`${course.name}-${index}`} className={styles.courseItem}>
                  <div>
                    <span className={styles.courseName}>
                      {course.code ? `${course.code} · ` : ""}
                      {locale === "en" && course.code
                        ? t(`course:${course.code}`, t(course.name, course.englishName ?? course.name), course.name)
                        : t(course.name, course.englishName ?? course.name)}
                    </span>
                    {locale === "vi" && course.englishName && (
                      <span className={styles.courseEnglish} lang="en">
                        {course.englishName}
                      </span>
                    )}
                    {course.elective && (
                      <span className={styles.courseElectiveTag}>{t(copy.elective)}</span>
                    )}
                  </div>
                  {course.credits !== undefined && (
                    <span className={styles.courseCredit}>
                      {course.credits} {t(copy.creditAbbreviation)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {group.subgroups && <ProgrammeCurriculumGroups groups={group.subgroups} />}
          </div>
        </details>
      ))}
    </div>
  );
}
