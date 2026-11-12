import nodemailer, { type Transporter } from "nodemailer";
import { env } from "./env";

export type MailMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

let transporter: Transporter | undefined;

function getTransporter(): Transporter | undefined {
  if (!env.smtp.host) {
    return undefined;
  }

  transporter ??= nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined,
  });

  return transporter;
}

export async function sendMail(message: MailMessage): Promise<void> {
  const smtp = getTransporter();

  if (!smtp) {
    if (env.nodeEnv === "production") {
      throw new Error("SMTP_HOST is not configured; cannot send email in production");
    }

    console.info(`[mail:dev] To: ${message.to}\n[mail:dev] Subject: ${message.subject}\n${message.text}`);
    return;
  }

  await smtp.sendMail({ from: env.mailFrom, ...message });
}
