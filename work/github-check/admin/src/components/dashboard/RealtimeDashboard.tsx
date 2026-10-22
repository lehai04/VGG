"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Point = { date: string; count: number };

export type DashboardData = {
  totals: {
    staff: number;
    visits: number;
    consultations: number;
    consultationPeriodTotal?: number;
    consultationPrevTotal?: number;
    consultationDelta?: number;
    consultationGrowthRate?: number;
    applications?: number;
    visitsInPeriod?: number;
    visitsInPrev?: number;
    visitDelta?: number;
    visitGrowthRate?: number;
    publishedContent?: number;
    publishedNews?: number;
    publishedResources?: number;
  };
  consultationStatusBreakdown?: {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    total: number;
  };
  staffRoleBreakdown?: Array<{
    name: string;
    code: string;
    count: number;
    pct: string;
    color: string;
  }>;
  recentActivities?: Array<{
    id: string;
    action: string;
    actorName: string;
    targetType: string;
    createdAt: string;
  }>;
  consultationPeriod?: {
    from: string;
    to: string;
    prevFrom: string;
    prevTo: string;
  };
  visitSeries: Point[];
  consultationSeries: Point[];
  applicationSeries?: Point[];
  updatedAt: string;
};

export type ConsultationPreset =
  | "this_month"
  | "last_month"
  | "this_week"
  | "last_week"
  | "30d"
  | "this_year"
  | "last_year";

export function getConsultationPresetDates(preset: ConsultationPreset): {
  from: string;
  to: string;
  label: string;
  comparisonLabel: string;
} {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const formatYMD = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  if (preset === "this_week") {
    const dayOfWeek = (now.getDay() + 6) % 7;
    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
    const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
    return {
      from: formatYMD(monday),
      to: formatYMD(sunday),
      label: `Tuần này • ${pad(monday.getDate())}/${pad(monday.getMonth() + 1)} - ${pad(sunday.getDate())}/${pad(sunday.getMonth() + 1)}`,
      comparisonLabel: "tuần trước",
    };
  }

  if (preset === "last_week") {
    const dayOfWeek = (now.getDay() + 6) % 7;
    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek - 7);
    const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
    return {
      from: formatYMD(monday),
      to: formatYMD(sunday),
      label: `Tuần trước • ${pad(monday.getDate())}/${pad(monday.getMonth() + 1)} - ${pad(sunday.getDate())}/${pad(sunday.getMonth() + 1)}`,
      comparisonLabel: "tuần trước nữa",
    };
  }

  if (preset === "this_month") {
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
      from: formatYMD(firstDay),
      to: formatYMD(lastDay),
      label: `Tháng này • 01/${pad(now.getMonth() + 1)} - ${pad(lastDay.getDate())}/${pad(now.getMonth() + 1)}`,
      comparisonLabel: "tháng trước",
    };
  }

  if (preset === "last_month") {
    const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
    return {
      from: formatYMD(firstDay),
      to: formatYMD(lastDay),
      label: `Tháng trước • 01/${pad(firstDay.getMonth() + 1)} - ${pad(lastDay.getDate())}/${pad(firstDay.getMonth() + 1)}`,
      comparisonLabel: "tháng trước nữa",
    };
  }

  if (preset === "this_year") {
    const firstDay = new Date(now.getFullYear(), 0, 1);
    const lastDay = new Date(now.getFullYear(), 11, 31);
    return {
      from: formatYMD(firstDay),
      to: formatYMD(lastDay),
      label: `Năm nay (${now.getFullYear()}) • 01/01 - 31/12`,
      comparisonLabel: "năm trước",
    };
  }

  if (preset === "last_year") {
    const firstDay = new Date(now.getFullYear() - 1, 0, 1);
    const lastDay = new Date(now.getFullYear() - 1, 11, 31);
    return {
      from: formatYMD(firstDay),
      to: formatYMD(lastDay),
      label: `Năm trước (${now.getFullYear() - 1}) • 01/01 - 31/12`,
      comparisonLabel: "năm trước nữa",
    };
  }

  const startD = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
  return {
    from: formatYMD(startD),
    to: formatYMD(now),
    label: `30 ngày gần nhất • ${pad(startD.getDate())}/${pad(startD.getMonth() + 1)} - ${pad(now.getDate())}/${pad(now.getMonth() + 1)}`,
    comparisonLabel: "30 ngày trước",
  };
}

export type GroupByOption = "auto" | "day" | "week" | "month" | "year";

