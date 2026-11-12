import type { Prisma, UserStatus } from "@prisma/client";

// Body accepted by POST /users/register. Status is intentionally not accepted:
// every self-registered account starts as PENDING until its email is verified.
export type RegisterUserBody = {
  email: string;
  password: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
};

export type UpdateUserBody = Partial<Omit<RegisterUserBody, "password">> & {
  status?: UserStatus;
};

export type UserListQuery = {
  page: number;
  limit: number;
  status?: UserStatus;
  search?: string;
};

export const publicUserSelect = {
  id: true,
  email: true,
  phone: true,
  firstName: true,
  lastName: true,
  status: true,
  activatedAt: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export type PublicUser = Prisma.UserGetPayload<{ select: typeof publicUserSelect }>;
