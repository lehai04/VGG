import { requireAdmin } from "@/lib/auth/authorization";
import { prisma } from "@/lib/db";
import { NotificationsManager } from "@/components/notifications/NotificationsManager";
import { NotificationDetail } from "@/components/notifications/NotificationDetailModal";

export const metadata = { title: "Thông báo & Hoạt động hệ thống" };

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

export default async function NotificationsPage() {
  await requireAdmin();

  const [totalCount, logs] = await Promise.all([
    prisma.auditLog.count(),
    prisma.auditLog.findMany({
      take: 20,
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

  const initialNotifications: NotificationDetail[] = logs.map((log) => {
    const actorName = log.actor?.fullName || log.username || "Hệ thống";
    const targetName = log.target?.fullName || log.target?.username || log.username;
    const { text, icon, category } = formatActionText(log.action, log.metadata, targetName);

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
      category,
      createdAt: log.createdAt.toISOString(),
      ipAddress: log.ipAddress || null,
      userAgent: log.userAgent || null,
      metadata: log.metadata,
    };
  });

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <span className="eyebrow">HỆ THỐNG / THÔNG BÁO HOẠT ĐỘNG</span>
          <h1>Trung tâm thông báo & Nhật ký hoạt động</h1>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "var(--text-14)" }}>
            Theo dõi tất cả sự kiện, thay đổi phân quyền nhân sự, đăng nhập, và tác vụ quản trị theo thời gian thực.
          </p>
        </div>
      </header>

      <NotificationsManager
        initialNotifications={initialNotifications}
        initialPagination={{
          page: 1,
          limit: 20,
          totalCount,
          totalPages: Math.ceil(totalCount / 20) || 1,
        }}
      />
    </div>
  );
}
