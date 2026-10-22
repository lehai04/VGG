"use client";

import Link from "@/i18n/components/LocalizedLink";
import { useLocale } from "@/i18n/components/LocaleProvider";
import styles from "./not-found.module.css";

/** Reference: Darin Senneff's Yeti 404. Artwork attribution is bundled with the asset. */
export default function NotFound() {
  const { locale } = useLocale();
  return (
    <main className={styles.page} id="main-content" aria-label="404 — Page not found">
      <div className={styles.illustration} aria-hidden="true">
        {/* Native SVG rendering preserves its self-contained animation and reduced-motion rules. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/404/yeti.svg" width="1955" height="1683" alt="" draggable={false} />
      </div>
      <section className={styles.content} lang="en">
        <h1>Hello?? Is somebody there?!?</h1>
        <p>
          We know it’s scary, but the page you’re trying to reach can’t be found.
          Perhaps it was just a bad <Link href="/" aria-label={locale === "en" ? "Back to homepage" : "Về trang chủ"}>link</Link> dream?
        </p>
      </section>
    </main>
  );
}
