import "server-only";
import nodemailer from "nodemailer";
import { envVariables } from "@/config/env";

export const emailTransporter = nodemailer.createTransport({
  host: envVariables.EMAIL_SENDER_SMTP_HOST,
  port: envVariables.EMAIL_SENDER_SMTP_PORT,
  secure: envVariables.EMAIL_SENDER_SMTP_PORT === 465,
  auth: {
    user: envVariables.EMAIL_SENDER_SMTP_USER,
    pass: envVariables.EMAIL_SENDER_SMTP_PASS,
  },
});