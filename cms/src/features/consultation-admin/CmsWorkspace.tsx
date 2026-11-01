"use client";
import Link from "next/link";
import Image from "next/image";
import { cmsPath } from "@/lib/cms-path";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState, type ComponentProps } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Newspaper,
  FolderOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import {
  RealtimeDashboard,
  type DashboardData,
} from "@/components/dashboard/RealtimeDashboard";
import { ConsultationWorkspace } from "@/components/cms-next/ConsultationWorkspace";
import { NewsList, type NewsPostItem } from "@/components/cms/NewsList";
import { NewsEditor } from "@/components/cms/NewsEditor";
import { ResourceManager } from "@/components/cms/ResourceManager";
import { adminApi, type User } from "./api";
import styles from "./workspace.module.css";
export function CmsWorkspace({
  user,
  onExpired,
}: {
  user: User;
  onExpired: () => void;
}) {
  const pathname = usePathname();
  const section = pathname.includes("/news")
    ? "news"
    : pathname.includes("/resources")
      ? "resources"
      : pathname.includes("/consultations")
        ? "consultations"
        : "dashboard";
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    window.addEventListener("cms:expired", onExpired);
    return () => window.removeEventListener("cms:expired", onExpired);
  }, [onExpired]);
  const items = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "consultations", label: "Lịch tư vấn", icon: CalendarDays },
    { key: "news", label: "Tin tức", icon: Newspaper },
    { key: "resources", label: "Quản lý tài nguyên", icon: FolderOpen },
  ];
  async function logout() {
    setBusy(true);
    try {
      await adminApi("logout", "POST", {});
      onExpired();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể đăng xuất.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className={styles.workspace}>
      <button
        className={styles.menuToggle}
        aria-label={open ? "Đóng menu" : "Mở menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <Link href="/admin/dashboard" className={styles.logo}>
          <Image
            src={cmsPath("/images/logo/logo-vgg.png")}
            alt="Viện Sau Đại học – Văn Lang"
            width={210}
            height={74}
            priority
          />
        </Link>
        <p className={styles.caption}>KHÔNG GIAN LÀM VIỆC</p>
        <nav aria-label="Menu quản trị">
          {items.map((item) => (
            <div key={item.key}>
              <Link
                href={`/admin/${item.key}`}
                className={section === item.key ? styles.active : ""}
                aria-current={section === item.key ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
              {item.key === "news" &&
                section === "news" &&
                user.canManageContent && (
                  <div className={styles.submenu}>
                    <Link
                      href="/admin/news/create"
                      onClick={() => setOpen(false)}
                    >
                      Đăng tin
                    </Link>
                    <Link href="/admin/news" onClick={() => setOpen(false)}>
                      Danh sách tin đăng
                    </Link>
                  </div>
                )}
            </div>
          ))}
        </nav>
        <div className={styles.account}>
          <strong>{user.fullName}</strong>
          <small>
            {user.canManageContent
              ? "Quản trị nội dung"
              : user.canUpdate
                ? "Cán bộ tư vấn"
                : "Chỉ xem tư vấn"}
          </small>
          <button disabled={busy} onClick={() => void logout()}>
            <LogOut size={17} />
            Đăng xuất
          </button>
        </div>
      </aside>
      <div className={styles.content}>
        <header className={styles.topbar}>
          <span>
            VIỆN SAU ĐẠI HỌC <b>/ CMS</b>
          </span>
          <a
            href={
              process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000/vi"
            }
            target="_blank"
            rel="noreferrer"
          >
            Xem website ↗
          </a>
        </header>
        {error && <p role="alert">{error}</p>}
        <div className={`restoredCms ${styles.screen}`}>
          <Suspense fallback={<p role="status">Đang tải…</p>}>
            {section === "consultations" ? (
              <ConsultationWorkspace
                canUpdate={user.canUpdate}
                canAssign={user.canManageContent}
              />
            ) : section !== "dashboard" && !user.canManageContent ? (
              <section>
                <h1>Quản lý nội dung</h1>
                <p>
                  Tài khoản này không có quyền quản lý tin tức và tài nguyên.
                </p>
              </section>
            ) : section === "news" && pathname.endsWith("/create") ? (
              <NewsEditor authorName={user.fullName} />
            ) : (
              <LoadedScreen key={section} section={section} user={user} />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
type ScreenData = {
  dashboard?: DashboardData;
  posts?: NewsPostItem[];
  resources?: ComponentProps<typeof ResourceManager>;
};
function LoadedScreen({ section, user }: { section: string; user: User }) {
  const [data, setData] = useState<ScreenData | null>(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const refresh = () => setRetry((v) => v + 1);
    window.addEventListener("cms:changed", refresh);
    return () => window.removeEventListener("cms:changed", refresh);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        if (section === "dashboard")
          setData({
            dashboard: await adminApi<DashboardData>(
              "dashboard",
              "GET",
              undefined,
              controller.signal,
            ),
          });
        else if (section === "news") {
          const all: NewsPostItem[] = [];
          let page = 1,
            total = 0;
          do {
            const result = await adminApi<{
              posts: NewsPostItem[];
              pagination: { total: number };
            }>(
              `news?page=${page++}&limit=1000`,
              "GET",
              undefined,
              controller.signal,
            );
            all.push(...result.posts);
            total = result.pagination.total;
          } while (all.length < total);
          setData({ posts: all });
        } else {
          const [r, c] = await Promise.all([
            adminApi<{
              resources: ComponentProps<typeof ResourceManager>["resources"];
              pagination: { total: number };
            }>("resources?limit=10", "GET", undefined, controller.signal),
            adminApi<{
              categories: ComponentProps<typeof ResourceManager>["categories"];
            }>("resource-categories", "GET", undefined, controller.signal),
          ]);
          setData({
            resources: {
              resources: r.resources,
              categories: c.categories,
              total: r.pagination.total,
            },
          });
        }
        setError("");
      } catch (e) {
        if (!controller.signal.aborted)
          setError(e instanceof Error ? e.message : "Không thể tải dữ liệu.");
      }
    }
    void load();
    return () => controller.abort();
  }, [section, retry]);
  if (error)
    return (
      <p role="alert">
        {error} <button onClick={() => setRetry((v) => v + 1)}>Thử lại</button>
      </p>
    );
  if (!data) return <p role="status">Đang tải dữ liệu…</p>;
  if (data.dashboard)
    return (
      <RealtimeDashboard
        initialData={data.dashboard}
        admin={{
          fullName: user.fullName,
          role: {
            name: user.canManageContent ? "Quản trị nội dung" : "Cán bộ tư vấn",
            code: user.canManageContent ? "ADMIN" : "CONSULTANT",
          },
        }}
      />
    );
  if (data.posts) return <NewsList posts={data.posts} />;
  if (data.resources) return <><header><h1>Quản lý tài nguyên</h1><p>Quản lý tài liệu, danh mục và phiên bản công khai trên website.</p></header><ResourceManager {...data.resources} /></>;
  return null;
}
