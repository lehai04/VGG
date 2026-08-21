"use client";

import { useMemo, useState } from "react";

type Programme = {
  name: string;
  degree: "Thạc sĩ" | "Tiến sĩ";
  field: string;
  duration: string;
  mode: string;
};

const PROGRAMMES: Programme[] = [
  {
    name: "Quản trị Kinh doanh",
    degree: "Thạc sĩ",
    field: "Kinh doanh & Quản lý",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Kinh doanh Thương mại",
    degree: "Thạc sĩ",
    field: "Kinh doanh & Quản lý",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Tài chính – Ngân hàng",
    degree: "Thạc sĩ",
    field: "Kinh doanh & Quản lý",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Kế toán",
    degree: "Thạc sĩ",
    field: "Kinh doanh & Quản lý",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Luật Kinh tế",
    degree: "Thạc sĩ",
    field: "Luật, Nhân văn & Truyền thông",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Quan hệ Công chúng",
    degree: "Thạc sĩ",
    field: "Luật, Nhân văn & Truyền thông",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Ngôn ngữ Anh",
    degree: "Thạc sĩ",
    field: "Luật, Nhân văn & Truyền thông",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Công nghệ Sinh học",
    degree: "Thạc sĩ",
    field: "Kỹ thuật, Môi trường & Công nghệ",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Kỹ thuật Môi trường",
    degree: "Thạc sĩ",
    field: "Kỹ thuật, Môi trường & Công nghệ",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Quản lý Tài nguyên và Môi trường",
    degree: "Thạc sĩ",
    field: "Kỹ thuật, Môi trường & Công nghệ",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Kỹ thuật Xây dựng",
    degree: "Thạc sĩ",
    field: "Kỹ thuật, Môi trường & Công nghệ",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Kỹ thuật ô tô",
    degree: "Thạc sĩ",
    field: "Kỹ thuật, Môi trường & Công nghệ",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Logistics và Quản lý chuỗi cung ứng",
    degree: "Thạc sĩ",
    field: "Kinh doanh & Quản lý",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Kiến trúc",
    degree: "Thạc sĩ",
    field: "Thiết kế & Mỹ thuật Ứng dụng",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Mỹ thuật Ứng dụng",
    degree: "Thạc sĩ",
    field: "Thiết kế & Mỹ thuật Ứng dụng",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Lý luận và Lịch sử Mỹ thuật Ứng dụng",
    degree: "Thạc sĩ",
    field: "Thiết kế & Mỹ thuật Ứng dụng",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Quản trị Dịch vụ Du lịch và Lữ hành",
    degree: "Thạc sĩ",
    field: "Du lịch & Khách sạn",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Quản trị Khách sạn",
    degree: "Thạc sĩ",
    field: "Du lịch & Khách sạn",
    duration: "18–24 tháng",
    mode: "Ngoài giờ hành chính",
  },
  {
    name: "Khoa học Môi trường",
    degree: "Tiến sĩ",
    field: "Kỹ thuật, Môi trường & Công nghệ",
    duration: "36–48 tháng",
    mode: "Toàn thời gian",
  },
];

const DEGREES = ["Thạc sĩ", "Tiến sĩ"];
const FIELDS = [...new Set(PROGRAMMES.map((programme) => programme.field))];
const MODES = [...new Set(PROGRAMMES.map((programme) => programme.mode))];

/** SECTION TƯƠNG TÁC: tìm kiếm, lọc và sắp xếp danh sách chương trình đào tạo. */
export function ProgrammeFinder() {
  const [query, setQuery] = useState("");
  const [degrees, setDegrees] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [modes, setModes] = useState<string[]>([]);
  const [sort, setSort] = useState<"az" | "za">("az");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggle = (value: string, values: string[], update: (items: string[]) => void) => {
    update(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  const clearAll = () => {
    setQuery("");
    setDegrees([]);
    setFields([]);
    setModes([]);
  };

  const results = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("vi");

    return PROGRAMMES.filter(
      (programme) =>
        (!keyword ||
          `${programme.name} ${programme.field}`.toLocaleLowerCase("vi").includes(keyword)) &&
        (!degrees.length || degrees.includes(programme.degree)) &&
        (!fields.length || fields.includes(programme.field)) &&
        (!modes.length || modes.includes(programme.mode)),
    ).sort((first, second) =>
      sort === "za"
        ? second.name.localeCompare(first.name, "vi")
        : first.name.localeCompare(second.name, "vi"),
    );
  }, [degrees, fields, modes, query, sort]);

  const filterGroup = (
    title: string,
    options: string[],
    selected: string[],
    update: (items: string[]) => void,
  ) => (
    <fieldset>
      <legend>{title}</legend>
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option, selected, update)}
          />
          <span>{option}</span>
        </label>
      ))}
    </fieldset>
  );

  return (
    <section
      className="vgg-programme-finder"
      id="programme-directory"
      aria-labelledby="finder-title"
    >
      <div className="vgg-finder-heading">
        <div>
          <p>PROGRAMME DIRECTORY · DANH MỤC ĐÀO TẠO</p>
          <h2 id="finder-title">Tìm chương trình phù hợp.</h2>
        </div>
        <label>
          <span>Tìm kiếm chương trình</span>
          <div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nhập tên ngành hoặc lĩnh vực"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Xóa từ khóa">
                ×
              </button>
            )}
          </div>
        </label>
      </div>

      <button
        className="vgg-filter-mobile-toggle"
        onClick={() => setMobileFiltersOpen((open) => !open)}
      >
        Bộ lọc chương trình <span>{mobileFiltersOpen ? "−" : "+"}</span>
      </button>

      <div className="vgg-finder-workspace">
        <aside className={mobileFiltersOpen ? "vgg-filter-sidebar is-open" : "vgg-filter-sidebar"}>
          <header>
            <strong>Bộ lọc</strong>
            <button onClick={clearAll}>Xóa tất cả</button>
          </header>
          {filterGroup("Bậc đào tạo", DEGREES, degrees, setDegrees)}
          {filterGroup("Khối ngành", FIELDS, fields, setFields)}
          {filterGroup("Hình thức học", MODES, modes, setModes)}
        </aside>

        <div className="vgg-finder-results">
          <div className="vgg-results-toolbar">
            <p>
              Hiển thị <strong>{results.length}</strong> / {PROGRAMMES.length} chương trình
            </p>
            <label>
              Sắp xếp
              <select value={sort} onChange={(event) => setSort(event.target.value as "az" | "za")}>
                <option value="az">Tên A–Z</option>
                <option value="za">Tên Z–A</option>
              </select>
            </label>
          </div>

          <div className="vgg-programme-results">
            {results.map((programme, index) => (
              <a className="vgg-programme-result" href="#contact" key={programme.name}>
                <span className="vgg-programme-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="vgg-programme-copy">
                  <p>
                    {programme.degree} · {programme.field}
                  </p>
                  <h3>{programme.name}</h3>
                  <dl>
                    <div>
                      <dt>Thời lượng</dt>
                      <dd>{programme.duration}</dd>
                    </div>
                    <div>
                      <dt>Hình thức</dt>
                      <dd>{programme.mode}</dd>
                    </div>
                  </dl>
                </div>
                <div className="vgg-programme-link">
                  <span>Xem chương trình</span>
                  <b>↗</b>
                </div>
              </a>
            ))}
          </div>

          {!results.length && (
            <div className="vgg-finder-empty">
              <h3>Chưa tìm thấy chương trình phù hợp.</h3>
              <p>Hãy thử từ khóa khác hoặc xóa bớt bộ lọc.</p>
              <button onClick={clearAll}>Xóa tất cả bộ lọc</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
