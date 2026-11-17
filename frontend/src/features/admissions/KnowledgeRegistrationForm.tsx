"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, RefreshCw, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useLocale } from "@/i18n/components/LocaleProvider";
import type { Locale } from "@/lib/i18n";
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
import { englishSubmissionErrors, knowledgeTranslate, type KnowledgeTranslate } from "./knowledge-registration-copy";
import styles from "./KnowledgeRegistration.module.css";

const api = "/api/knowledge-registrations";
const maxFileSize = 3 * 1024 * 1024;
type Challenge = { question: string; token: string };
type Field = readonly [string, string, boolean];
type InputControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type SubmissionReply = { success?: boolean; message?: string; code?: string; fields?: string[] };
const fieldLabels = new Map<string, string>([
  ...[...personalFields, ...educationFields].map(([name, label]): [string, string] => [name, label]),
  ...secondEducationFields.map(([name, label]): [string, string] => [name, label]),
  ...Object.entries(attachmentLabels),
  ["schedule", "Lịch học"],
  ["courses", "Học phần đăng ký"],
  ["note", "Ghi chú bổ sung"],
  ["captchaAnswer", "Mã bảo mật"],
]);

function fieldLabel(name: string, t: KnowledgeTranslate) {
  const source = fieldLabels.get(name);
  if (!source) return undefined;
  const label = t(source);
  return secondEducationFields.some(([field]) => field === name)
    ? t("{label} (văn bằng thứ hai)", { label })
    : label;
}

function invalidFieldMessage(field: InputControl, t: KnowledgeTranslate) {
  const label = fieldLabel(field.name, t) ?? t("Thông tin đăng ký");
  if (field.validity.customError) return field.validationMessage;
  if (field.validity.valueMissing) {
    if (field.name in attachmentLabels) return t("Vui lòng đính kèm {label}.", { label: label.toLowerCase() });
    return t("Vui lòng điền hoặc chọn mục “{label}”.", { label });
  }
  if (field.name === "citizenId") return t("Số CCCD phải có đúng 12 chữ số.");
  if (field.name === "captchaAnswer") return t("Mã bảo mật phải có 1 hoặc 2 chữ số.");
  if (field.name === "email") return t("Email không đúng định dạng.");
  if (field.name === "phone") return t("Số điện thoại không đúng định dạng.");
  return t("Thông tin ở mục “{label}” không đúng định dạng.", { label });
}

function submissionError(status: number, payload: SubmissionReply | null, locale: Locale, t: KnowledgeTranslate) {
  if (status === 429) return t("Bạn đã gửi quá nhiều lần. Vui lòng chờ vài phút rồi thử lại.");
  if (status === 413) return t("Tệp đính kèm vượt quá giới hạn. Mỗi tệp tối đa 3 MB.");
  if (status === 504) return t("Hệ thống phản hồi quá lâu. Chưa xác nhận được hồ sơ đã tiếp nhận.");
  if (payload?.code === "VALIDATION_ERROR" && Array.isArray(payload.fields)) {
    const labels = payload.fields.map((field) => fieldLabel(field, t)).filter(Boolean);
    if (labels.length) return t("Thông tin không hợp lệ ở các mục sau: {label}.", { label: labels.join(", ") });
  }
  if (payload?.code === "FILE_TYPE" && Array.isArray(payload.fields)) {
    const label = fieldLabel(payload.fields[0], t);
    if (label) return t("{label} phải là tệp PDF, JPG/JPEG hoặc PNG.", { label });
  }
  if (locale === "en") {
    const code = payload?.code;
    if (code && Object.hasOwn(englishSubmissionErrors, code)) return englishSubmissionErrors[code];
  } else if (typeof payload?.message === "string" && payload.message.trim()) {
    return payload.message;
  }
  return t("Chưa xác nhận được hồ sơ đã tiếp nhận. Vui lòng thử lại sau.");
}

function Required() {
  return (
    <span className={styles.required} aria-hidden="true">
      *
    </span>
  );
}

