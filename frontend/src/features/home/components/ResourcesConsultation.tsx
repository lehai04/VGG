"use client";

/**
 * Form tư vấn (client): submit JSON tới POST /api/consultations.
 * Field ẩn `website` = honeypot chống bot. `consent` = hidden "yes".
 */
import { FormEvent, Fragment, useState } from "react";
import type { ProgrammeConsultationIntro } from "@/data/programmes";
import { programmes as PROGRAMMES } from "@/data/site";
import { useLocale } from "@/i18n/components/LocaleProvider";

export function ResourcesConsultation({
  initialProgramme = "",
  intro,
}: {
  initialProgramme?: string;
  intro?: ProgrammeConsultationIntro;
}) {
  const { messages } = useLocale();
  const cta = messages.cta;
  const titleLines = intro?.titleLines ?? [cta.titleLine1, cta.titleLine2];
  const benefits = intro?.benefits ?? [cta.benefit1, cta.benefit2, cta.benefit3];
  // Thông báo trạng thái gửi form cho người dùng.
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States quản lý validation thời gian thực
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [programme, setProgramme] = useState(initialProgramme);
  const [programmeTouched, setProgrammeTouched] = useState(false);

  const [forceTouched, setForceTouched] = useState(false);

  const isPhoneValid = /^0\d{9}$/.test(phone.trim());
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  const isNameValid = name.trim().length >= 2;
  const isProgrammeValid = programme.trim().length > 0;

  const showPhoneError =
    (phoneTouched || forceTouched) && !isPhoneValid && (phone.length > 0 || forceTouched);
  const showPhoneSuccess = (phoneTouched || forceTouched) && isPhoneValid;

  const showEmailError =
    (emailTouched || forceTouched) && !isEmailValid && (email.length > 0 || forceTouched);
  const showEmailSuccess = (emailTouched || forceTouched) && isEmailValid;

  const showNameError =
    (nameTouched || forceTouched) && !isNameValid && (name.length > 0 || forceTouched);
  const showNameSuccess = (nameTouched || forceTouched) && isNameValid;

  const showProgrammeSuccess = (programmeTouched || forceTouched) && isProgrammeValid;

  // Gửi dữ liệu tư vấn đến API nội bộ và xử lý phản hồi thành công/thất bại.
  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setForceTouched(true);

    if (!isNameValid) {
      setMessage("Vui lòng nhập họ và tên (tối thiểu 2 ký tự).");
      return;
    }
    if (!isPhoneValid) {
      setMessage(
        "Vui lòng nhập đúng định dạng: Số điện thoại phải gồm đúng 10 chữ số bắt đầu bằng số 0 (VD: 0901234567).",
      );
      return;
    }
    if (!isEmailValid) {
      setMessage("Vui lòng nhập đúng định dạng email (VD: email@example.com).");
      return;
    }
    if (!isProgrammeValid) {
      setMessage(cta.chooseProgramme);
      return;
    }

    setMessage(cta.submitting);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await response.json()) as { message?: string };

      if (response.ok) {
        form.reset();
        setName("");
        setPhone("");
        setEmail("");
        setProgramme(initialProgramme);
        setPhoneTouched(false);
        setEmailTouched(false);
        setNameTouched(false);
        setProgrammeTouched(false);
        setForceTouched(false);
        setMessage(cta.success);
      } else {
        setMessage(result.message ?? cta.invalid);
      }
    } catch {
      setMessage(cta.connectionError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="resourcesContact consultationOnly home-page" id="consultation">
      <div className="consultationBlock">
        {/* Cột giới thiệu nhấn mạnh giá trị người dùng nhận được trước khi điền form. */}
        <div className="consultationIntro">
          <p>{intro?.eyebrow ?? cta.eyebrow}</p>
          <h2>
            {titleLines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && " "}
                {index === 0 ? line : <em>{line}</em>}
              </Fragment>
            ))}
          </h2>
          <div>{intro?.body ?? cta.support}</div>
          <ul className="consultationBenefits" aria-label="Quyền lợi tư vấn">
            {benefits.map((benefit, index) => (
              <li key={benefit}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Logic submit được giữ tách biệt ở submitForm; markup dưới đây chỉ mô tả dữ liệu đầu vào. */}
        <form className="consultationFields" onSubmit={submitForm}>
          <div className="consultationFormHead">
            <div>
              <span>PRIVATE CONSULTATION</span>
              <strong>{intro?.formTitle ?? cta.formTitle}</strong>
            </div>
            <small>{cta.response}</small>
          </div>
          {/* consent phục vụ API; honeypot chặn bot và được ẩn khỏi người dùng thật. */}
          <input type="hidden" name="consent" value="yes" />
          <input
            className="form-honeypot"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="consultationField">
            <label htmlFor="consultation-name" className="consultationLabel">
              <span>{cta.name}</span>
              <span className="consultationRequired">*</span>
            </label>
            <div className="consultationInputWrapper">
              <input
                id="consultation-name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameTouched(true);
                }}
                onBlur={() => setNameTouched(true)}
                placeholder="Nguyễn Văn A"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
                className={showNameError ? "is-invalid" : showNameSuccess ? "is-valid" : ""}
                style={{
                  paddingRight: showNameSuccess ? "40px" : undefined,
                }}
              />
              {showNameSuccess && (
                <div className="consultationStatusIcon" title="Họ tên hợp lệ">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
            {showNameError && (
              <span className="consultationErrorMessage">
                <span>⚠️</span> Vui lòng nhập họ và tên (tối thiểu 2 ký tự).
              </span>
            )}
          </div>

          <div className="consultationField">
            <label htmlFor="consultation-phone" className="consultationLabel">
              <span>{cta.phone}</span>
              <span className="consultationRequired">*</span>
            </label>
            <div className="consultationInputWrapper">
              <input
                id="consultation-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneTouched(true);
                }}
                onBlur={() => setPhoneTouched(true)}
                placeholder="0901234567"
                maxLength={10}
                required
                className={showPhoneError ? "is-invalid" : showPhoneSuccess ? "is-valid" : ""}
                style={{
                  paddingRight: showPhoneSuccess ? "40px" : undefined,
                }}
              />
              {showPhoneSuccess && (
                <div className="consultationStatusIcon" title="Số điện thoại hợp lệ">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
            {showPhoneError && (
              <span className="consultationErrorMessage">
                <span>⚠️</span> Vui lòng nhập đúng định dạng: Số điện thoại phải gồm đúng 10 chữ số
                bắt đầu bằng số 0 (VD: 0901234567).
              </span>
            )}
          </div>

          <div className="consultationField">
            <label htmlFor="consultation-email" className="consultationLabel">
              <span>{cta.email}</span>
              <span className="consultationRequired">*</span>
            </label>
            <div className="consultationInputWrapper">
              <input
                id="consultation-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailTouched(true);
                }}
                onBlur={() => setEmailTouched(true)}
                placeholder="example@gmail.com"
                maxLength={190}
                required
                className={showEmailError ? "is-invalid" : showEmailSuccess ? "is-valid" : ""}
                style={{
                  paddingRight: showEmailSuccess ? "40px" : undefined,
                }}
              />
              {showEmailSuccess && (
                <div className="consultationStatusIcon" title="Email hợp lệ">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
            {showEmailError && (
              <span className="consultationErrorMessage">
                <span>⚠️</span> Vui lòng nhập đúng định dạng email (VD: hoten@gmail.com).
              </span>
            )}
          </div>

          <div className="consultationField">
            <label htmlFor="consultation-programme" className="consultationLabel">
              <span>{cta.programme}</span>
              <span className="consultationRequired">*</span>
            </label>
            <div className="consultationInputWrapper">
              <select
                id="consultation-programme"
                name="programme"
                value={programme}
                onChange={(e) => {
                  setProgramme(e.target.value);
                  setProgrammeTouched(true);
                }}
                onBlur={() => setProgrammeTouched(true)}
                required
                className={showProgrammeSuccess ? "is-valid" : ""}
              >
                <option value="" disabled>
                  {cta.chooseProgramme}
                </option>
                {PROGRAMMES.map((programmeItem) => (
                  <option value={programmeItem} key={programmeItem}>
                    {programmeItem}
                  </option>
                ))}
              </select>
              <div
                className="consultationSelectArrow"
                style={{ color: showProgrammeSuccess ? "#10b981" : undefined }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>
          <button className="vgg-cta-pill" type="submit" disabled={isSubmitting}>
            {isSubmitting ? cta.submitting : cta.submit}
          </button>
          {/* Thông báo kết quả gửi form nổi bật */}
          {message && (
            <div
              className={`consultationFeedbackBanner ${
                message === cta.success ? "success" : isSubmitting ? "submitting" : "error"
              }`}
              role="status"
              aria-live="polite"
            >
              <div className="feedbackContent">
                {message === cta.success ? (
                  <>
                    <div className="feedbackIcon success">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <div className="feedbackText">
                      <strong className="feedbackTitle">Đã gửi yêu cầu thành công!</strong>
                      <p className="feedbackDesc">{message}</p>
                    </div>
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="feedbackSpinner">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20" />
                      </svg>
                    </div>
                    <div className="feedbackText">
                      <p className="feedbackDesc">{cta.submitting}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="feedbackIcon error">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <div className="feedbackText">
                      <p className="feedbackDesc">{message}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <small className="consultationPrivacy">{cta.privacy}</small>
        </form>
      </div>
    </section>
  );
}
