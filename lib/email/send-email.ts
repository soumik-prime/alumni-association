import "server-only";
import { render } from "@react-email/render";
import { ISendEmailOptions } from "./types";
import { emailTransporter } from "./transporter";
import { envVariables } from "@/config/env";

export const sendEmail = async ({
  to,
  subject,
  template,
  attachments,
}: ISendEmailOptions) => {
  try {
    const html = await render(template);
    const info = await emailTransporter.sendMail({
      from: envVariables.EMAIL_SENDER_SMTP_FROM,
      to,
      subject,
      html,
      attachments,
    });
    // Todo: Consider removing this console.log in production or replace it with a proper logging mechanism
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email");
  }
};