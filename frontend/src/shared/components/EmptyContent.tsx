import { ArrowRight } from "lucide-react";
import Link from "@/i18n/components/LocalizedLink";
import styles from "./EmptyContent.module.css";

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
} & (
  | { href: string; onReset?: never }
  | { href?: never; onReset: () => void }
  | { href?: never; onReset?: never }
);

/** Shared empty state for catalogues, with an optional way to clear active filters. */
export function EmptyContent({ title, description, actionLabel, href, onReset }: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.illustration} aria-hidden="true">
        <svg viewBox="0 0 300 230" fill="none" focusable="false">
          <ellipse cx="138" cy="113" rx="121" ry="90" fill="#eaf1ff" transform="rotate(-17 138 113)" />
          <ellipse cx="145" cy="209" rx="126" ry="17" fill="#dce8ff" />
          <path d="M76 55h112l15 143a10 10 0 0 1-10 11H82z" fill="#fff" stroke="#b9cff8" strokeWidth="3" />
          <path d="M97 82h70M99 108h64M102 134h55M105 160h57" stroke="#9dbcf3" strokeWidth="7" strokeLinecap="round" />
          <path d="m224 163 44 43" stroke="#092557" strokeWidth="23" strokeLinecap="round" />
          <circle cx="188" cy="116" r="57" fill="#f7faff" fillOpacity=".8" stroke="#092557" strokeWidth="10" />
          <path d="m173 101 30 30m0-30-30 30" stroke="#80a7e3" strokeWidth="9" strokeLinecap="round" />
          <path d="m239 33 4-13m10 23 9-10m1 23 13-4" stroke="#568eed" strokeWidth="5" strokeLinecap="round" />
          <path d="m49 83 4 9 9 4-9 4-4 9-4-9-9-4 9-4z" fill="white" />
        </svg>
      </div>
      <div className={styles.copy}>
        <h3>{title}</h3>
        <p>{description}</p>
        {actionLabel && (href ? (
          <Link className={styles.action} href={href}>{actionLabel}<ArrowRight aria-hidden="true" /></Link>
        ) : onReset ? (
          <button className={styles.action} type="button" onClick={onReset}>{actionLabel}<ArrowRight aria-hidden="true" /></button>
        ) : null)}
      </div>
    </div>
  );
}
