import { getKnowledgeAppendixProgrammes } from "./reference-engine";

const programmes = getKnowledgeAppendixProgrammes();
type Programme = (typeof programmes)[number];
type Group = Programme["groups"][number];

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char,
  );
}

function icon(name: string) {
  return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}

function groupRequirements(groups: Group[]) {
  const sections: { requirement: string; groups: Group[] }[] = [];
  for (const group of groups) {
    const previous = sections.at(-1);
    if (previous?.requirement === group.supplementary_requirement) previous.groups.push(group);
    else sections.push({ requirement: group.supplementary_requirement, groups: [group] });
  }
  return sections;
}

function renderResults(programme: Programme) {
  const sections = groupRequirements(programme.groups);
  const name = escapeHtml(programme.name);
  const rows = sections
    .map(({ requirement, groups }) =>
      groups
        .map(
          (group, index) =>
            `<tr><th scope="row">${escapeHtml(group.group)}</th><td>${escapeHtml(group.eligible_majors)}</td>${
              index === 0 ? `<td rowspan="${groups.length}">${escapeHtml(requirement)}</td>` : ""
            }</tr>`,
        )
        .join(""),
    )
    .join("");
  const cards = sections
    .map(({ requirement, groups }) => {
      const groupList = groups
        .map(
          (group) =>
            `<div class="knowledge-result-group"><h5>${escapeHtml(group.group)}</h5><p>${escapeHtml(group.eligible_majors)}</p></div>`,
        )
        .join("");
      return `<article class="knowledge-result-card">
        ${
          groups.length === 1
            ? groupList
            : `<details><summary>Xem ${groups.length} nhóm ngành áp dụng</summary>${groupList}</details>`
        }
        <p class="knowledge-result-requirement"><strong>Yêu cầu bổ sung</strong>${escapeHtml(requirement)}</p>
      </article>`;
    })
    .join("");
  return `
    <div class="knowledge-result-heading">
      <h4>${name}</h4>
      <span>Mã ngành ${escapeHtml(programme.code)}</span>
    </div>
    <table class="knowledge-result-table">
      <caption class="sr-only">Học phần bổ sung kiến thức ngành ${name}</caption>
      <thead><tr>
        <th scope="col">Nhóm ngành phù hợp</th>
        <th scope="col">Ngành tốt nghiệp phù hợp</th>
        <th scope="col">Học phần bổ sung kiến thức, số tín chỉ</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="knowledge-result-cards">${cards}</div>`;
}

export function knowledgeRegistrationSection(locale: string) {
  return `
    <section id="dang-ky-bo-sung-kien-thuc" class="section admission-step knowledge-section" aria-labelledby="knowledge-heading">
      <div class="wrap">
        <header class="knowledge-heading">
          <div>
            <h2 id="knowledge-heading">Đăng ký bổ sung kiến thức</h2>
            <p>Xem điều kiện học bổ sung, tra cứu học phần và đăng ký theo ngành Thạc sĩ dự tuyển.</p>
          </div>
          <a class="btn primary knowledge-register" href="/${escapeHtml(locale)}/admissions/bo-sung-kien-thuc">
            Đăng ký học bổ sung kiến thức ${icon("arrow")}
          </a>
        </header>

        <div class="knowledge-guides">
          <article class="knowledge-guide">
            <span class="knowledge-icon">${icon("cap")}</span>
            <div>
              <h3>Ai cần học bổ sung kiến thức?</h3>
              <p>Ứng viên dự tuyển Thạc sĩ cần học bổ sung khi hồ sơ thuộc diện yêu cầu. Khoa và Viện xác định dựa trên ngành tốt nghiệp, bảng điểm đại học và chương trình Thạc sĩ đăng ký.</p>
            </div>
          </article>
          <article class="knowledge-guide">
            <span class="knowledge-icon">${icon("book")}</span>
            <div>
              <h3>Cách xác định học phần cần bổ sung</h3>
              <p>Chọn ngành Thạc sĩ dự tuyển rồi đối chiếu ngành tốt nghiệp với danh mục ngành phù hợp. Khoa và Viện kiểm tra bảng điểm để xác nhận học phần cần bổ sung cho từng hồ sơ.</p>
              <a class="text-link" href="#tra-cuu-hoc-phan-bo-sung">Tra cứu học phần ${icon("arrow")}</a>
            </div>
          </article>
        </div>

        <div class="knowledge-facts">
          <article class="knowledge-fact">
            <h3>${icon("calendar")} Lịch học và hạn đăng ký</h3>
            <p><strong>Chờ Viện xác nhận</strong></p>
            <p>Ứng viên thuộc diện phải học cần hoàn thành học phần trước khi xét tuyển.</p>
          </article>
          <article class="knowledge-fact">
            <h3>${icon("wallet")} Học phí bổ sung</h3>
            <p><strong class="knowledge-fee">1.200.000 đồng/môn</strong></p>
            <p>Áp dụng cho ứng viên thuộc diện phải học bổ sung và thu riêng ngoài học phí toàn khóa.</p>
          </article>
          <article class="knowledge-fact">
            <h3>${icon("award")} Hiệu lực kết quả</h3>
            <p><strong>02 năm</strong> kể từ khi đạt yêu cầu và được công nhận.</p>
          </article>
        </div>

        <section id="tra-cuu-hoc-phan-bo-sung" class="knowledge-lookup" aria-labelledby="knowledge-lookup-title" tabindex="-1">
          <header class="knowledge-lookup-heading">
            <h3 id="knowledge-lookup-title">Tra cứu học phần bổ sung</h3>
            <p>Phụ lục 1 · Danh mục ngành phù hợp và các học phần bổ sung kiến thức</p>
          </header>
          <div class="knowledge-lookup-grid">
            <div class="knowledge-picker">
              <label for="knowledge-programme-search">Ngành Thạc sĩ dự tuyển</label>
              <div class="knowledge-search">
                ${icon("search")}
                <input id="knowledge-programme-search" type="search" autocomplete="off" placeholder="Nhập tên hoặc mã ngành" aria-controls="knowledge-programme-list">
              </div>
              <p class="sr-only" aria-live="polite" data-knowledge-search-status></p>
              <ul id="knowledge-programme-list" class="knowledge-programme-list" aria-label="Danh sách ngành Thạc sĩ">
                ${programmes
                  .map(
                    (programme, index) =>
                      `<li><button type="button" data-knowledge-programme="${escapeHtml(programme.id)}" aria-pressed="${index === 0}" aria-controls="knowledge-lookup-results">
                    <span>${escapeHtml(programme.name)}</span><small>${escapeHtml(programme.code)}</small>
                  </button></li>`,
                  )
                  .join("")}
              </ul>
              <p class="knowledge-empty" data-knowledge-empty hidden>Không tìm thấy ngành phù hợp với từ khóa.</p>
            </div>
            <div id="knowledge-lookup-results" class="knowledge-results">
              ${renderResults(programmes[0])}
            </div>
          </div>
          <p class="knowledge-review-note">${icon("info")} <span>Khoa và Viện sẽ đối chiếu bảng điểm để xác nhận học phần cần bổ sung cho từng hồ sơ.</span></p>
        </section>

        <section class="knowledge-support" aria-labelledby="knowledge-support-title">
          <div>
            <h3 id="knowledge-support-title">Đầu mối hỗ trợ</h3>
            <p>Viện Sau đại học – Trường Đại học Văn Lang</p>
          </div>
          <ul>
            <li><a href="tel:+84988486869">${icon("phone")} <span><strong>Hotline</strong> 0988 48 6869</span></a></li>
            <li><a href="tel:+842871016869">${icon("phone")} <span><strong>Điện thoại</strong> 028 7101 6869</span></a></li>
            <li><a href="mailto:tuyensinh.sdh@vlu.edu.vn">${icon("mail")} <span><strong>Email</strong> tuyensinh.sdh@vlu.edu.vn</span></a></li>
          </ul>
        </section>
      </div>
    </section>`;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d")
    .trim();
}

