import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/authorization";
import { backendRequest } from "@/lib/backend-api";
import {
  SettingsManager,
  type SystemSettingsData,
  type ActiveSession,
} from "@/components/settings/SettingsManager";

export const metadata = {
  title: "Cài đặt hệ thống - Quản trị VGG",
};

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const admin = await requireAdmin();
  const params = await searchParams;

  const can = (permission: string) =>
    admin.role.code === "SUPER_ADMIN" || admin.permissionCodes.includes(permission);

  const isSettingsAllowed =
    can("settings.view") || can("admins.view") || admin.role.code === "SUPER_ADMIN";

  if (!isSettingsAllowed) {
    redirect("/admin/dashboard");
  }

  let settingsData: { settings: SystemSettingsData } = {
    settings: {
      general: {
        systemName: "Hệ thống Quản trị VGG",
        organizationName: "Viện Nghiên cứu & Đào tạo VGG",
        logoUrl: "",
        faviconUrl: "",
        contactEmail: "contact@vgg.edu.vn",
        contactPhone: "024 3754 7506",
        address: "Khu Đô thị Đại học Quốc gia, Xuân Thủy, Cầu Giấy, Hà Nội",
        defaultLanguage: "vi",
        timezone: "Asia/Ho_Chi_Minh",
        dateFormat: "DD/MM/YYYY",
      },
      appearance: {
        primaryColor: "#2563EB",
        accentColor: "#0B1F3A",
        websiteTitle: "VGG Institute - Nâng tầm tri thức & Đổi mới sáng tạo",
        websiteDescription: "Cổng thông tin đào tạo sau đại học và nghiên cứu khoa học chuyên sâu.",
        ogImageUrl: "",
        footerText: "© 2026 Viện Nghiên cứu & Đào tạo VGG. Bản quyền đã được bảo hộ.",
        facebookUrl: "https://facebook.com/vgg.edu.vn",
        youtubeUrl: "https://youtube.com/@vgg_institute",
        linkedinUrl: "https://linkedin.com/company/vgg",
      },
      email: {
        senderEmail: "no-reply@vgg.edu.vn",
        senderName: "VGG Notification System",
        emailNotificationsEnabled: true,
        notifyNewConsultation: true,
        notifyPendingNews: true,
        emailTemplateHeader: "Thông báo từ Hệ thống Quản trị VGG",
        smtpHost: "smtp.gmail.com",
        smtpPort: 587,
        smtpSecurity: "TLS",
        smtpUsername: "notifications@vgg.edu.vn",
      },
      security: {
        sessionTimeoutHours: 24,
        maxFailedLoginAttempts: 5,
        lockoutMinutes: 15,
        passwordMinLength: 10,
        requireSpecialChar: true,
        requireUppercase: true,
        requireNumber: true,
      },
    },
  };

  let sessions: ActiveSession[] = [];

  try {
    const fetched = await backendRequest<{ settings: SystemSettingsData }>("/api/admin/settings");
    if (fetched && fetched.settings) {
      settingsData = fetched;
    }
  } catch {
    // Sử dụng giá trị mặc định nếu API lỗi
  }

  if (can("settings.security") || admin.role.code === "SUPER_ADMIN") {
    try {
      const sessRes = await backendRequest<{ sessions: ActiveSession[] }>("/api/admin/settings/sessions");
      if (sessRes && sessRes.sessions) {
        sessions = sessRes.sessions;
      }
    } catch {
      // Bỏ qua lỗi session
    }
  }

  return (
    <SettingsManager
      initialSettings={settingsData.settings}
      initialSessions={sessions}
      userPermissions={admin.permissionCodes}
      userRoleCode={admin.role.code}
      currentAdminId={admin.id}
      initialTab={params.tab || "general"}
    />
  );
}
