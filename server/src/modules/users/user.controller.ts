import type { Request, Response } from "express";
import {
  HttpError,
  parseActivationToken,
  parseRegisterUserBody,
  parseResendActivationBody,
  parseUpdateUserBody,
  parseUserId,
  parseUserListQuery,
} from "./user.validation";
import {
  activateAccount,
  deleteUser,
  findUserById,
  listUsers,
  registerUser,
  resendActivation,
  updateUser,
} from "./user.service";

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
  if (error instanceof HttpError) {
    response.status(error.statusCode).json({ error: error.message });
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

export async function registerUserHandler(request: Request, response: Response): Promise<void> {
  try {
    const user = await registerUser(parseRegisterUserBody(request.body));
    response.status(201).json({
      data: user,
      message: "Registration successful. Check your email for a link to activate your account.",
    });
  } catch (error: unknown) {
    handleError(error, response);
  }
}

export async function activateAccountHandler(request: Request, response: Response): Promise<void> {
  try {
    const { user, alreadyActive } = await activateAccount(parseActivationToken(request.query.token));
    response.status(200).json({
      data: user,
      message: alreadyActive
        ? "Your account is already active. You can log in."
        : "Your account has been activated. You can now log in.",
    });
  } catch (error: unknown) {
    handleError(error, response);
  }
}

export async function resendActivationHandler(request: Request, response: Response): Promise<void> {
  try {
    await resendActivation(parseResendActivationBody(request.body));
    // Same response whether or not the email exists, to avoid account enumeration.
    response.status(202).json({
      message: "If an account with that email is awaiting activation, a new activation link has been sent.",
    });
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
