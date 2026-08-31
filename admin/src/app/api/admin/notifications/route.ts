import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth/session";
import { errorResponse } from "@/lib/auth/responses";

function formatActionText(action: string, metadata: any, targetUser?: string | null): { text: string; icon: string; category: string } {
  switch (action) {
    case "LOGIN_SUCCESS":
      return { text: "Đăng nhập hệ thống thành công", icon: "🔑", category: "auth" };
    case "LOGIN_FAILED":
      return { text: "Đăng nhập thất bại", icon: "⚠️", category: "auth" };
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
      return { text: `Tạo bài viết tin tức mới: "${metadata?.title || "Bài viết"}"`, icon: "📰", category: "news" };
    case "NEWS_UPDATED":
      return { text: `Chỉnh sửa bài viết tin tức: "${metadata?.title || "Bài viết"}"`, icon: "📝", category: "news" };
    case "NEWS_DELETED":
      return { text: `Xóa bài viết tin tức: "${metadata?.title || "Bài viết"}"`, icon: "🗑️", category: "news" };
    case "RESOURCE_CREATED":
      return { text: `Tải lên biểu mẫu / tài nguyên mới: "${metadata?.title || "Tài liệu"}"`, icon: "📁", category: "resources" };
    case "RESOURCE_UPDATED":
      return { text: `Cập nhật tài nguyên / biểu mẫu: "${metadata?.title || "Tài liệu"}"`, icon: "📑", category: "resources" };
    case "RESOURCE_DELETED":
      return { text: `Xóa tài nguyên / biểu mẫu: "${metadata?.title || "Tài liệu"}"`, icon: "🗑️", category: "resources" };
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

export async function GET(request: NextRequest) {
  const current = await getCurrentAdmin();
  if (!current) return errorResponse("Bạn chưa đăng nhập.", 401);

  const searchParams = request.nextUrl.searchParams;
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "15", 10), 5), 50);

  const logs = await prisma.auditLog.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      actor: { select: { fullName: true, username: true } },
      target: { select: { fullName: true, username: true } },
    },
  });

  const notifications = logs.map((log) => {
    const actorName = log.actor?.fullName || log.username || "Hệ thống";
    const targetName = log.target?.fullName || log.target?.username || log.username;
    const { text, icon, category } = formatActionText(log.action, log.metadata, targetName);

    return {
      id: log.id,
      action: log.action,
      actorName,
      targetName,
      title: text,
      icon,
      category,
      createdAt: log.createdAt.toISOString(),
      metadata: log.metadata,
    };
  });

  return NextResponse.json({
    success: true,
    notifications,
    timestamp: new Date().toISOString(),
  });
}
