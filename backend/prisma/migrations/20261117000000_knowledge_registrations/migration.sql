CREATE TABLE "knowledge_registrations" (
    "id" TEXT NOT NULL,
    "citizen_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "graduate_major" TEXT NOT NULL,
    "master_programme" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "knowledge_registrations_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "knowledge_registrations_citizen_id_format" CHECK ("citizen_id" ~ '^[0-9]{12}$')
);

CREATE TABLE "knowledge_attachments" (
    "id" TEXT NOT NULL,
    "registration_id" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "media_type" TEXT NOT NULL,
    "bytes" BYTEA NOT NULL,
    CONSTRAINT "knowledge_attachments_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "knowledge_attachments_registration_id_fkey"
        FOREIGN KEY ("registration_id") REFERENCES "knowledge_registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "knowledge_registrations_citizen_id_key" ON "knowledge_registrations"("citizen_id");
CREATE INDEX "knowledge_registrations_created_at_idx" ON "knowledge_registrations"("created_at");
CREATE UNIQUE INDEX "knowledge_attachments_registration_id_field_key" ON "knowledge_attachments"("registration_id", "field");
