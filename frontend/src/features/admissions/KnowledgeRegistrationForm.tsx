"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useLocale } from "@/i18n/components/LocaleProvider";
import {
  attachmentLabels,
  educationFields,
  formatKnowledgeTuition,
  knowledgeHours,
  knowledgeSchedule,
  personalFields,
  secondEducationFields,
} from "../../../../shared/knowledge-registration";
import catalogue from "../../../../backend/src/modules/knowledge/course-catalogue.json";
import styles from "./KnowledgeRegistration.module.css";

const api = "/api/knowledge-registrations";
type Challenge = { question: string; token: string };
type Field = readonly [string, string, boolean];

function Fields({ items }: { items: readonly Field[] }) {
  return items.map(([name, label, required]) => {
    const isYear = /year$/i.test(name);
    const isDate = /date$/i.test(name);
    const pattern =
      name === "citizenId"
        ? "[0-9]{12}"
        : isYear
          ? "[0-9]{4}"
          : isDate
            ? name === "birthDate"
              ? "([0-9]{2}/[0-9]{2}/)?[0-9]{4}"
              : "[0-9]{2}/[0-9]{2}/[0-9]{4}"
            : undefined;
    return (
      <label className={styles.field} key={name}>
        <span>
          {label}
          {required && " *"}
        </span>
        {name === "gender" ? (
          <select name={name} required defaultValue="">
            <option value="" disabled>
              Chọn giới tính
            </option>
            <option>Nam</option>
            <option>Nữ</option>
          </select>
        ) : (
          <input
            name={name}
            required={required}
            type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
            inputMode={name === "citizenId" || isYear ? "numeric" : undefined}
            pattern={pattern}
            maxLength={
              name === "citizenId" ? 12 : name === "email" ? 190 : name === "phone" ? 20 : 240
            }
            autoComplete={
              name === "fullName"
                ? "name"
                : name === "phone"
                  ? "tel"
                  : name === "email"
                    ? "email"
                    : undefined
            }
          />
        )}
      </label>
    );
  });
}

function Attachments({ fields, required }: { fields: string[]; required?: boolean }) {
  return fields.map((name) => (
    <label className={styles.field} key={name}>
      <span>
        {attachmentLabels[name]}
        {required && " *"}
      </span>
      <input name={name} type="file" accept=".pdf,.jpg,.jpeg,.png" required={required} />
    </label>
  ));
}

