"use client";

import styles from "./ProgrammeCatalogue.module.css";

import { catalogueCopy } from "@/data/programmes/catalogue-copy";

import Link from "@/i18n/components/LocalizedLink";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, X, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import {
  programmeDegrees,
  programmeFields,
  programmeOrientations,
  programmes as defaultProgrammes,
  getProgrammeTuition,
  getProgrammeGraduationRequirements,
  type ProgrammeDegree,
  type ProgrammeField,
  type ProgrammeOrientation,
} from "@/data/programmes";
import { getProgrammeCurricula, getProgrammeDetails } from "@/data/curricula";

/** Chuẩn hóa bản dùng để so khớp, không sửa tên chương trình hiển thị.
 * NFD tách dấu tổ hợp; đ/Đ cần xử lý riêng vì không bị tách thành d bởi NFD. */
function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase();
}

export default function ProgrammeDirectory({ content = catalogueCopy.ProgrammeDirectory, entries = defaultProgrammes }: { content?: typeof catalogueCopy.ProgrammeDirectory; entries?: typeof defaultProgrammes } = {}) {
  const copy = content;
  const programmes = entries;
  const [keyword, setKeyword] = useState("");
  const [degrees, setDegrees] = useState<ProgrammeDegree[]>([]);
  const [fields, setFields] = useState<ProgrammeField[]>([]);
  const [orientations, setOrientations] = useState<ProgrammeOrientation[]>([]);
  const [sort, setSort] = useState<"az" | "za">("az");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Chỉ đọc query string lúc component mount; đây là giá trị khởi tạo từ form trang chủ.
  // Bộ lọc thay đổi sau đó nằm trong state, không tự đồng bộ ngược lên URL.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
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
    // Hủy callback nếu component rời trang trước frame kế tiếp.
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Functional update dùng state mới nhất; tạo mảng mới để React nhận ra thay đổi.
  const toggle = <T,>(set: React.Dispatch<React.SetStateAction<T[]>>, value: T) => {
    set((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  // Các nhóm lọc kết hợp AND; nhiều giá trị trong cùng một nhóm kết hợp OR.
  // Nhóm rỗng không giới hạn kết quả. useMemo chỉ tính lại khi đầu vào thay đổi.
  const filteredProgrammes = useMemo(() => {
    const query = normalizeText(keyword.trim());
    const result = programmes.filter((p) => {
      const searchText = normalizeText(
        [p.code, p.title, p.englishTitle, p.degree, p.field, p.orientation].join(" "),
      );
      const keywordMatch = !query || searchText.includes(query);
      const degreeMatch = degrees.length === 0 || degrees.includes(p.degree);
      const fieldMatch = fields.length === 0 || fields.includes(p.field);
      const orientationMatch =
        orientations.length === 0 ||
        (p.orientations ?? [p.orientation]).some((value) =>
          orientations.some((selected) => selected === value),
        );
      return keywordMatch && degreeMatch && fieldMatch && orientationMatch;
    });

    // filter() đã tạo mảng riêng nên sort trực tiếp không đảo thứ tự nguồn programmes.
    // localeCompare với vi giữ quy tắc sắp xếp tên tiếng Việt.
    return result.sort((a, b) =>
      sort === "za" ? b.title.localeCompare(a.title, "vi") : a.title.localeCompare(b.title, "vi"),
    );
  }, [keyword, degrees, fields, orientations, sort, programmes]);

  const activeFilterCount = degrees.length + fields.length + orientations.length;

  // Reset cả tìm kiếm, bộ lọc, thứ tự và thẻ đang mở để trở về trạng thái ban đầu.
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

  // Số đếm lấy từ toàn bộ programmes, không phải danh sách đã lọc.
  // Giữ quy tắc này khi sửa UI để tránh làm số lượng cạnh checkbox đổi ý nghĩa.
  const filterSections = [
    {
      title: copy.labels.degree,
      items: programmeDegrees,
      selected: degrees,
      toggleItem: (val: string) => toggle(setDegrees, val as ProgrammeDegree),
      count: (val: string) => programmes.filter((p) => p.degree === val).length,
    },
    {
      title: copy.labels.field,
      items: programmeFields,
      selected: fields,
      toggleItem: (val: string) => toggle(setFields, val as ProgrammeField),
      count: (val: string) => programmes.filter((p) => p.field === val).length,
    },
    {
      title: copy.labels.orientation,
      items: programmeOrientations,
      selected: orientations,
      toggleItem: (val: string) => toggle(setOrientations, val as ProgrammeOrientation),
      count: (val: string) =>
        programmes.filter((p) => (p.orientations ?? [p.orientation]).some((value) => value === val))
          .length,
    },
  ];

  return (
    <section className={`${styles["vgg-pd"]}`} id="programme-directory">
      <div className={`${styles["vgg-pd__intro"]}`}>
        <div className={`${styles["vgg-pd__intro-copy"]}`}>
          <h2>{copy.programme_directory.kham_pha_cac_nganh_hoc}</h2>
          <p className={`${styles["vgg-pd__lead"]}`}>
            {copy.programme_directory.kham_pha_chuong_trinh_sau_dai_hoc}
          </p>
        </div>
      </div>

      <div className={`${styles["vgg-pd__finder"]}`}>
        <aside className={`${styles["vgg-pd__sidebar"]}`}>
          <div className={`${styles["vgg-pd__sidebar-head"]}`}>
            <div className={`${styles["vgg-pd__sidebar-title"]}`}>
              <SlidersHorizontal size={18} strokeWidth={1.8} />
              <strong>{copy.programme_directory.bo_loc}</strong>
              {activeFilterCount > 0 && (
                <span className={`${styles["vgg-pd__active-count"]}`}>{activeFilterCount}</span>
              )}
            </div>
            <button type="button" className={`${styles["vgg-pd__clear"]}`} onClick={clearAll}>
              <RotateCcw size={13} />
              {copy.programme_directory.xoa_tat_ca}
            </button>
          </div>

          {filterSections.map((sec) => (
            <details className={`${styles["vgg-pd__filter"]}`} open key={sec.title}>
              <summary>
                <span>{sec.title}</span>
                <ChevronDown size={16} />
              </summary>
              <div className={`${styles["vgg-pd__filter-list"]}`}>
                {sec.items.map((item) => (
                  <label className={`${styles["vgg-pd__option"]}`} key={item}>
                    <input
                      type="checkbox"
                      checked={sec.selected.includes(item as never)}
                      onChange={() => sec.toggleItem(item)}
                    />
                    <span className={`${styles["vgg-pd__checkbox"]}`} />
                    <span className={`${styles["vgg-pd__option-name"]}`}>{item}</span>
                    <span className={`${styles["vgg-pd__option-count"]}`}>{sec.count(item)}</span>
                  </label>
                ))}
              </div>
            </details>
          ))}

          <div className={`${styles["vgg-pd__consult"]}`}>
            <span>{copy.programme_directory.need_guidance}</span>
            <h3>
              {copy.programme_directory.chua_chac_nen}
              {" "}
              {copy.programme_directory.chon_chuong_trinh_nao}
            </h3>
            <p>{copy.programme_directory.trao_doi_voi_doi_ngu_vien_sau}</p>
            <Link href={copy.programme_directory.href_admissions_consultation}>
              {copy.programme_directory.nhan_tu_van}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </aside>

        <div className={`${styles["vgg-pd__results"]}`}>
          <div className={`${styles["vgg-pd__toolbar"]}`}>
            <label className={`${styles["vgg-pd__search"]}`}>
              <Search size={20} strokeWidth={1.7} />
              <input
                type="search"
                aria-label={copy.programme_directory.aria_label_tim_chuong_trinh}
                placeholder={copy.programme_directory.placeholder_ban_muon_hoc_gi}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </label>

            <label className={`${styles["vgg-pd__sort"]}`}>
              <span>{copy.programme_directory.sort_by}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as "az" | "za")}>
                <option value="az">{copy.programme_directory.ten_a_z}</option>
                <option value="za">{copy.programme_directory.ten_z_a}</option>
              </select>
            </label>
          </div>

          {activeFilters.length > 0 && (
            <div
              className={`${styles["vgg-pd__active-filters"]}`}
              aria-label={copy.programme_directory.aria_label_bo_loc_dang_chon}
            >
              <span>{copy.programme_directory.dang_loc}</span>
              {activeFilters.map((filter) => (
                <button
                  type="button"
                  key={`${filter.type}-${filter.value}`}
                  onClick={() => removeFilter(filter.type, filter.value)}
                >
                  {filter.value} <X size={13} aria-hidden="true" />
                </button>
              ))}
              <button
                type="button"
                className={`${styles["vgg-pd__clear-chips"]}`}
                onClick={clearAll}
              >
                {copy.programme_directory.xoa_loc}
              </button>
            </div>
          )}

          <div className={`${styles["vgg-pd__result-meta"]}`}>
            <p>
              {copy.programme_directory.hien_thi} <strong>{filteredProgrammes.length}</strong>{" "}
              {copy.programme_directory.chuong_trinh}
            </p>
            <span>{copy.programme_directory.van_lang_graduate}</span>
          </div>

          <div className={`${styles["vgg-pd__list"]}`}>
            {filteredProgrammes.map((programme) => {
              const expanded = expandedId === programme.id;
              const details = getProgrammeDetails(programme);

              return (
                <article
                  className={`${styles["vgg-pd-card"]} ${expanded ? styles["vgg-pd-card--open"] : ""}`}
                  key={programme.id}
                >
                  <div className={`${styles["vgg-pd-card__row"]}`}>
                    <span className={`${styles["vgg-pd-card__code"]}`}>{programme.code}</span>
                    <div className={`${styles["vgg-pd-card__main"]}`}>
                      <div className={`${styles["vgg-pd-card__meta"]}`}>
                        <span>{programme.degree}</span>
                        <span>{programme.field}</span>
                      </div>
                      <h3 className="type-list-title">
                        <Link href={`/programmes/${programme.id}`}>{programme.title}</Link>
                      </h3>
                    </div>

                    <div className={`${styles["vgg-pd-card__stat"]}`}>
                      <strong>{programme.creditsLabel ?? programme.credits}</strong>
                      <span>{copy.programme_directory.tin_chi}</span>
                    </div>

                    <div className={`${styles["vgg-pd-card__stat"]}`}>
                      <strong>{programme.duration}</strong>
                      <span>{copy.programme_directory.thoi_gian}</span>
                    </div>

                    <div
                      className={`${styles["vgg-pd-card__stat"]} ${styles["vgg-pd-card__tuition"]}`}
                    >
                      <strong>{getProgrammeTuition(programme)}</strong>
                      <span>{copy.programme_directory.hoc_phi_toan_khoa}</span>
                    </div>

                    {programme.id === "logistics" ? (
                      <Link
                        href={`/programmes/${programme.id}`}
                        className={`${styles["vgg-pd-card__toggle"]}`}
                        aria-label={`Khám phá ngành ${programme.title}`}
                      >
                        <ArrowUpRight size={18} />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={`${styles["vgg-pd-card__toggle"]}`}
                        aria-expanded={expanded}
                        aria-label={
                          expanded ? `Thu gọn ${programme.title}` : `Xem thêm ${programme.title}`
                        }
                        onClick={() => setExpandedId(expanded ? null : programme.id)}
                      >
                        <ChevronDown size={18} />
                      </button>
                    )}
                  </div>

                  {expanded && programme.detailsPending && (
                    <div className={`${styles["vgg-pd-card__details"]}`}>
                      <p className={`${styles["vgg-pd-card__intro"]}`}>
                        {programme.summary ??
                          `Thông tin chi tiết ngành ${programme.title} đang được cập nhật.`}
                      </p>
                    </div>
                  )}
                  {expanded && !programme.detailsPending && (
                    <div className={`${styles["vgg-pd-card__details"]}`}>
                      <p className={`${styles["vgg-pd-card__intro"]}`}>{details.intro}</p>

                      <div className={`${styles["vgg-pd-card__content-grid"]}`}>
                        {[
                          ["01", copy.labels.highlights, details.highlights],
                          ["02", copy.labels.outcomes, details.outcomes],
                          ["03", copy.labels.careers, details.careers],
                          [
                            "04",
                            copy.labels.graduation,
                            getProgrammeGraduationRequirements(programme),
                          ],
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
                        <section
                          className={`${styles["vgg-pd-card__curriculum"]}`}
                          key={curriculum.number}
                        >
                          <header>
                            <span>{curriculum.number}</span>
                            <div>
                              <p>{copy.vgg_pd_card_curriculum.noi_dung_chuong_trinh}</p>
                              <h4>{curriculum.title}</h4>
                            </div>
                            <strong>
                              {programme.creditsLabel ?? programme.credits}{" "}
                              {copy.vgg_pd_card_curriculum.tin_chi}
                            </strong>
                          </header>

                          <div className={`${styles["vgg-pd-card__curriculum-groups"]}`}>
                            {curriculum.groups.map((group, groupIndex) => (
                              <section key={group.title}>
                                <h5>
                                  <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                                  <span className={`${styles["vgg-pd-card__group-header"]}`}>
                                    <strong>{group.title}</strong>
                                  </span>
                                </h5>
                                <ul>
                                  {group.courses.map((course, courseIndex) => (
                                    <li key={`${course.name}-${courseIndex}`}>
                                      <span className={`${styles["vgg-pd-card__course-number"]}`}>
                                        {String(courseIndex + 1).padStart(2, "0")}
                                      </span>
                                      <span className={`${styles["vgg-pd-card__course-name"]}`}>
                                        <span>{course.name}</span>
                                      </span>
                                      <div>
                                        {course.elective && (
                                          <small>{copy.vgg_pd_card_curriculum.tu_chon}</small>
                                        )}
                                        {typeof course.credits === "number" &&
                                          course.credits > 0 && (
                                            <b>
                                              {course.credits} {copy.vgg_pd_card_curriculum.tin_chi}
                                            </b>
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

                      <div className={`${styles["vgg-pd-card__detail-grid"]}`}>
                        <div>
                          <span>{copy.programme_directory.hinh_thuc_hoc}</span>
                          <strong>{programme.studyMode}</strong>
                        </div>
                        <div>
                          <span>{copy.programme_directory.ky_tuyen_sinh}</span>
                          <strong>{programme.intake}</strong>
                        </div>
                        <div>
                          <span>{copy.programme_directory.thoi_gian_1}</span>
                          <strong>{programme.duration}</strong>
                        </div>
                        <div>
                          <span>{copy.programme_directory.dinh_huong}</span>
                          <strong>{programme.orientation}</strong>
                        </div>
                      </div>

                      <div className={`${styles["vgg-pd-card__actions"]}`}>
                        <Link
                          href={copy.programme_directory.href_admissions}
                          className={`${styles["vgg-pd-card__primary"]} vgg-cta-pill`}
                        >
                          {copy.programme_directory.thong_tin_tuyen_sinh}
                          <ArrowUpRight size={16} />
                        </Link>
                        <Link
                          href={copy.programme_directory.href_admissions_consultation}
                          className={`${styles["vgg-pd-card__secondary"]} vgg-cta-pill`}
                        >
                          {copy.programme_directory.lien_he_tu_van}
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {filteredProgrammes.length === 0 && (
              <div className={`${styles["vgg-pd__empty"]}`}>
                <Search size={32} strokeWidth={1.4} />
                <h3>{copy.programme_directory.khong_tim_thay_chuong_trinh}</h3>
                <p>{copy.programme_directory.hay_thu_thay_doi_tu_khoa_hoac}</p>
                <button type="button" onClick={clearAll}>
                  {copy.programme_directory.xoa_toan_bo_bo_loc}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
