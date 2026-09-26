BEGIN;

ALTER TABLE "higher_studies" RENAME TO "educations";
ALTER TABLE "educations" RENAME CONSTRAINT "higher_studies_pkey" TO "educations_pkey";
ALTER TABLE "educations" RENAME CONSTRAINT "higher_studies_student_id_fkey" TO "educations_student_id_fkey";
ALTER TABLE "educations" RENAME CONSTRAINT "higher_studies_institution_id_fkey" TO "educations_institution_id_fkey";
ALTER INDEX "higher_studies_student_id_idx" RENAME TO "educations_student_id_idx";
ALTER INDEX "higher_studies_institution_id_idx" RENAME TO "educations_institution_id_idx";

INSERT INTO "educations" (
    "id",
    "student_id",
    "institution_id",
    "degree",
    "created_at",
    "updated_at"
)
SELECT
    gen_random_uuid()::text,
    "id",
    "ssc_institution_id",
    'SSC',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "profiles"
WHERE "ssc_institution_id" IS NOT NULL;

INSERT INTO "educations" (
    "id",
    "student_id",
    "institution_id",
    "degree",
    "created_at",
    "updated_at"
)
SELECT
    gen_random_uuid()::text,
    "id",
    "hsc_institution_id",
    'HSC',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "profiles"
WHERE "hsc_institution_id" IS NOT NULL;

ALTER TABLE "profiles" DROP CONSTRAINT "profiles_ssc_institution_id_fkey";
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_hsc_institution_id_fkey";
ALTER TABLE "profiles" DROP COLUMN "ssc_institution_id";
ALTER TABLE "profiles" DROP COLUMN "hsc_institution_id";

COMMIT;