/*
  Warnings:

  - You are about to drop the column `graduation_year` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "graduation_year",
ADD COLUMN     "graduation_date" DATE;
