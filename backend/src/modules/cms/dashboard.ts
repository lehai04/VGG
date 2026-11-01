import { z } from "zod";
import { prisma } from "../../shared/database/prisma.js";
const DAY = 86_400_000;
const today = () =>
  new Date(Date.now() + 7 * 3600000).toISOString().slice(0, 10);
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((v) => !Number.isNaN(new Date(v).getTime()));
function range(from: string, to: string) {
  const start = new Date(`${from}T00:00:00+07:00`),
    end = new Date(new Date(`${to}T00:00:00+07:00`).getTime() + DAY);
  if (end <= start || end.getTime() - start.getTime() > 3660 * DAY)
    throw Object.assign(new Error("Khoảng ngày không hợp lệ."), {
      statusCode: 400,
    });
  return {
    start,
    end,
    previous: new Date(start.getTime() - (end.getTime() - start.getTime())),
  };
}
export async function dashboardData(raw: unknown) {
  const q = z
    .object({
      from: date.default(() =>
        new Date(Date.now() - 6 * DAY + 7 * 3600000).toISOString().slice(0, 10),
      ),
      to: date.default(today),
      consultationFrom: date.optional(),
      consultationTo: date.optional(),
      consultationPreset: z.string().max(30).optional(),
    })
    .parse(raw);
  const v = range(q.from, q.to),
    c = range(q.consultationFrom ?? q.from, q.consultationTo ?? q.to);
  const [
    staff,
    visits,
    consultations,
    visitsInPeriod,
    visitsInPrev,
    consultationPeriodTotal,
    consultationPrevTotal,
    publishedNews,
    publishedResources,
    statuses,
    roles,
    visitRows,
    consultationRows,
    history,
    revisions,
  ] = await Promise.all([
    prisma.consultationStaff.count({ where: { disabled: false } }),
    prisma.pageVisit.count(),
    prisma.consultation.count(),
    prisma.pageVisit.count({
      where: { createdAt: { gte: v.start, lt: v.end } },
    }),
    prisma.pageVisit.count({
      where: { createdAt: { gte: v.previous, lt: v.start } },
    }),
    prisma.consultation.count({
      where: { createdAt: { gte: c.start, lt: c.end } },
    }),
    prisma.consultation.count({
      where: { createdAt: { gte: c.previous, lt: c.start } },
    }),
    prisma.newsPost.count({
      where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
    }),
    prisma.resourceFile.count({ where: { status: "PUBLISHED" } }),
    prisma.consultation.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.consultationStaff.groupBy({
      by: ["canManageContent", "canUpdate"],
      where: { disabled: false },
      _count: { id: true },
    }),
    prisma.$queryRaw<
      { day_key: string; count: bigint }[]
    >`SELECT to_char(created_at + interval '7 hours','YYYY-MM-DD') AS day_key, count(*) count FROM page_visits WHERE created_at >= ${v.start} AND created_at < ${v.end} GROUP BY 1 ORDER BY 1`,
    prisma.$queryRaw<
      { day_key: string; count: bigint }[]
    >`SELECT to_char(created_at + interval '7 hours','YYYY-MM-DD') AS day_key, count(*) count FROM consultations WHERE created_at >= ${c.start} AND created_at < ${c.end} GROUP BY 1 ORDER BY 1`,
    prisma.consultationHistory.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, action: true, createdAt: true, metadata: true },
    }),
    prisma.cmsRevision.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        action: true,
        actorName: true,
        entityType: true,
        createdAt: true,
      },
    }),
  ]);
  const series = (
    rows: { day_key: string; count: bigint }[],
    start: Date,
    end: Date,
  ) => {
    const counts = new Map(rows.map((row) => [row.day_key, Number(row.count)]));
    const points = [];
    for (let n = start.getTime(); n < end.getTime(); n += DAY) {
      const day = new Date(n + 7 * 3600000).toISOString().slice(0, 10);
      points.push({ date: day, count: counts.get(day) || 0 });
    }
    return points;
  };
  const growth = (current: number, prev: number) =>
    prev
      ? Math.round(((current - prev) / prev) * 1000) / 10
      : current
        ? 100
        : 0;
  const byStatus = new Map(statuses.map((row) => [row.status, row._count.id]));
  return {
    totals: {
      staff,
      visits,
      consultations,
      visitsInPeriod,
      visitsInPrev,
      visitDelta: visitsInPeriod - visitsInPrev,
      visitGrowthRate: growth(visitsInPeriod, visitsInPrev),
      consultationPeriodTotal,
      consultationPrevTotal,
      consultationDelta: consultationPeriodTotal - consultationPrevTotal,
      consultationGrowthRate: growth(
        consultationPeriodTotal,
        consultationPrevTotal,
      ),
      publishedNews,
      publishedResources,
      publishedContent: publishedNews + publishedResources,
    },
    consultationStatusBreakdown: {
      pending: byStatus.get("NEW") || 0,
      confirmed:
        (byStatus.get("RECEIVED") || 0) + (byStatus.get("CONTACTING") || 0),
      completed:
        (byStatus.get("CONSULTED") || 0) + (byStatus.get("COMPLETED") || 0),
      cancelled: byStatus.get("CANCELLED") || 0,
      total: consultations,
    },
    staffRoleBreakdown: roles.map((row) => ({
      name: row.canManageContent
        ? "Quản trị nội dung"
        : row.canUpdate
          ? "Cán bộ tư vấn"
          : "Chỉ xem",
      code: row.canManageContent
        ? "CONTENT_ADMIN"
        : row.canUpdate
          ? "CONSULTANT"
          : "VIEWER",
      count: row._count.id,
      pct: staff ? ((row._count.id / staff) * 100).toFixed(1) : "0",
      color: row.canManageContent
        ? "#d7193f"
        : row.canUpdate
          ? "#3456a3"
          : "#8b95a8",
    })),
    recentActivities: [
      ...history.map((row) => ({
        id: row.id,
        action: row.action,
        actorName:
          (row.metadata as { actorName?: string } | null)?.actorName ||
          "Website",
        targetType: "consultation",
        createdAt: row.createdAt,
      })),
      ...revisions.map((row) => ({
        id: row.id,
        action: row.action,
        actorName: row.actorName,
        targetType: row.entityType,
        createdAt: row.createdAt,
      })),
    ]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 8),
    visitSeries: series(visitRows, v.start, v.end),
    consultationSeries: series(consultationRows, c.start, c.end),
    updatedAt: new Date().toISOString(),
  };
}
