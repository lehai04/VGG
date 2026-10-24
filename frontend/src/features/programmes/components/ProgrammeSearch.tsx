"use client";

import styles from "./ProgrammeCatalogue.module.css";

import { catalogueCopy } from "@/data/programmes/catalogue-copy";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { programmeDegrees, programmeFields, programmeOrientations } from "@/data/programmes";

const copy = catalogueCopy.ProgrammeSearch;

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
    <section
      className={`${styles["programme-search-wrapper"]}`}
      aria-labelledby="programme-search-title"
    >
      <div className={`${styles["programme-search-heading"]}`}>
        <h2 id="programme-search-title">
          {copy.programme_search_wrapper.tim_kiem_chuong_trinh_phu_hop_voi}
        </h2>

      </div>

      <div className={`${styles["programme-search-panel"]}`}>
        <div className={`${styles["programme-search-panel-head"]}`}>
          <div>
            <strong>{copy.programme_search_wrapper.chon_dieu_ban_muon_kham_pha}</strong>
          </div>
        </div>
        <div className={`${styles["programme-search-top"]}`}>
          <div className={`${styles["programme-search-input"]}`}>
            <Search size={21} aria-hidden="true" />

            <input
              type="text"
              aria-label={copy.programme_search_wrapper.aria_label_tim_kiem_chuong_trinh}
              placeholder={
                copy.programme_search_wrapper.placeholder_nhap_ten_chuong_trinh_hoac_linh
              }
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>

          <button className={`${styles["programme-search-button"]}`} onClick={handleSearch}>
            {copy.programme_search_wrapper.kham_pha}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className={`${styles["programme-search-filters"]}`}>
          <span className={`${styles["programme-search-filter-label"]}`}>
            <SlidersHorizontal size={15} /> {copy.programme_search_wrapper.loc_nhanh}
          </span>
          <select value={degree} onChange={(e) => setDegree(e.target.value)}>
            <option value="">{copy.programme_search_wrapper.bac_dao_tao}</option>
            {programmeDegrees.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select value={field} onChange={(e) => setField(e.target.value)}>
            <option value="">{copy.programme_search_wrapper.linh_vuc}</option>
            {programmeFields.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
            <option value="">{copy.programme_search_wrapper.dinh_huong_dao_tao}</option>
            {programmeOrientations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
