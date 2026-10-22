import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth/session";
import { errorResponse } from "@/lib/auth/responses";
import { AuditAction } from "@prisma/client";

function formatActionText(action: string, metadata: any, targetUser?: string | null): { text: string; icon: string; category: string } {
  switch (action) {
    case "LOGIN_SUCCESS":
      return { text: "Đăng nhập hệ thống thành công", icon: "🔑", category: "auth" };
    case "LOGIN_FAILED":
      return { text: "Đăng nhập thất bại", icon: "⚠️", category: "security" };
    case "LOGOUT":
      return { text: "Đăng xuất khỏi hệ thống", icon: "🚪", category: "auth" };
    case "PASSWORD_CHANGED":
      return { text: "Thay đổi mật khẩu tài khoản", icon: "🔒", category: "security" };
    case "PASSWORD_RESET":
      return { text: "Thực hiện khôi phục / đặt lại mật khẩu", icon: "🔄", category: "security" };
    case "ACCOUNT_CREATED":
      return { text: `Tạo mới tài khoản nhân sự ${targetUser ? `(${targetUser})` : ""}`, icon: "👤", category: "users" };
    case "ACCOUNT_UPDATED":
      return { text: `Cập nhật thông tin tài khoản ${targetUser ? `(${targetUser})` : ""}`, icon: "✏️", category: "users" };
    case "ACCOUNT_DISABLED":
      return { text: `Vô hiệu hóa / khóa tài khoản ${targetUser ? `(${targetUser})` : ""}`, icon: "🚫", category: "users" };
    case "ACCOUNT_ENABLED":
      return { text: `Kích hoạt lại tài khoản ${targetUser ? `(${targetUser})` : ""}`, icon: "✅", category: "users" };
    case "ACCOUNT_DELETED":
      return { text: `Đã xóa tài khoản nhân sự ${metadata?.deletedUsername ? `(${metadata.deletedUsername})` : ""}`, icon: "🗑️", category: "users" };
    case "ROLE_CHANGED":
      return { text: `Thay đổi phân quyền vai trò cho ${targetUser ? `(${targetUser})` : ""}`, icon: "🛡️", category: "users" };
    case "NEWS_CREATED":
      return { text: `Tạo bài viết tin tức mới: "${metadata?.title || "Bài viết"}"`, icon: "📰", category: "cms" };
    case "NEWS_UPDATED":
      return { text: `Chỉnh sửa bài viết tin tức: "${metadata?.title || "Bài viết"}"`, icon: "📝", category: "cms" };
    case "NEWS_DELETED":
      return { text: `Xóa bài viết tin tức: "${metadata?.title || "Bài viết"}"`, icon: "🗑️", category: "cms" };
    case "RESOURCE_CREATED":
      return { text: `Tải lên biểu mẫu / tài nguyên mới: "${metadata?.title || "Tài liệu"}"`, icon: "📁", category: "cms" };
    case "RESOURCE_UPDATED":
      return { text: `Cập nhật tài nguyên / biểu mẫu: "${metadata?.title || "Tài liệu"}"`, icon: "📑", category: "cms" };
    case "RESOURCE_DELETED":
      return { text: `Xóa tài nguyên / biểu mẫu: "${metadata?.title || "Tài liệu"}"`, icon: "🗑️", category: "cms" };
    case "CONSULTATION_CREATED":
      return { text: `Tiếp nhận yêu cầu tư vấn mới từ thí sinh ${metadata?.fullName || ""}`, icon: "📬", category: "consultations" };
    case "CONSULTATION_UPDATED":
      return { text: `Cập nhật trạng thái xử lý đơn tư vấn #${metadata?.code || ""}`, icon: "📋", category: "consultations" };
    case "CONSULTATION_ASSIGNED":
      return { text: `Phân công cán bộ tư vấn cho đơn #${metadata?.code || ""}`, icon: "👥", category: "consultations" };
    case "CONSULTATION_NOTE_ADDED":
      return { text: `Thêm ghi chú chăm sóc đơn tư vấn #${metadata?.code || ""}`, icon: "💬", category: "consultations" };
    default:
      return { text: `Thực hiện thao tác ${action}`, icon: "🔔", category: "system" };
  }
}

