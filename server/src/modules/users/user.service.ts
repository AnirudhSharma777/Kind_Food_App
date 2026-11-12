import { prisma } from "../../config/database";
import type { CreateUserBody, UpdateUserBody, UserListQuery } from "./user.types";
import { publicUserSelect } from "./user.types";

export async function createUser(input: CreateUserBody) {
  return prisma.user.create({
    data: {
      email: input.email,
      phone: input.phone,
      firstName: input.firstName,
      lastName: input.lastName,
      status: input.status,
    },
    select: publicUserSelect,
  });
}

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

