import { ResourcesConsultation } from "@/components/home/ResourcesConsultation";

/**
 * CTA cuối trang dùng chung toàn website.
 * Kế thừa nguyên thiết kế, nội dung và logic form tư vấn hiện có.
 */
export function NextStepCTA() {
  return <ResourcesConsultation showResources={false} />;
}
