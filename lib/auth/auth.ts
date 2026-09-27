import "server-only";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { envVariables } from "@/config/env";
import { prisma } from "@/lib/prisma/prisma";
import { sendResetPasswordEmail } from "@/lib/email";

export const auth = betterAuth({
  secret: envVariables.BETTER_AUTH_SECRET,

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