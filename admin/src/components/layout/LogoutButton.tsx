"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return <button className="logout-button" type="button" disabled={loading} onClick={async () => {
    setLoading(true);
    await fetch("/api/admin/auth/logout", { method: "POST" }).catch(() => undefined);
    router.replace("/admin/login");
    router.refresh();
  }}>{loading ? "Đang thoát…" : "Đăng xuất"}</button>;
}

