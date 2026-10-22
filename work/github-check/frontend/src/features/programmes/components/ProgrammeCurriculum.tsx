"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock3, GraduationCap, Plus, TrendingUp } from "lucide-react";
import type { CurriculumTrack } from "@/data/curricula";
import styles from "./ProgrammeCurriculum.module.css";
import { logisticsContent } from "../logistics";

const directions = [
  { title: "Ứng dụng", description: "Phát triển năng lực quản lý, điều hành và cải tiến hệ thống logistics. Sử dụng các công cụ hỗ trợ ra quyết định để giải quyết bài toán thực tiễn.", image: "/images/pages/programmes/logistics/career-port.webp", alt: "Minh họa cảng container hiện đại", Icon: TrendingUp },
  { title: "Nghiên cứu", description: "Phát triển phương pháp nghiên cứu khoa học, hướng tới nghiên cứu, giảng dạy, tư vấn, hoạch định chính sách và học tiếp trình độ tiến sĩ.", image: "/images/pages/programmes/content/campus.jpg", alt: "Không gian học tập và nghiên cứu tại Văn Lang", Icon: GraduationCap },
];

export function ProgrammeCurriculum({ curricula, graduationRequirements, isLogistics, title, englishTitle }: {
  curricula: CurriculumTrack[];
  graduationRequirements: string[];
  isLogistics: boolean;
  title: string;
  englishTitle: string;
}) {
  const panels = useRef<(HTMLDetailsElement | null)[]>([]);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: curricula.length === 1 });

  function explore(index: number) {
    const panel = panels.current[index];
    if (!panel) return;
    panel.open = true;
    setExpanded(current => ({ ...current, [index]: true }));
    requestAnimationFrame(() => {
      panel.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      panel.querySelector("summary")?.focus({ preventScroll: true });
    });
  }

  return (
    <section id="chuong-trinh" className={styles.section} aria-labelledby="curriculum-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.label}>03 / CHƯƠNG TRÌNH ĐÀO TẠO</p>
          <h2 id="curriculum-title">{isLogistics ? <>Một nền tảng. Hai định hướng<span>.</span></> : title}</h2>
          <p className={styles.description}>{isLogistics ? logisticsContent.curriculumIntro : englishTitle}</p>
          {isLogistics && <p className={styles.duration}><Clock3 size={19} aria-hidden="true" /><span>Thời gian đào tạo: <strong>{logisticsContent.curriculumDuration}</strong></span></p>}
        </header>
        {isLogistics && <div className={styles.objectives}>
          <div><p className={styles.objectiveLabel}>MỤC TIÊU ĐÀO TẠO</p><h3>Phát triển năng lực<br />chuyên môn toàn diện.</h3></div>
          <div className={styles.objectiveCopy}><p>{logisticsContent.curriculumObjective}</p>{logisticsContent.curriculumOutcomes.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>}
        {isLogistics && <div className={styles.directions}>
          {directions.map(({ title: directionTitle, description, image, alt, Icon }, index) => (
            <article key={directionTitle} className={styles.direction}>
              <div className={styles.directionCopy}>
                <span className={styles.directionIcon}><Icon size={27} strokeWidth={1.6} aria-hidden="true" /></span>
                <p className={styles.directionLabel}>ĐỊNH HƯỚNG {String(index + 1).padStart(2, "0")}</p>
                <h3>{directionTitle}</h3>
                <p className={styles.directionDescription}>{description}</p>
                <button className={styles.cta} type="button" aria-controls={`curriculum-panel-${index}`} onClick={() => explore(index)}>Xem nội dung học <ArrowRight size={18} aria-hidden="true" /></button>
              </div>
              <div className={styles.directionImage}><Image src={image} alt={alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1199px) 40vw, 20vw" /></div>
            </article>
          ))}
        </div>}
        <div className={styles.accordions}>
          {curricula.map((track, index) => (
            <details className={styles.accordion} key={track.number} id={`curriculum-${index}`} ref={node => { panels.current[index] = node; }} open={expanded[index] ?? false} onToggle={event => { const open = event.currentTarget.open; setExpanded(current => current[index] === open ? current : { ...current, [index]: open }); }}>
              <summary aria-expanded={expanded[index] ?? false} aria-controls={`curriculum-panel-${index}`}><span className={styles.summaryIcon}><BookOpen size={21} aria-hidden="true" /></span><span>{track.title}</span><span className={styles.toggle}><Plus size={20} aria-hidden="true" /></span></summary>
              <div id={`curriculum-panel-${index}`} className={styles.panel}>
                <div className={styles.courseGroups}>{track.groups.map(group => <div key={group.title}><h3>{group.title}</h3><ul>{group.courses.map((course, courseIndex) => <li key={`${course.name}-${courseIndex}`}><span>{course.name}{course.elective && <small> · Tự chọn</small>}</span>{course.credits && <b>{course.credits} TC</b>}</li>)}</ul></div>)}</div>
              </div>
            </details>
          ))}
          <details className={styles.accordion} open={expanded[curricula.length] ?? false} onToggle={event => { const open = event.currentTarget.open; setExpanded(current => current[curricula.length] === open ? current : { ...current, [curricula.length]: open }); }}>
            <summary aria-expanded={expanded[curricula.length] ?? false} aria-controls="graduation-panel"><span className={styles.summaryIcon}><GraduationCap size={22} aria-hidden="true" /></span><span>Điều kiện tốt nghiệp</span><span className={styles.toggle}><Plus size={20} aria-hidden="true" /></span></summary>
            <div id="graduation-panel" className={styles.panel}><ul className={styles.requirements}>{graduationRequirements.map(item => <li key={item}>{item}</li>)}</ul></div>
          </details>
        </div>
      </div>
    </section>
  );
}