export function connectKnowledgeLookup(root: HTMLElement) {
  const search = root.querySelector<HTMLInputElement>("#knowledge-programme-search");
  const list = root.querySelector<HTMLUListElement>("#knowledge-programme-list");
  const results = root.querySelector<HTMLElement>("#knowledge-lookup-results");
  const empty = root.querySelector<HTMLElement>("[data-knowledge-empty]");
  const status = root.querySelector<HTMLElement>("[data-knowledge-search-status]");
  if (!search || !list || !results || !empty || !status) return;

  const buttons = [...list.querySelectorAll<HTMLButtonElement>("[data-knowledge-programme]")];
  const controller = new AbortController();
  const options = { signal: controller.signal };
  let selected = programmes[0];
  let shown = selected.id;

  const updateSelection = (programme?: Programme) => {
    for (const button of buttons) {
      button.setAttribute(
        "aria-pressed",
        String(programme?.id === button.dataset.knowledgeProgramme),
      );
    }
    const id = programme?.id ?? "";
    if (id === shown) return;
    shown = id;
    if (programme) selected = programme;
    results.innerHTML = programme
      ? renderResults(programme)
      : '<p class="knowledge-empty">Thử nhập tên hoặc mã ngành khác để xem học phần.</p>';
  };

  search.addEventListener(
    "input",
    () => {
      const query = normalize(search.value);
      const matching = programmes.filter(
        ({ name, code }) => normalize(name).includes(query) || code.includes(query),
      );
      const ids = new Set(matching.map(({ id }) => id));
      for (const button of buttons) {
        const row = button.closest("li");
        if (row) row.hidden = !ids.has(button.dataset.knowledgeProgramme ?? "");
      }
      empty.hidden = matching.length > 0;
      status.textContent = matching.length
        ? `${matching.length} ngành phù hợp.`
        : "Không tìm thấy ngành phù hợp với từ khóa.";
      updateSelection(ids.has(selected.id) ? selected : matching[0]);
    },
    options,
  );

  list.addEventListener(
    "click",
    (event) => {
      if (!(event.target instanceof Element)) return;
      const id = event.target.closest<HTMLButtonElement>("[data-knowledge-programme]")?.dataset
        .knowledgeProgramme;
      const programme = programmes.find((item) => item.id === id);
      if (programme) updateSelection(programme);
    },
    options,
  );

  list.addEventListener(
    "keydown",
    (event) => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      const visible = buttons.filter((button) => !button.closest("li")?.hidden);
      const index = visible.findIndex((button) => button === event.target);
      if (index < 0) return;
      event.preventDefault();
      const target =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? visible.length - 1
            : Math.max(
                0,
                Math.min(visible.length - 1, index + (event.key === "ArrowDown" ? 1 : -1)),
              );
      visible[target]?.focus();
    },
    options,
  );

  search.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "ArrowDown" && event.key !== "Enter") return;
      const first = buttons.find((button) => !button.closest("li")?.hidden);
      if (!first) return;
      event.preventDefault();
      first.focus();
      if (event.key === "Enter") first.click();
    },
    options,
  );

  return () => controller.abort();
}
