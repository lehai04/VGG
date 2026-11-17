import { getKnowledgeAppendixProgrammes } from "./reference-engine";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char,
  );
}

const programmes = getKnowledgeAppendixProgrammes();

export const knowledgeAppendixHtml = `
  <section class="knowledge-appendix" aria-labelledby="knowledge-appendix-title">
    <h3 id="knowledge-appendix-title">Phụ lục 1. Danh mục ngành phù hợp và các học phần bổ sung kiến thức</h3>
    <p>Chọn ngành Thạc sĩ dự tuyển để đối chiếu ngành tốt nghiệp, học phần cần bổ sung và số tín chỉ.</p>
    <div class="knowledge-appendix-programmes">
      ${programmes
        .map(({ id, name, code, groups }, index) => {
          const title = `${index + 1}. ${escapeHtml(name)} (${escapeHtml(code)})`;
          let requirementUntil = 0;
          const rows = groups
            .map(({ group, eligible_majors, supplementary_requirement }, row) => {
              let requirement = "";
              if (row === requirementUntil) {
                requirementUntil = row + 1;
                while (
                  requirementUntil < groups.length &&
                  groups[requirementUntil].supplementary_requirement === supplementary_requirement
                ) {
                  requirementUntil++;
                }
                requirement = `<td rowspan="${requirementUntil - row}">${escapeHtml(supplementary_requirement)}</td>`;
              }
              return `<tr><th scope="row">${escapeHtml(group)}</th><td>${escapeHtml(eligible_majors)}</td>${requirement}</tr>`;
            })
            .join("");
          return `<details name="knowledge-appendix-programme" class="knowledge-appendix-programme"${index === 0 ? " open" : ""}>
          <summary id="knowledge-appendix-${id}">${title}</summary>
          <div class="knowledge-appendix-table" tabindex="0" role="region" aria-labelledby="knowledge-appendix-${id}">
            <table>
              <caption class="sr-only">${title}</caption>
              <thead><tr>
                <th scope="col">Nhóm ngành phù hợp</th>
                <th scope="col">Ngành phù hợp</th>
                <th scope="col">Học phần bổ sung kiến thức, số tín chỉ</th>
              </tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </details>`;
        })
        .join("")}
    </div>
  </section>
`;
