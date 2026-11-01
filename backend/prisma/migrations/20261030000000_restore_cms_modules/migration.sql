-- Additive only. Existing users keep their current consultation permissions.
ALTER TABLE "consultation_staff" ADD COLUMN "can_manage_content" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "consultations" ADD COLUMN "assigned_staff_id" TEXT, ADD COLUMN "outcome" VARCHAR(30), ADD COLUMN "next_contact_at" TIMESTAMP(3);
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_assigned_staff_id_fkey" FOREIGN KEY ("assigned_staff_id") REFERENCES "consultation_staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
CREATE INDEX "consultations_next_contact_at_idx" ON "consultations"("next_contact_at");
CREATE TABLE "cms_revisions" ("id" TEXT NOT NULL PRIMARY KEY, "entity_type" VARCHAR(30) NOT NULL, "entity_id" TEXT NOT NULL, "actor_name" VARCHAR(120) NOT NULL, "action" VARCHAR(30) NOT NULL, "snapshot" JSONB NOT NULL, "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX "cms_revisions_entity_type_entity_id_created_at_idx" ON "cms_revisions"("entity_type", "entity_id", "created_at");
