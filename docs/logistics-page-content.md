# Logistics programme page

Source reviewed: 12 October 2026.

- User-supplied workbook: https://onedrive.live.com/:x:/g/personal/aa7df305faddd96c/IQD1IShTee_HTaOExCY0f-VOAZmINkCQg27kYZ59RzzLiqM
- Worksheet `Trang_tính1`, row 6: C overview; D field exploration; F programme and duration (24 months, applied and research orientations); H research and industry connections; I admission by dossier review.
- E6 links to the careers source: https://docs.google.com/document/d/1w8rRsRN4FFBiwW6WB3HyZG2yvWHibVOUnHqixADP8R8/edit
- G6 (learning experience) is empty. No unsupported learning-experience promises were added.
- Existing `src/data/curricula.ts` supplies the course lists; existing graduation requirements are reused. These are not represented as newly verified by the workbook. The source does not supply updated fees or scholarships; the detail page directs users to consultation.
- Editorial layout reference only: https://www.sydney.edu.au/study/areas/architecture.html. No Sydney course information or images were reused.

Route: `/programmes/logistics` (with existing locale prefix support).
Other programme titles link to individual pages using their existing VGG content.
The hero uses the existing, accurately captioned VLU campus image.

Manual verification: clicking Logistics in the directory navigates to the new page; the applied curriculum expands; the consultation select defaults to Logistics; 390px viewport has no horizontal overflow. TypeScript and targeted ESLint checks passed during implementation.
