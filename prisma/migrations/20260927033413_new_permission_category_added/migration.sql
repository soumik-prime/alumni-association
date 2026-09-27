/*
  Warnings:

  - The values [Other] on the enum `permission_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "permission_category_new" AS ENUM ('Profile', 'Directory', 'User Management', 'Permission Management', 'Notifications', 'Reference Data', 'Publications', 'Blogs', 'Reports', 'Logs', 'System');
ALTER TABLE "permissions" ALTER COLUMN "category" TYPE "permission_category_new" USING ("category"::text::"permission_category_new");
ALTER TYPE "permission_category" RENAME TO "permission_category_old";
ALTER TYPE "permission_category_new" RENAME TO "permission_category";
DROP TYPE "public"."permission_category_old";
COMMIT;
