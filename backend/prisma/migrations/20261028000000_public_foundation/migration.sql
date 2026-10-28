-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ConsultationStatus" AS ENUM ('NEW', 'RECEIVED', 'CONTACTING', 'CONSULTED', 'COMPLETED', 'UNREACHABLE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('DIRECTIVE_DOCUMENT', 'EXECUTION_DOCUMENT', 'BROCHURE', 'PDF_DOCUMENT');

-- CreateEnum
CREATE TYPE "ResourceDocumentType" AS ENUM ('REGULATION', 'RULE', 'PROCESS', 'NOTICE', 'GUIDELINE');

-- CreateTable
CREATE TABLE "news_posts" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(190) NOT NULL,
    "locale" VARCHAR(5) NOT NULL DEFAULT 'vi',
    "title" VARCHAR(250) NOT NULL,
    "category" VARCHAR(50) NOT NULL DEFAULT 'GENERAL',
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "cover_image" VARCHAR(1000),
    "cover_image_alt" VARCHAR(500),
    "meta_title" VARCHAR(250),
    "meta_description" VARCHAR(1000),
    "canonical_url" VARCHAR(1000),
    "robots_index" BOOLEAN NOT NULL DEFAULT true,
    "robots_follow" BOOLEAN NOT NULL DEFAULT true,
    "og_title" VARCHAR(250),
    "og_description" VARCHAR(1000),
    "og_image" VARCHAR(1000),
    "og_image_alt" VARCHAR(500),
    "custom_json_ld" JSONB,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "published_at" TIMESTAMP(3),
    "author_name" VARCHAR(120),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_files" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(190) NOT NULL,
    "locale" VARCHAR(5) NOT NULL DEFAULT 'vi',
    "title" VARCHAR(250) NOT NULL,
    "description" TEXT,
    "category_id" TEXT NOT NULL,
    "resource_type" "ResourceType" NOT NULL,
    "document_type" "ResourceDocumentType",
    "document_number" VARCHAR(100),
    "issue_date" DATE,
    "issuing_organization" VARCHAR(250),
    "file_url" VARCHAR(1000) NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_type" VARCHAR(120) NOT NULL,
    "file_size" INTEGER NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resource_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resource_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_contents" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(190) NOT NULL,
    "locale" VARCHAR(5) NOT NULL DEFAULT 'vi',
    "section" VARCHAR(100) NOT NULL,
    "page" VARCHAR(190) NOT NULL,
    "title" VARCHAR(250),
    "value" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_visits" (
    "id" TEXT NOT NULL,
    "path" VARCHAR(500) NOT NULL,
    "locale" VARCHAR(5),
    "visitor_id" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultations" (
    "id" TEXT NOT NULL,
    "full_name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(190) NOT NULL,
    "phone" VARCHAR(30) NOT NULL,
    "programme" VARCHAR(190),
    "interested_field" VARCHAR(190),
    "preferred_date" DATE,
    "preferred_time" VARCHAR(50),
    "consultation_method" VARCHAR(50),
    "message" TEXT,
    "source_page" VARCHAR(500),
    "source_component" VARCHAR(120),
    "status" "ConsultationStatus" NOT NULL DEFAULT 'NEW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultation_history" (
    "id" TEXT NOT NULL,
    "consultation_id" TEXT NOT NULL,
    "action" VARCHAR(100) NOT NULL,
    "old_status" "ConsultationStatus",
    "new_status" "ConsultationStatus",
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consultation_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_posts_slug_key" ON "news_posts"("slug");

-- CreateIndex
CREATE INDEX "news_posts_status_published_at_idx" ON "news_posts"("status", "published_at");

-- CreateIndex
CREATE INDEX "news_posts_category_status_published_at_idx" ON "news_posts"("category", "status", "published_at");

-- CreateIndex
CREATE UNIQUE INDEX "resource_files_slug_key" ON "resource_files"("slug");

-- CreateIndex
CREATE INDEX "resource_files_status_published_at_idx" ON "resource_files"("status", "published_at");

-- CreateIndex
CREATE INDEX "resource_files_category_id_resource_type_idx" ON "resource_files"("category_id", "resource_type");

-- CreateIndex
CREATE UNIQUE INDEX "resource_categories_name_key" ON "resource_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "site_contents_key_key" ON "site_contents"("key");

-- CreateIndex
CREATE INDEX "site_contents_section_page_locale_idx" ON "site_contents"("section", "page", "locale");

-- CreateIndex
CREATE INDEX "page_visits_created_at_idx" ON "page_visits"("created_at");

-- CreateIndex
CREATE INDEX "page_visits_path_created_at_idx" ON "page_visits"("path", "created_at");

-- CreateIndex
CREATE INDEX "consultations_status_created_at_idx" ON "consultations"("status", "created_at");

-- CreateIndex
CREATE INDEX "consultation_history_consultation_id_created_at_idx" ON "consultation_history"("consultation_id", "created_at");

-- AddForeignKey
ALTER TABLE "resource_files" ADD CONSTRAINT "resource_files_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "resource_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultation_history" ADD CONSTRAINT "consultation_history_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
