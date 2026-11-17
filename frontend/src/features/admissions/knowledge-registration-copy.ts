import type { Locale } from "@/lib/i18n";
import english from "./knowledge-registration.en.json";

export type KnowledgeTranslate = (source: string, substitutions?: Record<string, string>) => string;

const translations: Readonly<Record<string, string>> = english;

export function knowledgeTranslate(locale: Locale): KnowledgeTranslate {
  return (source, substitutions) => {
    const text = locale === "en" ? translations[source] ?? source : source;
    return substitutions
      ? text.replace(/\{(\w+)\}/g, (match, key: string) => substitutions[key] ?? match)
      : text;
  };
}

export const englishSubmissionErrors: Readonly<Record<string, string>> = {
  VALIDATION_ERROR: "Check the information you entered and try again.",
  MULTIPART_REQUIRED: "Submit your application using this form with the required attachments.",
  FILE_FIELD: "An attachment is invalid. Select the file again and retry.",
  FILE_TYPE: "Attachments must be PDF, JPG/JPEG, or PNG files.",
  INVALID_CAPTCHA: "The security answer is incorrect or the question has expired. Answer the new question and try again.",
  FILES_REQUIRED: "Attach your first undergraduate degree certificate and transcript.",
  INVALID_COURSES: "Check your intended master’s programme and selected courses.",
  DUPLICATE_CITIZEN_ID: "An application already exists for this citizen ID number.",
  REGISTRATION_FAILED: "We could not save your application. Please try again.",
};
