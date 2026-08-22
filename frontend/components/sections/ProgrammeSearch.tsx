"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { programmeDegrees, programmeFields, programmeOrientations } from "@/data/programmes";

export default function ProgrammeSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [orientation, setOrientation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("search", keyword.trim());
    if (degree) params.set("degree", degree);
    if (field) params.set("field", field);
    if (orientation) params.set("orientation", orientation);
    const suffix = params.size ? `?${params.toString()}` : "";
    router.push(`/programmes${suffix}`);
  };

  return (
    <section className="programme-search-wrapper" aria-labelledby="programme-search-title">
      <div className="programme-search-heading">
        <p className="programme-search-eyebrow"><Sparkles size={14} /> VGG PROGRAMME FINDER</p>
        <h2 id="programme-search-title">Tìm chương trình<br /><em>phù hợp với bạn.</em></h2>

        <p>
          Tìm kiếm chương trình Thạc sĩ và Tiến sĩ phù hợp với định hướng học tập
          và phát triển chuyên môn của bạn tại Văn Lang.
        </p>
      </div>

      <div className="programme-search-panel">
        <div className="programme-search-panel-head">
          <div>
            <span>KHỞI ĐẦU HÀNH TRÌNH</span>
            <strong>Chọn điều bạn muốn khám phá</strong>
          </div>
          <span className="programme-search-count">19 chương trình</span>
        </div>
        <div className="programme-search-top">
          <div className="programme-search-input">
            <Search size={21} aria-hidden="true" />

            <input
              type="text"
              aria-label="Tìm kiếm chương trình"
              placeholder="Nhập tên chương trình hoặc lĩnh vực bạn quan tâm"
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
            Khám phá <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="programme-search-filters">
          <span className="programme-search-filter-label"><SlidersHorizontal size={15} /> LỌC NHANH</span>
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          >
            <option value="">Bậc đào tạo</option>
            {programmeDegrees.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>

          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            <option value="">Lĩnh vực</option>
            {programmeFields.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>

          <select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
          >
            <option value="">Định hướng đào tạo</option>
            {programmeOrientations.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>
    </section>
  );
}
