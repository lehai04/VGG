import { ChevronRight } from "lucide-react";
import type { CurriculumGroup } from "@/data/curricula";
import { programmeSharedContent } from "@/data/programmes/shared-content";
import styles from "./ProgrammeDetailPage.module.css";

/** Cùng một danh sách học phần cho khung chương trình và kế hoạch từng học kỳ. */
export function ProgrammeCurriculumGroups({ groups }: { groups: readonly CurriculumGroup[] }) {
  const copy = programmeSharedContent.curriculum;
  return (
    <div className={styles.moduleList}>
      {groups.map((group) => (
        <details className={styles.moduleCard} key={group.title}>
          <summary className={styles.moduleHeader}>
            <span className={styles.moduleTitleRow}>
              <ChevronRight size={18} className={styles.moduleChevron} aria-hidden="true" />
              <span>
                {group.title}
                {group.englishTitle && (
                  <span className={styles.courseEnglish} lang="en">
                    {group.englishTitle}
                  </span>
                )}
              </span>
            </span>
            <span className={styles.moduleCredits}>
              {group.totalCreditsLabel ??
                (group.courses.some((course) => course.elective)
                  ? copy.elective
                  : group.courses.some((course) => course.credits !== undefined)
                    ? `${group.courses.reduce((sum, course) => sum + (course.credits ?? 0), 0)} ${copy.creditUnit}`
                    : null)}
            </span>
          </summary>
          <div className={styles.moduleBody}>
            {group.description?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className={styles.courseList}>
              {group.courses.map((course, index) => (
                <li key={`${course.name}-${index}`} className={styles.courseItem}>
                  <div>
                    <span className={styles.courseName}>
                      {course.code ? `${course.code} · ${course.name}` : course.name}
                    </span>
                    {course.englishName && (
                      <span className={styles.courseEnglish} lang="en">
                        {course.englishName}
                      </span>
                    )}
                    {course.elective && (
                      <span className={styles.courseElectiveTag}>{copy.elective}</span>
                    )}
                  </div>
                  {course.credits !== undefined && (
                    <span className={styles.courseCredit}>
                      {course.credits} {copy.creditAbbreviation}
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
