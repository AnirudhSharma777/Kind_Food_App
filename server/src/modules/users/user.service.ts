import { createHash, randomBytes } from "node:crypto";
import { Prisma, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../config/database";
import { env } from "../../config/env";
import { sendMail } from "../../config/mailer";
import type { RegisterUserBody, UpdateUserBody, UserListQuery } from "./user.types";
import { publicUserSelect } from "./user.types";
import { HttpError } from "./user.validation";

const BCRYPT_ROUNDS = 12;
const ACTIVATION_TOKEN_BYTES = 32;
const RESEND_COOLDOWN_MS = 60_000;

const INVALID_ACTIVATION_MESSAGE = "Activation link is invalid or has expired";

// ---------------------------------------------------------------------------
// Activation tokens
// ---------------------------------------------------------------------------

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Creates a new activation token for a user and returns the raw token.
 * The raw token only ever exists in the email link; the database stores its hash.
 */
async function issueActivationToken(tx: Prisma.TransactionClient, userId: string): Promise<string> {
  const token = randomBytes(ACTIVATION_TOKEN_BYTES).toString("base64url");

  await tx.activationToken.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + env.activationTokenTtlMinutes * 60_000),
    },
  });

  return token;
}

async function sendActivationEmail(
  user: { email: string; firstName: string | null },
  token: string,
): Promise<void> {
  const link = `${env.apiBaseUrl}/api/v1/users/activate?token=${encodeURIComponent(token)}`;
  const greeting = user.firstName ? `Hi ${user.firstName},` : "Hi,";
  const hours = Math.round((env.activationTokenTtlMinutes / 60) * 10) / 10;

  await sendMail({
    to: user.email,
    subject: "Activate your Kind Food account",
    text: `${greeting}\n\nActivate your account by opening this link:\n${link}\n\nThe link expires in ${hours} hour(s). If you did not sign up, you can ignore this email.`,
    html: `<p>${escapeHtml(greeting)}</p><p>Activate your account by clicking the link below:</p><p><a href="${link}">Activate my account</a></p><p>The link expires in ${hours} hour(s). If you did not sign up, you can ignore this email.</p>`,
  });
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

// ---------------------------------------------------------------------------
// Registration flow: register (PENDING) -> email -> activate (ACTIVE)
// ---------------------------------------------------------------------------

export async function registerUser(input: RegisterUserBody) {
  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

  // Create the user and its first token atomically, so we never end up with a
  // PENDING user that has no way to be activated. A duplicate email/phone
  // fails here with Prisma error P2002, which the controller maps to 409.
  const { user, token } = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: input.email,
        phone: input.phone,
        firstName: input.firstName,
        lastName: input.lastName,
        passwordHash,
        status: UserStatus.PENDING,
      },
      select: publicUserSelect,
    });

    return { user, token: await issueActivationToken(tx, user.id) };
  });

  // Email is sent after the commit. If delivery fails the account still exists
  // as PENDING and the user can request a new link via /resend-activation.
  try {
    await sendActivationEmail(user, token);
  } catch (error: unknown) {
    console.error(`Failed to send activation email for user ${user.id}`, error);
  }

  return user;
}

export async function activateAccount(token: string) {
  const now = new Date();

  return prisma.$transaction(async (tx) => {
    const record = await tx.activationToken.findUnique({
      where: { tokenHash: hashToken(token) },
      select: { id: true, userId: true, expiresAt: true, usedAt: true },
    });

    if (!record) {
      throw new HttpError(400, INVALID_ACTIVATION_MESSAGE);
    }

    // Clicking the same link twice should not look like an error.
    if (record.usedAt) {
      const user = await tx.user.findUniqueOrThrow({ where: { id: record.userId }, select: publicUserSelect });

      if (user.status === UserStatus.ACTIVE) {
        return { user, alreadyActive: true };
      }

      throw new HttpError(400, INVALID_ACTIVATION_MESSAGE);
    }

    if (record.expiresAt <= now) {
      throw new HttpError(400, INVALID_ACTIVATION_MESSAGE);
    }

    // Claim the token with a conditional update so two concurrent requests
    // cannot both consume it.
    const claimed = await tx.activationToken.updateMany({
      where: { id: record.id, usedAt: null },
      data: { usedAt: now },
    });

    if (claimed.count !== 1) {
      throw new HttpError(400, INVALID_ACTIVATION_MESSAGE);
    }

    const current = await tx.user.findUniqueOrThrow({ where: { id: record.userId }, select: { status: true } });

    if (current.status === UserStatus.SUSPENDED || current.status === UserStatus.DEACTIVATED) {
      throw new HttpError(403, "This account cannot be activated. Please contact support.");
    }

    // Invalidate any other outstanding links for this user.
    await tx.activationToken.updateMany({
      where: { userId: record.userId, usedAt: null },
      data: { usedAt: now },
    });

    const user = await tx.user.update({
      where: { id: record.userId },
      data: { status: UserStatus.ACTIVE, activatedAt: now },
      select: publicUserSelect,
    });

    return { user, alreadyActive: false };
  });
}

/**
 * Sends a fresh activation link to a PENDING account. Always resolves without
 * revealing whether the email is registered, to avoid account enumeration.
 */
export async function resendActivation(email: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, firstName: true, status: true },
  });

  if (!user || user.status !== UserStatus.PENDING) {
    return;
  }

  const recent = await prisma.activationToken.findFirst({
    where: { userId: user.id, createdAt: { gt: new Date(Date.now() - RESEND_COOLDOWN_MS) } },
    select: { id: true },
  });

  if (recent) {
    return;
  }

  const token = await prisma.$transaction(async (tx) => {
    // Only the newest link should work.
    await tx.activationToken.deleteMany({ where: { userId: user.id, usedAt: null } });
    return issueActivationToken(tx, user.id);
  });

  try {
    await sendActivationEmail(user, token);
  } catch (error: unknown) {
    console.error(`Failed to resend activation email for user ${user.id}`, error);
  }
}

// ---------------------------------------------------------------------------
// User management
// ---------------------------------------------------------------------------

export async function listUsers(query: UserListQuery) {
  const where = {
    status: query.status,
    ...(query.search
      ? {
          OR: [
            { email: { contains: query.search, mode: "insensitive" as const } },
            { firstName: { contains: query.search, mode: "insensitive" as const } },
            { lastName: { contains: query.search, mode: "insensitive" as const } },
            { phone: { contains: query.search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const skip = (query.page - 1) * query.limit;

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      skip,
      take: query.limit,
      orderBy: { createdAt: "desc" },
      select: publicUserSelect,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: publicUserSelect,
  });
}

export async function updateUser(id: string, input: UpdateUserBody) {
  return prisma.user.update({
    where: { id },
    data: input,
    select: publicUserSelect,
  });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
    select: publicUserSelect,
  });
}