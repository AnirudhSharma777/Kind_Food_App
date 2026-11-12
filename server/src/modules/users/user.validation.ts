import { UserStatus } from "@prisma/client";
import type { CreateUserBody, UpdateUserBody, UserListQuery } from "./user.types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const statuses = new Set<string>(Object.values(UserStatus));

export class RequestValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequestValidationError";
  }
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

export function parseCreateUserBody(input: unknown): CreateUserBody {
  const body = asObject(input);
  const allowedFields = ["email", "phone", "firstName", "lastName", "status"];
  const unknownFields = Object.keys(body).filter((field) => !allowedFields.includes(field));

  if (unknownFields.length > 0) {
    throw new RequestValidationError(`Unsupported fields: ${unknownFields.join(", ")}`);
  }

  const email = body.email;

  if (typeof email !== "string" || !emailPattern.test(email.trim()) || email.length > 320) {
    throw new RequestValidationError("email must be a valid email address of at most 320 characters");
  }

  return {
    email: email.trim().toLowerCase(),
    phone: optionalString(body, "phone", 30),
    firstName: optionalString(body, "firstName", 100),
    lastName: optionalString(body, "lastName", 100),
    status: optionalStatus(body),
  };
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
    if (typeof body.email !== "string" || !emailPattern.test(body.email.trim()) || body.email.length > 320) {
      throw new RequestValidationError("email must be a valid email address of at most 320 characters");
    }

    result.email = body.email.trim().toLowerCase();
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
