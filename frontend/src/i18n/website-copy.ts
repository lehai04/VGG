import { stripLocale, type Locale } from "@/lib/i18n";
import workbook from "./workbook/public.json";

export type CopyDictionary = Record<string, string>;
const pages: Record<string, CopyDictionary> = workbook;

const words = /\p{L}[\p{L}\p{N}]*(?:['’]\p{L}+)?/gu;
const terminalMark = /[.!?,:;…]*([”"’)\]]*(?:\s+[→↗])?)$/u;
const acronyms = /^(?:mba|pdf|vnd|ielts|toefl|toeic|cefr|erp|stem|eset\d*|ai|uk|usa|asean|i|ii|iii|iv|v|vi|vii|viii|ix|x)$/i;
const properWords = /\b(?:Van Lang(?: University)?|Institute of Postgraduate Education|the Institute|Ho Chi Minh City|English|Vietnamese|Facebook|YouTube|Instagram|Zalo|PhD|MBA|PDF|VND|IELTS|TOEFL|TOEIC|CEFR|ERP|STEM|ESET\d*|AI|UK|USA|ASEAN|I|II|III|IV|V|VI|VII|VIII|IX|X)\b/gi;
const titleConnectors = /^(?:a|an|and|as|at|by|for|from|in|of|on|or|the|to|with)$/i;

function sentenceCase(text: string, startWithUppercase: boolean) {
  const lowercase = text.toLowerCase().replace(properWords, (word) => {
    if (acronyms.test(word)) return word.toUpperCase();
    if (word === "phd") return "PhD";
    if (word === "youtube") return "YouTube";
    if (word === "the institute") return "the Institute";
    return word.replace(/\b\w/g, (initial) => initial.toUpperCase()).replace(" Of ", " of ");
  });
  return startWithUppercase ? lowercase.replace(/\p{L}/u, (initial) => initial.toUpperCase()) : lowercase;
}

function matchCopyStyle(vietnamese: string, english: string) {
  const source = vietnamese.trim();
  const sourceWords = source.match(words) ?? [];
  if (sourceWords.length === 0 || source === english || /^(?:https?:\/\/|mailto:|\S+@\S+$)/i.test(source)) return english;

  let text = english.trim();
  const englishWords = text.match(words) ?? [];
  const isUppercase = source === source.toUpperCase() && source !== source.toLowerCase();
  if (isUppercase) {
    // Some source strings combine normal copy with a separately styled line.
    if (!text.includes("\n") || !source.includes("\n")) text = text.toUpperCase();
  } else {
    const targetUppercase = text === text.toUpperCase() && text !== text.toLowerCase();
    const sourceSentenceCase = sourceWords.slice(1, 3).every((word) => /^\p{Ll}/u.test(word));
    const targetTitleCase = englishWords.filter((word) => /^\p{Lu}/u.test(word)).length > 1 &&
      englishWords.every((word) => /^\p{Lu}/u.test(word) || titleConnectors.test(word));
    if (targetUppercase || (sourceSentenceCase && targetTitleCase)) {
      text = sentenceCase(text, /^\p{Lu}/u.test(sourceWords[0] ?? ""));
    }
  }
  const [, suffix = ""] = source.match(terminalMark) ?? [];
  const mark = source.slice(0, source.length - suffix.length).match(/[.!?,:;…]+$/u)?.[0] ?? "";
  // Preserve the English closing quote or CTA arrow around the source's punctuation.
  return text.replace(terminalMark, (_ending, closing: string) => mark + closing);
}

export function copyKey(value: string) {
  return value.normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();
}

function translateQuantity(source: string) {
  const money = /^(từ )?([\d.]+) (đồng|đ|vnđ|triệu đồng)(\/môn)?$/i.exec(source);
  if (money) {
    const [, from, amount, unit, perCourse] = money;
    const digits = amount?.replace(/\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${from ? "From " : ""}VND ${digits}${unit?.toLowerCase() === "triệu đồng" ? " million" : ""}${perCourse ? " per course" : ""}`;
  }
  const code = /^mã (chương trình|ngành):\s*([\d-]+)$/i.exec(source);
  if (code) return `${code[1]?.toLowerCase() === "ngành" ? "Field" : "Program"} code: ${code[2]}`;
  const units = /^\d+(?:[-–]\d+)? (?:tín chỉ|tháng|học kỳ)(?: · \d+(?:[-–]\d+)? (?:tín chỉ|tháng|học kỳ))*$/i;
  if (units.test(source)) {
    return source.replace(/(\d+(?:[-–]\d+)?) (tín chỉ|tháng|học kỳ)/gi, (_part, amount, unit) => {
      const label = unit.toLowerCase() === "tín chỉ" ? "credit" : unit.toLowerCase() === "tháng" ? "month" : "semester";
      return `${amount} ${label}${amount === "1" ? "" : "s"}`;
    });
  }
}

function translateAdmissionsCount(source: string) {
  const checklist = /^đã chuẩn bị (\d+) \/ (\d+) mục$/.exec(source);
  if (checklist) return `Prepared ${checklist[1]} / ${checklist[2]} items`;
  const step = /^bước (\d+) \/ (\d+)$/.exec(source);
  if (step) return `Step ${step[1]} / ${step[2]}`;
  const groups = /^(\d+) nhóm đối chiếu (trong phụ lục|theo từ khóa)$/.exec(source);
  if (groups) return `${groups[1]} ${groups[1] === "1" ? "group" : "groups"} ${groups[2] === "trong phụ lục" ? "in the appendix" : "matching your search"}`;
  const fields = /^(\d+) \/ (\d+) ngành (trong danh mục đối chiếu|phù hợp với từ khóa)$/.exec(source);
  if (fields) return `${fields[1]} / ${fields[2]} fields ${fields[3] === "trong danh mục đối chiếu" ? "in the reference list" : "matching your search"}`;
}

export function websiteCopy(locale: Locale, pathname: string, programme?: CopyDictionary) {
  const path = stripLocale(pathname);
  const section = path.split("/")[1];
  const sources = [programme, pages[path], pages[`/${section}`], pages.shared, pages["/programmes"], pages["/"]];
  return <T,>(value: T, fallback: T = value, styleSource?: string): T => {
    if (locale !== "en" || typeof value !== "string" || !value.trim()) return value;
    const key = copyKey(value);
    for (const source of sources) {
      if (source && Object.hasOwn(source, key)) return matchCopyStyle(styleSource ?? value, source[key]) as T;
    }
    const quantity = translateQuantity(key) ?? (section === "admissions" ? translateAdmissionsCount(key) : undefined);
    if (quantity) return quantity as T;
    return typeof fallback === "string" ? matchCopyStyle(styleSource ?? value, fallback) as T : fallback;
  };
}
