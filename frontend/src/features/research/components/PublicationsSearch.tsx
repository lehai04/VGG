"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Filter, RotateCcw, Search } from "lucide-react";
import styles from "./ResearchPublicationsPage.module.css";

export type PublicationItem = { id:string; title:string; field:string; author:string; year:string; type:string; language:string; abstract:string };
type FilterKey = "field" | "year" | "author" | "type" | "language";

const labels: Record<FilterKey,string> = { field:"Theo lĩnh vực", year:"Theo năm phát hành", author:"Theo tác giả", type:"Theo phân loại", language:"Theo ngôn ngữ gốc" };

export function PublicationsSearch({ publications, titleFirst="Khám phá tất cả", titleSecond="Bài báo khoa học Viện Sau Đại học", breadcrumbLast="Bài báo khoa học", searchPlaceholder="Tìm kiếm Bài báo khoa học", resultLabel="kết quả tìm kiếm" }: { publications:PublicationItem[]; titleFirst?:string; titleSecond?:string; breadcrumbLast?:string; searchPlaceholder?:string; resultLabel?:string }) {
  const [query,setQuery] = useState("");
  const [open,setOpen] = useState<FilterKey|null>(null);
  const [mobileFilters,setMobileFilters] = useState(false);
  const [selected,setSelected] = useState<Partial<Record<FilterKey,string>>>({});
  const options = useMemo(() => Object.fromEntries((Object.keys(labels) as FilterKey[]).map(key => [key,[...new Set(publications.map(item => item[key]))].sort()])),[publications]) as Record<FilterKey,string[]>;
  const results = useMemo(() => publications.filter(item => {
    const needle=query.trim().toLocaleLowerCase("vi");
    const matchesText=!needle || `${item.title} ${item.abstract} ${item.author} ${item.field}`.toLocaleLowerCase("vi").includes(needle);
    return matchesText && (Object.keys(selected) as FilterKey[]).every(key => !selected[key] || item[key]===selected[key]);
  }),[publications,query,selected]);
  const reset=()=>{setQuery("");setSelected({});setOpen(null);};
  return <section className={styles.searchPage}>
    <aside className={`${styles.sidebar} ${mobileFilters?styles.sidebarOpen:""}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><span>Trang chủ</span><b>/ Nghiên cứu</b><b>/ {breadcrumbLast}</b></nav>
      <h1><span>{titleFirst}</span><span>{titleSecond}</span></h1>
      <button className={styles.reset} type="button" onClick={reset}>Cài đặt lại <RotateCcw /></button>
      <div className={styles.filters}>
        {(Object.keys(labels) as FilterKey[]).map(key => <div className={styles.filterGroup} key={key}>
          <button type="button" onClick={()=>setOpen(open===key?null:key)} aria-expanded={open===key}>{labels[key]}<ChevronDown /></button>
          {open===key && <div className={styles.filterOptions}>{options[key].map(value => <label key={value}><input type="radio" name={key} checked={selected[key]===value} onChange={()=>setSelected(current=>({...current,[key]:value}))}/><span>{value}</span></label>)}</div>}
        </div>)}
      </div>
    </aside>
    <div className={styles.resultsPane}>
      <div className={styles.searchRow}><label><span className={styles.visuallyHidden}>{searchPlaceholder}</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={searchPlaceholder}/><Search /></label><button className={styles.mobileFilterButton} type="button" onClick={()=>setMobileFilters(v=>!v)} aria-label="Bộ lọc"><Filter /></button></div>
      <p className={styles.resultCount}>Hiển thị {results.length} {resultLabel}</p>
      <div className={styles.resultList}>{results.map(item => <article key={item.id}><p>{item.field}</p><h2>{item.title}</h2><span>{item.abstract}</span><div className={styles.meta}><b>{item.author}</b><time>{item.year}</time></div></article>)}{!results.length&&<div className={styles.empty}><Search/><h2>Không tìm thấy công bố phù hợp</h2><button type="button" onClick={reset}>Xóa bộ lọc</button></div>}</div>
    </div>
  </section>;
}
