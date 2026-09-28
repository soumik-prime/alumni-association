/*
  Warnings:

  - The primary key for the `permission_group_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permission_id` on the `permission_group_items` table. All the data in the column will be lost.
  - The primary key for the `permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `permission_id` on the `user_permissions` table. All the data in the column will be lost.
  - Added the required column `permission_key` to the `permission_group_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permission_key` to the `user_permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permission_group_items" DROP CONSTRAINT "permission_group_items_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "user_permissions" DROP CONSTRAINT "user_permissions_permission_id_fkey";

-- DropIndex
DROP INDEX "permission_group_items_permission_id_idx";

-- DropIndex
DROP INDEX "permissions_key_key";

-- DropIndex
DROP INDEX "user_permissions_permission_id_idx";

-- DropIndex
DROP INDEX "user_permissions_user_id_permission_id_key";

-- AlterTable
ALTER TABLE "permission_group_items" DROP CONSTRAINT "permission_group_items_pkey",
DROP COLUMN "permission_id",
ADD COLUMN     "permission_key" TEXT NOT NULL,
ADD CONSTRAINT "permission_group_items_pkey" PRIMARY KEY ("group_id", "permission_key");

-- AlterTable
ALTER TABLE "permission_groups" ADD COLUMN     "is_system" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_pkey",
DROP COLUMN "id",
ALTER COLUMN "category" DROP NOT NULL,
ADD CONSTRAINT "permissions_pkey" PRIMARY KEY ("key");

-- AlterTable
ALTER TABLE "user_permissions" DROP COLUMN "permission_id",
ADD COLUMN     "permission_key" TEXT NOT NULL,
ADD COLUMN     "revoked_at" TIMESTAMP(3),
ADD COLUMN     "revoked_by_id" TEXT;

-- CreateIndex
CREATE INDEX "permission_group_items_permission_key_idx" ON "permission_group_items"("permission_key");

-- CreateIndex
CREATE INDEX "user_permissions_user_id_permission_key_idx" ON "user_permissions"("user_id", "permission_key");

-- CreateIndex
CREATE INDEX "user_permissions_revoked_by_id_idx" ON "user_permissions"("revoked_by_id");

-- CreateIndex
CREATE INDEX "user_permissions_permission_key_idx" ON "user_permissions"("permission_key");

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_permission_key_fkey" FOREIGN KEY ("permission_key") REFERENCES "permissions"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_revoked_by_id_fkey" FOREIGN KEY ("revoked_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_group_items" ADD CONSTRAINT "permission_group_items_permission_key_fkey" FOREIGN KEY ("permission_key") REFERENCES "permissions"("key") ON DELETE CASCADE ON UPDATE CASCADE;
