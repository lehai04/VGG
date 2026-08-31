"use client";

import Link from "@/i18n/components/LocalizedLink";
import { useEffect, useMemo, useState } from "react";

import { ArrowUpRight, ChevronDown, X, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import {
  programmeDegrees,
  programmeFields,
  programmeOrientations,
  programmes,
  getProgrammeTuition,
  type Programme,
  type ProgrammeDegree,
  type ProgrammeField,
  type ProgrammeOrientation,
} from "@/data/programmes";

/* =========================================================
   SEARCH NORMALIZER
   ========================================================= */

function normalizeText(value: string) {
  // Bỏ dấu tiếng Việt để tìm kiếm không phân biệt cách người dùng nhập có dấu hay không.
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

/* =========================================================
   PROGRAMME DIRECTORY
   ========================================================= */

export default function ProgrammeDirectory() {
  const [keyword, setKeyword] = useState("");

  const [degrees, setDegrees] = useState<ProgrammeDegree[]>([]);

  const [fields, setFields] = useState<ProgrammeField[]>([]);

  const [orientations, setOrientations] = useState<ProgrammeOrientation[]>([]);

  // Nhận tiêu chí từ Programme Finder ở homepage để người dùng không phải lọc lại.
  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const nextDegree = params.get("degree");
      const nextField = params.get("field");
      const nextOrientation = params.get("orientation");
      setKeyword(params.get("search") ?? "");
      setDegrees(
        programmeDegrees.includes(nextDegree as ProgrammeDegree)
          ? [nextDegree as ProgrammeDegree]
          : [],
      );
      setFields(
        programmeFields.includes(nextField as ProgrammeField) ? [nextField as ProgrammeField] : [],
      );
      setOrientations(
        programmeOrientations.includes(nextOrientation as ProgrammeOrientation)
          ? [nextOrientation as ProgrammeOrientation]
          : [],
      );
    });
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const [sort, setSort] = useState<"az" | "za">("az");

  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* =======================================================
     FILTER HELPERS
     ======================================================= */

  const toggleDegree = (value: ProgrammeDegree) => {
    setDegrees((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  const toggleField = (value: ProgrammeField) => {
    setFields((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  const toggleOrientation = (value: ProgrammeOrientation) => {
    setOrientations((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  /* =======================================================
     SEARCH + FILTER + SORT
     ======================================================= */

  const filteredProgrammes = useMemo(() => {
    // Chỉ tính lại danh sách khi từ khóa, bộ lọc hoặc thứ tự sắp xếp thay đổi.
    const query = normalizeText(keyword.trim());

    const result = programmes.filter((programme) => {
      const searchText = normalizeText(
        [
          programme.code,
          programme.title,
          programme.englishTitle,
          programme.degree,
          programme.field,
          programme.orientation,
        ].join(" "),
      );

      const keywordMatch = !query || searchText.includes(query);

      const degreeMatch = degrees.length === 0 || degrees.includes(programme.degree);

      const fieldMatch = fields.length === 0 || fields.includes(programme.field);

      const orientationMatch =
        orientations.length === 0 || orientations.includes(programme.orientation);

      return keywordMatch && degreeMatch && fieldMatch && orientationMatch;
    });

    return [...result].sort((a, b) => {
      if (sort === "za") {
        return b.title.localeCompare(a.title, "vi");
      }

      return a.title.localeCompare(b.title, "vi");
    });
  }, [keyword, degrees, fields, orientations, sort]);

  const activeFilterCount = degrees.length + fields.length + orientations.length;

  const clearAll = () => {
    setKeyword("");

    setDegrees([]);

    setFields([]);

    setOrientations([]);

    setSort("az");

    setExpandedId(null);
  };

  const removeFilter = (type: "degree" | "field" | "orientation", value: string) => {
    if (type === "degree") toggleDegree(value as ProgrammeDegree);
    if (type === "field") toggleField(value as ProgrammeField);
    if (type === "orientation") toggleOrientation(value as ProgrammeOrientation);
  };

  const activeFilters = [
    ...degrees.map((value) => ({ type: "degree" as const, value })),
    ...fields.map((value) => ({ type: "field" as const, value })),
    ...orientations.map((value) => ({ type: "orientation" as const, value })),
  ];

  return (
    <section className="vgg-pd" id="programme-directory">
      {/* ===================================================
          INTRO
          =================================================== */}

      <div className="vgg-pd__intro">
        <div className="vgg-pd__intro-copy">
          <h2>KHÁM PHÁ CÁC NGÀNH HỌC</h2>

          <p className="vgg-pd__lead">
            Khám phá chương trình Sau đại học theo lĩnh vực, bậc đào tạo và định hướng phù hợp với
            mục tiêu của bạn.
          </p>
        </div>
      </div>

      {/* ===================================================
          MAIN FINDER
          =================================================== */}

      <div className="vgg-pd__finder">
        {/* =================================================
            SIDEBAR
            ================================================= */}

        <aside className="vgg-pd__sidebar">
          {/* HEADER */}

          <div className="vgg-pd__sidebar-head">
            <div className="vgg-pd__sidebar-title">
              <SlidersHorizontal size={18} strokeWidth={1.8} />

              <strong>Bộ lọc</strong>

              {activeFilterCount > 0 && (
                <span className="vgg-pd__active-count">{activeFilterCount}</span>
              )}
            </div>

            <button type="button" className="vgg-pd__clear" onClick={clearAll}>
              <RotateCcw size={13} />
              Xóa tất cả
            </button>
          </div>

          {/* =================================================
              DEGREE
              ================================================= */}

          <details className="vgg-pd__filter" open>
            <summary>
              <span>Bậc đào tạo</span>

              <ChevronDown size={16} />
            </summary>

            <div className="vgg-pd__filter-list">
              {programmeDegrees.map((degree) => {
                const count = programmes.filter((item) => item.degree === degree).length;

                return (
                  <label className="vgg-pd__option" key={degree}>
                    <input
                      type="checkbox"
                      checked={degrees.includes(degree)}
                      onChange={() => toggleDegree(degree)}
                    />

                    <span className="vgg-pd__checkbox" />

                    <span className="vgg-pd__option-name">{degree}</span>

                    <span className="vgg-pd__option-count">{count}</span>
                  </label>
                );
              })}
            </div>
          </details>

          {/* =================================================
              FIELD
              ================================================= */}

          <details className="vgg-pd__filter" open>
            <summary>
              <span>Nhóm ngành</span>

              <ChevronDown size={16} />
            </summary>

            <div className="vgg-pd__filter-list">
              {programmeFields.map((field) => {
                const count = programmes.filter((item) => item.field === field).length;

                return (
                  <label className="vgg-pd__option" key={field}>
                    <input
                      type="checkbox"
                      checked={fields.includes(field)}
                      onChange={() => toggleField(field)}
                    />

                    <span className="vgg-pd__checkbox" />

                    <span className="vgg-pd__option-name">{field}</span>

                    <span className="vgg-pd__option-count">{count}</span>
                  </label>
                );
              })}
            </div>
          </details>

          {/* =================================================
              ORIENTATION
              ================================================= */}

          <details className="vgg-pd__filter" open>
            <summary>
              <span>Định hướng</span>

              <ChevronDown size={16} />
            </summary>

            <div className="vgg-pd__filter-list">
              {programmeOrientations.map((orientation) => {
                const count = programmes.filter((item) => item.orientation === orientation).length;

                return (
                  <label className="vgg-pd__option" key={orientation}>
                    <input
                      type="checkbox"
                      checked={orientations.includes(orientation)}
                      onChange={() => toggleOrientation(orientation)}
                    />

                    <span className="vgg-pd__checkbox" />

                    <span className="vgg-pd__option-name">{orientation}</span>

                    <span className="vgg-pd__option-count">{count}</span>
                  </label>
                );
              })}
            </div>
          </details>

          {/* =================================================
              CONSULTATION
              ================================================= */}

          <div className="vgg-pd__consult">
            <span>NEED GUIDANCE?</span>

            <h3>
              Chưa chắc nên
              <br />
              chọn chương trình nào?
            </h3>

            <p>
              Trao đổi với đội ngũ Viện Sau Đại học để tìm lộ trình phù hợp với mục tiêu học tập và
              nghề nghiệp.
            </p>

            <Link href="/admissions#consultation">
              Nhận tư vấn
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </aside>

        {/* =================================================
            RESULTS
            ================================================= */}

        <div className="vgg-pd__results">
          {/* =================================================
              TOOLBAR
              ================================================= */}

          <div className="vgg-pd__toolbar">
            <label className="vgg-pd__search">
              <Search size={20} strokeWidth={1.7} />

              <input
                type="search"
                aria-label="Tìm chương trình"
                placeholder="Bạn muốn học gì?"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </label>

            <label className="vgg-pd__sort">
              <span>SORT BY</span>

              <select value={sort} onChange={(event) => setSort(event.target.value as "az" | "za")}>
                <option value="az">Tên A–Z</option>

                <option value="za">Tên Z–A</option>
              </select>
            </label>
          </div>

          {activeFilters.length > 0 && (
            <div className="vgg-pd__active-filters" aria-label="Bộ lọc đang chọn">
              <span>Đang lọc</span>
              {activeFilters.map((filter) => (
                <button
                  type="button"
                  key={`${filter.type}-${filter.value}`}
                  onClick={() => removeFilter(filter.type, filter.value)}
                >
                  {filter.value} <X size={13} aria-hidden="true" />
                </button>
              ))}
              <button type="button" className="vgg-pd__clear-chips" onClick={clearAll}>
                Xóa lọc
              </button>
            </div>
          )}

          {/* =================================================
              RESULTS INFO
              ================================================= */}

          <div className="vgg-pd__result-meta">
            <p>
              Hiển thị <strong>{filteredProgrammes.length}</strong> chương trình
            </p>

            <span>VAN LANG GRADUATE</span>
          </div>

          {/* =================================================
              RESULT SCROLLER
              ================================================= */}

          <div className="vgg-pd__list">
            {filteredProgrammes.map((programme) => {
              const expanded = expandedId === programme.id;

              const details = getProgrammeDetails(programme);

              return (
                <article
                  className={`vgg-pd-card ${expanded ? "vgg-pd-card--open" : ""}`}
                  key={programme.id}
                >
                  {/* =======================================
                        MAIN ROW
                        ======================================= */}

                  <div className="vgg-pd-card__row">
                    {/* CODE */}

                    <span className="vgg-pd-card__code">{programme.code}</span>

                    {/* PROGRAMME */}

                    <div className="vgg-pd-card__main">
                      <div className="vgg-pd-card__meta">
                        <span>{programme.degree}</span>

                        <span>{programme.field}</span>
                      </div>

                      <h3>{programme.title}</h3>
                    </div>

                    {/* CREDITS */}

                    <div className="vgg-pd-card__stat">
                      <strong>{programme.credits}</strong>

                      <span>TÍN CHỈ</span>
                    </div>

                    {/* DURATION */}

                    <div className="vgg-pd-card__stat">
                      <strong>{programme.duration}</strong>

                      <span>THỜI GIAN</span>
                    </div>

                    {/* TUITION */}

                    <div className="vgg-pd-card__stat vgg-pd-card__tuition">
                      <strong>{getProgrammeTuition(programme)}</strong>

                      <span>HỌC PHÍ TOÀN KHÓA</span>
                    </div>

                    {/* OPEN */}

                    <button
                      type="button"
                      className="vgg-pd-card__toggle"
                      aria-expanded={expanded}
                      aria-label={
                        expanded ? `Thu gọn ${programme.title}` : `Xem thêm ${programme.title}`
                      }
                      onClick={() => setExpandedId(expanded ? null : programme.id)}
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>

                  {/* =======================================
                        DETAILS
                        ======================================= */}

                  {expanded && (
                    <div className="vgg-pd-card__details">
                      <p className="vgg-pd-card__intro">{details.intro}</p>

                      <div className="vgg-pd-card__content-grid">
                        {[
                          ["01", "Đặc điểm nổi bật", details.highlights],
                          ["02", "Năng lực đầu ra", details.outcomes],
                          ["03", "Triển vọng nghề nghiệp", details.careers],
                        ].map(([number, title, items]) => (
                          <section key={number as string}>
                            <h4>
                              <span>{number as string}</span>
                              {title as string}
                            </h4>
                            <ul>
                              {(items as string[]).map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </section>
                        ))}
                      </div>

                      {/* Mỗi ngành có thể có một hoặc nhiều định hướng (04 ứng dụng, 05 nghiên cứu). */}
                      {getProgrammeCurricula(programme).map((curriculum) => (
                        <section className="vgg-pd-card__curriculum" key={curriculum.number}>
                          <header>
                            <span>{curriculum.number}</span>
                            <div>
                              <p>NỘI DUNG CHƯƠNG TRÌNH</p>
                              <h4>{curriculum.title}</h4>
                            </div>
                            <strong>{programme.credits} tín chỉ</strong>
                          </header>

                          <div className="vgg-pd-card__curriculum-groups">
                            {/* Số thứ tự nhóm và học phần được tạo từ vị trí để dữ liệu chỉ cần lưu nội dung. */}
                            {curriculum.groups.map((group, groupIndex) => (
                              <section key={group.title}>
                                <h5>
                                  <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                                  {group.title}
                                </h5>
                                <ul>
                                  {group.courses.map((course, courseIndex) => (
                                    <li key={`${course.name}-${courseIndex}`}>
                                      <span className="vgg-pd-card__course-number">
                                        {String(courseIndex + 1).padStart(2, "0")}
                                      </span>
                                      <span className="vgg-pd-card__course-name">
                                        {course.name}
                                      </span>
                                      <div>
                                        {course.elective && <small>TỰ CHỌN</small>}
                                        <b>{course.credits} tín chỉ</b>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </section>
                            ))}
                          </div>
                        </section>
                      ))}

                      <div className="vgg-pd-card__detail-grid">
                        <div>
                          <span>Hình thức học</span>

                          <strong>{programme.studyMode}</strong>
                        </div>

                        <div>
                          <span>Kỳ tuyển sinh</span>

                          <strong>{programme.intake}</strong>
                        </div>

                        <div>
                          <span>Thời gian</span>

                          <strong>{programme.duration}</strong>
                        </div>

                        <div>
                          <span>Định hướng</span>

                          <strong>{programme.orientation}</strong>
                        </div>
                      </div>

                      <div className="vgg-pd-card__actions">
                        <Link href="/admissions" className="vgg-pd-card__primary vgg-cta-pill">
                          Thông tin tuyển sinh
                          <ArrowUpRight size={16} />
                        </Link>

                        <Link
                          href="/admissions#consultation"
                          className="vgg-pd-card__secondary vgg-cta-pill"
                        >
                          Liên hệ tư vấn
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {/* =================================================
                EMPTY
                ================================================= */}

            {filteredProgrammes.length === 0 && (
              <div className="vgg-pd__empty">
                <Search size={32} strokeWidth={1.4} />

                <h3>Không tìm thấy chương trình</h3>

                <p>Hãy thử thay đổi từ khóa hoặc bộ lọc.</p>

                <button type="button" onClick={clearAll}>
                  Xóa toàn bộ bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Cấu trúc chuẩn dùng chung cho toàn bộ dữ liệu chương trình đào tạo.
type CurriculumCourse = {
  name: string;
  credits: number;
  // Chỉ đặt true với học phần cần hiển thị nhãn “TỰ CHỌN”.
  elective?: boolean;
};

type CurriculumGroup = {
  title: string;
  courses: CurriculumCourse[];
};

type CurriculumTrack = {
  // Số mục lớn trên giao diện, thường là 04 hoặc 05.
  number: string;
  title: string;
  groups: CurriculumGroup[];
};

// Dữ liệu chuyên biệt được tách theo ngành để dễ đối chiếu và cập nhật học phần.
const environmentalEngineeringFoundationCourses: CurriculumCourse[] = [
  { name: "Kỹ thuật phân tích nước và nước thải", credits: 2 },
  { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
  { name: "Hóa học khí quyển và chất lượng môi trường không khí", credits: 2, elective: true },
  { name: "Hóa học trong môi trường nước", credits: 2, elective: true },
  { name: "Đánh giá rủi ro và đánh giá tác động môi trường", credits: 3, elective: true },
  { name: "Biến đổi khí hậu và tăng trưởng xanh", credits: 3, elective: true },
  { name: "Quản lý chất lượng môi trường", credits: 2, elective: true },
  { name: "Phân tích và đánh giá dữ liệu môi trường", credits: 3, elective: true },
  { name: "Mô hình hóa môi trường", credits: 3, elective: true },
  { name: "Độc chất học môi trường", credits: 3, elective: true },
];

const environmentalEngineeringSpecialisedCourses: CurriculumCourse[] = [
  { name: "Các quá trình xử lý bậc cao trong công nghệ môi trường", credits: 4 },
  { name: "Kiểm soát ô nhiễm không khí nâng cao", credits: 3 },
  { name: "Công nghệ xử lý nước thải bậc cao", credits: 3 },
  { name: "Công nghệ tái chế chất thải rắn", credits: 3 },
  { name: "Thực tập xử lý chất thải", credits: 2 },
  { name: "Vi sinh ứng dụng", credits: 2, elective: true },
  { name: "Công nghệ xử lý nước cấp bậc cao", credits: 3, elective: true },
  { name: "Kỹ thuật xử lý chất thải nguy hại", credits: 3, elective: true },
  { name: "Chính sách quản lý tài nguyên và môi trường", credits: 2, elective: true },
  { name: "Tư vấn chính sách môi trường quốc tế", credits: 6, elective: true },
  { name: "Các giải pháp công nghệ thích ứng với biến đổi khí hậu", credits: 3, elective: true },
  { name: "Năng lượng và năng lượng tái tạo", credits: 3, elective: true },
  { name: "Quản lý tổng hợp lưu vực sông", credits: 2, elective: true },
  { name: "Công nghệ màng và ứng dụng", credits: 3, elective: true },
  { name: "Kiểm toán môi trường", credits: 2, elective: true },
  { name: "Kinh tế tài nguyên môi trường", credits: 2, elective: true },
  { name: "Quy hoạch môi trường", credits: 2, elective: true },
  { name: "Quản lý carbon cho môi trường bền vững", credits: 3, elective: true },
  { name: "Ứng dụng trí tuệ nhân tạo trong môi trường", credits: 3, elective: true },
];

const resourceManagementFoundationCourses: CurriculumCourse[] = [
  { name: "Biến đổi khí hậu và tăng trưởng xanh", credits: 3 },
  { name: "Mô hình hóa môi trường", credits: 3 },
  { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
  { name: "Quản lý chất lượng môi trường", credits: 3 },
  { name: "Kỹ thuật phân tích nước và nước thải", credits: 2, elective: true },
  { name: "Độc chất học môi trường", credits: 3, elective: true },
  { name: "Vi sinh ứng dụng", credits: 2, elective: true },
  { name: "Năng lượng và năng lượng tái tạo", credits: 3, elective: true },
  { name: "Kỹ thuật xử lý chất thải nguy hại", credits: 3, elective: true },
];

const resourceManagementRequiredCourses: CurriculumCourse[] = [
  { name: "Chính sách quản lý tài nguyên và môi trường", credits: 2 },
  { name: "Kinh tế tài nguyên môi trường", credits: 2 },
  { name: "Quản lý tổng hợp lưu vực sông", credits: 2 },
  { name: "Phân tích hệ thống môi trường", credits: 3 },
];

const resourceManagementElectiveCourses: CurriculumCourse[] = [
  { name: "Quy hoạch môi trường", credits: 2, elective: true },
  { name: "Quản lý môi trường: Giải pháp cho các đô thị thông minh", credits: 3, elective: true },
  {
    name: "Viễn thám và GIS ứng dụng trong Quản lý Tài nguyên và Môi trường",
    credits: 3,
    elective: true,
  },
  { name: "Tư vấn chính sách môi trường quốc tế", credits: 6, elective: true },
  { name: "Kiểm soát ô nhiễm không khí nâng cao", credits: 3, elective: true },
  { name: "Công nghệ xử lý nước thải bậc cao", credits: 3, elective: true },
  { name: "Công nghệ tái chế chất thải rắn", credits: 3, elective: true },
  { name: "Công nghệ màng và ứng dụng", credits: 3, elective: true },
  { name: "Đánh giá rủi ro và đánh giá tác động môi trường", credits: 3, elective: true },
  { name: "Phân tích và đánh giá dữ liệu môi trường", credits: 3, elective: true },
  { name: "Quản lý carbon cho môi trường bền vững", credits: 3, elective: true },
  { name: "Ứng dụng trí tuệ nhân tạo trong môi trường", credits: 3, elective: true },
];

const biotechnologyFoundationCourses: CurriculumCourse[] = [
  { name: "Hóa sinh trong sức khỏe và bệnh tật", credits: 3 },
  { name: "Tin sinh học ứng dụng", credits: 3 },
  { name: "Miễn dịch học ứng dụng", credits: 3 },
  { name: "Truyền tải tín hiệu ở tế bào", credits: 3 },
  { name: "Liệu pháp gene", credits: 3 },
];

const biotechnologySpecialisedCourses: CurriculumCourse[] = [
  { name: "Liệu pháp tế bào", credits: 3, elective: true },
  { name: "Vắc xin", credits: 3, elective: true },
  { name: "Chẩn đoán phân tử", credits: 3, elective: true },
  { name: "Sinh học ung thư", credits: 3, elective: true },
  { name: "Cơ sở phân tử trong tương tác vật chủ - tác nhân gây bệnh", credits: 3, elective: true },
  { name: "Vi sinh vật học ứng dụng trong sản xuất", credits: 3, elective: true },
  { name: "Công nghệ sinh học nano", credits: 3, elective: true },
  { name: "Công nghệ sinh học và phát triển bền vững", credits: 3, elective: true },
  { name: "Đổi mới sáng tạo trong công nghệ sinh học", credits: 3, elective: true },
];

const architectureCoreCourses: CurriculumCourse[] = [
  { name: "Lý thuyết và thực hành kiến trúc đương đại", credits: 2 },
  { name: "Kiến trúc và Thiết kế bền vững", credits: 2 },
  {
    name: "Mô hình thông tin công trình (BIM) trong thiết kế và quản lý công trình kiến trúc",
    credits: 2,
  },
  { name: "Lý luận bảo tồn di sản văn hóa – kiến trúc", credits: 2 },
  { name: "Đồ án thiết kế kiến trúc nâng cao", credits: 3 },
  { name: "Đồ án Hình thái đô thị và kiến trúc", credits: 3 },
  { name: "Tham quan – phân tích, đánh giá và phê bình kiến trúc", credits: 2 },
  { name: "Lý thuyết tổ hợp không gian kiến trúc hiện đại", credits: 2, elective: true },
  { name: "Kiến trúc cảnh quan", credits: 2, elective: true },
  { name: "Mối quan hệ giữa kiến trúc và các ngành nghệ thuật khác", credits: 2, elective: true },
  { name: "Tổ chức không gian kiến trúc môi trường ở", credits: 2, elective: true },
  { name: "Lý thuyết và ứng dụng Hình Thái học đô thị", credits: 2, elective: true },
  { name: "Thiết kế đô thị", credits: 2, elective: true },
  { name: "Lý luận phát triển không gian đô thị", credits: 2, elective: true },
  { name: "Tổ chức môi trường dịch vụ công cộng đô thị", credits: 2, elective: true },
  { name: "Lý luận quy hoạch vùng và đô thị", credits: 2, elective: true },
  { name: "Quản lý quy hoạch, kiến trúc và xây dựng", credits: 2, elective: true },
  { name: "Kiến trúc bền vững: mô phỏng và thiết kế công trình", credits: 2, elective: true },
  { name: "Công trình xanh: thiết kế và tiêu chuẩn đánh giá", credits: 2, elective: true },
  { name: "Công nghệ mới trong kỹ thuật công trình", credits: 2, elective: true },
];

const architectureGraduationCourses: CurriculumCourse[] = [
  { name: "Vật liệu và công nghệ xây dựng mới", credits: 2, elective: true },
  { name: "Quản lý và phát triển dự án kiến trúc", credits: 6 },
  { name: "Thực tập 1 (Chuyên gia và năng lực quản lý chuyên ngành)", credits: 6 },
  { name: "Thực tập 2 (Dự án nghiên cứu và Đề cương tốt nghiệp)", credits: 3 },
  { name: "Đề án tốt nghiệp", credits: 9 },
];

const automotiveAppliedFoundationCourses: CurriculumCourse[] = [
  { name: "Công nghệ chế tạo và lắp ráp ô tô hiện đại", credits: 3 },
  { name: "Phương pháp phần tử hữu hạn", credits: 3 },
  { name: "Tính toán và tối ưu hóa thiết kế hệ thống ô tô", credits: 3 },
  { name: "Động lực học ô tô nâng cao", credits: 3 },
  { name: "Kỹ thuật va chạm ô tô và phân tích an toàn", credits: 3 },
  { name: "Mô phỏng và mô hình hóa trong thiết kế ô tô", credits: 3 },
  { name: "Công nghệ chẩn đoán và sửa chữa ô tô hiện đại", credits: 3 },
  { name: "Công nghệ tái chế và quản lý bền vững trong ngành ô tô", credits: 3 },
];

const automotiveResearchFoundationCourses: CurriculumCourse[] = [
  ...automotiveAppliedFoundationCourses.slice(0, 7),
  { name: "Vi xử lý và hệ thống nhúng trong ô tô", credits: 3 },
];

const automotiveAppliedSpecialisedCourses: CurriculumCourse[] = [
  { name: "Mô phỏng và tối ưu hóa hệ thống động lực học ô tô", credits: 3 },
  { name: "Công nghệ pin và quản lý năng lượng trong xe điện", credits: 3 },
  { name: "Vi xử lý và hệ thống nhúng trong ô tô", credits: 3 },
  { name: "Công nghệ xe điện (EV), xe lai và trạm sạc", credits: 3 },
  { name: "AI và ứng dụng Deep Learning trong kỹ thuật ô tô", credits: 3 },
  { name: "Công nghệ vật liệu mới dùng trên ô tô", credits: 3, elective: true },
  { name: "Nhiên liệu và năng lượng tái tạo trong giao thông vận tải", credits: 3, elective: true },
  { name: "Động học lưu chất tính toán (CFD)", credits: 3, elective: true },
  { name: "Quản lý kỹ thuật và dịch vụ trong ngành công nghiệp ô tô", credits: 3, elective: true },
  { name: "Xe tự hành và các công nghệ liên quan", credits: 3, elective: true },
  { name: "Hệ thống giao thông thông minh và công nghệ kết nối", credits: 3, elective: true },
  { name: "Hệ thống điện - điện tử ô tô hiện đại", credits: 3, elective: true },
];

const automotiveResearchSpecialisedCourses: CurriculumCourse[] = [
  { name: "Mô phỏng và tối ưu hóa hệ thống động lực học ô tô", credits: 3 },
  { name: "Công nghệ pin và quản lý năng lượng trong xe điện", credits: 3 },
  { name: "Công nghệ xe điện (EV), xe lai và trạm sạc", credits: 3 },
  { name: "Công nghệ tái chế và quản lý bền vững trong ngành ô tô", credits: 3, elective: true },
  { name: "Công nghệ vật liệu mới dùng trên ô tô", credits: 3, elective: true },
  { name: "Nhiên liệu và năng lượng tái tạo trong giao thông vận tải", credits: 3, elective: true },
  { name: "Quản lý kỹ thuật và dịch vụ trong ngành công nghiệp ô tô", credits: 3, elective: true },
  { name: "Hệ thống giao thông thông minh và công nghệ kết nối", credits: 3, elective: true },
  { name: "Hệ thống điện - điện tử ô tô hiện đại", credits: 3, elective: true },
  { name: "Động học lưu chất tính toán (CFD)", credits: 3, elective: true },
  { name: "Xe tự hành và các công nghệ liên quan", credits: 3, elective: true },
  { name: "AI và ứng dụng Deep Learning trong kỹ thuật ô tô", credits: 3, elective: true },
];

const civilEngineeringSharedCourses: CurriculumCourse[] = [
  { name: "Triết học nâng cao", credits: 3 },
  { name: "Động lực học kết cấu và động đất", credits: 3 },
  { name: "Quản lý dự án đầu tư và xây dựng", credits: 3 },
  { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
  { name: "Kết cấu liên hợp", credits: 3, elective: true },
  { name: "Quan trắc và biến dạng công trình", credits: 3, elective: true },
  { name: "Phân tích định lượng trong quản lý xây dựng", credits: 3, elective: true },
  { name: "Kết cấu bê tông cốt thép nâng cao", credits: 3 },
  { name: "Công nghệ xây dựng và xu thế phát triển", credits: 3 },
  { name: "Phương pháp phần tử hữu hạn trong phân tích kết cấu", credits: 3 },
  { name: "Cơ kết cấu nâng cao", credits: 3, elective: true },
  { name: "Kết cấu cao tầng và tải trọng ngang", credits: 3, elective: true },
  { name: "Sửa chữa và nâng cấp công trình", credits: 3, elective: true },
  { name: "Kiểm định khai thác và thí nghiệm kết cấu công trình", credits: 3, elective: true },
  { name: "Kết cấu bê tông cốt thép ứng lực trước", credits: 3, elective: true },
  { name: "Quản lý An toàn và môi trường trong xây dựng", credits: 3, elective: true },
  { name: "Kết cấu thép nâng cao", credits: 3 },
  { name: "Kỹ thuật nền móng nâng cao", credits: 3 },
  { name: "Ứng dụng tin học trong nghiên cứu", credits: 3 },
  { name: "Quản lý dự án xây dựng nâng cao", credits: 3 },
  { name: "Kết cấu tấm và vỏ", credits: 3 },
];

const civilEngineeringAppliedCourses: CurriculumCourse[] = [
  ...civilEngineeringSharedCourses,
  { name: "Thực tập chuyên ngành", credits: 3 },
  { name: "Quản lý tài chính trong Doanh nghiệp xây dựng nâng cao", credits: 3 },
  { name: "Đề án tốt nghiệp", credits: 9 },
  { name: "Chuyên đề tự chọn 1", credits: 3, elective: true },
  { name: "Chuyên đề tự chọn 2", credits: 3, elective: true },
  { name: "Quản lý rủi ro trong xây dựng nâng cao", credits: 3, elective: true },
  { name: "Kinh tế đầu tư xây dựng nâng cao", credits: 3, elective: true },
];

const civilEngineeringResearchCourses: CurriculumCourse[] = [
  ...civilEngineeringSharedCourses,
  { name: "Chuyên đề tự chọn 1", credits: 3, elective: true },
  { name: "Chuyên đề tự chọn 1", credits: 3, elective: true },
  { name: "Quản lý dự án xây dựng nâng cao", credits: 3, elective: true },
  { name: "Kết cấu tấm và vỏ", credits: 3, elective: true },
  { name: "Quản lý tài chính trong Doanh nghiệp xây dựng nâng cao", credits: 3, elective: true },
  { name: "Chuyên đề tự chọn 2", credits: 3, elective: true },
  { name: "Quản lý rủi ro trong xây dựng nâng cao", credits: 3, elective: true },
  { name: "Thực tập chuyên ngành", credits: 3, elective: true },
  { name: "Luận văn tốt nghiệp", credits: 15 },
];

const specialisedCourses: Record<string, string[]> = {
  "khoa-hoc-moi-truong": [
    "Phân tích hệ thống môi trường",
    "Sinh thái học nâng cao",
    "Quản trị rủi ro môi trường",
    "Mô hình hóa và dự báo môi trường",
  ],
  "ky-thuat-moi-truong": [
    "Các quá trình xử lý bậc cao",
    "Kiểm soát ô nhiễm không khí nâng cao",
    "Công nghệ xử lý nước thải bậc cao",
    "Công nghệ tái chế chất thải rắn",
  ],
  "quan-ly-tai-nguyen-moi-truong": [
    "Quản lý tổng hợp tài nguyên",
    "Chính sách môi trường",
    "Kinh tế tài nguyên và môi trường",
    "Quy hoạch môi trường",
  ],
  "cong-nghe-sinh-hoc": [
    "Sinh học phân tử nâng cao",
    "Công nghệ gen",
    "Tin sinh học",
    "Công nghệ sinh học ứng dụng",
  ],
  "ky-thuat-xay-dung": [
    "Kết cấu công trình nâng cao",
    "Quản lý dự án xây dựng",
    "Vật liệu xây dựng mới",
    "Mô hình thông tin công trình",
  ],
  "ky-thuat-o-to": [
    "Động lực học ô tô",
    "Điều khiển điện tử ô tô",
    "Công nghệ xe điện",
    "Chẩn đoán và bảo trì thông minh",
  ],
  "quan-tri-kinh-doanh": [
    "Quản trị chiến lược",
    "Lãnh đạo và hành vi tổ chức",
    "Quản trị đổi mới",
    "Phân tích kinh doanh",
  ],
  "kinh-doanh-thuong-mai": [
    "Chiến lược thương mại",
    "Quản trị bán lẻ",
    "Thương mại điện tử",
    "Kinh doanh quốc tế",
  ],
  "tai-chinh-ngan-hang": [
    "Quản trị tài chính nâng cao",
    "Phân tích đầu tư",
    "Quản trị rủi ro ngân hàng",
    "Công nghệ tài chính",
  ],
  "ke-toan": [
    "Kế toán quản trị nâng cao",
    "Phân tích báo cáo tài chính",
    "Kiểm toán nâng cao",
    "Hệ thống thông tin kế toán",
  ],
  logistics: [
    "Quản trị chuỗi cung ứng",
    "Vận tải đa phương thức",
    "Phân tích dữ liệu logistics",
    "Thiết kế mạng lưới phân phối",
  ],
  "quan-tri-du-lich": [
    "Quản trị điểm đến",
    "Marketing du lịch",
    "Du lịch bền vững",
    "Thiết kế trải nghiệm du khách",
  ],
  "quan-tri-khach-san": [
    "Quản trị vận hành khách sạn",
    "Quản trị doanh thu",
    "Quản trị dịch vụ cao cấp",
    "Đổi mới trải nghiệm khách hàng",
  ],
  "luat-kinh-te": [
    "Pháp luật doanh nghiệp nâng cao",
    "Pháp luật thương mại quốc tế",
    "Giải quyết tranh chấp kinh doanh",
    "Quản trị tuân thủ",
  ],
  "quan-he-cong-chung": [
    "Chiến lược quan hệ công chúng",
    "Quản trị danh tiếng",
    "Truyền thông khủng hoảng",
    "Phân tích dữ liệu truyền thông",
  ],
  "ngon-ngu-anh": [
    "Ngôn ngữ học ứng dụng",
    "Phân tích diễn ngôn",
    "Phương pháp giảng dạy tiếng Anh",
    "Giao tiếp liên văn hóa",
  ],
  "kien-truc": [
    "Lý luận kiến trúc đương đại",
    "Thiết kế đô thị",
    "Kiến trúc bền vững",
    "Công nghệ số trong kiến trúc",
  ],
  "my-thuat-ung-dung": [
    "Phương pháp sáng tác",
    "Thiết kế và văn hóa thị giác",
    "Nghệ thuật số",
    "Quản trị dự án sáng tạo",
  ],
  "ly-luan-lich-su-my-thuat": [
    "Lý luận mỹ thuật nâng cao",
    "Lịch sử mỹ thuật Việt Nam",
    "Phê bình nghệ thuật",
    "Phương pháp nghiên cứu mỹ thuật",
  ],
};

function getProgrammeCurricula(programme: Programme): CurriculumTrack[] {
  // Các ngành đã có dữ liệu chính thức được ánh xạ theo id ổn định trong data/programmes.
  if (programme.id === "logistics") {
    // Hai định hướng Logistics dùng chung ba nhóm đầu, chỉ khác phần tốt nghiệp.
    const sharedGroups: CurriculumGroup[] = [
      {
        title: "Kiến thức chung",
        courses: [
          { name: "Triết học", credits: 3 },
          { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
        ],
      },
      {
        title: "Kiến thức cơ sở",
        courses: [
          { name: "Kỹ thuật hệ thống", credits: 3 },
          { name: "Kinh tế kỹ thuật", credits: 3 },
          { name: "Vận trù học", credits: 3 },
          { name: "Thống kê trong công nghiệp", credits: 3 },
          { name: "Kiểm soát và quản lý chất lượng", credits: 3 },
        ],
      },
      {
        title: "Kiến thức chuyên ngành",
        courses: [
          { name: "Quản lý thu mua", credits: 3 },
          { name: "Quản lý vận tải Logistics", credits: 3 },
          { name: "Hoạch định tồn kho và vật tư", credits: 3 },
          { name: "Tinh gọn trong chuỗi cung ứng", credits: 3 },
          { name: "Hệ thống thông tin quản lý", credits: 3, elective: true },
          { name: "Hoạch định nguồn lực ERP", credits: 3, elective: true },
          { name: "Kỹ thuật thiết kế mặt bằng công nghiệp", credits: 3, elective: true },
          { name: "Đánh giá kinh tế và quản lý dự án", credits: 3, elective: true },
          { name: "Kế toán quản trị", credits: 3, elective: true },
          { name: "Quản trị nguồn nhân lực", credits: 3, elective: true },
        ],
      },
    ];

    return [
      {
        number: "04",
        title: "Chương trình đào tạo ứng dụng",
        groups: [
          ...sharedGroups,
          {
            title: "Thực tập tốt nghiệp và Đề án tốt nghiệp",
            courses: [
              { name: "Thực tập tốt nghiệp", credits: 6 },
              { name: "Đề án tốt nghiệp", credits: 9 },
            ],
          },
        ],
      },
      {
        number: "05",
        title: "Chương trình đào tạo nghiên cứu",
        groups: [
          ...sharedGroups,
          {
            title: "Luận văn tốt nghiệp và chuyên đề nghiên cứu",
            courses: [
              { name: "Chuyên đề Quản lý chuỗi cung ứng 1", credits: 6 },
              { name: "Chuyên đề Quản lý chuỗi cung ứng 2", credits: 6 },
              { name: "Luận văn tốt nghiệp", credits: 15 },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "ky-thuat-o-to") {
    const generalKnowledge: CurriculumGroup = {
      title: "Kiến thức chung",
      courses: [
        { name: "Triết học", credits: 3 },
        { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
      ],
    };

    return [
      {
        number: "04",
        title: "Chương trình đào tạo ứng dụng",
        groups: [
          generalKnowledge,
          { title: "Kiến thức cơ sở", courses: automotiveAppliedFoundationCourses },
          { title: "Kiến thức chuyên ngành", courses: automotiveAppliedSpecialisedCourses },
          {
            title: "Chuyên đề, thực tập và luận văn tốt nghiệp",
            courses: [
              { name: "Chuyên đề công nghệ mới trên ô tô", credits: 3 },
              { name: "Thực tập chuyên môn nâng cao", credits: 6 },
              { name: "Đề án tốt nghiệp", credits: 6 },
            ],
          },
        ],
      },
      {
        number: "05",
        title: "Chương trình đào tạo nghiên cứu",
        groups: [
          generalKnowledge,
          { title: "Kiến thức cơ sở", courses: automotiveResearchFoundationCourses },
          { title: "Kiến thức chuyên ngành", courses: automotiveResearchSpecialisedCourses },
          {
            title: "Luận văn tốt nghiệp và chuyên đề nghiên cứu",
            courses: [
              { name: "Chuyên đề cơ sở ngành", credits: 3 },
              { name: "Chuyên đề công nghệ mới trên ô tô", credits: 3 },
              { name: "Luận văn tốt nghiệp", credits: 15 },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "ky-thuat-xay-dung") {
    return [
      {
        number: "04",
        title: "Chương trình đào tạo ứng dụng",
        groups: [{ title: "Nội dung chương trình", courses: civilEngineeringAppliedCourses }],
      },
      {
        number: "05",
        title: "Chương trình đào tạo nghiên cứu",
        groups: [{ title: "Nội dung chương trình", courses: civilEngineeringResearchCourses }],
      },
    ];
  }

  if (programme.id === "kien-truc") {
    return [
      {
        number: "04",
        title: "Chương trình đào tạo ứng dụng",
        groups: [
          {
            title: "Kiến thức chung",
            courses: [
              { name: "Triết học", credits: 3 },
              { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
            ],
          },
          { title: "Kiến thức cơ sở và chuyên ngành", courses: architectureCoreCourses },
          { title: "Thực tập và Đề án tốt nghiệp", courses: architectureGraduationCourses },
        ],
      },
    ];
  }

  if (programme.id === "cong-nghe-sinh-hoc") {
    return [
      {
        number: "04",
        title: "Chương trình đào tạo nghiên cứu",
        groups: [
          {
            title: "Kiến thức chung",
            courses: [
              { name: "Triết học", credits: 3 },
              { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
            ],
          },
          { title: "Kiến thức cơ sở", courses: biotechnologyFoundationCourses },
          { title: "Kiến thức chuyên ngành", courses: biotechnologySpecialisedCourses },
          {
            title: "Kiến thức Nghiên cứu khoa học",
            courses: [
              { name: "Chuyên đề nghiên cứu 1", credits: 6 },
              { name: "Chuyên đề nghiên cứu 2", credits: 6 },
              { name: "Luận văn", credits: 15 },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "quan-ly-tai-nguyen-moi-truong") {
    const sharedGroups: CurriculumGroup[] = [
      { title: "Kiến thức chung", courses: [{ name: "Triết học", credits: 3 }] },
      { title: "Kiến thức cơ sở", courses: resourceManagementFoundationCourses },
    ];
    const specialised = (proposal: string, includeAudit = false): CurriculumGroup => ({
      title: "Kiến thức chuyên ngành",
      courses: [
        ...resourceManagementRequiredCourses,
        { name: proposal, credits: 2 },
        ...(includeAudit ? [{ name: "Kiểm toán môi trường", credits: 2, elective: true }] : []),
        ...resourceManagementElectiveCourses,
      ],
    });

    return [
      {
        number: "04",
        title: "Chương trình đào tạo ứng dụng",
        groups: [
          ...sharedGroups,
          specialised("Đề cương thực hiện Đề án tốt nghiệp và bảo vệ đề cương"),
          {
            title: "Tốt nghiệp",
            courses: [
              { name: "Thực tập chuyên ngành", credits: 6 },
              { name: "Đề án tốt nghiệp", credits: 9 },
            ],
          },
        ],
      },
      {
        number: "05",
        title: "Chương trình đào tạo nghiên cứu",
        groups: [
          ...sharedGroups,
          specialised("Đề cương thực hiện Luận văn tốt nghiệp và bảo vệ đề cương", true),
          {
            title: "Tốt nghiệp",
            courses: [
              { name: "Chuyên đề nghiên cứu", credits: 15 },
              { name: "Luận văn tốt nghiệp", credits: 15 },
            ],
          },
        ],
      },
    ];
  }

  if (programme.id === "ky-thuat-moi-truong") {
    const sharedGroups: CurriculumGroup[] = [
      { title: "Kiến thức chung", courses: [{ name: "Triết học", credits: 3 }] },
      { title: "Kiến thức cơ sở", courses: environmentalEngineeringFoundationCourses },
    ];

    return [
      {
        number: "04",
        title: "Chương trình đào tạo ứng dụng",
        groups: [
          ...sharedGroups,
          {
            title: "Kiến thức chuyên ngành",
            courses: [
              ...environmentalEngineeringSpecialisedCourses.slice(0, 5),
              {
                name: "Đề cương thực hiện Đề án tốt nghiệp và bảo vệ Đề cương",
                credits: 2,
              },
              ...environmentalEngineeringSpecialisedCourses.slice(5),
            ],
          },
          {
            title: "Tốt nghiệp",
            courses: [
              { name: "Thực tập chuyên ngành", credits: 6 },
              { name: "Đề án tốt nghiệp", credits: 9 },
            ],
          },
        ],
      },
      {
        number: "05",
        title: "Chương trình đào tạo nghiên cứu",
        groups: [
          ...sharedGroups,
          {
            title: "Kiến thức chuyên ngành",
            courses: [
              ...environmentalEngineeringSpecialisedCourses.slice(0, 5),
              {
                name: "Đề cương thực hiện Luận văn tốt nghiệp và bảo vệ Đề cương",
                credits: 2,
              },
              ...environmentalEngineeringSpecialisedCourses.slice(5),
            ],
          },
          {
            title: "Tốt nghiệp",
            courses: [
              { name: "Chuyên đề nghiên cứu", credits: 15 },
              { name: "Luận văn tốt nghiệp", credits: 15 },
            ],
          },
        ],
      },
    ];
  }

  // Fallback giúp các ngành chưa có bảng học phần riêng vẫn hiển thị đúng cấu trúc giao diện.
  const graduationCourses: CurriculumCourse[] =
    programme.degree === "Tiến sĩ"
      ? [
          { name: "Chuyên đề tiến sĩ", credits: 12 },
          { name: "Luận án tiến sĩ", credits: 60 },
        ]
      : programme.orientation === "Nghiên cứu"
        ? [
            { name: "Chuyên đề nghiên cứu", credits: 15 },
            { name: "Luận văn tốt nghiệp", credits: 15 },
          ]
        : [
            { name: "Thực tập chuyên ngành", credits: 6 },
            { name: "Đề án tốt nghiệp", credits: 9 },
          ];

  // Khi bổ sung dữ liệu chính thức cho một ngành, tạo nhánh theo programme.id ở phía trên.
  return [
    {
      number: "04",
      title: "Chương trình đào tạo",
      groups: [
        {
          title: "Kiến thức chung",
          courses: [{ name: "Triết học", credits: 3 }],
        },
        {
          title: "Kiến thức cơ sở",
          courses: [
            { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
            { name: "Phân tích và xử lý dữ liệu", credits: 3 },
            { name: "Chuyên đề liên ngành", credits: 2, elective: true },
          ],
        },
        {
          title: "Kiến thức chuyên ngành",
          courses: (specialisedCourses[programme.id] ?? []).map((name, index) => ({
            name,
            credits: index === 0 ? 4 : 3,
            elective: index > 1,
          })),
        },
        { title: "Tốt nghiệp", courses: graduationCourses },
      ],
    },
  ];
}

/* Nội dung học thuật hiển thị khi mở từng chương trình; cùng một cấu trúc cho toàn danh mục. */
function getProgrammeDetails(programme: Programme) {
  if (programme.id === "ky-thuat-moi-truong") {
    return {
      intro:
        "Chương trình đào tạo Thạc sĩ Kỹ thuật Môi trường trang bị cho người học hiểu biết sâu về kiến thức chuyên ngành môi trường, lý thuyết đi đôi với thực hành. Dựa vào các kết quả nghiên cứu khoa học, người học đề xuất các giải pháp kỹ thuật, góp phần giải quyết các yêu cầu về môi trường sống.",
      highlights: [
        "Thư viện chuyên ngành với các giáo trình chuyên sâu và được cập nhật thường xuyên",
        "Hệ thống phòng thí nghiệm hiện đại, liên kết với các trung tâm nghiên cứu tiên tiến",
        "Đội ngũ giảng viên được đào tạo đúng chuyên môn tại các trường đại học ở nước ngoài",
      ],
      outcomes: [
        "Phát triển tư duy nghiên cứu, ứng dụng và truyền đạt tri thức trong lĩnh vực kỹ thuật môi trường",
        "Làm việc và nghiên cứu bằng tiếng Anh đạt chuẩn CEFR B2",
        "Đề xuất sáng kiến và cải tiến các quy trình công nghệ môi trường",
      ],
      careers: [
        "Dẫn dắt hoạt động nghiên cứu, ứng dụng và chuyển giao công nghệ môi trường",
        "Đảm nhận vị trí quản lý, nghiên cứu và phát triển công nghệ mới",
        "Nghiên cứu, giảng dạy hoặc tiếp tục chương trình tiến sĩ trong và ngoài nước",
      ],
    };
  }

  return {
    intro: `Chương trình ${programme.degree} ${programme.title} cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực ${programme.field.toLowerCase()}.`,
    highlights: [
      "Chương trình cập nhật, kết hợp nền tảng học thuật với các vấn đề thực tiễn",
      "Đội ngũ giảng viên giàu kinh nghiệm cùng môi trường học tập hiện đại",
      "Kết nối nghiên cứu, doanh nghiệp và mạng lưới chuyên gia trong lĩnh vực",
    ],
    outcomes: [
      `Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành ${programme.title}`,
      "Phát triển năng lực nghiên cứu, tư duy phản biện và ra quyết định",
      "Làm việc độc lập, hợp tác liên ngành và truyền đạt tri thức chuyên môn",
    ],
    careers: [
      "Đảm nhận các vị trí chuyên môn và quản lý tại doanh nghiệp, tổ chức trong và ngoài nước",
      "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
      "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
    ],
  };
}
