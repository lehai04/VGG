ALTER TABLE "news_posts" ADD COLUMN "author_name" VARCHAR(120);

UPDATE "news_posts" AS news
SET "author_name" = admins."full_name"
FROM "admins"
WHERE news."author_id" = admins."id"
  AND news."author_name" IS NULL;
