import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const roles = [
  { name: "ADMIN", description: "Full platform administration access" },
  { name: "RESTAURANT_OWNER", description: "Restaurant and store owner access" },
  { name: "MANAGER", description: "Operational management access" },
  { name: "CUSTOMER", description: "Customer ordering access" },
  { name: "DELIVERY_PARTNER", description: "Delivery operations access" },
] as const;

const permissions = [
  { code: "platform.manage", description: "Manage platform configuration" },
  { code: "users.manage", description: "Manage users and roles" },
  { code: "restaurants.manage", description: "Manage restaurants and stores" },
  { code: "catalog.manage", description: "Manage catalog and inventory" },
  { code: "orders.manage", description: "Manage orders" },
  { code: "orders.view", description: "View orders" },
  { code: "delivery.manage", description: "Manage deliveries" },
  { code: "payouts.manage", description: "Manage commissions and payouts" },
] as const;

const rolePermissions: Record<string, string[]> = {
  ADMIN: permissions.map((permission) => permission.code),
  RESTAURANT_OWNER: [
    "restaurants.manage",
    "catalog.manage",
    "orders.manage",
    "orders.view",
    "payouts.manage",
  ],
  MANAGER: ["catalog.manage", "orders.manage", "orders.view", "delivery.manage"],
  CUSTOMER: ["orders.view"],
  DELIVERY_PARTNER: ["orders.view", "delivery.manage"],
};

async function main(): Promise<void> {
  const permissionRecords = new Map<string, { id: string }>();

  for (const permission of permissions) {
    const record = await prisma.permission.upsert({
      where: { code: permission.code },
      update: { description: permission.description },
      create: permission,
      select: { id: true },
    });

    permissionRecords.set(permission.code, record);
  }

  for (const role of roles) {
    const roleRecord = await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
      select: { id: true },
    });

    for (const permissionCode of rolePermissions[role.name] ?? []) {
      const permissionRecord = permissionRecords.get(permissionCode);

      if (!permissionRecord) {
        throw new Error(`Permission ${permissionCode} was not seeded`);
      }

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: roleRecord.id,
            permissionId: permissionRecord.id,
          },
        },
        update: {},
        create: {
          roleId: roleRecord.id,
          permissionId: permissionRecord.id,
        },
      });
    }
  }

  console.log(`Seeded ${roles.length} roles and ${permissions.length} permissions.`);
}

main()
  .catch((error: unknown) => {
    console.error("Database seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
