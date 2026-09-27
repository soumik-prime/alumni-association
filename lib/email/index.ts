import { sendEmail } from "./send-email";

import ResetPasswordEmail from "./templates/ResetPasswordEmail";
import WelcomeEmail from "./templates/WelcomeEmail";

export const sendResetPasswordEmail = async ({
  user,
  url,
}: {
  user: {
    name: string;
    email: string;
  };
  url: string;
}): Promise<void> => {
  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    template: ResetPasswordEmail({
      name: user.name,
      resetUrl: url,
    }),
  });
};

export const sendWelcomeEmail = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<void> => {
  await sendEmail({
    to: email,
    subject: "Welcome to Alumni Association",
    template: WelcomeEmail({
      name,
      email,
      password,
    }),
  });
};