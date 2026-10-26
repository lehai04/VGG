"use client";
import { useState } from "react";
import { VisualCollectionEditor } from "./VisualCollectionEditor";
import { cmsFieldLabel } from "./WebsiteManager";
type Item = Record<string, string>;
export function VisualLists({
  paths,
  defaults,
  values,
  onSave,
  onDirtyChange,
  disabled,
  canUpload,
}: {
  paths: string[];
  defaults: Record<string, unknown>;
  values: Record<string, string>;
  onSave: (section: string, values: Record<string, string>) => Promise<void>;
  onDirtyChange: (dirty: boolean) => void;
  disabled: boolean;
  canUpload: boolean;
}) {
  const [drafts, setDraftState] = useState<Record<string, Item[]>>({});
  function setDrafts(
    value:
      | Record<string, Item[]>
      | ((current: Record<string, Item[]>) => Record<string, Item[]>),
  ) {
    const next = typeof value === "function" ? value(drafts) : value;
    setDraftState(next);
    onDirtyChange(Object.keys(next).length > 0);
  }
  return (
    <>
      {paths.map((path) => {
        let source: unknown = defaults;
        for (const key of path.split("."))
          source = (source as Record<string, unknown>)?.[key];
        let items = Array.isArray(source) ? (source as Item[]) : [];
        if (path === "cmsBasics" && !items.length) items = [Object.fromEntries(["code", "degree", "field", "orientation", "credits"].map((key) => [key, String(defaults[key] ?? "")]))];
        try {
          if (values[`$list:${path}`])
            items = JSON.parse(values[`$list:${path}`]);
        } catch {}
        const draft = drafts[path] ?? items;
        return (
          <details key={path}>
            <summary>
              Quản lý danh sách: {cmsFieldLabel(path.split(".").at(-1) ?? path)}
            </summary>
            <VisualCollectionEditor
              path={path}
              items={draft}
              onChange={(items) => setDrafts({ ...drafts, [path]: items })}
              disabled={disabled}
              canUpload={canUpload}
            />
            <button
              disabled={disabled}
              onClick={async () => {
                try {
                  await onSave(`list:${path}`, {
                    [`$list:${path}`]: JSON.stringify(draft),
                  });
                  setDrafts((current) => {
                    const next = { ...current };
                    delete next[path];
                    return next;
                  });
                } catch {
                  /* Parent displays the error; retain the draft. */
                }
              }}
            >
              Lưu danh sách
            </button>
            <button
              disabled={disabled}
              onClick={() =>
                setDrafts((current) => {
                  const next = { ...current };
                  delete next[path];
                  return next;
                })
              }
            >
              Hủy danh sách
            </button>
          </details>
        );
      })}
    </>
  );
}
