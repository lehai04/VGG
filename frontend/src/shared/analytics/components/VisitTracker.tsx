"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Lưu vết để ngăn React Strict Mode (chạy 2 lần trong dev) và re-render quá nhanh gửi 2 request
let lastTrackedPath = "";
let lastTrackedAt = 0;

export function VisitTracker() {
  const pathname = usePathname();
  const lastTrackedRef = useRef<string | null>(null);

  useEffect(() => {
    const now = Date.now();
    // Bỏ qua nếu route này vừa được ghi nhận trong phiên mount hoặc dưới 1.5s trước
    if (
      lastTrackedRef.current === pathname ||
      (lastTrackedPath === pathname && now - lastTrackedAt < 1500)
    ) {
      return;
    }

    lastTrackedRef.current = pathname;
    lastTrackedPath = pathname;
    lastTrackedAt = now;

    try {
      const key = "vgg_visitor_id";
      let visitorId = localStorage.getItem(key);
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem(key, visitorId);
      }

      fetch("/api/analytics/visit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          locale: pathname.split("/")[1] || "vi",
          visitorId,
        }),
        keepalive: true,
      }).catch(() => undefined);
    } catch {
      // Bỏ qua nếu môi trường client chặn localStorage
    }
  }, [pathname]);

  return null;
}

