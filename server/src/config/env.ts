import "dotenv/config";

function required(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function optional(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function port(value: string | undefined): number {
  const parsed = Number(value ?? 5000);

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65_535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  return parsed;
}

function positiveInteger(name: string, fallback: number): number {
  const parsed = Number(process.env[name] ?? fallback);

  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${name} must be a positive integer`);
  }

  return parsed;
}

const resolvedPort = port(process.env.PORT);

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: resolvedPort,
  databaseUrl: required("DATABASE_URL"),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",

  // Public base URL of this API; used to build the link in activation emails.
  apiBaseUrl: (optional("API_BASE_URL") ?? `http://localhost:${resolvedPort}`).replace(/\/+$/, ""),
  activationTokenTtlMinutes: positiveInteger("ACTIVATION_TOKEN_TTL_MINUTES", 24 * 60),

  // SMTP settings. When SMTP_HOST is unset outside production, emails are
  // printed to the console instead of being sent.
  smtp: {
    host: optional("SMTP_HOST"),
    port: positiveInteger("SMTP_PORT", 587),
    secure: process.env.SMTP_SECURE === "true",
    user: optional("SMTP_USER"),
    pass: optional("SMTP_PASS"),
  },
  mailFrom: optional("MAIL_FROM") ?? "Kind Food <no-reply@kindfood.local>",
} as const;
