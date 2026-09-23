import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "../prisma/prisma";

const baseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

const sendResetPasswordEmail = async ({
  user,
  url,
}: {
  user: { email: string; name?: string | null };
  url: string;
}) => {
  const from = process.env.RESEND_FROM_EMAIL || "no-reply@localhost";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(`[password-reset] ${user.email}: ${url}`);
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [user.email],
      subject: "Reset your CSE Alumni Association password",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 12px;">Reset your password</h2>
          <p>Hello ${user.name ?? "there"},</p>
          <p>
            We received a request to reset the password for your CSE Alumni Association account.
            Click the link below to set a new password:
          </p>
          <p>
            <a href="${url}" style="color: #02644a; font-weight: 600;">Reset password</a>
          </p>
          <p>
            If you did not request this, you can safely ignore this email.
          </p>
        </div>
      `,
    }),
  });
};

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "dev-secret-change-me",
  baseURL,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    sendResetPassword: sendResetPasswordEmail,
  },
});
