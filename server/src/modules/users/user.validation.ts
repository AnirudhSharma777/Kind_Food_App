import { UserStatus } from "@prisma/client";
import type { RegisterUserBody, UpdateUserBody, UserListQuery } from "./user.types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
// Activation tokens are 32 random bytes encoded as base64url (43 chars).
const activationTokenPattern = /^[A-Za-z0-9_-]{43}$/;
const statuses = new Set<string>(Object.values(UserStatus));

export class HttpError extends Error {
  constructor(
    readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export class RequestValidationError extends HttpError {
  constructor(message: string) {
    super(400, message);
    this.name = "RequestValidationError";
  }
}

function parseEmail(value: unknown): string {
  if (typeof value !== "string" || !emailPattern.test(value.trim()) || value.length > 320) {
    throw new RequestValidationError("email must be a valid email address of at most 320 characters");
  }

  return value.trim().toLowerCase();
}

function asObject(value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new RequestValidationError("Request body must be a JSON object");
  }

  return value as Record<string, unknown>;
}

function optionalString(
  body: Record<string, unknown>,
  field: string,
  maxLength: number,
): string | undefined {
  const value = body[field];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || value.trim().length === 0 || value.length > maxLength) {
    throw new RequestValidationError(`${field} must be a non-empty string of at most ${maxLength} characters`);
  }

  return value.trim();
}

function optionalStatus(body: Record<string, unknown>): UserStatus | undefined {
  const value = body.status;

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || !statuses.has(value)) {
    throw new RequestValidationError(`status must be one of: ${Object.values(UserStatus).join(", ")}`);
  }

  return value as UserStatus;
}

export function parseUserId(value: string): string {
  if (!uuidPattern.test(value)) {
    throw new RequestValidationError("id must be a valid UUID");
  }

  return value;
}

export function parseRegisterUserBody(input: unknown): RegisterUserBody {
  const body = asObject(input);
  const allowedFields = ["email", "password", "phone", "firstName", "lastName"];
  const unknownFields = Object.keys(body).filter((field) => !allowedFields.includes(field));

  if (unknownFields.length > 0) {
    throw new RequestValidationError(`Unsupported fields: ${unknownFields.join(", ")}`);
  }

  const password = body.password;

  // bcrypt silently ignores everything past 72 *bytes*, so measure bytes, not characters.
  if (typeof password !== "string" || password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    throw new RequestValidationError("password must be at least 8 characters and at most 72 bytes");
  }

  return {
    email: parseEmail(body.email),
    password,
    phone: optionalString(body, "phone", 30),
    firstName: optionalString(body, "firstName", 100),
    lastName: optionalString(body, "lastName", 100),
  };
}

export function parseActivationToken(value: unknown): string {
  if (typeof value !== "string" || !activationTokenPattern.test(value)) {
    throw new RequestValidationError("Activation link is invalid or has expired");
  }

  return value;
}

export function parseResendActivationBody(input: unknown): string {
  const body = asObject(input);
  return parseEmail(body.email);
}

export function parseUpdateUserBody(input: unknown): UpdateUserBody {
  const body = asObject(input);
  const allowedFields = ["email", "phone", "firstName", "lastName", "status"];
  const unknownFields = Object.keys(body).filter((field) => !allowedFields.includes(field));

  if (unknownFields.length > 0) {
    throw new RequestValidationError(`Unsupported fields: ${unknownFields.join(", ")}`);
  }

  if (Object.keys(body).length === 0) {
    throw new RequestValidationError("At least one field is required");
  }

  const result: UpdateUserBody = {
    phone: optionalString(body, "phone", 30),
    firstName: optionalString(body, "firstName", 100),
    lastName: optionalString(body, "lastName", 100),
    status: optionalStatus(body),
  };

  if (body.email !== undefined) {
    result.email = parseEmail(body.email);
  }

  return Object.fromEntries(Object.entries(result).filter(([, value]) => value !== undefined)) as UpdateUserBody;
}

function queryString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function positiveInteger(value: unknown, fallback: number, maximum: number): number {
  const parsed = Number(value ?? fallback);

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > maximum) {
    throw new RequestValidationError(`Pagination values must be integers between 1 and ${maximum}`);
  }

  return parsed;
}

export function parseUserListQuery(query: Record<string, unknown>): UserListQuery {
  const status = queryString(query.status);

  if (status && !statuses.has(status)) {
    throw new RequestValidationError(`status must be one of: ${Object.values(UserStatus).join(", ")}`);
  }

  return {
    page: positiveInteger(query.page, 1, 100_000),
    limit: positiveInteger(query.limit, 20, 100),
    status: status as UserStatus | undefined,
    search: queryString(query.search),
  };
}
