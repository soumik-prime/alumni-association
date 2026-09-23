import dotenv from "dotenv";
import { hashPassword } from "better-auth/crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, PermissionCategory } from "../generated/prisma/client";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const bootstrapProfile = {
  id: "bootstrap-profile",
  regNo: "BOOTSTRAP",
  name: "System Administrator",
  batch: 0,
  session: "System",
};

const bootstrapUser = {
  id: "bootstrap-user",
  email: process.env.SEED_ADMIN_EMAIL ?? "admin@alumni.local",
  name: bootstrapProfile.name,
};

const bootstrapPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

const permissions = [
  {
    key: "users.manage",
    description: "Manage user accounts",
    category: PermissionCategory.USER_MANAGEMENT,
  },
  {
    key: "profiles.manage",
    description: "Manage alumni profiles",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "permissions.manage",
    description: "Manage permission definitions",
    category: PermissionCategory.USER_MANAGEMENT,
  },
  {
    key: "permission-groups.manage",
    description: "Manage permission groups",
    category: PermissionCategory.USER_MANAGEMENT,
  },
  {
    key: "institutions.manage",
    description: "Manage academic institutions",
    category: PermissionCategory.OTHER,
  },
  {
    key: "companies.manage",
    description: "Manage companies",
    category: PermissionCategory.OTHER,
  },
  {
    key: "countries.manage",
    description: "Manage countries",
    category: PermissionCategory.OTHER,
  },
  {
    key: "addresses.manage",
    description: "Manage profile addresses",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "higher-studies.manage",
    description: "Manage higher studies",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "work-experiences.manage",
    description: "Manage work experiences",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "publications.manage",
    description: "Manage publications",
    category: PermissionCategory.PUBLICATIONS,
  },
  {
    key: "notifications.manage",
    description: "Manage site notifications",
    category: PermissionCategory.NOTIFICATIONS,
  },
  {
    key: "system.manage",
    description: "Manage system settings",
    category: PermissionCategory.SYSTEM,
  },
] as const;

async function main() {
  const password = await hashPassword(bootstrapPassword);

  const profile = await prisma.profile.upsert({
    where: { regNo: bootstrapProfile.regNo },
    update: {
      name: bootstrapProfile.name,
      batch: bootstrapProfile.batch,
      session: bootstrapProfile.session,
    },
    create: bootstrapProfile,
  });

  const user = await prisma.user.upsert({
    where: { email: bootstrapUser.email },
    update: {
      name: bootstrapUser.name,
      profileId: profile.id,
      emailVerified: true,
    },
    create: {
      ...bootstrapUser,
      profileId: profile.id,
      emailVerified: true,
    },
  });

  await prisma.account.upsert({
    where: { id: "bootstrap-account" },
    update: {
      accountId: user.id,
      providerId: "credential",
      userId: user.id,
      password,
    },
    create: {
      id: "bootstrap-account",
      accountId: user.id,
      providerId: "credential",
      userId: user.id,
      password,
    },
  });

  const seededPermissions = await Promise.all(
    permissions.map((permission) =>
      prisma.permission.upsert({
        where: { key: permission.key },
        update: {
          description: permission.description,
          category: permission.category,
        },
        create: permission,
      }),
    ),
  );

  const permissionGroup = await prisma.permissionGroup.upsert({
    where: { name: "Super Admin" },
    update: {
      description: "Full access to all system management areas",
    },
    create: {
      name: "Super Admin",
      description: "Full access to all system management areas",
    },
  });

  await prisma.permissionGroupItem.deleteMany({
    where: {
      groupId: permissionGroup.id,
      permissionId: { notIn: seededPermissions.map(({ id }) => id) },
    },
  });

  await prisma.permissionGroupItem.createMany({
    data: seededPermissions.map(({ id }) => ({
      groupId: permissionGroup.id,
      permissionId: id,
    })),
    skipDuplicates: true,
  });

  await prisma.userPermissionGroup.upsert({
    where: {
      userId_groupId: {
        userId: user.id,
        groupId: permissionGroup.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      groupId: permissionGroup.id,
    },
  });

  console.log(`Seeded Super Admin access for ${bootstrapUser.email}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });