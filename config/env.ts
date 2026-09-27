import "server-only";
import "dotenv/config";
import * as z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),

  EMAIL_SENDER_SMTP_USER: z
    .string()
    .min(1, "EMAIL_SENDER_SMTP_USER is required"),
  EMAIL_SENDER_SMTP_PASS: z
    .string()
    .min(1, "EMAIL_SENDER_SMTP_PASS is required"),
  EMAIL_SENDER_SMTP_HOST: z
    .string()
    .min(1, "EMAIL_SENDER_SMTP_HOST is required"),
  EMAIL_SENDER_SMTP_PORT: z.coerce
    .number({ message: "EMAIL_SENDER_SMTP_PORT must be a valid number" })
    .int("EMAIL_SENDER_SMTP_PORT must be an integer")
    .positive("EMAIL_SENDER_SMTP_PORT must be a positive number"),
  EMAIL_SENDER_SMTP_FROM: z.email(
    "EMAIL_SENDER_SMTP_FROM must be a valid email address",
  ),

  AWS_ACCESS_KEY_ID: z.string().min(1, "AWS_ACCESS_KEY_ID is required"),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, "AWS_SECRET_ACCESS_KEY is required"),
  AWS_REGION: z.string().min(1, "AWS_REGION is required"),
  S3_BUCKET: z.string().min(1, "S3_BUCKET is required"),
  DEFAULT_AVATAR_URL: z.url("DEFAULT_AVATAR_URL must be a valid URL"),

  BOOTSTRAP_EMAIL: z.email("BOOTSTRAP_EMAIL must be a valid email address"),

  BOOTSTRAP_NAME: z.string().min(1, "BOOTSTRAP_NAME is required"),
});

const loadEnvVariables = () => {
  const parsedEnv = envSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    console.error(
      "Invalid environment variables:",
      z.flattenError(parsedEnv.error).fieldErrors,
    );

    process.exit(1);
  }

  return parsedEnv.data;
};

export const envVariables = loadEnvVariables();