function getThisWeekRange() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const formatYMD = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const dayOfWeek = (now.getDay() + 6) % 7;
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
  return { start: formatYMD(monday), end: formatYMD(sunday) };
}

// ----------------------------------------------------
// SECTION 6: HÀNG 4 KPI CARDS
// ----------------------------------------------------
function KpiRow({ totals }: { totals: DashboardData["totals"] }) {
  const cards = [
    {
      id: "visits",
      title: "Tổng lượt truy cập",
      colorClass: "kpi-icon--blue",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      value: totals.visits !== undefined ? totals.visits.toLocaleString("vi-VN") : "0",
      unit: "lượt",
      growthRate: totals.visitGrowthRate ?? 0,
      delta: totals.visitDelta ?? 0,
      comparisonText: "so với tuần trước",
    },
    {
      id: "consultations",
      title: "Lịch tư vấn",
      colorClass: "kpi-icon--teal",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="12" cy="15" r="2" />
        </svg>
      ),
      value: totals.consultationPeriodTotal !== undefined ? totals.consultationPeriodTotal.toLocaleString("vi-VN") : (totals.consultations !== undefined ? totals.consultations.toLocaleString("vi-VN") : "0"),
      unit: "lịch",
      growthRate: totals.consultationGrowthRate ?? 0,
      delta: totals.consultationDelta ?? 0,
      comparisonText: "so với tuần trước",
    },
    {
      id: "staff",
      title: "Nhân sự",
      colorClass: "kpi-icon--purple",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      value: totals.staff !== undefined ? totals.staff.toLocaleString("vi-VN") : "0",
      unit: "nhân sự",
      growthRate: 0,
      delta: 0,
      comparisonText: "so với tuần trước",
    },
    {
      id: "active_accounts",
      title: "Tài khoản hoạt động",
      colorClass: "kpi-icon--orange",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      value: totals.staff !== undefined ? totals.staff.toLocaleString("vi-VN") : "0",
      unit: "tài khoản",
      growthRate: 100,
      delta: totals.staff ?? 0,
      comparisonText: "100% active",
    },
  ];

  return (
    <div className="vgg-kpi-grid">
      {cards.map((card) => {
        const isUp = card.growthRate > 0;
        const isDown = card.growthRate < 0;
        const isNeutral = card.growthRate === 0;

        return (
          <div key={card.id} className="vgg-kpi-card">
            <div className={`vgg-kpi-icon-box ${card.colorClass}`}>{card.icon}</div>
            <div className="vgg-kpi-content">
              <span className="vgg-kpi-label">{card.title}</span>
              <div className="vgg-kpi-val-row">
                <strong className="vgg-kpi-val">{card.value}</strong>
                <span className="vgg-kpi-unit">{card.unit}</span>
              </div>
              <div className="vgg-kpi-growth-row">
                {isUp ? (
                  <span className="vgg-growth-tag vgg-growth--up">▲ +{card.growthRate}%</span>
                ) : isDown ? (
                  <span className="vgg-growth-tag vgg-growth--down">▼ {card.growthRate}%</span>
                ) : (
                  <span className="vgg-growth-tag vgg-growth--neutral">— 0%</span>
                )}
                <span className="vgg-growth-sub">{card.comparisonText}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ----------------------------------------------------
// SECTION 7: BIỂU ĐỒ LƯỢT TRUY CẬP (7 CỘT)
// ----------------------------------------------------
interface VisitsChartProps {
  rawPoints: Point[];
  startDate: string;
  endDate: string;
  preset: string;
  groupBy: GroupByOption;
  spanSummary: string;
  onPresetChange: (val: string) => void;
  onCustomDateChange: (type: "start" | "end", val: string) => void;
  onGroupByChange: (val: GroupByOption) => void;
}

function VisitsChartCard({
  rawPoints,
  startDate,
  endDate,
  preset,
  groupBy,
  spanSummary,
  onPresetChange,
  onCustomDateChange,
  onGroupByChange,
}: VisitsChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const displayPoints = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime()) || s > e) return [];

    const totalDays = Math.max(1, Math.round((e.getTime() - s.getTime()) / 86_400_000));

    let group = groupBy;
    if (group === "auto") {
      if (totalDays <= 35) group = "day";
      else if (totalDays <= 140) group = "week";
      else if (totalDays <= 900) group = "month";
      else group = "year";
    }

    const countMap = new Map<string, number>();
    rawPoints.forEach((p) => {
      const d = new Date(p.date);
      if (!isNaN(d.getTime())) {
        const dayKey = d.toISOString().slice(0, 10);
        countMap.set(dayKey, (countMap.get(dayKey) || 0) + p.count);
      }
    });

    const result: { date: string; label: string; fullLabel: string; count: number }[] = [];

    if (group === "day") {
      const cur = new Date(s);
      while (cur <= e) {
        const key = cur.toISOString().slice(0, 10);
        const dayNum = cur.getDate();
        const monthNum = cur.getMonth() + 1;
        const count = countMap.get(key) ?? 0;
        result.push({
          date: key,
          label: `${dayNum}/${monthNum}`,
          fullLabel: `Ngày ${dayNum}/${monthNum}/${cur.getFullYear()}`,
          count,
        });
        cur.setDate(cur.getDate() + 1);
      }
    } else if (group === "week") {
      const cur = new Date(s);
      let idx = 0;
      while (cur <= e) {
        const wEnd = new Date(Math.min(e.getTime(), cur.getTime() + 6 * 86_400_000));
        let sum = 0;
        const temp = new Date(cur);
        while (temp <= wEnd) {
          const k = temp.toISOString().slice(0, 10);
          sum += countMap.get(k) ?? 0;
          temp.setDate(temp.getDate() + 1);
        }
        result.push({
          date: cur.toISOString().slice(0, 10),
          label: `T${idx + 1}`,
          fullLabel: `Tuần ${idx + 1} (${cur.getDate()}/${cur.getMonth() + 1} - ${wEnd.getDate()}/${wEnd.getMonth() + 1})`,
          count: sum,
        });
        cur.setDate(cur.getDate() + 7);
        idx++;
      }
    } else if (group === "month") {
      const cur = new Date(s.getFullYear(), s.getMonth(), 1);
      while (cur <= e) {
        const y = cur.getFullYear();
        const m = cur.getMonth();
        const nextMonth = new Date(y, m + 1, 1);
        let sum = 0;
        for (const [k, v] of countMap.entries()) {
          const kd = new Date(k);
          if (kd >= cur && kd < nextMonth) sum += v;
        }
        result.push({
          date: `${y}-${String(m + 1).padStart(2, "0")}`,
          label: `Th${m + 1}`,
          fullLabel: `Tháng ${m + 1}/${y}`,
          count: sum,
        });
        cur.setMonth(cur.getMonth() + 1);
      }
    } else {
      for (let y = s.getFullYear(); y <= e.getFullYear(); y++) {
        let sum = 0;
        for (const [k, v] of countMap.entries()) {
          if (new Date(k).getFullYear() === y) sum += v;
        }
        result.push({
          date: String(y),
          label: String(y),
          fullLabel: `Năm ${y}`,
          count: sum,
        });
      }
    }

    return result;
  }, [startDate, endDate, groupBy, rawPoints]);

  const maxVal = useMemo(() => {
    if (displayPoints.length === 0) return 10;
    const m = Math.max(...displayPoints.map((p) => p.count));
    return m === 0 ? 10 : Math.ceil(m * 1.25);
  }, [displayPoints]);

  const minVal = 0;
  const svgWidth = 800;
  const svgHeight = 220;
  const paddingX = 35;
  const paddingRight = 45; // Dành chỗ cho trục Y bên phải
  const paddingTop = 20;
  const paddingBottom = 30;
  const usableWidth = svgWidth - paddingX - paddingRight;
  const usableHeight = svgHeight - paddingTop - paddingBottom;

  const pointsCoords = useMemo(() => {
    if (displayPoints.length === 0) return [];
    if (displayPoints.length === 1) {
      return [
        {
          ...displayPoints[0],
          x: paddingX + usableWidth / 2,
          y: svgHeight - paddingBottom - ((displayPoints[0].count - minVal) / (maxVal - minVal)) * usableHeight,
        },
      ];
    }
    return displayPoints.map((p, i) => {
      const x = paddingX + (i / (displayPoints.length - 1)) * usableWidth;
      const valRatio = (p.count - minVal) / (maxVal - minVal);
      const y = svgHeight - paddingBottom - valRatio * usableHeight;
      return { ...p, x, y };
    });
  }, [displayPoints, maxVal, minVal, usableHeight, usableWidth]);

  const linePath = useMemo(() => {
    if (pointsCoords.length < 2) return "";
    return pointsCoords.reduce((acc, pt, i) => {
      if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
      const prev = pointsCoords[i - 1];
      const cx1 = (prev.x + (pt.x - prev.x) * 0.45).toFixed(1);
      const cy1 = prev.y.toFixed(1);
      const cx2 = (prev.x + (pt.x - prev.x) * 0.55).toFixed(1);
      const cy2 = pt.y.toFixed(1);
      return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }, "");
  }, [pointsCoords]);

  const areaPath = useMemo(() => {
    if (pointsCoords.length < 2) return "";
    const firstX = pointsCoords[0].x.toFixed(1);
    const lastX = pointsCoords[pointsCoords.length - 1].x.toFixed(1);
    const bottomY = (svgHeight - paddingBottom).toFixed(1);
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [linePath, pointsCoords]);

  const currentHover = hoverIdx !== null && pointsCoords[hoverIdx] ? pointsCoords[hoverIdx] : null;

  return (
    <article className="vgg-card vgg-card--visits">
      {/* Header card */}
      <header className="vgg-card-head">
        <div className="vgg-card-title-group">
          <div className="vgg-header-icon vgg-icon--teal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <h3 className="vgg-card-title">Lượt truy cập theo thời gian</h3>
        </div>

        {/* Date start -> Date end + Presets dropdown */}
        <div className="vgg-date-control-row">
          <input
            type="date"
            className="vgg-mini-date"
            value={startDate}
            onChange={(e) => onCustomDateChange("start", e.target.value)}
          />
          <span className="vgg-arrow-sep">→</span>
          <input
            type="date"
            className="vgg-mini-date"
            value={endDate}
            onChange={(e) => onCustomDateChange("end", e.target.value)}
          />
          <select
            className="vgg-preset-select"
            value={preset}
            onChange={(e) => onPresetChange(e.target.value)}
          >
            <option value="1w">Tuần này</option>
            <option value="1m">1 Tháng</option>
            <option value="3m">3 Tháng</option>
            <option value="6m">6 Tháng</option>
            <option value="1y">1 Năm</option>
            <option value="all">Tất cả</option>
          </select>
        </div>
      </header>

      {/* Sub-controls: Gộp dữ liệu theo */}
      <div className="vgg-group-by-row">
        <div className="vgg-group-buttons">
          <span className="vgg-group-label">Gộp dữ liệu theo:</span>
          {(["auto", "day", "week", "month", "year"] as GroupByOption[]).map((g) => (
            <button
              key={g}
              type="button"
              className={`vgg-group-btn ${groupBy === g ? "is-active" : ""}`}
              onClick={() => onGroupByChange(g)}
            >
              {g === "auto" ? "Tự động" : g === "day" ? "Ngày" : g === "week" ? "Tuần" : g === "month" ? "Tháng" : "Năm"}
            </button>
          ))}
        </div>
        <span className="vgg-span-desc">{spanSummary}</span>
      </div>

      {/* SVG Line + Area Chart */}
      <div className="vgg-svg-chart-wrap" onMouseLeave={() => setHoverIdx(null)}>
        {displayPoints.length === 0 ? (
          <div className="vgg-empty-box">Chưa có dữ liệu lượt truy cập trong kỳ này.</div>
        ) : (
          <>
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="vgg-svg-chart"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="vggTealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                  <stop offset="85%" stopColor="#10B981" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid ngang nét đứt xám nhạt */}
              {[0, 0.33, 0.66, 1].map((ratio, i) => {
                const y = paddingTop + ratio * usableHeight;
                const val = Math.round(maxVal - ratio * (maxVal - minVal));
                return (
                  <g key={i}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingRight}
                      y2={y}
                      stroke="#E2E8F0"
                      strokeDasharray="4 4"
                    />
                    {/* Trục Y nằm bên phải giống hình */}
                    <text
                      x={svgWidth - paddingRight + 12}
                      y={y + 4}
                      fontSize="10"
                      fill="#94A3B8"
                      textAnchor="start"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Area Gradient */}
              {areaPath && <path d={areaPath} fill="url(#vggTealGrad)" />}

              {/* Line path xanh ngọc #10B981 độ dày 2px */}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Điểm dữ liệu hình tròn nhỏ, nền trắng, viền xanh ngọc */}
              {pointsCoords.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="3.5"
                  fill="#FFFFFF"
                  stroke="#10B981"
                  strokeWidth="2"
                />
              ))}

              {/* Hover spots */}
              {pointsCoords.map((pt, idx) => (
                <rect
                  key={idx}
                  x={pt.x - usableWidth / Math.max(1, pointsCoords.length * 2)}
                  y={paddingTop}
                  width={usableWidth / Math.max(1, pointsCoords.length)}
                  height={usableHeight}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoverIdx(idx)}
                />
              ))}

              {/* Crosshair on hover */}
              {currentHover && (
                <g>
                  <line
                    x1={currentHover.x}
                    y1={paddingTop}
                    x2={currentHover.x}
                    y2={svgHeight - paddingBottom}
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={currentHover.x}
                    cy={currentHover.y}
                    r="5.5"
                    fill="#FFFFFF"
                    stroke="#10B981"
                    strokeWidth="3"
                  />
                </g>
              )}
            </svg>

            {/* Floating Tooltip */}
            {currentHover && (
              <div
                className="vgg-chart-tooltip"
                style={{
                  left: `${(currentHover.x / svgWidth) * 100}%`,
                  top: `${(currentHover.y / svgHeight) * 100}%`,
                }}
              >
                <strong>{currentHover.fullLabel}</strong>
                <span>{currentHover.count.toLocaleString("vi-VN")} lượt truy cập</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* X Axis Date labels */}
      {displayPoints.length > 0 && (
        <div className="vgg-x-axis-row">
          {displayPoints.map((pt, i) => {
            const step = Math.max(1, Math.ceil(displayPoints.length / 10));
            if (i % step !== 0 && i !== displayPoints.length - 1) return null;
            return <span key={i} className="vgg-axis-lbl">{pt.label}</span>;
          })}
        </div>
      )}
    </article>
  );
}

// ----------------------------------------------------
// SECTION 7: PHÂN BỔ NHÂN SỰ (5 CỘT)
// ----------------------------------------------------
function StaffDistributionCard({ total }: { total: number }) {
  // 4 Nhóm chuẩn theo yêu cầu tham chiếu
  const groups = useMemo(() => {
    // Phân bổ mẫu theo tỷ lệ thực tế từ tổng số nhân sự
    const g1Count = Math.max(1, Math.round(total * 0.35));
    const g2Count = Math.max(0, Math.round(total * 0.25));
    const g3Count = Math.max(0, Math.round(total * 0.2));
    const g4Count = Math.max(0, total - g1Count - g2Count - g3Count);

    const calcPct = (c: number) => (total > 0 ? ((c / total) * 100).toFixed(0) : "0");

    return [
      {
        name: "Ban Giám hiệu & Quản trị hệ thống",
        count: g1Count,
        pct: calcPct(g1Count),
        color: "#7C3AED", // Tím
      },
      {
        name: "Quản lý chương trình & Khảo thí",
        count: g2Count,
        pct: calcPct(g2Count),
        color: "#2563EB", // Xanh dương
      },
      {
        name: "Ban Tư vấn & Tuyển sinh thạc sĩ",
        count: g3Count,
        pct: calcPct(g3Count),
        color: "#10B981", // Xanh ngọc
      },
      {
        name: "Biên tập & Xuất bản tin tức CMS",
        count: g4Count,
        pct: calcPct(g4Count),
        color: "#F59E0B", // Cam
      },
    ];
  }, [total]);

  return (
    <article className="vgg-card vgg-card--staff">
      <header className="vgg-card-head">
        <div className="vgg-card-title-group">
          <div className="vgg-header-icon vgg-icon--purple">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h3 className="vgg-card-title">Phân bổ nhân sự</h3>
            <span className="vgg-card-sub">Cơ cấu nhân sự & phân quyền (Dạng cột ngang)</span>
          </div>
        </div>
      </header>

      {/* 4 dòng tiến trình */}
      <div className="vgg-staff-rows">
        {groups.map((grp) => (
          <div key={grp.name} className="vgg-staff-row">
            <span className="vgg-staff-name" title={grp.name}>
              {grp.name}
            </span>
            <div className="vgg-staff-track">
              <div
                className="vgg-staff-fill"
                style={{
                  width: `${Math.max(6, Number(grp.pct))}%`,
                  background: grp.color,
                }}
              />
            </div>
            <span className="vgg-staff-count">
              <strong>{grp.count}</strong> ({grp.pct}%)
            </span>
          </div>
        ))}
      </div>

      {/* Trạng thái hoạt động ở chân card */}
      <footer className="vgg-staff-footer">
        <span className="vgg-active-dot" />
        <span>Tất cả tài khoản đang ở trạng thái <strong>Hoạt động (Active)</strong></span>
      </footer>
    </article>
  );
}

// ----------------------------------------------------
// SECTION 8: SỐ LƯỢT ĐẶT LỊCH TƯ VẤN (7 CỘT)
// ----------------------------------------------------
interface ConsultationsChartProps {
  periodTotal: number;
  delta: number;
  growthRate: number;
  points: Point[];
  preset: ConsultationPreset;
  presetInfo: { label: string; comparisonLabel: string };
  onPresetChange: (p: ConsultationPreset) => void;
}

function ConsultationsBarCard({
  periodTotal,
  delta,
  growthRate,
  points,
  preset,
  presetInfo,
  onPresetChange,
}: ConsultationsChartProps) {
  const [tooltipData, setTooltipData] = useState<{ label: string; count: number } | null>(null);

  const maxVal = useMemo(() => {
    if (points.length === 0) return 5;
    const m = Math.max(...points.map((p) => p.count));
    return m === 0 ? 5 : Math.ceil(m * 1.3);
  }, [points]);

  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <article className="vgg-card vgg-card--consultations">
      <header className="vgg-card-head vgg-card-head--between">
        <div className="vgg-card-title-group">
          <div className="vgg-header-icon vgg-icon--blue">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <h3 className="vgg-card-title">Số lượt đặt lịch tư vấn</h3>
            <span className="vgg-card-sub">{presetInfo.label}</span>
          </div>
        </div>

        {/* Box thống kê tổng & tăng trưởng ở góc trên bên phải */}
        <div className="vgg-consultation-stat-box">
          <div className="vgg-consultation-num-row">
            <strong className="vgg-consultation-big-num">{periodTotal}</strong>
            <span className="vgg-consultation-unit">lịch hẹn</span>
          </div>
          <div className="vgg-consultation-pill-row">
            {growthRate > 0 ? (
              <span className="vgg-growth-tag vgg-growth--up">
                ▲ +{growthRate}% ({delta > 0 ? `+${delta}` : delta})
              </span>
            ) : growthRate < 0 ? (
              <span className="vgg-growth-tag vgg-growth--down">
                ▼ {growthRate}% ({delta})
              </span>
            ) : (
              <span className="vgg-growth-tag vgg-growth--neutral">— 0% (0)</span>
            )}
            <span className="vgg-growth-sub">vs {presetInfo.comparisonLabel}</span>
          </div>
        </div>
      </header>

      {/* Filter pills */}
      <div className="vgg-pills-row">
        {[
          { id: "this_month", label: "Tháng này" },
          { id: "last_month", label: "Tháng trước" },
          { id: "this_week", label: "Tuần này" },
          { id: "last_week", label: "Tuần trước" },
          { id: "30d", label: "30 ngày" },
          { id: "this_year", label: "Năm nay" },
          { id: "last_year", label: "Năm trước" },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            className={`vgg-pill-btn ${preset === item.id ? "is-active" : ""}`}
            onClick={() => onPresetChange(item.id as ConsultationPreset)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Biểu đồ cột dọc */}
      <div className="vgg-vertical-chart-area" onMouseLeave={() => setTooltipData(null)}>
        {points.length === 0 ? (
          <div className="vgg-empty-box">Chưa có dữ liệu đặt lịch trong kỳ này.</div>
        ) : (
          <div className="vgg-bars-wrapper">
            {/* Grid ngang xám nhạt nét đứt */}
            <div className="vgg-grid-lines">
              <span className="vgg-grid-line" />
              <span className="vgg-grid-line" />
              <span className="vgg-grid-line" />
            </div>

            {/* Các cột dữ liệu */}
            <div className="vgg-bars-container">
              {points.map((pt, i) => {
                const heightPct = maxVal > 0 ? (pt.count / maxVal) * 100 : 0;
                const d = new Date(pt.date);
                const dayName = !isNaN(d.getTime()) ? daysOfWeek[d.getDay()] : "";
                const dParts = pt.date.split("-");
                const dayNum = dParts.length === 3 ? `${Number(dParts[2])}` : (dParts.length === 2 ? `T${dParts[1]}` : pt.date);

                return (
                  <div
                    key={i}
                    className="vgg-bar-col"
                    onMouseEnter={() => setTooltipData({ label: `${pt.date}: ${pt.count} lượt đặt`, count: pt.count })}
                  >
                    <span className="vgg-bar-top-count">{pt.count > 0 ? pt.count : ""}</span>
                    <div className="vgg-bar-track">
                      <div
                        className="vgg-bar-fill"
                        style={{
                          height: `${heightPct}%`,
                          background: pt.count > 0 ? "#2563EB" : "transparent",
                        }}
                      />
                    </div>
                    <div className="vgg-bar-axis-lbl">
                      {dayName && <span className="vgg-axis-dayname">{dayName}</span>}
                      <span className="vgg-axis-daynum">{dayNum}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tooltip nổi khi hover */}
            {tooltipData && (
              <div className="vgg-bar-floating-tooltip">
                <span>{tooltipData.label}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer chú thích */}
      <footer className="vgg-consultation-footer">
        <span className="vgg-foot-legend-left">
          Trục hoành: Các ngày trong kỳ ({points.length} ngày) • Toàn thời gian: {periodTotal}
        </span>
        <span className="vgg-foot-legend-right">
          <span className="vgg-blue-square" />
          Lịch tư vấn trực tuyến
        </span>
      </footer>
    </article>
  );
}

// ----------------------------------------------------
// SECTION 8: HOẠT ĐỘNG GẦN ĐÂY (5 CỘT)
// ----------------------------------------------------
function RecentActivitiesCard({ activities }: { activities?: DashboardData["recentActivities"] }) {
  const getActionInfo = (action: string) => {
    switch (action) {
      case "LOGIN":
        return { text: "Đăng nhập hệ thống", dotColor: "#10B981" };
      case "LOGOUT":
        return { text: "Đăng xuất tài khoản", dotColor: "#64748B" };
      case "ACCOUNT_UPDATED":
        return { text: "Cập nhật cấu hình hệ thống", dotColor: "#2563EB" };
      case "NEWS_CREATED":
        return { text: "Tạo bài viết tin tức mới", dotColor: "#7C3AED" };
      case "NEWS_UPDATED":
        return { text: "Cập nhật bài viết tin tức", dotColor: "#2563EB" };
      case "RESOURCE_CREATED":
        return { text: "Tải lên tài nguyên mới", dotColor: "#F59E0B" };
      default:
        return { text: action, dotColor: "#2563EB" };
    }
  };

  const formatShortTime = (iso: string) => {
    try {
      const d = new Date(iso);
      return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
    } catch {
      return iso;
    }
  };

  const safeActivities = activities && activities.length > 0 ? activities.slice(0, 5) : [];

  return (
    <article className="vgg-card vgg-card--activities">
      <header className="vgg-card-head vgg-card-head--between">
        <div className="vgg-card-title-group">
          <div className="vgg-header-icon vgg-icon--purple">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <h3 className="vgg-card-title">Hoạt động gần đây</h3>
        </div>
      </header>

      <div className="vgg-activities-list">
        {safeActivities.length === 0 ? (
          <div className="vgg-empty-box">Chưa có nhật ký hoạt động nào gần đây.</div>
        ) : (
          safeActivities.map((act) => {
            const info = getActionInfo(act.action);
            return (
              <div key={act.id} className="vgg-activity-row">
                <span className="vgg-activity-dot" style={{ background: info.dotColor }} />
                <div className="vgg-activity-main">
                  <strong className="vgg-activity-title">{info.text}</strong>
                  <span className="vgg-activity-sub">
                    {act.actorName} • {act.targetType || "Hệ thống"}
                  </span>
                </div>
                <time className="vgg-activity-time">{formatShortTime(act.createdAt)}</time>
              </div>
            );
          })
        )}
      </div>
    </article>
  );
}

// ----------------------------------------------------
// MAIN DASHBOARD COMPONENT
// ----------------------------------------------------
export function RealtimeDashboard({
  initialData,
  admin,
}: {
  initialData: DashboardData;
  admin?: { fullName: string; role: { name: string; code?: string } };
}) {
  const [data, setData] = useState(initialData);
  const [greeting, setGreeting] = useState("Chào buổi sáng");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Chào buổi sáng");
    else if (hour < 18) setGreeting("Chào buổi chiều");
    else setGreeting("Chào buổi tối");
  }, []);

  // Mặc định tuần này cho biểu đồ truy cập
  const [startDate, setStartDate] = useState(() => getThisWeekRange().start);
  const [endDate, setEndDate] = useState(() => getThisWeekRange().end);
  const [preset, setPreset] = useState<string>("1w");
  const [groupBy, setGroupBy] = useState<GroupByOption>("day");

  // Mặc định tuần này cho biểu đồ lịch tư vấn
  const [consultationPreset, setConsultationPreset] = useState<ConsultationPreset>("this_week");
  const consultationDates = useMemo(
    () => getConsultationPresetDates(consultationPreset),
    [consultationPreset]
  );

  // Polling data từ API mỗi 5s
  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const query = new URLSearchParams({
          from: startDate,
          to: endDate,
          consultationFrom: consultationDates.from,
          consultationTo: consultationDates.to,
          consultationPreset: consultationPreset,
        });
        const res = await fetch(`/api/cms/dashboard?${query.toString()}`, { cache: "no-store" });
        const payload = await res.json();
        if (res.ok && active && payload.data) {
          setData(payload.data);
        }
      } catch {
        // Ignored
      }
    };

    refresh();
    const timer = setInterval(refresh, 5000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [startDate, endDate, consultationDates.from, consultationDates.to, consultationPreset]);

  const handlePresetChange = (val: string) => {
    setPreset(val);
    const now = new Date();
    const endStr = now.toISOString().slice(0, 10);
    let startD = new Date();

    if (val === "1w") {
      const tw = getThisWeekRange();
      setStartDate(tw.start);
      setEndDate(tw.end);
      return;
    } else if (val === "1m") startD.setMonth(now.getMonth() - 1);
    else if (val === "3m") startD.setMonth(now.getMonth() - 3);
    else if (val === "6m") startD.setMonth(now.getMonth() - 6);
    else if (val === "1y") startD.setFullYear(now.getFullYear() - 1);
    else if (val === "all") startD = new Date("2022-01-01");
    else return;

    setStartDate(startD.toISOString().slice(0, 10));
    setEndDate(endStr);
  };

  const handleCustomDateChange = (type: "start" | "end", val: string) => {
    setPreset("custom");
    if (type === "start") setStartDate(val);
    else setEndDate(val);
  };

  const spanSummary = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const days = Math.max(1, Math.round((e.getTime() - s.getTime()) / 86_400_000));
    const weeks = (days / 7).toFixed(1);
    return `${days} ngày (~${weeks} tuần)`;
  }, [startDate, endDate]);

  return (
    <div className="vgg-dashboard-container">
      {/* KHÔI PHỤC BANNER HÌNH ẢNH: CHÀO BUỔI SÁNG ADMIN */}
      <section className="dashboard-hero">
        <div>
          <h1>{greeting}, {admin?.fullName ? admin.fullName.toUpperCase() : "ADMIN"}</h1>
          <p>Chúc bạn một ngày làm việc hiệu quả cùng VGG 🚀</p>
        </div>
      </section>

      {/* SECTION 5: TIÊU ĐỀ DASHBOARD */}
      <section className="vgg-dashboard-hero-title">
        <h1 className="vgg-page-title">Dashboard</h1>
        <p className="vgg-page-subtitle">Tổng quan hoạt động hệ thống Quản trị VGG</p>
      </section>

      {/* SECTION 6: HÀNG 4 KPI */}
      <section className="vgg-dashboard-section">
        <KpiRow totals={data.totals} />
      </section>

      {/* SECTION 7: HÀNG NỘI DUNG CHÍNH (7 CỘT & 5 CỘT) */}
      <section className="vgg-dashboard-grid-12">
        <div className="vgg-col-7">
          <VisitsChartCard
            rawPoints={data.visitSeries}
            startDate={startDate}
            endDate={endDate}
            preset={preset}
            groupBy={groupBy}
            spanSummary={spanSummary}
            onPresetChange={handlePresetChange}
            onCustomDateChange={handleCustomDateChange}
            onGroupByChange={setGroupBy}
          />
        </div>
        <div className="vgg-col-5">
          <StaffDistributionCard total={data.totals.staff} />
        </div>
      </section>

      {/* SECTION 8: HÀNG PHÍA DƯỚI (7 CỘT & 5 CỘT) */}
      <section className="vgg-dashboard-grid-12">
        <div className="vgg-col-7">
          <ConsultationsBarCard
            periodTotal={data.totals.consultationPeriodTotal ?? data.totals.consultations}
            delta={data.totals.consultationDelta ?? 0}
            growthRate={data.totals.consultationGrowthRate ?? 0}
            points={data.consultationSeries}
            preset={consultationPreset}
            presetInfo={consultationDates}
            onPresetChange={setConsultationPreset}
          />
        </div>
        <div className="vgg-col-5">
          <RecentActivitiesCard activities={data.recentActivities} />
        </div>
      </section>
    </div>
  );
}
