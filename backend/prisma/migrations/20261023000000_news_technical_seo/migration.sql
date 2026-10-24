ALTER TABLE "news_posts"
  ADD COLUMN "cover_image_alt" VARCHAR(500),
  ADD COLUMN "meta_title" VARCHAR(250),
  ADD COLUMN "meta_description" VARCHAR(1000),
  ADD COLUMN "canonical_url" VARCHAR(1000),
  ADD COLUMN "robots_index" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "robots_follow" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "og_title" VARCHAR(250),
  ADD COLUMN "og_description" VARCHAR(1000),
  ADD COLUMN "og_image" VARCHAR(1000),
  ADD COLUMN "og_image_alt" VARCHAR(500),
  ADD COLUMN "custom_json_ld" JSONB;
