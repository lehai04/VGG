// Shared visibility policy for navigation, sitemap and public page layouts.
// News and student success are open in both supported languages.
const hiddenSections: readonly string[] = [];

export function isPublicSectionVisible(href: string) {
  const path = href.replace(/^\/(vi|en)(?=\/|$)/, "").split(/[?#]/)[0];
  return !hiddenSections.some(
    (section) => path === section || path.startsWith(`${section}/`),
  );
}
