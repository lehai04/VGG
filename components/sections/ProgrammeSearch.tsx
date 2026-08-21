"use client";

import { useState } from "react";

export default function ProgrammeSearch() {
  const [keyword, setKeyword] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [faculty, setFaculty] = useState("");

  const handleSearch = () => {
    console.log({
      keyword,
      degree,
      field,
      faculty,
    });
  };

  return (
    <section className="programme-search-wrapper">
      <div className="programme-search-heading">
        <h2>Khám phá chương trình Sau đại học</h2>

        <p>
          Tìm kiếm chương trình Thạc sĩ và Tiến sĩ phù hợp với định hướng học tập
          và phát triển chuyên môn của bạn tại Văn Lang.
        </p>
      </div>

      <div className="programme-search-panel">
        <div className="programme-search-top">
          <div className="programme-search-input">
            <span className="programme-search-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M20 20L16.65 16.65"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Tìm kiếm chương trình"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>

          <button
            className="programme-search-button"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>

        <div className="programme-search-filters">
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          >
            <option value="">Bậc đào tạo</option>
            <option value="thac-si">Thạc sĩ</option>
            <option value="tien-si">Tiến sĩ</option>
          </select>

          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            <option value="">Lĩnh vực</option>
            <option value="kinh-doanh">
              Kinh doanh & Quản lý
            </option>
            <option value="moi-truong">
              Môi trường & Công nghệ
            </option>
          </select>

          <select
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
          >
            <option value="">Khoa / Viện</option>
            <option value="vien-sdh">
              Viện Sau đại học
            </option>
            <option value="khoa-moi-truong">
              Khoa Môi trường
            </option>
          </select>
        </div>
      </div>
    </section>
  );
}