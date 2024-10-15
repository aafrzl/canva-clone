ALTER TABLE "project" ADD COLUMN "thumbnailUrl" text;--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN IF EXISTS "thumbnail";