-- Additive: preserves every existing consultation and its history.
CREATE TABLE "consultation_staff" (
  "id" TEXT NOT NULL,
  "email" VARCHAR(190) NOT NULL,
  "full_name" VARCHAR(120) NOT NULL,
  "password_hash" TEXT NOT NULL,
  "can_update" BOOLEAN NOT NULL DEFAULT true,
  "disabled" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "consultation_staff_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "consultation_staff_email_key" ON "consultation_staff"("email");
CREATE TABLE "consultation_sessions" (
  "id" TEXT NOT NULL,
  "token_hash" VARCHAR(64) NOT NULL,
  "staff_id" TEXT NOT NULL,
  "expires_at" TIMESTAMP(3) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "consultation_sessions_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "consultation_sessions_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "consultation_staff"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "consultation_sessions_token_hash_key" ON "consultation_sessions"("token_hash");
CREATE INDEX "consultation_sessions_expires_at_idx" ON "consultation_sessions"("expires_at");
