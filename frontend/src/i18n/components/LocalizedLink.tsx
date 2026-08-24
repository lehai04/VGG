"use client";

import Link, { type LinkProps } from "next/link";
import { forwardRef, type AnchorHTMLAttributes } from "react";
import { localizedHref } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";

type Props = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

const LocalizedLink = forwardRef<HTMLAnchorElement, Props>(function LocalizedLink({ href, ...props }, ref) {
  const { locale } = useLocale();
  const localized = typeof href === "string" ? localizedHref(locale, href) : href;
  return <Link ref={ref} href={localized} {...props} />;
});

export default LocalizedLink;
