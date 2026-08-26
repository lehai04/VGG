CREATE TYPE "ResourceType" AS ENUM ('DIRECTIVE_DOCUMENT', 'EXECUTION_DOCUMENT', 'BROCHURE', 'PDF_DOCUMENT');
CREATE TYPE "ResourceDocumentType" AS ENUM ('REGULATION', 'RULE', 'PROCESS', 'NOTICE', 'GUIDELINE');

CREATE TABLE "resource_categories" (
  "id" TEXT NOT NULL,
  "name" VARCHAR(120) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "resource_categories_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "resource_categories_name_key" ON "resource_categories"("name");

INSERT INTO "resource_categories" ("id", "name")
SELECT 'legacy-' || md5("category"), "category"
FROM "resource_files"
WHERE "category" IS NOT NULL AND btrim("category") <> ''
GROUP BY "category"
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "resource_categories" ("id", "name")
VALUES ('default-resource-category', 'Tài nguyên chung')
ON CONFLICT ("name") DO NOTHING;

ALTER TABLE "resource_files"
  ADD COLUMN "category_id" TEXT,
  ADD COLUMN "resource_type" "ResourceType" NOT NULL DEFAULT 'PDF_DOCUMENT',
  ADD COLUMN "document_type" "ResourceDocumentType",
  ADD COLUMN "document_number" VARCHAR(100),
  ADD COLUMN "issue_date" DATE,
  ADD COLUMN "issuing_organization" VARCHAR(250),
  ADD COLUMN "file_type" VARCHAR(120) NOT NULL DEFAULT 'application/octet-stream',
  ADD COLUMN "file_size" INTEGER NOT NULL DEFAULT 0;

UPDATE "resource_files" AS resource
SET "category_id" = category."id"
FROM "resource_categories" AS category
WHERE resource."category" = category."name";

UPDATE "resource_files"
SET "category_id" = (SELECT "id" FROM "resource_categories" WHERE "name" = 'Tài nguyên chung')
WHERE "category_id" IS NULL;

ALTER TABLE "resource_files"
  ALTER COLUMN "category_id" SET NOT NULL,
  ALTER COLUMN "file_name" SET NOT NULL,
  DROP COLUMN "category";

ALTER TABLE "resource_files"
  ADD CONSTRAINT "resource_files_category_id_fkey"
  FOREIGN KEY ("category_id") REFERENCES "resource_categories"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "resource_files_category_id_resource_type_idx"
  ON "resource_files"("category_id", "resource_type");
