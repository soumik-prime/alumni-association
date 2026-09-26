/*
  Warnings:

  - The values [Software,IT Services] on the enum `industry` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `batch` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "industry_new" AS ENUM ('Software & IT Services', 'Artificial Intelligence', 'Cybersecurity', 'Cloud Computing', 'Blockchain / Web3', 'Game Development', 'Embedded / IoT', 'Robotics & Automation', 'Telecom', 'Fintech', 'Banking & Finance', 'E-commerce', 'Education', 'Research & Academia', 'Government', 'Healthcare', 'Consulting', 'Startup', 'Manufacturing', 'Other');
ALTER TABLE "companies" ALTER COLUMN "industry" TYPE "industry_new" USING ("industry"::text::"industry_new");
ALTER TYPE "industry" RENAME TO "industry_old";
ALTER TYPE "industry_new" RENAME TO "industry";
DROP TYPE "public"."industry_old";
COMMIT;

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "batch" SET DATA TYPE SMALLINT;
