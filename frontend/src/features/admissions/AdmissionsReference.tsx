"use client";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import content from "./reference-content.json";
import { initializeAdmissions } from "./reference-engine";
import "./reference.css";
/** Reviewed static reference markup also renders on the server. */
export function AdmissionsReference() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    // Restore initial markup when React replays effects in development.
    root.current.innerHTML = content.html;
    return initializeAdmissions(root.current);
  }, []);
  return (
    <>
      <SiteHeader compact />
      <div
        ref={root}
        id="main-content"
        className="admissions-reference"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </>
  );
}
