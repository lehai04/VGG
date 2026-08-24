"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import vi from "@/messages/vi.json";
import en from "@/messages/en.json";

type Messages = typeof vi;
const dictionaries: Record<Locale, Messages> = { vi, en };
const LocaleContext = createContext<{ locale: Locale; messages: Messages }>({ locale: "vi", messages: vi });

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={{ locale, messages: dictionaries[locale] }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
