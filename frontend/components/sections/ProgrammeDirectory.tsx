"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowUpRight,
  ChevronDown,
  X,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  programmeDegrees,
  programmeFields,
  programmeOrientations,
  programmes,
  type Programme,
  type ProgrammeDegree,
  type ProgrammeField,
  type ProgrammeOrientation,
} from "@/data/programmes";


/* =========================================================
   SEARCH NORMALIZER
   ========================================================= */

function normalizeText(value: string) {
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
  const [keyword, setKeyword] =
    useState("");

  const [degrees, setDegrees] =
    useState<ProgrammeDegree[]>([]);

  const [fields, setFields] =
    useState<ProgrammeField[]>([]);

  const [
    orientations,
    setOrientations,
  ] = useState<
    ProgrammeOrientation[]
  >([]);

  // Nhận tiêu chí từ Programme Finder ở homepage để người dùng không phải lọc lại.
  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const nextDegree = params.get("degree");
      const nextField = params.get("field");
      const nextOrientation = params.get("orientation");
      setKeyword(params.get("search") ?? "");
      setDegrees(programmeDegrees.includes(nextDegree as ProgrammeDegree) ? [nextDegree as ProgrammeDegree] : []);
      setFields(programmeFields.includes(nextField as ProgrammeField) ? [nextField as ProgrammeField] : []);
      setOrientations(
        programmeOrientations.includes(nextOrientation as ProgrammeOrientation)
          ? [nextOrientation as ProgrammeOrientation]
          : [],
      );
    });
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const [sort, setSort] =
    useState<"az" | "za">("az");

  const [
    expandedId,
    setExpandedId,
  ] = useState<string | null>(
    null
  );


  /* =======================================================
     FILTER HELPERS
     ======================================================= */

  const toggleDegree = (
    value: ProgrammeDegree
  ) => {
    setDegrees((current) =>
      current.includes(value)
        ? current.filter(
            (item) =>
              item !== value
          )
        : [
            ...current,
            value,
          ]
    );
  };


  const toggleField = (
    value: ProgrammeField
  ) => {
    setFields((current) =>
      current.includes(value)
        ? current.filter(
            (item) =>
              item !== value
          )
        : [
            ...current,
            value,
          ]
    );
  };


  const toggleOrientation = (
    value: ProgrammeOrientation
  ) => {
    setOrientations(
      (current) =>
        current.includes(value)
          ? current.filter(
              (item) =>
                item !== value
            )
          : [
              ...current,
              value,
            ]
    );
  };


  /* =======================================================
     SEARCH + FILTER + SORT
     ======================================================= */

  const filteredProgrammes =
    useMemo(() => {
      const query =
        normalizeText(
          keyword.trim()
        );

      const result =
        programmes.filter(
          (programme) => {
            const searchText =
              normalizeText(
                [
                  programme.code,
                  programme.title,
                  programme.englishTitle,
                  programme.degree,
                  programme.field,
                  programme.orientation,
                ].join(" ")
              );

            const keywordMatch =
              !query ||
              searchText.includes(
                query
              );

            const degreeMatch =
              degrees.length === 0 ||
              degrees.includes(
                programme.degree
              );

            const fieldMatch =
              fields.length === 0 ||
              fields.includes(
                programme.field
              );

            const orientationMatch =
              orientations.length ===
                0 ||
              orientations.includes(
                programme.orientation
              );

            return (
              keywordMatch &&
              degreeMatch &&
              fieldMatch &&
              orientationMatch
            );
          }
        );

      return [
        ...result,
      ].sort((a, b) => {
        if (sort === "za") {
          return b.title.localeCompare(
            a.title,
            "vi"
          );
        }

        return a.title.localeCompare(
          b.title,
          "vi"
        );
      });
    }, [
      keyword,
      degrees,
      fields,
      orientations,
      sort,
    ]);


  const activeFilterCount =
    degrees.length +
    fields.length +
    orientations.length;


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
    <section
      className="vgg-pd"
      id="programme-directory"
    >

      {/* ===================================================
          INTRO
          =================================================== */}

      <div className="vgg-pd__intro">

        <div className="vgg-pd__intro-copy">

          <p className="vgg-pd__eyebrow">
            02 / PROGRAMME DIRECTORY
          </p>


          <h2>
            Tìm chương trình
            <br />

            <em>
              dành cho bạn.
            </em>
          </h2>


          <p className="vgg-pd__lead">
            Khám phá chương trình
            Sau đại học theo lĩnh vực,
            bậc đào tạo và định hướng
            phù hợp với mục tiêu của bạn.
          </p>

        </div>


        <div className="vgg-pd__total">

          <strong>
            {programmes.length}
          </strong>

          <span>
            chương trình
            <br />
            sau đại học
          </span>

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

              <SlidersHorizontal
                size={18}
                strokeWidth={1.8}
              />

              <strong>
                Bộ lọc
              </strong>


              {activeFilterCount >
                0 && (

                <span className="vgg-pd__active-count">
                  {
                    activeFilterCount
                  }
                </span>

              )}

            </div>


            <button
              type="button"
              className="vgg-pd__clear"
              onClick={clearAll}
            >

              <RotateCcw
                size={13}
              />

              Xóa tất cả

            </button>

          </div>


          {/* =================================================
              DEGREE
              ================================================= */}

          <details
            className="vgg-pd__filter"
            open
          >

            <summary>

              <span>
                Bậc đào tạo
              </span>

              <ChevronDown
                size={16}
              />

            </summary>


            <div className="vgg-pd__filter-list">

              {programmeDegrees.map(
                (degree) => {

                  const count =
                    programmes.filter(
                      (item) =>
                        item.degree ===
                        degree
                    ).length;


                  return (

                    <label
                      className="vgg-pd__option"
                      key={degree}
                    >

                      <input
                        type="checkbox"
                        checked={
                          degrees.includes(
                            degree
                          )
                        }
                        onChange={() =>
                          toggleDegree(
                            degree
                          )
                        }
                      />

                      <span className="vgg-pd__checkbox" />

                      <span className="vgg-pd__option-name">
                        {degree}
                      </span>

                      <span className="vgg-pd__option-count">
                        {count}
                      </span>

                    </label>

                  );
                }
              )}

            </div>

          </details>


          {/* =================================================
              FIELD
              ================================================= */}

          <details
            className="vgg-pd__filter"
            open
          >

            <summary>

              <span>
                Nhóm ngành
              </span>

              <ChevronDown
                size={16}
              />

            </summary>


            <div className="vgg-pd__filter-list">

              {programmeFields.map(
                (field) => {

                  const count =
                    programmes.filter(
                      (item) =>
                        item.field ===
                        field
                    ).length;


                  return (

                    <label
                      className="vgg-pd__option"
                      key={field}
                    >

                      <input
                        type="checkbox"
                        checked={
                          fields.includes(
                            field
                          )
                        }
                        onChange={() =>
                          toggleField(
                            field
                          )
                        }
                      />

                      <span className="vgg-pd__checkbox" />

                      <span className="vgg-pd__option-name">
                        {field}
                      </span>

                      <span className="vgg-pd__option-count">
                        {count}
                      </span>

                    </label>

                  );
                }
              )}

            </div>

          </details>


          {/* =================================================
              ORIENTATION
              ================================================= */}

          <details
            className="vgg-pd__filter"
            open
          >

            <summary>

              <span>
                Định hướng
              </span>

              <ChevronDown
                size={16}
              />

            </summary>


            <div className="vgg-pd__filter-list">

              {programmeOrientations.map(
                (orientation) => {

                  const count =
                    programmes.filter(
                      (item) =>
                        item.orientation ===
                        orientation
                    ).length;


                  return (

                    <label
                      className="vgg-pd__option"
                      key={
                        orientation
                      }
                    >

                      <input
                        type="checkbox"
                        checked={
                          orientations.includes(
                            orientation
                          )
                        }
                        onChange={() =>
                          toggleOrientation(
                            orientation
                          )
                        }
                      />

                      <span className="vgg-pd__checkbox" />

                      <span className="vgg-pd__option-name">
                        {
                          orientation
                        }
                      </span>

                      <span className="vgg-pd__option-count">
                        {count}
                      </span>

                    </label>

                  );
                }
              )}

            </div>

          </details>


          {/* =================================================
              CONSULTATION
              ================================================= */}

          <div className="vgg-pd__consult">

            <span>
              NEED GUIDANCE?
            </span>


            <h3>
              Chưa chắc nên
              <br />
              chọn chương trình nào?
            </h3>


            <p>
              Trao đổi với đội ngũ
              VGG để tìm lộ trình
              phù hợp với mục tiêu
              học tập và nghề nghiệp.
            </p>


            <Link href="/discover/lien-he">

              Nhận tư vấn

              <ArrowUpRight
                size={16}
              />

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

              <Search
                size={20}
                strokeWidth={1.7}
              />

              <input
                type="search"
                aria-label="Tìm chương trình"
                placeholder="Bạn muốn học gì?"
                value={keyword}
                onChange={(
                  event
                ) =>
                  setKeyword(
                    event.target
                      .value
                  )
                }
              />

            </label>


            <label className="vgg-pd__sort">

              <span>
                SORT BY
              </span>


              <select
                value={sort}
                onChange={(
                  event
                ) =>
                  setSort(
                    event.target
                      .value as
                      | "az"
                      | "za"
                  )
                }
              >

                <option value="az">
                  Tên A–Z
                </option>

                <option value="za">
                  Tên Z–A
                </option>

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
              Hiển thị{" "}

              <strong>
                {
                  filteredProgrammes.length
                }
              </strong>

              {" "}chương trình
            </p>


            <span>
              VAN LANG GRADUATE
            </span>

          </div>


          {/* =================================================
              RESULT SCROLLER
              ================================================= */}

          <div className="vgg-pd__list">

            {filteredProgrammes.map(
              (programme) => {

                const expanded =
                  expandedId ===
                  programme.id;

                const details =
                  getProgrammeDetails(
                    programme
                  );


                return (

                  <article
                    className={`vgg-pd-card ${
                      expanded
                        ? "vgg-pd-card--open"
                        : ""
                    }`}
                    key={
                      programme.id
                    }
                  >

                    {/* =======================================
                        MAIN ROW
                        ======================================= */}

                    <div className="vgg-pd-card__row">


                      {/* CODE */}

                      <span className="vgg-pd-card__code">
                        {
                          programme.code
                        }
                      </span>


                      {/* PROGRAMME */}

                      <div className="vgg-pd-card__main">

                        <div className="vgg-pd-card__meta">

                          <span>
                            {
                              programme.degree
                            }
                          </span>

                          <span>
                            {
                              programme.field
                            }
                          </span>

                        </div>


                        <h3>
                          {
                            programme.title
                          }
                        </h3>


                        <p>
                          {
                            programme.englishTitle
                          }
                        </p>

                      </div>


                      {/* CREDITS */}

                      <div className="vgg-pd-card__stat">

                        <strong>
                          {
                            programme.credits
                          }
                        </strong>

                        <span>
                          TÍN CHỈ
                        </span>

                      </div>


                      {/* DURATION */}

                      <div className="vgg-pd-card__stat">

                        <strong>
                          {
                            programme.duration
                          }
                        </strong>

                        <span>
                          THỜI GIAN
                        </span>

                      </div>


                      {/* ORIENTATION */}

                      <div className="vgg-pd-card__stat vgg-pd-card__orientation">

                        <strong>
                          {
                            programme.orientation
                          }
                        </strong>

                        <span>
                          ĐỊNH HƯỚNG
                        </span>

                      </div>


                      {/* OPEN */}

                      <button
                        type="button"
                        className="vgg-pd-card__toggle"
                        aria-expanded={
                          expanded
                        }
                        aria-label={
                          expanded
                            ? `Thu gọn ${programme.title}`
                            : `Xem thêm ${programme.title}`
                        }
                        onClick={() =>
                          setExpandedId(
                            expanded
                              ? null
                              : programme.id
                          )
                        }
                      >

                        <ChevronDown
                          size={18}
                        />

                      </button>

                    </div>


                    {/* =======================================
                        DETAILS
                        ======================================= */}

                    {expanded && (

                      <div className="vgg-pd-card__details">

                        <p className="vgg-pd-card__intro">
                          {details.intro}
                        </p>

                        <p className="vgg-pd-card__intro-en">
                          {details.english}
                        </p>

                        <div className="vgg-pd-card__content-grid">
                          {[
                            ["01", "Đặc điểm nổi bật", "Programme highlights", details.highlights],
                            ["02", "Năng lực đầu ra", "Learning outcomes", details.outcomes],
                            ["03", "Triển vọng nghề nghiệp", "Career destinations", details.careers],
                          ].map(([number, title, english, items]) => (
                            <section key={number as string}>
                              <h4>
                                <span>{number as string}</span>
                                {title as string}
                                <small>· {english as string}</small>
                              </h4>
                              <ul>
                                {(items as string[]).map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </section>
                          ))}
                        </div>

                        <div className="vgg-pd-card__detail-grid">

                          <div>

                            <span>
                              Hình thức học
                            </span>

                            <strong>
                              {
                                programme.studyMode
                              }
                            </strong>

                          </div>


                          <div>

                            <span>
                              Kỳ tuyển sinh
                            </span>

                            <strong>
                              {
                                programme.intake
                              }
                            </strong>

                          </div>


                          <div>

                            <span>
                              Thời gian
                            </span>

                            <strong>
                              {
                                programme.duration
                              }
                            </strong>

                          </div>


                          <div>

                            <span>
                              Định hướng
                            </span>

                            <strong>
                              {
                                programme.orientation
                              }
                            </strong>

                          </div>

                        </div>


                        <div className="vgg-pd-card__actions">

                          <Link
                            href="/admissions"
                            className="vgg-pd-card__primary vgg-cta-pill"
                          >

                            Thông tin tuyển sinh

                            <ArrowUpRight
                              size={16}
                            />

                          </Link>


                          <Link
                            href="/discover/lien-he"
                            className="vgg-pd-card__secondary vgg-cta-pill"
                          >

                            Liên hệ tư vấn

                            <ArrowUpRight
                              size={16}
                            />

                          </Link>

                        </div>

                      </div>

                    )}

                  </article>

                );
              }
            )}


            {/* =================================================
                EMPTY
                ================================================= */}

            {filteredProgrammes.length ===
              0 && (

              <div className="vgg-pd__empty">

                <Search
                  size={32}
                  strokeWidth={1.4}
                />

                <h3>
                  Không tìm thấy
                  chương trình
                </h3>

                <p>
                  Hãy thử thay đổi
                  từ khóa hoặc bộ lọc.
                </p>

                <button
                  type="button"
                  onClick={clearAll}
                >
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

/* Nội dung học thuật hiển thị khi mở từng chương trình; cùng một cấu trúc cho toàn danh mục. */
function getProgrammeDetails(programme: Programme) {
  if (programme.id === "ky-thuat-moi-truong") {
    return {
      intro: "Chương trình đào tạo Thạc sĩ Kỹ thuật Môi trường trang bị cho học viên hiểu biết sâu về kiến thức chuyên ngành môi trường, lý thuyết đi đôi với thực hành. Dựa vào các kết quả nghiên cứu khoa học, học viên đề xuất các giải pháp kỹ thuật, góp phần giải quyết các yêu cầu về môi trường sống.",
      english: "The Master of Environmental Engineering builds deep command of environmental science, pairing rigorous theory with hands-on practice. Grounded in original research, graduates design technical solutions to the pollution, water and waste challenges of a fast-urbanising delta region.",
      highlights: ["Thư viện chuyên ngành với các giáo trình chuyên sâu và được cập nhật thường xuyên", "Hệ thống phòng thí nghiệm hiện đại, liên kết với các trung tâm nghiên cứu tiên tiến", "Đội ngũ giảng viên được đào tạo đúng chuyên môn tại các trường đại học ở nước ngoài"],
      outcomes: ["Phát triển tư duy nghiên cứu, ứng dụng và truyền đạt tri thức trong lĩnh vực kỹ thuật môi trường", "Làm việc và nghiên cứu bằng tiếng Anh đạt chuẩn CEFR B2", "Đề xuất sáng kiến và cải tiến các quy trình công nghệ môi trường"],
      careers: ["Dẫn dắt hoạt động nghiên cứu, ứng dụng và chuyển giao công nghệ môi trường", "Đảm nhận vị trí quản lý, nghiên cứu và phát triển công nghệ mới", "Nghiên cứu, giảng dạy hoặc tiếp tục chương trình tiến sĩ trong và ngoài nước"],
    };
  }

  return {
    intro: `Chương trình ${programme.degree} ${programme.title} cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực ${programme.field.toLowerCase()}.`,
    english: `${programme.englishTitle} develops advanced disciplinary knowledge, research capability and practical leadership for a changing professional landscape.`,
    highlights: ["Chương trình cập nhật, kết hợp nền tảng học thuật với các vấn đề thực tiễn", "Đội ngũ giảng viên giàu kinh nghiệm cùng môi trường học tập hiện đại", "Kết nối nghiên cứu, doanh nghiệp và mạng lưới chuyên gia trong lĩnh vực"],
    outcomes: [`Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành ${programme.title}`, "Phát triển năng lực nghiên cứu, tư duy phản biện và ra quyết định", "Làm việc độc lập, hợp tác liên ngành và truyền đạt tri thức chuyên môn"],
    careers: ["Đảm nhận các vị trí chuyên môn và quản lý tại doanh nghiệp, tổ chức trong và ngoài nước", "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành", "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn"],
  };
}
