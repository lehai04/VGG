-- AlterEnum
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'NEWS_CREATED';
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'NEWS_UPDATED';
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'NEWS_DELETED';
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'RESOURCE_CREATED';
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'RESOURCE_UPDATED';
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'RESOURCE_DELETED';
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'ACCOUNT_DELETED';

-- CreateTable
CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
    "id" TEXT NOT NULL,
    "token_hash" CHAR(64) NOT NULL,
    "admin_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "password_reset_tokens_token_hash_key" ON "password_reset_tokens"("token_hash");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "password_reset_tokens_admin_id_idx" ON "password_reset_tokens"("admin_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "password_reset_tokens_expires_at_idx" ON "password_reset_tokens"("expires_at");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'password_reset_tokens_admin_id_fkey'
    ) THEN
        ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
