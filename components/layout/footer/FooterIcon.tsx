type IconName =
  | "mail"
  | "book"
  | "phone"
  | "headset"
  | "facebook"
  | "youtube"
  | "instagram"
  | "tiktok"
  | "pin"
  | "arrow-up";

export function FooterIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    mail: <path d="M3 5h18v14H3zM3 6l9 7 9-7" />,
    book: <path d="M4 4.5A3.5 3.5 0 0 1 7.5 1H20v18H7.5A3.5 3.5 0 0 0 4 22zM4 4.5V22M8 5h8" />,
    phone: (
      <path d="M7 3h3l2 5-2.2 1.5a15 15 0 0 0 4.7 4.7L16 12l5 2v3c0 1.1-.9 2-2 2C10.2 19 3 11.8 3 3c0-1.1.9-2 2-2h2z" />
    ),
    headset: (
      <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1zm16 0h-3v5h2a1 1 0 0 0 1-1zm-3 5a5 5 0 0 1-5 3" />
    ),
    facebook: (
      <path d="M14 21v-8h3l.5-3H14V8.1c0-.9.3-1.6 1.7-1.6H18V3.8c-.4-.1-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3V10H8v3h3.3v8" />
    ),
    youtube: (
      <path d="M21 7.2a2.6 2.6 0 0 0-1.8-1.8C17.6 5 12 5 12 5s-5.6 0-7.2.4A2.6 2.6 0 0 0 3 7.2 27 27 0 0 0 2.6 12c0 1.6.1 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C6.4 19 12 19 12 19s5.6 0 7.2-.4a2.6 2.6 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8M10 15.2V8.8l5.2 3.2z" />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    tiktok: (
      <path d="M14 3v11.2a4.2 4.2 0 1 1-3.2-4.1M14 3c1.1 2.9 3 4.7 6 5v3c-2.2 0-4.3-.8-6-2.2" />
    ),
    pin: (
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
    ),
    "arrow-up": <path d="M12 19V5m-6 6 6-6 6 6" />,
  };
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      {paths[name]}
    </svg>
  );
}