export function KnowledgeRegistrationForm() {
  const { locale } = useLocale();
  const [challenge, setChallenge] = useState<Challenge>();
  const [captchaError, setCaptchaError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [programmeId, setProgrammeId] = useState("");
  const [courses, setCourses] = useState<string[]>([]);
  const programme = catalogue.programmes.find(({ id }) => id === programmeId);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCaptcha() {
      try {
        const response = await fetch(api, { signal: controller.signal, cache: "no-store" });
        if (!response.ok) throw new Error();
        const payload = await response.json();
        setChallenge(payload.data);
      } catch {
        if (!controller.signal.aborted) setCaptchaError("Không thể tải mã bảo mật.");
      }
    }
    void loadCaptcha();
    return () => controller.abort();
  }, [attempt]);

  function refreshCaptcha() {
    setChallenge(undefined);
    setCaptchaError("");
    setAttempt((value) => value + 1);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !challenge) return;
    const body = new FormData(event.currentTarget);
    for (const field of Object.keys(attachmentLabels)) {
      const file = body.get(field);
      if (!(file instanceof File) || !file.name) body.delete(field);
      else if (file.size > 3 * 1024 * 1024) {
        setError(`${attachmentLabels[field]} vượt quá 3 MB.`);
        return;
      }
    }
    body.set("captchaToken", challenge.token);
    body.set("courses", JSON.stringify(courses));
    setError("");
    setBusy(true);
    try {
      const response = await fetch(api, { method: "POST", body });
      const payload = await response.json();
      if (!response.ok) {
        setError(payload.message || "Không thể gửi hồ sơ.");
        if (payload.code === "INVALID_CAPTCHA") refreshCaptcha();
        return;
      }
      setSuccess(payload.message);
    } catch {
      setError("Hệ thống đang bận. Vui lòng thử lại sau.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="main-content" className={styles.page}>
      <Link className={styles.back} href={`/${locale}/admissions#dang-ky-bo-sung-kien-thuc`}>
        ← Quay về Tuyển sinh
      </Link>
      <h1>Đăng ký học bổ sung kiến thức</h1>
      {success ? (
        <p role="status" className={styles.card}>
          {success}
        </p>
      ) : (
        <form
          method="post"
          action={api}
          encType="multipart/form-data"
          onSubmit={submit}
          className={styles.form}
        >
          <p>Các trường có dấu (*) là bắt buộc.</p>
          <section className={styles.card} aria-labelledby="knowledge-personal">
            <h2 id="knowledge-personal">1. Thông tin cá nhân và liên lạc</h2>
            <div className={styles.grid}>
              <Fields items={personalFields} />
            </div>
          </section>
          <section className={styles.card} aria-labelledby="knowledge-education">
            <h2 id="knowledge-education">2. Văn bằng tốt nghiệp đại học</h2>
            <p>Định dạng tệp PDF, JPG hoặc PNG. Tối đa 3 MB mỗi tệp.</p>
            <fieldset>
              <legend>Văn bằng đại học thứ nhất</legend>
              <div className={styles.grid}>
                <Fields items={educationFields.slice(0, 3)} />
                <label className={styles.field}>
                  <span>Ngành thạc sĩ dự tuyển *</span>
                  <select
                    name="masterProgramme"
                    value={programmeId}
                    required
                    onChange={(event) => {
                      setProgrammeId(event.target.value);
                      setCourses([]);
                    }}
                  >
                    <option value="" disabled>
                      Chọn ngành Thạc sĩ
                    </option>
                    {catalogue.programmes.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <Fields items={educationFields.slice(4)} />
                <Attachments fields={["diploma", "transcript"]} required />
              </div>
            </fieldset>
            <details>
              <summary>Văn bằng đại học thứ hai (nếu có)</summary>
              <div className={styles.grid}>
                <Fields items={secondEducationFields} />
                <Attachments fields={["secondDiploma", "secondTranscript"]} />
              </div>
            </details>
          </section>
          <section className={styles.card} aria-labelledby="knowledge-schedule">
            <h2 id="knowledge-schedule">3. Buổi học và đăng ký môn học bổ túc</h2>
            <fieldset>
              <legend>Buổi học (học và thi kết thúc học phần đều online) *</legend>
              <label className={styles.schedule}>
                <input type="radio" name="schedule" value="weekend-online" required />
                <span>
                  {knowledgeSchedule}
                  <br />
                  {knowledgeHours}
                </span>
              </label>
            </fieldset>
            <fieldset className={styles.courses}>
              <legend>Người học chọn môn học bổ túc</legend>
              <p>
                Chỉ đăng ký các học phần chưa học. Có thể đăng ký nhiều học phần theo nhu cầu từng
                đợt. Kết quả được lưu tích lũy theo CCCD.
              </p>
              {!programme ? (
                <p>Chọn ngành Thạc sĩ ở phần 2 để xem học phần.</p>
              ) : programme.courses.length === 0 ? (
                <p>Danh mục tra cứu chưa liệt kê học phần cho ngành này.</p>
              ) : (
                <div className={styles.grid}>
                  {programme.courses.map((course) => (
                    <label key={course} className={styles.course}>
                      <input
                        type="checkbox"
                        checked={courses.includes(course)}
                        onChange={(event) => {
                          const checked = event.target.checked;
                          setCourses((current) =>
                            checked
                              ? [...current, course]
                              : current.filter((name) => name !== course),
                          );
                        }}
                      />
                      <span>{course}</span>
                    </label>
                  ))}
                </div>
              )}
            </fieldset>
            <div className={styles.fee} aria-live="polite" aria-atomic="true">
              Học phí tạm tính{" "}
              <strong>{formatKnowledgeTuition(courses.length * catalogue.tuitionPerCourse)}</strong>
            </div>
          </section>
          <section className={styles.card} aria-labelledby="knowledge-submit">
            <h2 id="knowledge-submit">4. Ghi chú và hoàn tất nộp hồ sơ</h2>
            <label className={styles.field}>
              Ghi chú bổ sung (nếu có)
              <textarea name="note" rows={4} maxLength={2000} />
            </label>
            {challenge ? (
              <label className={styles.field} key={challenge.token}>
                Mã bảo mật * ({challenge.question})
                <input
                  name="captchaAnswer"
                  inputMode="numeric"
                  pattern="[0-9]{1,2}"
                  maxLength={2}
                  required
                />
              </label>
            ) : (
              <p role="status">{captchaError || "Đang tải mã bảo mật…"}</p>
            )}
            <button
              className={styles.refresh}
              type="button"
              onClick={refreshCaptcha}
              disabled={busy}
            >
              Đổi mã bảo mật
            </button>
          </section>
          {error && (
            <p role="alert" className={styles.error}>
              {error}
            </p>
          )}
          <button className={styles.submit} type="submit" disabled={busy || !challenge}>
            {busy ? "Đang gửi hồ sơ…" : "Gửi hồ sơ"}
          </button>
        </form>
      )}
    </main>
  );
}
