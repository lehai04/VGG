"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export type SystemSettingsData = {
  general: {
    systemName: string;
    organizationName: string;
    logoUrl: string;
    faviconUrl: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    defaultLanguage: string;
    timezone: string;
    dateFormat: string;
  };
  appearance: {
    primaryColor: string;
    accentColor: string;
    websiteTitle: string;
    websiteDescription: string;
    ogImageUrl: string;
    footerText: string;
    facebookUrl: string;
    youtubeUrl: string;
    linkedinUrl: string;
  };
  email: {
    senderEmail: string;
    senderName: string;
    emailNotificationsEnabled: boolean;
    notifyNewConsultation: boolean;
    notifyPendingNews: boolean;
    emailTemplateHeader: string;
    smtpHost?: string;
    smtpPort?: number;
    smtpSecurity?: string;
    smtpUsername?: string;
  };
  security: {
    sessionTimeoutHours: number;
    maxFailedLoginAttempts: number;
    lockoutMinutes: number;
    passwordMinLength: number;
    requireSpecialChar: boolean;
    requireUppercase: boolean;
    requireNumber: boolean;
  };
};

export type ActiveSession = {
  id: string;
  token: string;
  createdAt: string;
  lastSeenAt: string;
  admin: {
    id: string;
    fullName: string;
    username: string;
    email: string;
    role: { name: string };
  };
};

export type AuditLogItem = {
  id: string;
  action: string;
  actorAdminId?: string;
  username?: string;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  actor?: { fullName: string; username: string };
  target?: { fullName: string; username: string };
};

interface SettingsManagerProps {
  initialSettings: SystemSettingsData;
  initialSessions: ActiveSession[];
  userPermissions: string[];
  userRoleCode?: string;
  currentAdminId: string;
  initialTab?: string;
}

