"use client";

import { useState } from "react";
import {
  BellRing,
  ChevronDown,
  ClipboardCheck,
  Compass,
  FileText,
  GraduationCap,
  Presentation,
} from "lucide-react";
import styles from "./ApplicationProcess.module.css";

const steps = [
  {
    title: "Khám phá chương trình",
    short: "Chọn hành trình phù hợp",
    icon: Compass,
    content:
      "Tìm hiểu chương trình đào tạo, yêu cầu tuyển sinh và lựa chọn chương trình phù hợp. Đối với chương trình Tiến sĩ, ứng viên được khuyến khích xác định định hướng nghiên cứu và lĩnh vực chuyên môn phù hợp trước khi nộp hồ sơ.",
  },
  {
    title: "Nộp hồ sơ",
    short: "Chuẩn bị đầy đủ tài liệu",
    icon: FileText,
    content:
      "Hoàn thành hồ sơ đăng ký theo yêu cầu của chương trình. Đối với chương trình Tiến sĩ, hồ sơ cần có đề cương nghiên cứu và minh chứng về năng lực nghiên cứu theo quy định.",
  },
  {
    title: "Kiểm tra đầu vào",
    short: "Đánh giá điều kiện dự tuyển",
    icon: ClipboardCheck,
    content:
      "Viện Sau đại học đánh giá điều kiện đầu vào, năng lực học thuật, trình độ ngoại ngữ và mức độ phù hợp của ứng viên. Trong một số trường hợp, ứng viên có thể được yêu cầu hoàn thành học phần bổ sung kiến thức hoặc đáp ứng thêm điều kiện ngoại ngữ trước khi được công nhận đủ điều kiện xét tuyển.",
  },
  {
    title: "Đánh giá tuyển sinh",
    short: "Phỏng vấn và trình bày",
    icon: Presentation,
    content:
      "Tùy theo chương trình, ứng viên có thể tham gia phỏng vấn, đánh giá năng lực hoặc hình thức đánh giá khác. Với chương trình Tiến sĩ, ứng viên trình bày đề cương nghiên cứu; quá trình tập trung vào tiềm năng nghiên cứu và sự phù hợp với định hướng học thuật của chương trình.",
  },
  {
    title: "Thông báo kết quả",
    short: "Nhận kết quả chính thức",
    icon: BellRing,
    content:
      "Kết quả tuyển sinh được thông báo chính thức đến ứng viên. Đối với hồ sơ trúng tuyển, Viện Sau đại học sẽ gửi hướng dẫn nhập học và các bước tiếp theo.",
  },
  {
    title: "Nhập học",
    short: "Bắt đầu hành trình mới",
    icon: GraduationCap,
    content:
      "Sau khi hoàn tất thủ tục nhập học, học viên chính thức trở thành học viên cao học hoặc nghiên cứu sinh của Trường Đại học Văn Lang và bắt đầu hành trình học tập, nghiên cứu, phát triển nghề nghiệp trong môi trường học thuật quốc tế.",
  },
] as const;

export function ApplicationProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const active = activeStep === null ? null : steps[activeStep];

  return (
    <section
      className={styles.process}
      id="application-process"
      aria-labelledby="application-process-title"
    >
      <header className={styles.heading} data-reveal>
        <p>APPLICATION JOURNEY · 06 STEPS</p>
        <h2 id="application-process-title">Quy trình nộp hồ sơ</h2>
        <span>Chọn từng bước để xem thông tin chi tiết.</span>
      </header>

      <ol className={styles.diagram}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;
          return (
            <li className={isActive ? styles.active : ""} key={step.title}>
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls="application-step-detail"
                onClick={() => setActiveStep(isActive ? null : index)}
              >
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.stepIcon}>
                  <Icon aria-hidden="true" />
                </span>
                <strong>{step.title}</strong>
                <small>{step.short}</small>
                <ChevronDown className={styles.chevron} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ol>

      <div
        className={`${styles.detail} ${active ? styles.detailOpen : ""}`}
        id="application-step-detail"
        aria-live="polite"
      >
        {active && (
          <div key={active.title}>
            <span>BƯỚC {String(activeStep! + 1).padStart(2, "0")}</span>
            <h3>{active.title}</h3>
            <p>{active.content}</p>
          </div>
        )}
      </div>
    </section>
  );
}
