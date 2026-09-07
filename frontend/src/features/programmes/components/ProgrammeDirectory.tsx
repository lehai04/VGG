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
  getProgrammeGraduationRequirements,
  type ProgrammeDegree,
  type ProgrammeField,
  type ProgrammeOrientation,
} from "@/data/programmes";
import { getProgrammeCurricula, getProgrammeDetails } from "@/data/curricula";

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export default function ProgrammeDirectory() {
  const [keyword, setKeyword] = useState("");
  const [degrees, setDegrees] = useState<ProgrammeDegree[]>([]);
  const [fields, setFields] = useState<ProgrammeField[]>([]);
  const [orientations, setOrientations] = useState<ProgrammeOrientation[]>([]);
  const [sort, setSort] = useState<"az" | "za">("az");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const nextDegree = params.get("degree");
      const nextField = params.get("field");
      const nextOrientation = params.get("orientation");
      setKeyword(params.get("search") ?? "");
      setDegrees(programmeDegrees.includes(nextDegree as ProgrammeDegree) ? [nextDegree as ProgrammeDegree] : []);
      setFields(programmeFields.includes(nextField as ProgrammeField) ? [nextField as ProgrammeField] : []);
      setOrientations(programmeOrientations.includes(nextOrientation as ProgrammeOrientation) ? [nextOrientation as ProgrammeOrientation] : []);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggle = <T,>(set: React.Dispatch<React.SetStateAction<T[]>>, value: T) => {
    set((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const filteredProgrammes = useMemo(() => {
    const query = normalizeText(keyword.trim());
    const result = programmes.filter((p) => {
      const searchText = normalizeText(
        [p.code, p.title, p.englishTitle, p.degree, p.field, p.orientation].join(" ")
      );
      const keywordMatch = !query || searchText.includes(query);
      const degreeMatch = degrees.length === 0 || degrees.includes(p.degree);
      const fieldMatch = fields.length === 0 || fields.includes(p.field);
      const orientationMatch = orientations.length === 0 || orientations.includes(p.orientation);
      return keywordMatch && degreeMatch && fieldMatch && orientationMatch;
    });

    return [...result].sort((a, b) =>
      sort === "za" ? b.title.localeCompare(a.title, "vi") : a.title.localeCompare(b.title, "vi")
    );
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
    if (type === "degree") toggle(setDegrees, value as ProgrammeDegree);
    if (type === "field") toggle(setFields, value as ProgrammeField);
    if (type === "orientation") toggle(setOrientations, value as ProgrammeOrientation);
  };

  const activeFilters = [
    ...degrees.map((value) => ({ type: "degree" as const, value })),
    ...fields.map((value) => ({ type: "field" as const, value })),
    ...orientations.map((value) => ({ type: "orientation" as const, value })),
  ];

  const filterSections = [
    {
      title: "Bậc đào tạo",
      items: programmeDegrees,
      selected: degrees,
      toggleItem: (val: string) => toggle(setDegrees, val as ProgrammeDegree),
      count: (val: string) => programmes.filter((p) => p.degree === val).length,
    },
    {
      title: "Nhóm ngành",
      items: programmeFields,
      selected: fields,
      toggleItem: (val: string) => toggle(setFields, val as ProgrammeField),
      count: (val: string) => programmes.filter((p) => p.field === val).length,
    },
    {
      title: "Định hướng",
      items: programmeOrientations,
      selected: orientations,
      toggleItem: (val: string) => toggle(setOrientations, val as ProgrammeOrientation),
      count: (val: string) => programmes.filter((p) => p.orientation === val).length,
    },
  ];

  return (
    <section className="vgg-pd" id="programme-directory">
      <div className="vgg-pd__intro">
        <div className="vgg-pd__intro-copy">
          <h2>KHÁM PHÁ CÁC NGÀNH HỌC</h2>
          <p className="vgg-pd__lead">
            Khám phá chương trình Sau đại học theo lĩnh vực, bậc đào tạo và định hướng phù hợp với mục tiêu của bạn.
          </p>
        </div>
      </div>

      <div className="vgg-pd__finder">
        <aside className="vgg-pd__sidebar">
          <div className="vgg-pd__sidebar-head">
            <div className="vgg-pd__sidebar-title">
              <SlidersHorizontal size={18} strokeWidth={1.8} />
              <strong>Bộ lọc</strong>
              {activeFilterCount > 0 && <span className="vgg-pd__active-count">{activeFilterCount}</span>}
            </div>
            <button type="button" className="vgg-pd__clear" onClick={clearAll}>
              <RotateCcw size={13} />
              Xóa tất cả
            </button>
          </div>

          {filterSections.map((sec) => (
            <details className="vgg-pd__filter" open key={sec.title}>
              <summary>
                <span>{sec.title}</span>
                <ChevronDown size={16} />
              </summary>
              <div className="vgg-pd__filter-list">
                {sec.items.map((item) => (
                  <label className="vgg-pd__option" key={item}>
                    <input
                      type="checkbox"
                      checked={sec.selected.includes(item as never)}
                      onChange={() => sec.toggleItem(item)}
                    />
                    <span className="vgg-pd__checkbox" />
                    <span className="vgg-pd__option-name">{item}</span>
                    <span className="vgg-pd__option-count">{sec.count(item)}</span>
                  </label>
                ))}
              </div>
            </details>
          ))}

          <div className="vgg-pd__consult">
            <span>NEED GUIDANCE?</span>
            <h3>Chưa chắc nên<br />chọn chương trình nào?</h3>
            <p>
              Trao đổi với đội ngũ Viện Sau Đại học để tìm lộ trình phù hợp với mục tiêu học tập và nghề nghiệp.
            </p>
            <Link href="/admissions#consultation">
              Nhận tư vấn
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </aside>

        <div className="vgg-pd__results">
          <div className="vgg-pd__toolbar">
            <label className="vgg-pd__search">
              <Search size={20} strokeWidth={1.7} />
              <input
                type="search"
                aria-label="Tìm chương trình"
                placeholder="Bạn muốn học gì?"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </label>

            <label className="vgg-pd__sort">
              <span>SORT BY</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as "az" | "za")}>
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

          <div className="vgg-pd__result-meta">
            <p>
              Hiển thị <strong>{filteredProgrammes.length}</strong> chương trình
            </p>
            <span>VAN LANG GRADUATE</span>
          </div>

          <div className="vgg-pd__list">
            {filteredProgrammes.map((programme) => {
              const expanded = expandedId === programme.id;
              const details = getProgrammeDetails(programme);

              return (
                <article
                  className={`vgg-pd-card ${expanded ? "vgg-pd-card--open" : ""}`}
                  key={programme.id}
                >
                  <div className="vgg-pd-card__row">
                    <span className="vgg-pd-card__code">{programme.code}</span>
                    <div className="vgg-pd-card__main">
                      <div className="vgg-pd-card__meta">
                        <span>{programme.degree}</span>
                        <span>{programme.field}</span>
                      </div>
                      <h3>{programme.title}</h3>
                    </div>

                    <div className="vgg-pd-card__stat">
                      <strong>{programme.credits}</strong>
                      <span>TÍN CHỈ</span>
                    </div>

                    <div className="vgg-pd-card__stat">
                      <strong>{programme.duration}</strong>
                      <span>THỜI GIAN</span>
                    </div>

                    <div className="vgg-pd-card__stat vgg-pd-card__tuition">
                      <strong>{getProgrammeTuition(programme)}</strong>
                      <span>HỌC PHÍ TOÀN KHÓA</span>
                    </div>

                    <button
                      type="button"
                      className="vgg-pd-card__toggle"
                      aria-expanded={expanded}
                      aria-label={expanded ? `Thu gọn ${programme.title}` : `Xem thêm ${programme.title}`}
                      onClick={() => setExpandedId(expanded ? null : programme.id)}
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>

                  {expanded && (
                    <div className="vgg-pd-card__details">
                      <p className="vgg-pd-card__intro">{details.intro}</p>

                      <div className="vgg-pd-card__content-grid">
                        {[
                          ["01", "Đặc điểm nổi bật", details.highlights],
                          ["02", "Năng lực đầu ra", details.outcomes],
                          ["03", "Triển vọng nghề nghiệp", details.careers],
                          ["04", "Điều kiện tốt nghiệp", getProgrammeGraduationRequirements(programme)],
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
                            {curriculum.groups.map((group, groupIndex) => (
                              <section key={group.title}>
                                <h5>
                                  <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                                  <span className="vgg-pd-card__group-header">
                                    <strong>{group.title}</strong>
                                  </span>
                                </h5>
                                <ul>
                                  {group.courses.map((course, courseIndex) => (
                                    <li key={`${course.name}-${courseIndex}`}>
                                      <span className="vgg-pd-card__course-number">
                                        {String(courseIndex + 1).padStart(2, "0")}
                                      </span>
                                      <span className="vgg-pd-card__course-name">
                                        <span>{course.name}</span>
                                      </span>
                                      <div>
                                        {course.elective && <small>TỰ CHỌN</small>}
                                        {typeof course.credits === "number" && course.credits > 0 && (
                                          <b>{course.credits} tín chỉ</b>
                                        )}
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
                        <Link href="/admissions#consultation" className="vgg-pd-card__secondary vgg-cta-pill">
                          Liên hệ tư vấn
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

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
