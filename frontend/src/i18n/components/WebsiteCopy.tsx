"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { websiteCopy, type CopyDictionary } from "../website-copy";

const ProgrammeCopy = createContext<CopyDictionary | undefined>(undefined);

export function ProgrammeCopyProvider({ dictionary, children }: { dictionary?: CopyDictionary; children: ReactNode }) {
  return <ProgrammeCopy.Provider value={dictionary}>{children}</ProgrammeCopy.Provider>;
}

export function useWebsiteCopy() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const programme = useContext(ProgrammeCopy);
  return useMemo(() => websiteCopy(locale, pathname, programme), [locale, pathname, programme]);
}
