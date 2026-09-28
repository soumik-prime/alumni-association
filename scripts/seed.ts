import { PermissionCategory } from "../generated/prisma/client";
import { auth } from "@/lib/auth/auth";
import { generateSecurePassword } from "@/lib/auth/generate-password";
import { prisma } from "@/lib/prisma/prisma";


if (!process.env.BOOTSTRAP_EMAIL || !process.env.BOOTSTRAP_NAME ) {
  throw new Error(
    "BOOTSTRAP_EMAIL, BOOTSTRAP_NAME are required to seed the database.",
  );
}
const bootstrapEmail: string = process.env.BOOTSTRAP_EMAIL;
const bootstrapName: string = process.env.BOOTSTRAP_NAME;
const bootstrapPassword: string = generateSecurePassword();

export const permissions = [
  // ---- Profile ----
  {
    key: "profile.create",
    description:
      "Create your own profile (self only — no creating on behalf of others)",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "profile.edit.own",
    description: "Edit your own profile (identity, social, address)",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "profile.edit.any",
    description: "Edit any community member's profile",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "profile.delete",
    description:
      "Delete a profile — grants apply to others' profiles only; self-delete stays blocked regardless of this grant",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "profile.delete.request",
    description: "Submit a request to delete your own profile, pending review",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "profile.visibility.toggle",
    description: "Show/hide a profile from the public directory",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "profile.education.manage.own",
    description: "Add/edit/delete education records on your own profile",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "profile.education.manage.any",
    description: "Add/edit/delete education records on any profile",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "profile.work_experience.manage.own",
    description: "Add/edit/delete work experience records on your own profile",
    category: PermissionCategory.PROFILE,
  },
  {
    key: "profile.work_experience.manage.any",
    description: "Add/edit/delete work experience records on any profile",
    category: PermissionCategory.PROFILE,
  },

  // ---- Directory ----
  {
    key: "directory.view",
    description: "View the public alumni directory",
    category: PermissionCategory.DIRECTORY,
  },
  {
    key: "directory.view_hidden",
    description: "View profiles that have opted out of the public directory",
    category: PermissionCategory.DIRECTORY,
  },

  // ---- User Management ----
  {
    key: "users.create",
    description: "Register a new account",
    category: PermissionCategory.USER_MANAGEMENT,
  },
  {
    key: "users.delete",
    description: "Delete a user account",
    category: PermissionCategory.USER_MANAGEMENT,
  },

  // ---- Permission Management ----
  {
    key: "permissions.grant",
    description: "Grant or revoke direct permissions on a user",
    category: PermissionCategory.PERMISSION_MANAGEMENT,
  },
  {
    key: "permissions.groups.manage",
    description: "Create/edit permission groups and their permission sets",
    category: PermissionCategory.PERMISSION_MANAGEMENT,
  },
  {
    key: "permissions.groups.assign",
    description: "Add/remove a user from a permission group",
    category: PermissionCategory.PERMISSION_MANAGEMENT,
  },

  // ---- Notifications ----
  {
    key: "notifications.create",
    description: "Create site notifications",
    category: PermissionCategory.NOTIFICATIONS,
  },
  {
    key: "notifications.edit",
    description: "Edit an existing site notification",
    category: PermissionCategory.NOTIFICATIONS,
  },
  {
    key: "notifications.delete",
    description: "Delete site notifications",
    category: PermissionCategory.NOTIFICATIONS,
  },
  {
    key: "notifications.publish",
    description: "Publish/schedule notifications live",
    category: PermissionCategory.NOTIFICATIONS,
  },

  // ---- Reference Data: Companies ----
  {
    key: "companies.create",
    description: "Add a new company/organization",
    category: PermissionCategory.REFERENCE_DATA,
  },
  {
    key: "companies.edit",
    description: "Edit an existing company/organization",
    category: PermissionCategory.REFERENCE_DATA,
  },
  {
    key: "companies.delete",
    description: "Delete a company/organization",
    category: PermissionCategory.REFERENCE_DATA,
  },
  {
    key: "companies.request",
    description:
      "Submit a request to add a new company/organization, pending review",
    category: PermissionCategory.REFERENCE_DATA,
  },

  // ---- Reference Data: Institutions ----
  {
    key: "institutions.create",
    description: "Add a new educational institution",
    category: PermissionCategory.REFERENCE_DATA,
  },
  {
    key: "institutions.edit",
    description: "Edit an existing educational institution",
    category: PermissionCategory.REFERENCE_DATA,
  },
  {
    key: "institutions.delete",
    description: "Delete an educational institution",
    category: PermissionCategory.REFERENCE_DATA,
  },
  {
    key: "institutions.request",
    description:
      "Submit a request to add a new educational institution, pending review",
    category: PermissionCategory.REFERENCE_DATA,
  },

  // ---- Reference Data: Cities ----
  {
    key: "cities.create",
    description: "Add a new city",
    category: PermissionCategory.REFERENCE_DATA,
  },
  {
    key: "cities.edit",
    description: "Edit an existing city",
    category: PermissionCategory.REFERENCE_DATA,
  },
  {
    key: "cities.delete",
    description: "Delete a city",
    category: PermissionCategory.REFERENCE_DATA,
  },

  // ---- Reference Data: Countries ----
  {
    key: "countries.create",
    description: "Add a new country",
    category: PermissionCategory.REFERENCE_DATA,
  },
  {
    key: "countries.edit",
    description: "Edit an existing country",
    category: PermissionCategory.REFERENCE_DATA,
  },
  {
    key: "countries.delete",
    description: "Delete a country",
    category: PermissionCategory.REFERENCE_DATA,
  },
  {
    key: "countries.request",
    description: "Submit a request to add a new country, pending review",
    category: PermissionCategory.REFERENCE_DATA,
  },

  // ---- Reference Data: Review ----
  {
    key: "reference_data.review",
    description:
      "Review, approve, or reject submitted reference-data requests",
    category: PermissionCategory.REFERENCE_DATA,
  },
] as const;

