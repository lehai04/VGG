-- Preserve author associations on legacy rows while allowing the new staff-based CMS to create content.
DO $$ BEGIN
 IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='news_posts' AND column_name='author_id') THEN
  ALTER TABLE "news_posts" ALTER COLUMN "author_id" DROP NOT NULL;
 END IF;
 IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='resource_files' AND column_name='author_id') THEN
  ALTER TABLE "resource_files" ALTER COLUMN "author_id" DROP NOT NULL;
 END IF;
END $$;