const CATEGORY_ACTIONS: Record<string, AuditAction[]> = {
  users: [
    AuditAction.ACCOUNT_CREATED,
    AuditAction.ACCOUNT_UPDATED,
    AuditAction.ACCOUNT_DISABLED,
    AuditAction.ACCOUNT_ENABLED,
    AuditAction.ACCOUNT_DELETED,
    AuditAction.ROLE_CHANGED,
  ],
  cms: [
    AuditAction.NEWS_CREATED,
    AuditAction.NEWS_UPDATED,
    AuditAction.NEWS_DELETED,
    AuditAction.RESOURCE_CREATED,
    AuditAction.RESOURCE_UPDATED,
    AuditAction.RESOURCE_DELETED,
  ],
  consultations: [
    AuditAction.CONSULTATION_CREATED,
    AuditAction.CONSULTATION_UPDATED,
    AuditAction.CONSULTATION_ASSIGNED,
    AuditAction.CONSULTATION_NOTE_ADDED,
  ],
  security: [
    AuditAction.LOGIN_FAILED,
    AuditAction.PASSWORD_CHANGED,
    AuditAction.PASSWORD_RESET,
  ],
  auth: [
    AuditAction.LOGIN_SUCCESS,
    AuditAction.LOGOUT,
    AuditAction.LOGIN_FAILED,
  ],
};

export async function GET(request: NextRequest) {
  const current = await getCurrentAdmin();
  if (!current) return errorResponse("Bạn chưa đăng nhập.", 401);

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  // Nếu tìm theo ID cụ thể
  if (id) {
    const log = await prisma.auditLog.findUnique({
      where: { id },
      include: {
        actor: {
          select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            role: { select: { name: true, code: true } },
          },
        },
        target: {
          select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            role: { select: { name: true, code: true } },
          },
        },
      },
    });

    if (!log) return errorResponse("Không tìm thấy thông báo.", 404);

    const actorName = log.actor?.fullName || log.username || "Hệ thống";
    const targetName = log.target?.fullName || log.target?.username || log.username;
    const { text, icon, category } = formatActionText(log.action, log.metadata, targetName);

    return NextResponse.json({
      success: true,
      notification: {
        id: log.id,
        action: log.action,
        actorName,
        actorEmail: log.actor?.email || null,
        actorRole: log.actor?.role?.name || null,
        targetName,
        targetEmail: log.target?.email || null,
        targetRole: log.target?.role?.name || null,
        title: text,
        icon,
        category,
        createdAt: log.createdAt.toISOString(),
        ipAddress: log.ipAddress || null,
        userAgent: log.userAgent || null,
        metadata: log.metadata,
      },
    });
  }

  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "20", 10), 5), 100);
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search")?.trim() || "";

  const where: any = {};

  if (category && category !== "all" && CATEGORY_ACTIONS[category]) {
    where.action = { in: CATEGORY_ACTIONS[category] };
  }

  if (search) {
    where.OR = [
      { username: { contains: search, mode: "insensitive" } },
      { actor: { fullName: { contains: search, mode: "insensitive" } } },
      { actor: { username: { contains: search, mode: "insensitive" } } },
      { target: { fullName: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [totalCount, logs] = await Promise.all([
    prisma.auditLog.count({ where }),
    prisma.auditLog.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        actor: {
          select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            role: { select: { name: true, code: true } },
          },
        },
        target: {
          select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            role: { select: { name: true, code: true } },
          },
        },
      },
    }),
  ]);

  const notifications = logs.map((log) => {
    const actorName = log.actor?.fullName || log.username || "Hệ thống";
    const targetName = log.target?.fullName || log.target?.username || log.username;
    const { text, icon, category: itemCategory } = formatActionText(log.action, log.metadata, targetName);

    return {
      id: log.id,
      action: log.action,
      actorName,
      actorEmail: log.actor?.email || null,
      actorRole: log.actor?.role?.name || null,
      targetName,
      targetEmail: log.target?.email || null,
      targetRole: log.target?.role?.name || null,
      title: text,
      icon,
      category: itemCategory,
      createdAt: log.createdAt.toISOString(),
      ipAddress: log.ipAddress || null,
      userAgent: log.userAgent || null,
      metadata: log.metadata,
    };
  });

  return NextResponse.json({
    success: true,
    notifications,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit) || 1,
    },
    timestamp: new Date().toISOString(),
  });
}
