import type { SendMailOptions } from "nodemailer";

export interface ISendEmailOptions {
  to: string | string[];
  subject: string;
  template: React.ReactElement;
  attachments?: SendMailOptions["attachments"];
}