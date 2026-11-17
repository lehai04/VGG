ALTER TABLE "news_posts" ADD COLUMN "is_featured" BOOLEAN NOT NULL DEFAULT false;
CREATE UNIQUE INDEX "news_posts_single_featured" ON "news_posts" ("is_featured") WHERE "is_featured" = true;
