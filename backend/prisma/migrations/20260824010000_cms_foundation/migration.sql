CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

CREATE TABLE "news_posts" (
  "id" TEXT PRIMARY KEY, "slug" VARCHAR(190) NOT NULL UNIQUE, "locale" VARCHAR(5) NOT NULL DEFAULT 'vi',
  "title" VARCHAR(250) NOT NULL, "excerpt" TEXT, "content" TEXT NOT NULL, "cover_image" VARCHAR(1000),
  "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT', "published_at" TIMESTAMP(3), "author_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "news_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "news_posts_status_published_at_idx" ON "news_posts"("status", "published_at");

CREATE TABLE "resource_files" (
  "id" TEXT PRIMARY KEY, "slug" VARCHAR(190) NOT NULL UNIQUE, "locale" VARCHAR(5) NOT NULL DEFAULT 'vi',
  "title" VARCHAR(250) NOT NULL, "description" TEXT, "category" VARCHAR(120), "file_url" VARCHAR(1000) NOT NULL,
  "file_name" VARCHAR(255), "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT', "published_at" TIMESTAMP(3), "author_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "resource_files_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "resource_files_status_published_at_idx" ON "resource_files"("status", "published_at");

CREATE TABLE "site_contents" (
  "id" TEXT PRIMARY KEY, "key" VARCHAR(190) NOT NULL UNIQUE, "locale" VARCHAR(5) NOT NULL DEFAULT 'vi',
  "section" VARCHAR(100) NOT NULL, "page" VARCHAR(190) NOT NULL, "title" VARCHAR(250), "value" JSONB NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT false, "author_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "site_contents_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "site_contents_section_page_locale_idx" ON "site_contents"("section", "page", "locale");

CREATE TABLE "page_visits" (
  "id" TEXT PRIMARY KEY, "path" VARCHAR(500) NOT NULL, "locale" VARCHAR(5), "visitor_id" VARCHAR(100),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "page_visits_created_at_idx" ON "page_visits"("created_at");
CREATE INDEX "page_visits_path_created_at_idx" ON "page_visits"("path", "created_at");

CREATE TABLE "applications" (
  "id" TEXT PRIMARY KEY, "full_name" VARCHAR(120) NOT NULL, "email" VARCHAR(190) NOT NULL, "phone" VARCHAR(30) NOT NULL,
  "programme" VARCHAR(190), "status" VARCHAR(50) NOT NULL DEFAULT 'NEW', "metadata" JSONB,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP(3) NOT NULL
);
CREATE INDEX "applications_status_created_at_idx" ON "applications"("status", "created_at");
