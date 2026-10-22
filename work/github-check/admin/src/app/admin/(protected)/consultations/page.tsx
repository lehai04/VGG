import {
  ConsultationManager,
  type Consultation,
} from "@/components/consultations/ConsultationManager";
import { requireAdmin } from "@/lib/auth/authorization";
import { backendRequest } from "@/lib/backend-api";

export const metadata = { title: "Lịch tư vấn" };

export default async function ConsultationsPage() {
  const admin = await requireAdmin();
  let consultations: Consultation[] = [];
  let error = "";
  try {
    ({ consultations } = await backendRequest<{
      consultations: Consultation[];
    }>("/api/admin/consultations"));
  } catch (reason) {
    error =
      reason instanceof Error ? reason.message : "Không thể tải lịch tư vấn.";
  }

  return (
    <div className="admin-page consultation-admin-page">
      <header className="admin-page__head">
        <div>
          <span className="eyebrow">ADMISSIONS / CONSULTATIONS</span>
          <h1>Lịch tư vấn</h1>
          <p>Tiếp nhận và theo dõi các yêu cầu tư vấn được gửi từ website.</p>
        </div>
      </header>
      {error ? (
        <section className="admin-card">
          <p className="form-message">{error}</p>
        </section>
      ) : (
        <ConsultationManager
          initialConsultations={consultations}
          canUpdate={admin.permissionCodes.includes("consultations.update")}
        />
      )}
    </div>
  );
}