function Card({
  number,
  id,
  title,
  description,
  children,
}: {
  number: number;
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.card} aria-labelledby={id}>
      <header className={styles.cardHeading}>
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
        <div>
          <h2 id={id}>{title}</h2>
          <p>{description}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

function Fields({ items }: { items: readonly Field[] }) {
  const t = knowledgeTranslate(useLocale().locale);
  return items.map(([name, label, required]) => {
    if (name === "gender") {
      return (
        <fieldset className={styles.field} key={name}>
          <legend>
            {t(label)} <Required />
          </legend>
          <div className={styles.radios}>
            {["Nam", "Nữ"].map((value) => (
              <label key={value}>
                <input type="radio" name={name} value={value} required={required} />
                {t(value)}
              </label>
            ))}
          </div>
        </fieldset>
      );
    }
    const isYear = /year$/i.test(name);
    const isDate = /date$/i.test(name);
    const datePattern =
      name === "birthDate" ? "([0-9]{2}/[0-9]{2}/)?[0-9]{4}" : "[0-9]{2}/[0-9]{2}/[0-9]{4}";
    const pattern =
      name === "citizenId" ? "[0-9]{12}" : isYear ? "[0-9]{4}" : isDate ? datePattern : undefined;
    return (
      <label className={styles.field} key={name}>
        <span>
          {t(label)}
          {required && (
            <>
              {" "}
              <Required />
            </>
          )}
        </span>
        <input
          name={name}
          required={required}
          type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
          inputMode={name === "citizenId" || isYear ? "numeric" : undefined}
          pattern={pattern}
          placeholder={
            isYear
              ? "yyyy"
              : name === "birthDate"
                ? t("dd/mm/yyyy hoặc yyyy")
                : isDate
                  ? "dd/mm/yyyy"
                  : name === "citizenId"
                    ? t("Nhập 12 chữ số")
                    : undefined
          }
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
      </label>
    );
  });
}

function DiplomaGroups({
  diploma,
  decision,
}: {
  diploma: readonly Field[];
  decision: readonly Field[];
}) {
  const t = knowledgeTranslate(useLocale().locale);
  return (
    <div className={styles.diplomaGroups}>
      <fieldset className={styles.diplomaGroup}>
        <legend>{t("Đã có bằng tốt nghiệp")}</legend>
        <div className={styles.three}>
          <Fields items={diploma} />
        </div>
      </fieldset>
      <fieldset className={styles.diplomaGroup}>
        <legend>{t("Chờ nhận văn bằng")}</legend>
        <div className={styles.two}>
          <Fields items={decision} />
        </div>
      </fieldset>
    </div>
  );
}

function Attachments({ fields, required }: { fields: string[]; required?: boolean }) {
  const t = knowledgeTranslate(useLocale().locale);
  return (
    <div className={styles.two}>
      {fields.map((name) => (
        <label className={styles.field} key={name}>
          <span>
            {t(attachmentLabels[name])}
            {required && (
              <>
                {" "}
                <Required />
              </>
            )}
          </span>
          <input
            name={name}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            aria-describedby="knowledge-file-hint"
            required={required}
            onChange={(event) => event.currentTarget.setCustomValidity("")}
          />
        </label>
      ))}
    </div>
  );
}

function focusInvalid(field: InputControl) {
  for (
    let details = field.closest("details");
    details;
    details = details.parentElement?.closest("details") ?? null
  ) {
    details.open = true;
  }
  field.focus();
  field.reportValidity();
}

async function attachmentError(file: File) {
  if (file.size > maxFileSize) return "vượt quá 3 MB.";
  // Match the API's checks on the file bytes even when the filename has a supported extension.
  const header = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  const startsWith = (signature: number[]) => signature.every((byte, i) => header[i] === byte);
  if (
    startsWith([37, 80, 68, 70, 45]) ||
    startsWith([255, 216, 255]) ||
    startsWith([137, 80, 78, 71, 13, 10, 26, 10])
  )
    return "";
  return "phải là tệp PDF, JPG/JPEG hoặc PNG.";
}

export function KnowledgeRegistrationForm() {
  const { locale } = useLocale();
  const t = knowledgeTranslate(locale);
  const captchaInput = useRef<HTMLInputElement>(null);
  const successNotice = useRef<HTMLDivElement>(null);
  const errorNotice = useRef<HTMLDivElement>(null);
  const [invalidInput, setInvalidInput] = useState<InputControl | null>(null);
  const focusNewCaptcha = useRef(false);
  const [challenge, setChallenge] = useState<Challenge>();
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [programmeId, setProgrammeId] = useState("");
  const [courses, setCourses] = useState<string[]>([]);
  const programme = catalogue.programmes.find(({ id }) => id === programmeId);
  const captchaError = captchaFailed
    ? t("Không tải được mã bảo mật. Vui lòng nhấn “Đổi mã bảo mật” để thử lại.")
    : "";

  useEffect(() => {
    const controller = new AbortController();
    async function loadCaptcha() {
      try {
        const response = await fetch(api, { signal: controller.signal, cache: "no-store" });
        const payload = await response.json();
        if (!response.ok || typeof payload?.data?.question !== "string" ||
          typeof payload?.data?.token !== "string" || !payload.data.token)
          throw new Error();
        if (!controller.signal.aborted) setChallenge(payload.data);
      } catch {
        if (!controller.signal.aborted) {
          setCaptchaFailed(true);
        }
      }
    }
    void loadCaptcha();
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (challenge && focusNewCaptcha.current) {
      focusNewCaptcha.current = false;
      captchaInput.current?.focus();
    }
  }, [challenge]);

  useEffect(() => {
    if (success) successNotice.current?.focus();
  }, [success]);

  useEffect(() => {
    if (error) errorNotice.current?.focus();
  }, [error]);

  function refreshCaptcha() {
    focusNewCaptcha.current = true;
    setChallenge(undefined);
    setCaptchaFailed(false);
    setAttempt((value) => value + 1);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    setInvalidInput(null);
    setError("");
    if (!challenge) {
      setError(captchaError || t("Mã bảo mật đang tải. Vui lòng chờ mã hiển thị rồi gửi lại."));
      return;
    }
    const firstInvalid = form.querySelector<InputControl>(
      "input:invalid, select:invalid, textarea:invalid",
    );
    if (firstInvalid) {
      setInvalidInput(firstInvalid);
      setError(invalidFieldMessage(firstInvalid, t));
      return;
    }

    setBusy(true);
    try {
      const body = new FormData(form);
      for (const field of Object.keys(attachmentLabels)) {
        const file = body.get(field);
        if (!(file instanceof File) || !file.name) {
          body.delete(field);
          continue;
        }
        const issue = await attachmentError(file).catch(() => "không đọc được. Vui lòng chọn lại tệp.");
        if (issue) {
          const message = `${t(attachmentLabels[field])} ${t(issue)}`;
          const input = form.elements.namedItem(field);
          if (input instanceof HTMLInputElement) {
            input.setCustomValidity(message);
            setInvalidInput(input);
          }
          setError(message);
          return;
        }
      }
      body.set("captchaToken", challenge.token);
      body.set("courses", JSON.stringify(courses));
      const response = await fetch(api, { method: "POST", body });
      const payload: SubmissionReply | null = await response.json().catch(() => null);
      if (!response.ok || payload?.success !== true) {
        setError(submissionError(response.status, payload, locale, t));
        if (payload?.code === "INVALID_CAPTCHA") refreshCaptcha();
        return;
      }
      setSuccess(true);
    } catch {
      setError(t("Không kết nối được với hệ thống. Vui lòng kiểm tra kết nối mạng và thử lại."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.container}>
        <Link className={styles.back} href={`/${locale}/admissions#dang-ky-bo-sung-kien-thuc`}>
          {t("← Quay về Tuyển sinh")}
        </Link>
        <header className={styles.hero}>
          <Image
            src="/images/logo/logo-vgg.png"
            alt={t("Viện Sau đại học Văn Lang")}
            width={164}
            height={64}
          />
          <p>{t("TUYỂN SINH THẠC SĨ · ĐẠI HỌC VĂN LANG")}</p>
          <h1>{t("Đăng ký học bổ sung kiến thức")}</h1>
        </header>
        {success ? (
          <div ref={successNotice} tabIndex={-1} role="status" className={styles.success}>
            <strong>{t("Gửi hồ sơ thành công")}</strong>
            <span>{t("Viện đã tiếp nhận hồ sơ đăng ký bổ sung kiến thức.")}</span>
          </div>
        ) : (
          <form
            method="post"
            action={api}
            encType="multipart/form-data"
            onSubmit={submit}
            noValidate
            className={styles.form}
          >
            <Card
              number={1}
              id="knowledge-personal"
              title={t("Thông tin cá nhân và liên lạc")}
              description={t("Nhập thông tin theo CCCD và thông tin liên lạc để Viện có thể phản hồi hồ sơ.")}
            >
              <p className={styles.hint}>
                <strong className={styles.requiredHint}>
                  {t("Các trường có dấu {mark} là bắt buộc.", { mark: "*" })}
                </strong>
              </p>
              <div className={styles.four}>
                <Fields items={personalFields.slice(0, 4)} />
              </div>
              <div className={`${styles.four} ${styles.contactRow}`}>
                <Fields items={personalFields.slice(4, 7)} />
              </div>
              <div className={styles.three}>
                <Fields items={personalFields.slice(7)} />
              </div>
            </Card>

            <Card
              number={2}
              id="knowledge-education"
              title={t("Văn bằng tốt nghiệp đại học")}
              description={t("Khai thông tin tốt nghiệp và đính kèm tài liệu để Viện đối chiếu.")}
            >
              <div className={styles.educationLayout}>
                <div className={styles.firstDiploma}>
                  <h3>{t("Văn bằng đại học thứ nhất")}</h3>
                  <div className={styles.three}>
                    <Fields items={educationFields.slice(0, 3)} />
                  </div>
                  <DiplomaGroups
                    diploma={educationFields.slice(4, 7)}
                    decision={educationFields.slice(7)}
                  />
                  <p className={styles.hint} id="knowledge-file-hint">
                    {t("Định dạng PDF, JPG/JPEG hoặc PNG. Tối đa 3 MB mỗi tệp.")}
                  </p>
                  <Attachments fields={["diploma", "transcript"]} required />
                </div>
                <details className={styles.secondDiploma}>
                  <summary>{t("Thêm văn bằng đại học thứ hai (nếu có)")}</summary>
                  <div className={styles.detailsBody}>
                    <div className={styles.three}>
                      <Fields items={secondEducationFields.slice(0, 3)} />
                    </div>
                    <DiplomaGroups
                      diploma={secondEducationFields.slice(3, 6)}
                      decision={secondEducationFields.slice(6)}
                    />
                    <Attachments fields={["secondDiploma", "secondTranscript"]} />
                  </div>
                </details>
              </div>
            </Card>

            <Card
              number={3}
              id="knowledge-schedule"
              title={t("Buổi học và học phần bổ sung")}
              description={t("Chọn buổi học và các học phần cần bổ sung theo ngành dự tuyển.")}
            >
              <label className={styles.field}>
                <span>
                  {t("Ngành Thạc sĩ dự tuyển")} <Required />
                </span>
                <select
                  name="masterProgramme"
                  value={programmeId}
                  required
                  onChange={(event) => {
                    const id = event.target.value;
                    const available =
                      catalogue.programmes.find((item) => item.id === id)?.courses ?? [];
                    setProgrammeId(id);
                    setCourses((current) => current.filter((course) => available.includes(course)));
                  }}
                >
                  <option value="" disabled>
                    {t("Chọn ngành Thạc sĩ")}
                  </option>
                  {catalogue.programmes.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {t(name)}
                    </option>
                  ))}
                </select>
              </label>
              <fieldset>
                <legend>
                  {t("Buổi học (học và thi kết thúc học phần đều online)")} <Required />
                </legend>
                <label className={styles.schedule}>
                  <input type="radio" name="schedule" value="weekend-online" required />
                  <span>
                    <strong>{t(knowledgeSchedule)}</strong>
                    <small>{t(knowledgeHours)}</small>
                  </span>
                </label>
              </fieldset>
              <fieldset>
                <legend>{t("Học phần bổ sung")}</legend>
                <p className={styles.hint}>
                  {t("Chỉ chọn các học phần bạn chưa học. Bạn có thể chọn nhiều học phần trong một hồ sơ.")}
                </p>
                {!programme ? (
                  <p className={styles.empty}>
                    {t("Chọn ngành Thạc sĩ dự tuyển để xem các học phần bổ sung.")}
                  </p>
                ) : programme.courses.length === 0 ? (
                  <p className={styles.empty}>
                    {t("Danh mục tra cứu chưa liệt kê học phần cho ngành này.")}
                  </p>
                ) : (
                  <div className={styles.two}>
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
                        <span>{t(course)}</span>
                        <small>{formatKnowledgeTuition(catalogue.tuitionPerCourse, locale)}</small>
                      </label>
                    ))}
                  </div>
                )}
              </fieldset>
              <div className={styles.fee} aria-live="polite" aria-atomic="true">
                <p>
                  {t("Số môn đã chọn")} <strong>{courses.length}{locale === "vi" ? " môn" : ""}</strong>
                </p>
                <p>
                  {t("Học phí tạm tính")}{" "}
                  <strong>
                    {formatKnowledgeTuition(courses.length * catalogue.tuitionPerCourse, locale)}
                  </strong>
                </p>
              </div>
            </Card>

            <Card
              number={4}
              id="knowledge-submit"
              title={t("Ghi chú và gửi hồ sơ")}
              description={t("Nhập mã bảo mật để gửi hồ sơ đăng ký đến Viện.")}
            >
              <label className={styles.field}>
                <span>{t("Ghi chú bổ sung (nếu có)")}</span>
                <textarea name="note" rows={4} maxLength={2000} />
              </label>
              <div className={styles.actions}>
                <div className={styles.captcha}>
                  {challenge ? (
                    <label className={styles.field} key={challenge.token}>
                      <span>
                        {t("Mã bảo mật")} <Required />{" "}
                        <strong className={styles.question}>{challenge.question}</strong>
                      </span>
                      <input
                        ref={captchaInput}
                        name="captchaAnswer"
                        inputMode="numeric"
                        pattern="[0-9]{1,2}"
                        maxLength={2}
                        required
                      />
                    </label>
                  ) : (
                    <p className={styles.hint} role="status">
                      {captchaError || t("Đang tải mã bảo mật…")}
                    </p>
                  )}
                  <button
                    className={styles.refresh}
                    type="button"
                    onClick={refreshCaptcha}
                    disabled={busy}
                  >
                    <RefreshCw size={16} aria-hidden="true" /> {t("Đổi mã bảo mật")}
                  </button>
                </div>
                <button className={styles.submit} type="submit" disabled={busy}>
                  <Send size={17} aria-hidden="true" /> {t(busy ? "Đang gửi hồ sơ…" : "Gửi hồ sơ")}
                </button>
              </div>
              {error && (
                <div ref={errorNotice} tabIndex={-1} role="alert" className={styles.error}>
                  <p>{error}</p>
                  {invalidInput && (
                    <button
                      className={styles.refresh}
                      type="button"
                      onClick={() => focusInvalid(invalidInput)}
                    >
                      {t("Đến mục cần sửa")}
                    </button>
                  )}
                </div>
              )}
            </Card>
          </form>
        )}
        <section className={styles.support} aria-labelledby="knowledge-support">
          <h2 id="knowledge-support">{t("Đầu mối hỗ trợ")}</h2>
          <p>{t("Viện Sau đại học – Trường Đại học Văn Lang")}</p>
          <ul>
            <li>
              <a href="tel:+84988486869">
                <Phone size={16} aria-hidden="true" /> Hotline 0988 48 6869
              </a>
            </li>
            <li>
              <a href="tel:+842871016869">
                <Phone size={16} aria-hidden="true" /> {t("Điện thoại")} 028 7101 6869
              </a>
            </li>
            <li>
              <a href="mailto:tuyensinh.sdh@vlu.edu.vn">
                <Mail size={16} aria-hidden="true" /> tuyensinh.sdh@vlu.edu.vn
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