async function main() {
  // ---------------------------------------------------------------
  // 1. Bootstrap account — created THROUGH better-auth, not by hand.
  //    Hashing the password and writing directly into "account"
  //    ourselves risks drifting from whatever shape/hooks better-auth
  //    actually expects there. signUpEmail is the same path a real
  //    user hits when registering, so the resulting row is guaranteed
  //    consistent with everything else the auth system manages.
  // ---------------------------------------------------------------
  let user = await prisma.user.findUnique({ where: { email: bootstrapEmail } });

  if (!user) {
    const signUpResult = await auth.api.signUpEmail({
      body: {
        email: bootstrapEmail,
        name: bootstrapName,
        password: bootstrapPassword,
      },
    });
    user = await prisma.user.findUniqueOrThrow({
      where: { id: signUpResult.user.id },
    });
  }

  // better-auth's signUpEmail leaves emailVerified false by default —
  // force it true for the seeded bootstrap admin, and keep the name
  // in sync in case BOOTSTRAP_NAME changed since the account was made.
  user = await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true, name: bootstrapName },
  });

  // NOTE: Profile.userId is required, but User.profile is optional —
  // an admin/operator account like this one is not necessarily an
  // alumnus, so no Profile is created here. If this bootstrap account
  // should also appear in the alumni directory, create a Profile
  // afterward with userId: user.id (Profile must come after User,
  // since the FK now lives on Profile, not the other way around).

  // ---------------------------------------------------------------
  // 2. Permissions — upsert every permission definition by its key
  //    (key IS the primary key now, no separate generated id).
  // ---------------------------------------------------------------
  await Promise.all(
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

  const allPermissionKeys = permissions.map((p) => p.key);

  // ---------------------------------------------------------------
  // 3. Super Admin permission group — system-protected (isSystem),
  //    holds every permission key in the table.
  // ---------------------------------------------------------------
  const permissionGroup = await prisma.permissionGroup.upsert({
    where: { name: "Super Admin" },
    update: {
      description: "Full access to all system management areas",
      isSystem: true,
    },
    create: {
      name: "Super Admin",
      description: "Full access to all system management areas",
      isSystem: true,
    },
  });

  await prisma.permissionGroupItem.deleteMany({
    where: {
      groupId: permissionGroup.id,
      permissionKey: { notIn: allPermissionKeys },
    },
  });

  await prisma.permissionGroupItem.createMany({
    data: allPermissionKeys.map((permissionKey) => ({
      groupId: permissionGroup.id,
      permissionKey,
    })),
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------
  // 4. Put the bootstrap user in the Super Admin group.
  // ---------------------------------------------------------------
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

  console.log(`Seeded Super Admin access for ${user.email} with password: ${bootstrapPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });