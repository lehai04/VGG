"use client";
import { createContext, useContext, type ReactNode } from "react";
import { isPublicSectionVisible } from "@/lib/public-sections";
import { chromeContent } from "@/data/chrome-content";
import { programmes as defaultProgrammeOptions } from "@/data/site";
const Context = createContext({
  ...chromeContent,
  programmeOptions: [...defaultProgrammeOptions] as readonly string[],
});
export function WebsiteChromeProvider({
  value,
  children,
}: {
  value: typeof chromeContent & { programmeOptions: readonly string[] };
  children: ReactNode;
}) {
  return <Context.Provider value={{ ...value, navigationGroups: value.navigationGroups.filter((group) => isPublicSectionVisible(`/${group.slug}`)) }}>{children}</Context.Provider>;
}
export function useWebsiteChrome() {
  return useContext(Context);
}
