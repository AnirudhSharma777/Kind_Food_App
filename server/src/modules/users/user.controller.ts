import type { Request, Response } from "express";
import {
  parseCreateUserBody,
  parseUpdateUserBody,
  parseUserId,
  parseUserListQuery,
  RequestValidationError,
} from "./user.validation";
import { createUser, deleteUser, findUserById, listUsers, updateUser } from "./user.service";

function getRouteParamId(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function isPrismaKnownRequestError(error: unknown): error is Error & { code: string } {
  return error instanceof Error && "code" in error && typeof error.code === "string";
}

function handleError(error: unknown, response: Response): void {
  if (error instanceof RequestValidationError) {
    response.status(400).json({ error: error.message });
    return;
  }

  if (isPrismaKnownRequestError(error)) {
    if (error.code === "P2002") {
      response.status(409).json({ error: "A user with that unique value already exists" });
      return;
    }

    if (error.code === "P2025") {
      response.status(404).json({ error: "User not found" });
      return;
    }

    if (error.code === "P2003") {
      response.status(409).json({ error: "User cannot be deleted because related records exist" });
      return;
    }
  }

  console.error(error);
  response.status(500).json({ error: "Internal server error" });
}

export async function createUserHandler(request: Request, response: Response): Promise<void> {
  try {
    const user = await createUser(parseCreateUserBody(request.body));
    response.status(201).json({ data: user });
  } catch (error: unknown) {
    handleError(error, response);
  }
}

export async function listUsersHandler(request: Request, response: Response): Promise<void> {
  try {
    const result = await listUsers(parseUserListQuery(request.query as Record<string, unknown>));
    response.status(200).json(result);
  } catch (error: unknown) {
    handleError(error, response);
  }
}

export async function getUserHandler(request: Request, response: Response): Promise<void> {
  try {
    const userId = parseUserId(getRouteParamId(request.params.id));
    const user = await findUserById(userId);

    if (!user) {
      response.status(404).json({ error: "User not found" });
      return;
    }

    response.status(200).json({ data: user });
  } catch (error: unknown) {
    handleError(error, response);
  }
}

export async function updateUserHandler(request: Request, response: Response): Promise<void> {
  try {
    const userId = parseUserId(getRouteParamId(request.params.id));
    const user = await updateUser(userId, parseUpdateUserBody(request.body));
    response.status(200).json({ data: user });
  } catch (error: unknown) {
    handleError(error, response);
  }
}

export async function deleteUserHandler(request: Request, response: Response): Promise<void> {
  try {
    const userId = parseUserId(getRouteParamId(request.params.id));
    const user = await deleteUser(userId);
    response.status(200).json({ data: user, message: "User deleted" });
  } catch (error: unknown) {
    handleError(error, response);
  }
}
