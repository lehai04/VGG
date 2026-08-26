ALTER TABLE "news_posts"
ADD COLUMN "category" VARCHAR(50) NOT NULL DEFAULT 'GENERAL';

CREATE INDEX "news_posts_category_status_published_at_idx"
ON "news_posts"("category", "status", "published_at");