export function SettingsManager({
  initialSettings,
  initialSessions,
  userPermissions,
  userRoleCode,
  currentAdminId,
  initialTab = "general",
}: SettingsManagerProps) {
  const [activeTab, setActiveTab] = useState<"general" | "appearance" | "email" | "security" | "logs">(
    (initialTab as any) || "general"
  );

  // Settings State
  const [settings, setSettings] = useState<SystemSettingsData>(initialSettings);
  const [savedSnapshot, setSavedSnapshot] = useState<SystemSettingsData>(initialSettings);

  // Sessions State
  const [sessions, setSessions] = useState<ActiveSession[]>(initialSessions);
  const [selectedSessionToTerminate, setSelectedSessionToTerminate] = useState<string | null>(null);
  const [confirmTerminateAll, setConfirmTerminateAll] = useState(false);

  // Logs State
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsTotal, setLogsTotal] = useState(0);
  const [logSearch, setLogSearch] = useState("");
  const [logAction, setLogAction] = useState("ALL");
  const [logModule, setLogModule] = useState("ALL");
  const [logFrom, setLogFrom] = useState("");
  const [logTo, setLogTo] = useState("");
  const [selectedLogDetail, setSelectedLogDetail] = useState<AuditLogItem | null>(null);

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [previewWebsiteModal, setPreviewWebsiteModal] = useState(false);

  // Test email modal
  const [testEmailModal, setTestEmailModal] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState("");
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);

  // Permissions check
  const isSuperAdmin = userRoleCode === "SUPER_ADMIN";
  const canView = isSuperAdmin || userPermissions.includes("settings.view") || userPermissions.includes("admins.view");
  const canUpdate = isSuperAdmin || userPermissions.includes("settings.update");
  const canManageSecurity = isSuperAdmin || userPermissions.includes("settings.security");
  const canViewLogs = isSuperAdmin || userPermissions.includes("settings.logs");

  // Check if current tab is dirty
  const isDirty = useMemo(() => {
    if (activeTab === "logs") return false;
    return JSON.stringify(settings[activeTab]) !== JSON.stringify(savedSnapshot[activeTab]);
  }, [settings, savedSnapshot, activeTab]);

  // Alert before unloading if unsaved changes exist
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const anyDirty = JSON.stringify(settings) !== JSON.stringify(savedSnapshot);
      if (anyDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [settings, savedSnapshot]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // Fetch logs when switching to logs tab or filtering
  const fetchLogs = async () => {
    setLogsLoading(true);
    try {
      const params = new URLSearchParams();
      if (logSearch) params.set("search", logSearch);
      if (logAction !== "ALL") params.set("action", logAction);
      if (logModule !== "ALL") params.set("module", logModule);
      if (logFrom) params.set("from", logFrom);
      if (logTo) params.set("to", logTo);
      params.set("limit", "100");

      const res = await fetch(`/api/cms/settings/logs?${params.toString()}`);
      const data = await res.json();
      if (res.ok && data.data) {
        setLogs(data.data.logs || []);
        setLogsTotal(data.data.total || 0);
      }
    } catch {
      // Ignored
    } finally {
      setLogsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "logs") {
      fetchLogs();
    }
  }, [activeTab, logAction, logModule, logFrom, logTo]);

  // Tab change with dirty check prompt
  const handleTabChange = (nextTab: "general" | "appearance" | "email" | "security" | "logs") => {
    if (isDirty && activeTab !== "logs") {
      const confirmLeave = window.confirm("Bạn có các thay đổi chưa được lưu. Bạn có chắc muốn chuyển tab và hủy các thay đổi này không?");
      if (!confirmLeave) return;
      const tabKey = activeTab as keyof SystemSettingsData;
      setSettings((prev) => ({
        ...prev,
        [tabKey]: savedSnapshot[tabKey],
      }));
    }
    setActiveTab(nextTab);
  };

  // Field change handlers
  const handleGeneralChange = (field: keyof SystemSettingsData["general"], value: any) => {
    setSettings((prev) => ({
      ...prev,
      general: { ...prev.general, [field]: value },
    }));
  };

  const handleAppearanceChange = (field: keyof SystemSettingsData["appearance"], value: any) => {
    setSettings((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, [field]: value },
    }));
  };

  const handleEmailChange = (field: keyof SystemSettingsData["email"], value: any) => {
    setSettings((prev) => ({
      ...prev,
      email: { ...prev.email, [field]: value },
    }));
  };

  const handleSecurityChange = (field: keyof SystemSettingsData["security"], value: any) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, [field]: value },
    }));
  };

  // Image Upload helper (with validation)
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void,
    maxSizeMB = 3,
    acceptedTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/webp", "image/x-icon"]
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!acceptedTypes.includes(file.type)) {
      setToast({ type: "error", message: "Định dạng ảnh không hỗ trợ. Vui lòng chọn PNG, JPG, SVG hoặc WEBP." });
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setToast({ type: "error", message: `Dung lượng ảnh vượt quá giới hạn cho phép (${maxSizeMB}MB).` });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        callback(reader.result);
        setToast({ type: "success", message: `Đã tải ảnh lên bản xem trước.` });
      }
    };
    reader.readAsDataURL(file);
  };

  // Validate form based on active tab
  const validationError = useMemo((): string | null => {
    if (activeTab === "general") {
      if (!settings.general.systemName.trim()) return "Tên hệ thống không được để trống.";
      if (!settings.general.organizationName.trim()) return "Tên đơn vị không được để trống.";
      if (!settings.general.contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.general.contactEmail)) {
        return "Email liên hệ không hợp lệ.";
      }
    } else if (activeTab === "appearance") {
      if (!/^#([0-9A-Fa-f]{3}){1,2}$/.test(settings.appearance.primaryColor)) return "Mã màu chủ đạo không đúng định dạng Hex.";
      if (!/^#([0-9A-Fa-f]{3}){1,2}$/.test(settings.appearance.accentColor)) return "Mã màu nhấn không đúng định dạng Hex.";
      if (!settings.appearance.websiteTitle.trim()) return "Tiêu đề website không được để trống.";
    } else if (activeTab === "email") {
      if (!settings.email.senderEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email.senderEmail)) {
        return "Email người gửi không hợp lệ.";
      }
      if (!settings.email.senderName.trim()) return "Tên người gửi không được để trống.";
    } else if (activeTab === "security") {
      if (settings.security.sessionTimeoutHours < 1) return "Thời gian hết hạn phiên tối thiểu là 1 giờ.";
      if (settings.security.maxFailedLoginAttempts < 1) return "Số lần đăng nhập sai tối thiểu là 1.";
      if (settings.security.passwordMinLength < 6) return "Độ dài mật khẩu tối thiểu là 6 ký tự.";
    }
    return null;
  }, [activeTab, settings]);

  // Save changes handler
  const handleSave = async () => {
    if (activeTab === "logs") return;
    if (validationError) {
      setToast({ type: "error", message: validationError });
      return;
    }

    const tabKey = activeTab as keyof SystemSettingsData;
    setIsSaving(true);
    try {
      const payload = {
        tab: tabKey,
        data: settings[tabKey],
      };

      const res = await fetch("/api/cms/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Lỗi khi lưu cấu hình.");

      setSavedSnapshot((prev) => ({
        ...prev,
        [tabKey]: JSON.parse(JSON.stringify(settings[tabKey])),
      }));
      setToast({ type: "success", message: `Đã lưu cấu hình ${activeTab === "general" ? "thông tin chung" : activeTab === "appearance" ? "giao diện website" : activeTab === "email" ? "email & thông báo" : "bảo mật"} thành công.` });
    } catch (err: any) {
      setToast({ type: "error", message: err.message || "Không thể kết nối đến máy chủ." });
    } finally {
      setIsSaving(false);
    }
  };

  // Revert changes
  const handleDiscard = () => {
    if (activeTab === "logs") return;
    const tabKey = activeTab as keyof SystemSettingsData;
    setSettings((prev) => ({
      ...prev,
      [tabKey]: JSON.parse(JSON.stringify(savedSnapshot[tabKey])),
    }));
    setToast({ type: "success", message: "Đã hủy các thay đổi chưa lưu." });
  };

  // Send Test Email
  const handleSendTestEmail = async () => {
    if (!testEmailAddress || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmailAddress)) {
      setToast({ type: "error", message: "Vui lòng nhập địa chỉ email hợp lệ để nhận thử nghiệm." });
      return;
    }

    setIsSendingTestEmail(true);
    try {
      const res = await fetch("/api/cms/settings/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmailAddress }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Không thể gửi email thử nghiệm.");

      setToast({ type: "success", message: `Đã gửi email thử nghiệm tới ${testEmailAddress}.` });
      setTestEmailModal(false);
      setTestEmailAddress("");
    } catch (err: any) {
      setToast({ type: "error", message: err.message || "Gửi email thử nghiệm thất bại." });
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  // Terminate Single Session
  const handleTerminateSession = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/cms/settings/sessions/${sessionId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      setToast({ type: "success", message: "Đã đăng xuất phiên thiết bị thành công." });
    } catch {
      setToast({ type: "error", message: "Không thể đăng xuất phiên đã chọn." });
    } finally {
      setSelectedSessionToTerminate(null);
    }
  };

  // Terminate All Other Sessions
  const handleTerminateAllSessions = async () => {
    try {
      const res = await fetch("/api/cms/settings/sessions", { method: "DELETE" });
      if (!res.ok) throw new Error();
      setSessions((prev) => prev.filter((s) => s.admin.id === currentAdminId));
      setToast({ type: "success", message: "Đã đăng xuất tất cả các phiên làm việc khác thành công." });
    } catch {
      setToast({ type: "error", message: "Không thể đăng xuất các phiên khác." });
    } finally {
      setConfirmTerminateAll(false);
    }
  };

  // Export logs to CSV
  const handleExportLogs = () => {
    if (logs.length === 0) {
      setToast({ type: "error", message: "Không có nhật ký nào để xuất." });
      return;
    }
    const headers = ["Thời gian", "Người thực hiện", "Hành động", "Phân hệ", "IP"];
    const rows = logs.map((l) => [
      new Date(l.createdAt).toLocaleString("vi-VN"),
      l.actor?.fullName || l.username || "Hệ thống",
      l.action,
      l.targetType || "Hệ thống",
      l.ipAddress || "-",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `audit-logs-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({ type: "success", message: "Đã xuất file nhật ký audit-logs.csv." });
  };

  if (!canView) {
    return (
      <div className="admin-page settings-page">
        <div className="permission-denied-box">
          <h2>403 Forbidden - Truy cập bị từ chối</h2>
          <p>Bạn không có quyền <code>settings.view</code> để truy cập trang Cài đặt hệ thống.</p>
          <Link href="/admin/dashboard" className="btn-primary">Quay lại Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page settings-page">
      {/* Toast Alert */}
      {toast && (
        <div className={`settings-toast settings-toast--${toast.type}`}>
          <span>{toast.message}</span>
          <button type="button" onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {/* Page Header */}
      <header className="settings-page__head">
        <div>
          <div className="admin-breadcrumb">
            <Link href="/admin/dashboard">Trang chủ</Link>
            <b>/</b>
            <strong>Cài đặt hệ thống</strong>
          </div>
          <h1 className="settings-title">Cài đặt hệ thống</h1>
          <p className="settings-desc">Quản lý cấu hình toàn diện, giao diện, thông báo, phiên bảo mật và nhật ký hệ thống VGG.</p>
        </div>

        {/* Global Save Actions (shown on editable tabs) */}
        {activeTab !== "logs" && (
          <div className="settings-head-actions">
            {canUpdate ? (
              <>
                <button
                  type="button"
                  className="btn-secondary"
                  disabled={!isDirty || isSaving}
                  onClick={handleDiscard}
                >
                  Hủy thay đổi
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  disabled={!isDirty || !!validationError || isSaving}
                  onClick={handleSave}
                >
                  {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </>
            ) : (
              <span className="permission-read-only-badge">Chỉ có quyền xem (Read-only)</span>
            )}
          </div>
        )}
      </header>

      {/* Settings Navigation Tabs */}
      <div className="settings-tabs-scroll">
        <nav className="settings-tabs" role="tablist">
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === "general" ? "active" : ""}`}
            onClick={() => handleTabChange("general")}
          >
            <span className="tab-icon">⚙</span>
            <span>Thông tin chung</span>
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === "appearance" ? "active" : ""}`}
            onClick={() => handleTabChange("appearance")}
          >
            <span className="tab-icon">🎨</span>
            <span>Giao diện website</span>
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === "email" ? "active" : ""}`}
            onClick={() => handleTabChange("email")}
          >
            <span className="tab-icon">✉</span>
            <span>Email & Thông báo</span>
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => handleTabChange("security")}
          >
            <span className="tab-icon">🛡</span>
            <span>Bảo mật & Phiên</span>
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === "logs" ? "active" : ""}`}
            onClick={() => handleTabChange("logs")}
          >
            <span className="tab-icon">📋</span>
            <span>Nhật ký hệ thống</span>
          </button>
        </nav>
      </div>

      {/* Unsaved Changes Banner */}
      {isDirty && (
        <div className="unsaved-alert-banner">
          <span className="unsaved-icon">⚠</span>
          <span>Bạn có thay đổi chưa được lưu trong tab này. Đừng quên nhấn "Lưu thay đổi" trước khi rời đi!</span>
        </div>
      )}

      {/* TAB 1: THÔNG TIN CHUNG */}
      {activeTab === "general" && (
        <section className="admin-card settings-card">
          <header className="card-section-header">
            <h3>Thông tin đơn vị & Hệ thống</h3>
            <p>Các thiết lập nhận diện thương hiệu, liên hệ và quy chuẩn hiển thị thời gian.</p>
          </header>

          <div className="form-grid">
            <div className="field">
              <label>Tên hệ thống <strong className="req">*</strong></label>
              <input
                type="text"
                value={settings.general.systemName}
                disabled={!canUpdate}
                onChange={(e) => handleGeneralChange("systemName", e.target.value)}
                placeholder="VD: Hệ thống Quản trị VGG"
              />
            </div>

            <div className="field">
              <label>Tên cơ quan / Đơn vị <strong className="req">*</strong></label>
              <input
                type="text"
                value={settings.general.organizationName}
                disabled={!canUpdate}
                onChange={(e) => handleGeneralChange("organizationName", e.target.value)}
                placeholder="VD: Viện Nghiên cứu & Đào tạo VGG"
              />
            </div>

            <div className="field">
              <label>Email liên hệ chính thức <strong className="req">*</strong></label>
              <input
                type="email"
                value={settings.general.contactEmail}
                disabled={!canUpdate}
                onChange={(e) => handleGeneralChange("contactEmail", e.target.value)}
                placeholder="contact@vgg.edu.vn"
              />
            </div>

            <div className="field">
              <label>Số điện thoại hotline</label>
              <input
                type="text"
                value={settings.general.contactPhone}
                disabled={!canUpdate}
                onChange={(e) => handleGeneralChange("contactPhone", e.target.value)}
                placeholder="VD: 024 3754 7506"
              />
            </div>

            <div className="field full">
              <label>Địa chỉ trụ sở</label>
              <input
                type="text"
                value={settings.general.address}
                disabled={!canUpdate}
                onChange={(e) => handleGeneralChange("address", e.target.value)}
                placeholder="VD: Khu Đô thị Đại học Quốc gia, Xuân Thủy, Cầu Giấy, Hà Nội"
              />
            </div>

            <div className="field">
              <label>Ngôn ngữ mặc định</label>
              <select
                value={settings.general.defaultLanguage}
                disabled={!canUpdate}
                onChange={(e) => handleGeneralChange("defaultLanguage", e.target.value)}
              >
                <option value="vi">Tiếng Việt (vi-VN)</option>
                <option value="en">English (en-US)</option>
              </select>
            </div>

            <div className="field">
              <label>Múi giờ hệ thống</label>
              <select
                value={settings.general.timezone}
                disabled={!canUpdate}
                onChange={(e) => handleGeneralChange("timezone", e.target.value)}
              >
                <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</option>
                <option value="UTC">UTC (GMT+0)</option>
              </select>
            </div>

            <div className="field">
              <label>Định dạng ngày tháng</label>
              <select
                value={settings.general.dateFormat}
                disabled={!canUpdate}
                onChange={(e) => handleGeneralChange("dateFormat", e.target.value)}
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (VD: 08/09/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (VD: 2026-09-08)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (VD: 09/08/2026)</option>
              </select>
            </div>

            {/* Logo & Favicon Upload Cards */}
            <div className="field full upload-duo-grid">
              <div className="upload-box">
                <label>Logo hệ thống (PNG, SVG, JPG)</label>
                <div className="upload-preview-row">
                  <div className="image-preview-frame logo-preview">
                    {settings.general.logoUrl ? (
                      <img src={settings.general.logoUrl} alt="Logo Preview" />
                    ) : (
                      <span>Chưa có logo</span>
                    )}
                  </div>
                  {canUpdate && (
                    <div className="upload-actions">
                      <label className="btn-upload">
                        Thay đổi Logo
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => handleImageUpload(e, (url) => handleGeneralChange("logoUrl", url))}
                        />
                      </label>
                      <small>Dung lượng tối đa 2MB</small>
                    </div>
                  )}
                </div>
              </div>

              <div className="upload-box">
                <label>Favicon trình duyệt (.ico, .png)</label>
                <div className="upload-preview-row">
                  <div className="image-preview-frame favicon-preview">
                    {settings.general.faviconUrl ? (
                      <img src={settings.general.faviconUrl} alt="Favicon Preview" />
                    ) : (
                      <span>Chưa có favicon</span>
                    )}
                  </div>
                  {canUpdate && (
                    <div className="upload-actions">
                      <label className="btn-upload">
                        Thay đổi Favicon
                        <input
                          type="file"
                          accept=".ico,image/png,image/x-icon"
                          style={{ display: "none" }}
                          onChange={(e) => handleImageUpload(e, (url) => handleGeneralChange("faviconUrl", url), 1)}
                        />
                      </label>
                      <small>Khuyến nghị kích thước 32x32px</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: GIAO DIỆN WEBSITE */}
      {activeTab === "appearance" && (
        <section className="admin-card settings-card">
          <header className="card-section-header">
            <h3>Tùy chỉnh Giao diện & Nhận diện Cổng thông tin</h3>
            <p>Màu sắc thương hiệu, thẻ mạng xã hội Open Graph (SEO) và thông tin chân trang.</p>
          </header>

          <div className="form-grid">
            {/* Màu chủ đạo & Màu nhấn */}
            <div className="field">
              <label>Màu chủ đạo (Primary Color) <strong className="req">*</strong></label>
              <div className="color-picker-input">
                <input
                  type="color"
                  value={settings.appearance.primaryColor}
                  disabled={!canUpdate}
                  onChange={(e) => handleAppearanceChange("primaryColor", e.target.value)}
                />
                <input
                  type="text"
                  value={settings.appearance.primaryColor}
                  disabled={!canUpdate}
                  onChange={(e) => handleAppearanceChange("primaryColor", e.target.value)}
                  placeholder="#2563EB"
                />
              </div>
            </div>

            <div className="field">
              <label>Màu nhấn (Accent Color) <strong className="req">*</strong></label>
              <div className="color-picker-input">
                <input
                  type="color"
                  value={settings.appearance.accentColor}
                  disabled={!canUpdate}
                  onChange={(e) => handleAppearanceChange("accentColor", e.target.value)}
                />
                <input
                  type="text"
                  value={settings.appearance.accentColor}
                  disabled={!canUpdate}
                  onChange={(e) => handleAppearanceChange("accentColor", e.target.value)}
                  placeholder="#0B1F3A"
                />
              </div>
            </div>

            <div className="field full">
              <label>Tiêu đề website (SEO Title) <strong className="req">*</strong></label>
              <input
                type="text"
                value={settings.appearance.websiteTitle}
                disabled={!canUpdate}
                onChange={(e) => handleAppearanceChange("websiteTitle", e.target.value)}
                placeholder="VD: VGG Institute - Nâng tầm tri thức & Đổi mới sáng tạo"
              />
            </div>

            <div className="field full">
              <label>Mô tả website (SEO Meta Description)</label>
              <textarea
                rows={3}
                value={settings.appearance.websiteDescription}
                disabled={!canUpdate}
                onChange={(e) => handleAppearanceChange("websiteDescription", e.target.value)}
                placeholder="Mô tả tóm tắt hiển thị trên kết quả tìm kiếm Google..."
              />
            </div>

            {/* OG Image Upload */}
            <div className="field full">
              <label>Ảnh đại diện chia sẻ mạng xã hội (Open Graph Cover)</label>
              <div className="upload-preview-row">
                <div className="image-preview-frame og-preview">
                  {settings.appearance.ogImageUrl ? (
                    <img src={settings.appearance.ogImageUrl} alt="OG Image Preview" />
                  ) : (
                    <span>Chưa có ảnh OG</span>
                  )}
                </div>
                {canUpdate && (
                  <div className="upload-actions">
                    <label className="btn-upload">
                      Chọn ảnh chia sẻ
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageUpload(e, (url) => handleAppearanceChange("ogImageUrl", url), 4)}
                      />
                    </label>
                    <small>Tỷ lệ chuẩn 1200x630px (tối đa 4MB)</small>
                    <button
                      type="button"
                      className="btn-preview-modal"
                      onClick={() => setPreviewWebsiteModal(true)}
                    >
                      👁 Xem trước giao diện
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="field full">
              <label>Nội dung bản quyền chân trang (Footer Copyright)</label>
              <input
                type="text"
                value={settings.appearance.footerText}
                disabled={!canUpdate}
                onChange={(e) => handleAppearanceChange("footerText", e.target.value)}
                placeholder="© 2026 Viện Nghiên cứu & Đào tạo VGG..."
              />
            </div>

            <div className="field">
              <label>Facebook Fanpage URL</label>
              <input
                type="url"
                value={settings.appearance.facebookUrl}
                disabled={!canUpdate}
                onChange={(e) => handleAppearanceChange("facebookUrl", e.target.value)}
                placeholder="https://facebook.com/..."
              />
            </div>

            <div className="field">
              <label>YouTube Channel URL</label>
              <input
                type="url"
                value={settings.appearance.youtubeUrl}
                disabled={!canUpdate}
                onChange={(e) => handleAppearanceChange("youtubeUrl", e.target.value)}
                placeholder="https://youtube.com/..."
              />
            </div>

            <div className="field full">
              <label>LinkedIn Page URL</label>
              <input
                type="url"
                value={settings.appearance.linkedinUrl}
                disabled={!canUpdate}
                onChange={(e) => handleAppearanceChange("linkedinUrl", e.target.value)}
                placeholder="https://linkedin.com/company/..."
              />
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: EMAIL VÀ THÔNG BÁO */}
      {activeTab === "email" && (
        <section className="admin-card settings-card">
          <header className="card-section-header">
            <h3>Cấu hình Email & Thông báo tự động</h3>
            <p>Thiết lập người gửi, cơ chế cảnh báo khi có sự kiện tuyển sinh và mẫu email gửi tới học viên.</p>
          </header>

          <div className="form-grid">
            <div className="field">
              <label>Email người gửi (Sender Email) <strong className="req">*</strong></label>
              <input
                type="email"
                value={settings.email.senderEmail}
                disabled={!canUpdate}
                onChange={(e) => handleEmailChange("senderEmail", e.target.value)}
                placeholder="no-reply@vgg.edu.vn"
              />
            </div>

            <div className="field">
              <label>Tên người gửi (Sender Display Name) <strong className="req">*</strong></label>
              <input
                type="text"
                value={settings.email.senderName}
                disabled={!canUpdate}
                onChange={(e) => handleEmailChange("senderName", e.target.value)}
                placeholder="VGG Notification System"
              />
            </div>

            {/* Notification Switches */}
            <div className="field full toggle-switches-card">
              <div className="toggle-row">
                <div>
                  <strong>Bật hệ thống thông báo qua email</strong>
                  <p>Gửi thư thông báo tự động khi có các tương tác mới trên hệ thống</p>
                </div>
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                  checked={settings.email.emailNotificationsEnabled}
                  disabled={!canUpdate}
                  onChange={(e) => handleEmailChange("emailNotificationsEnabled", e.target.checked)}
                />
              </div>

              <div className="toggle-row">
                <div>
                  <strong>Thông báo khi có lịch tư vấn mới</strong>
                  <p>Gửi email cảnh báo tới ban tư vấn ngay khi có khách hàng đăng ký hẹn tư vấn</p>
                </div>
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                  checked={settings.email.notifyNewConsultation}
                  disabled={!canUpdate || !settings.email.emailNotificationsEnabled}
                  onChange={(e) => handleEmailChange("notifyNewConsultation", e.target.checked)}
                />
              </div>

              <div className="toggle-row">
                <div>
                  <strong>Thông báo khi có bài viết hoặc tài liệu chờ duyệt</strong>
                  <p>Gửi thông báo tới Trưởng ban biên tập khi biên tập viên gửi bài viết mới</p>
                </div>
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                  checked={settings.email.notifyPendingNews}
                  disabled={!canUpdate || !settings.email.emailNotificationsEnabled}
                  onChange={(e) => handleEmailChange("notifyPendingNews", e.target.checked)}
                />
              </div>
            </div>

            <div className="field full">
              <label>Tiêu đề tiêu chuẩn mẫu email (Template Header)</label>
              <input
                type="text"
                value={settings.email.emailTemplateHeader}
                disabled={!canUpdate}
                onChange={(e) => handleEmailChange("emailTemplateHeader", e.target.value)}
                placeholder="Thông báo từ Hệ thống Quản trị VGG"
              />
            </div>

            {/* SMTP Server Information (Masked, read-only) */}
            <div className="field full smtp-info-card">
              <div className="smtp-card-head">
                <span className="smtp-shield">🔒</span>
                <div>
                  <strong>Máy chủ gửi thư SMTP (Đã bảo mật)</strong>
                  <p>Thông tin chứng thực SMTP đã được mã hóa bảo mật. Mật khẩu không hiển thị trên frontend.</p>
                </div>
                {canUpdate && (
                  <button
                    type="button"
                    className="btn-test-email"
                    onClick={() => setTestEmailModal(true)}
                  >
                    Gửi email thử nghiệm ✉
                  </button>
                )}
              </div>
              <div className="smtp-meta-grid">
                <div>
                  <span>Máy chủ SMTP:</span>
                  <strong>{settings.email.smtpHost || "smtp.gmail.com"}</strong>
                </div>
                <div>
                  <span>Cổng (Port):</span>
                  <strong>{settings.email.smtpPort || 587}</strong>
                </div>
                <div>
                  <span>Giao thức:</span>
                  <strong>{settings.email.smtpSecurity || "TLS"}</strong>
                </div>
                <div>
                  <span>Tài khoản gửi:</span>
                  <strong>{settings.email.smtpUsername || settings.email.senderEmail}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: BẢO MẬT & PHIÊN ĐĂNG NHẬP */}
      {activeTab === "security" && (
        <div className="settings-security-layout">
          {/* Chính sách bảo mật */}
          <section className="admin-card settings-card">
            <header className="card-section-header">
              <h3>Chính sách Đăng nhập & Mật khẩu</h3>
              <p>Quy chuẩn kiểm soát thời gian phiên, khóa tài khoản chống brute-force và độ phức tạp mật khẩu.</p>
            </header>

            <div className="form-grid">
              <div className="field">
                <label>Thời gian hết hạn phiên (giờ)</label>
                <input
                  type="number"
                  min="1"
                  max="720"
                  value={settings.security.sessionTimeoutHours}
                  disabled={!canUpdate}
                  onChange={(e) => handleSecurityChange("sessionTimeoutHours", Number(e.target.value))}
                />
              </div>

              <div className="field">
                <label>Số lần đăng nhập sai tối đa</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={settings.security.maxFailedLoginAttempts}
                  disabled={!canUpdate}
                  onChange={(e) => handleSecurityChange("maxFailedLoginAttempts", Number(e.target.value))}
                />
              </div>

              <div className="field">
                <label>Thời gian khóa tài khoản tạm thời (phút)</label>
                <input
                  type="number"
                  min="1"
                  max="1440"
                  value={settings.security.lockoutMinutes}
                  disabled={!canUpdate}
                  onChange={(e) => handleSecurityChange("lockoutMinutes", Number(e.target.value))}
                />
              </div>

              <div className="field">
                <label>Độ dài tối thiểu của mật khẩu</label>
                <input
                  type="number"
                  min="6"
                  max="64"
                  value={settings.security.passwordMinLength}
                  disabled={!canUpdate}
                  onChange={(e) => handleSecurityChange("passwordMinLength", Number(e.target.value))}
                />
              </div>

              <div className="field full password-rules-card">
                <strong>Yêu cầu độ mạnh mật khẩu khi tạo hoặc đổi mật khẩu:</strong>
                <div className="checkbox-grid">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.security.requireUppercase}
                      disabled={!canUpdate}
                      onChange={(e) => handleSecurityChange("requireUppercase", e.target.checked)}
                    />
                    Bắt buộc có ít nhất một chữ hoa (A-Z)
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.security.requireNumber}
                      disabled={!canUpdate}
                      onChange={(e) => handleSecurityChange("requireNumber", e.target.checked)}
                    />
                    Bắt buộc có ít nhất một chữ số (0-9)
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.security.requireSpecialChar}
                      disabled={!canUpdate}
                      onChange={(e) => handleSecurityChange("requireSpecialChar", e.target.checked)}
                    />
                    Bắt buộc có ký tự đặc biệt (!@#$%^&*)
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Danh sách phiên đăng nhập hiện tại */}
          <section className="admin-card settings-card">
            <header className="card-section-header session-header-flex">
              <div>
                <h3>Danh sách phiên đăng nhập đang hoạt động</h3>
                <p>Theo dõi các phiên truy cập của ban quản trị và đăng xuất từ xa khi nghi ngờ có rủi ro.</p>
              </div>
              {canManageSecurity && sessions.length > 1 && (
                <button
                  type="button"
                  className="btn-danger-outline"
                  onClick={() => setConfirmTerminateAll(true)}
                >
                  Đăng xuất tất cả thiết bị khác
                </button>
              )}
            </header>

            <div className="session-list">
              {sessions.length === 0 ? (
                <div className="session-empty">Không có phiên đăng nhập nào đang hoạt động.</div>
              ) : (
                sessions.map((sess) => {
                  const isCurrent = sess.admin.id === currentAdminId;
                  return (
                    <div key={sess.id} className={`session-item ${isCurrent ? "session-item--current" : ""}`}>
                      <div className="session-icon-box">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </div>

                      <div className="session-info">
                        <div className="session-user-line">
                          <strong>{sess.admin.fullName}</strong>
                          <span className="session-badge">{sess.admin.role.name}</span>
                          {isCurrent && <span className="session-current-tag">Thiết bị hiện tại</span>}
                        </div>
                        <div className="session-meta-line">
                          <span>Đăng nhập lúc: {new Date(sess.createdAt).toLocaleString("vi-VN")}</span>
                          <span>•</span>
                          <span>Hoạt động gần nhất: {new Date(sess.lastSeenAt).toLocaleTimeString("vi-VN")}</span>
                        </div>
                      </div>

                      <div className="session-actions">
                        {canManageSecurity && !isCurrent && (
                          <button
                            type="button"
                            className="btn-logout-session"
                            onClick={() => setSelectedSessionToTerminate(sess.id)}
                          >
                            Đăng xuất
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      )}

      {/* TAB 5: NHẬT KÝ HỆ THỐNG (AUDIT LOGS) */}
      {activeTab === "logs" && (
        <section className="admin-card settings-card">
          <header className="card-section-header logs-header-flex">
            <div>
              <h3>Nhật ký thao tác & Thay đổi hệ thống (Audit Logs)</h3>
              <p>Theo dõi toàn bộ các hoạt động nhạy cảm trong hệ thống. Dữ liệu chỉ đọc và được lưu trữ phục vụ bảo mật.</p>
            </div>
            <div className="logs-header-actions">
              <button
                type="button"
                className="btn-export-csv"
                onClick={handleExportLogs}
              >
                Xuất file CSV 📥
              </button>
            </div>
          </header>

          {/* Filters & Search Toolbar */}
          <div className="logs-toolbar">
            <div className="logs-search-box">
              <input
                type="text"
                placeholder="Tìm theo người dùng, phân hệ hoặc ghi chú..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchLogs()}
              />
              <button type="button" onClick={fetchLogs}>Tìm kiếm</button>
            </div>

            <div className="logs-filter-group">
              <select value={logAction} onChange={(e) => setLogAction(e.target.value)}>
                <option value="ALL">Tất cả hành động</option>
                <option value="LOGIN">Đăng nhập</option>
                <option value="LOGOUT">Đăng xuất</option>
                <option value="ACCOUNT_UPDATED">Cập nhật cấu hình</option>
                <option value="NEWS_CREATED">Tạo bài viết</option>
                <option value="NEWS_UPDATED">Sửa bài viết</option>
                <option value="RESOURCE_CREATED">Tạo tài nguyên</option>
              </select>

              <select value={logModule} onChange={(e) => setLogModule(e.target.value)}>
                <option value="ALL">Tất cả phân hệ</option>
                <option value="settings">Cài đặt</option>
                <option value="session">Phiên làm việc</option>
                <option value="news">Tin tức</option>
                <option value="resource">Tài nguyên</option>
                <option value="admin">Nhân sự</option>
              </select>

              <input
                type="date"
                title="Từ ngày"
                value={logFrom}
                onChange={(e) => setLogFrom(e.target.value)}
              />
              <input
                type="date"
                title="Đến ngày"
                value={logTo}
                onChange={(e) => setLogTo(e.target.value)}
              />
            </div>
          </div>

          {/* Logs Table */}
          <div className="admin-table-wrap">
            <table className="admin-table logs-table">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Người thực hiện</th>
                  <th>Hành động</th>
                  <th>Phân hệ</th>
                  <th>Nội dung thay đổi</th>
                  <th>Địa chỉ IP</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {logsLoading ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "30px" }}>
                      Đang tải danh sách nhật ký...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "30px", color: "#64748B" }}>
                      Không tìm thấy bản ghi nhật ký nào.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id}>
                      <td>
                        <time className="log-time-cell">
                          {new Date(log.createdAt).toLocaleString("vi-VN")}
                        </time>
                      </td>
                      <td>
                        <strong>{log.actor?.fullName || log.username || "Hệ thống"}</strong>
                      </td>
                      <td>
                        <span className="log-action-badge">{log.action}</span>
                      </td>
                      <td>
                        <span className="log-module-badge">{log.targetType || "Hệ thống"}</span>
                      </td>
                      <td>
                        <span className="log-meta-snippet" title={JSON.stringify(log.metadata || {})}>
                          {log.metadata ? JSON.stringify(log.metadata).slice(0, 45) + "..." : "-"}
                        </span>
                      </td>
                      <td>
                        <code>{log.ipAddress || "127.0.0.1"}</code>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-view-detail-log"
                          onClick={() => setSelectedLogDetail(log)}
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* MODAL: XÁC NHẬN ĐĂNG XUẤT 1 PHIÊN */}
      {selectedSessionToTerminate && (
        <div className="settings-modal-backdrop" onClick={() => setSelectedSessionToTerminate(null)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-head">
              <h3>Xác nhận đăng xuất phiên thiết bị</h3>
            </header>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn buộc đăng xuất phiên làm việc này không? Người dùng sẽ phải đăng nhập lại trên thiết bị đó.</p>
            </div>
            <footer className="modal-foot">
              <button type="button" className="btn-secondary" onClick={() => setSelectedSessionToTerminate(null)}>
                Hủy bỏ
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={() => handleTerminateSession(selectedSessionToTerminate)}
              >
                Đăng xuất ngay
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* MODAL: XÁC NHẬN ĐĂNG XUẤT TẤT CẢ PHIÊN KHÁC */}
      {confirmTerminateAll && (
        <div className="settings-modal-backdrop" onClick={() => setConfirmTerminateAll(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-head">
              <h3>Đăng xuất tất cả thiết bị khác</h3>
            </header>
            <div className="modal-body">
              <p>Hành động này sẽ hủy tất cả các phiên đăng nhập khác của toàn bộ tài khoản quản trị viên, ngoại trừ phiên hiện tại của bạn.</p>
            </div>
            <footer className="modal-foot">
              <button type="button" className="btn-secondary" onClick={() => setConfirmTerminateAll(false)}>
                Hủy bỏ
              </button>
              <button type="button" className="btn-danger" onClick={handleTerminateAllSessions}>
                Xác nhận đăng xuất tất cả
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* MODAL: GỬI EMAIL THỬ NGHIỆM */}
      {testEmailModal && (
        <div className="settings-modal-backdrop" onClick={() => setTestEmailModal(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-head">
              <h3>Gửi email thử nghiệm SMTP</h3>
            </header>
            <div className="modal-body">
              <p>Kiểm tra hoạt động gửi email với các thông số cấu hình SMTP hiện tại.</p>
              <div className="field" style={{ marginTop: "14px" }}>
                <label>Địa chỉ email nhận thử nghiệm <strong className="req">*</strong></label>
                <input
                  type="email"
                  value={testEmailAddress}
                  placeholder="nhanvien@vgg.edu.vn"
                  onChange={(e) => setTestEmailAddress(e.target.value)}
                />
              </div>
            </div>
            <footer className="modal-foot">
              <button type="button" className="btn-secondary" onClick={() => setTestEmailModal(false)}>
                Đóng
              </button>
              <button
                type="button"
                className="btn-primary"
                disabled={isSendingTestEmail}
                onClick={handleSendTestEmail}
              >
                {isSendingTestEmail ? "Đang gửi..." : "Gửi thử ngay"}
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* MODAL: CHI TIẾT NHẬT KÝ AUDIT */}
      {selectedLogDetail && (
        <div className="settings-modal-backdrop" onClick={() => setSelectedLogDetail(null)}>
          <div className="settings-modal settings-modal--wide" onClick={(e) => e.stopPropagation()}>
            <header className="modal-head">
              <h3>Chi tiết bản ghi nhật ký #{selectedLogDetail.id.slice(0, 8)}</h3>
            </header>
            <div className="modal-body">
              <div className="log-detail-grid">
                <div>
                  <span>Thời gian:</span>
                  <strong>{new Date(selectedLogDetail.createdAt).toLocaleString("vi-VN")}</strong>
                </div>
                <div>
                  <span>Người thực hiện:</span>
                  <strong>{selectedLogDetail.actor?.fullName || selectedLogDetail.username || "Hệ thống"}</strong>
                </div>
                <div>
                  <span>Hành động:</span>
                  <span className="log-action-badge">{selectedLogDetail.action}</span>
                </div>
                <div>
                  <span>Phân hệ:</span>
                  <strong>{selectedLogDetail.targetType || "Hệ thống"}</strong>
                </div>
              </div>
              <div className="log-metadata-box">
                <label>Dữ liệu thay đổi (Metadata JSON):</label>
                <pre>{JSON.stringify(selectedLogDetail.metadata || {}, null, 2)}</pre>
              </div>
            </div>
            <footer className="modal-foot">
              <button type="button" className="btn-secondary" onClick={() => setSelectedLogDetail(null)}>
                Đóng
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* MODAL: XEM TRƯỚC GIAO DIỆN WEBSITE */}
      {previewWebsiteModal && (
        <div className="settings-modal-backdrop" onClick={() => setPreviewWebsiteModal(false)}>
          <div className="settings-modal settings-modal--preview" onClick={(e) => e.stopPropagation()}>
            <header className="modal-head">
              <h3>Bản xem trước nhận diện giao diện Cổng thông tin VGG</h3>
              <button type="button" className="modal-close" onClick={() => setPreviewWebsiteModal(false)}>✕</button>
            </header>
            <div className="modal-body">
              <div className="website-preview-card" style={{ borderColor: settings.appearance.primaryColor }}>
                <div className="preview-topbar" style={{ background: settings.appearance.accentColor, color: "#fff" }}>
                  <strong>{settings.general.systemName}</strong>
                  <div className="preview-nav-mock">
                    <span>Trang chủ</span>
                    <span>Giới thiệu</span>
                    <span>Tin tức</span>
                    <span>Tuyển sinh</span>
                  </div>
                </div>
                <div className="preview-hero">
                  <h2 style={{ color: settings.appearance.primaryColor }}>{settings.appearance.websiteTitle}</h2>
                  <p>{settings.appearance.websiteDescription}</p>
                  <button type="button" style={{ background: settings.appearance.primaryColor, color: "#fff" }}>
                    Khám phá chương trình
                  </button>
                </div>
                <div className="preview-footer" style={{ background: "#F1F5F9", color: "#64748B" }}>
                  <span>{settings.appearance.footerText}</span>
                </div>
              </div>
            </div>
            <footer className="modal-foot">
              <button type="button" className="btn-secondary" onClick={() => setPreviewWebsiteModal(false)}>
                Đóng xem trước
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
