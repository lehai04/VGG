/** One-time reveal, scoped to admissions. Content stays visible without JS. */
export function initializeAdmissionsMotion(root) {
  if (
    globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !globalThis.IntersectionObserver
  )
    return () => {};
  const blocks = root.querySelectorAll(
    ".admission-step-heading, .notice-documents article, .consult-panel",
  );
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("admission-revealed");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.08 },
  );
  blocks.forEach((block, index) => {
    block.classList.add("admission-reveal");
    block.style.setProperty("--admission-delay", `${(index % 2) * 80}ms`);
    observer.observe(block);
  });
  return () => {
    observer.disconnect();
    blocks.forEach((block) => block.classList.remove("admission-reveal", "admission-revealed"));
  };
}
