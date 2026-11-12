import type { Prisma , UserStatus} from "@prisma/client";

// export type UserStatus = NonNullable<Prisma.UserGetPayload<{}>["status"]>;

export type CreateUserBody = {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  status?: UserStatus;
};

export type UpdateUserBody = Partial<CreateUserBody>;

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
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export type PublicUser = Prisma.UserGetPayload<{ select: typeof publicUserSelect }>;


