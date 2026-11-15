import type { Request, RequestHandler, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../../config/env";

export type AuthenticatedUser = {
  id: string;
  roles: string[];
};

export const managerAssignableRoleNames: readonly string[] = ["CUSTOMER", "DELIVERY_PARTNER"];

declare global {
  namespace Express {
    interface Request {
      auth?: AuthenticatedUser;
    }
  }
}

function sendUnauthorized(response: Response): void {
  response.status(401).json({ error: "A valid Bearer token is required" });
}

function bearerToken(request: Request): string | undefined {
  const authorization = request.get("authorization");

  if (!authorization) {
    return undefined;
  }

  const [scheme, token, ...extra] = authorization.trim().split(/\s+/);

  return scheme === "Bearer" && token && extra.length === 0 ? token : undefined;
}

function authenticatedUser(payload: string | JwtPayload): AuthenticatedUser | undefined {
  if (typeof payload === "string" || typeof payload.userId !== "string" || payload.userId.length === 0) {
    return undefined;
  }

  // Tokens issued before role claims were added remain valid, but cannot access
  // role-protected endpoints until the user logs in again.
  if (payload.roles === undefined) {
    return { id: payload.userId, roles: [] };
  }

  if (!Array.isArray(payload.roles) || !payload.roles.every((role) => typeof role === "string")) {
    return undefined;
  }

  return { id: payload.userId, roles: payload.roles };
}

export const requireAuth: RequestHandler = (request, response, next) => {
  const token = bearerToken(request);

  if (!token) {
    sendUnauthorized(response);
    return;
  }

  try {
    const user = authenticatedUser(jwt.verify(token, env.jwtSecret));

    if (!user) {
      sendUnauthorized(response);
      return;
    }

    request.auth = user;
    next();
  } catch {
    sendUnauthorized(response);
  }
};

export function requireRole(...roles: string[]): RequestHandler {
  return (request, response, next) => {
    if (!request.auth) {
      sendUnauthorized(response);
      return;
    }

    if (!roles.some((role) => request.auth?.roles.includes(role))) {
      response.status(403).json({ error: "You do not have permission to access this resource" });
      return;
    }

    next();
  };
}

export function requireSelfOrRole(...roles: string[]): RequestHandler {
  return (request, response, next) => {
    if (!request.auth) {
      sendUnauthorized(response);
      return;
    }

    const userId = request.params.id;
    const isSelf = typeof userId === "string" && request.auth.id === userId;
    const hasRole = roles.some((role) => request.auth?.roles.includes(role));

    if (!isSelf && !hasRole) {
      response.status(403).json({ error: "You do not have permission to access this user" });
      return;
    }

    next();
  };
}
