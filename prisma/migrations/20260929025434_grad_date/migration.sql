/*
  Warnings:

  - The `graduation_year` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "graduation_year",
ADD COLUMN     "graduation_year" DATE;
