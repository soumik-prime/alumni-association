/**
 * Permission keys used by the dashboard. These must match the keys seeded in
 * prisma/seed.ts — the DB is the source of truth, this is just a typo-proof
 * handle for them.
 */
export const P = {
  profileCreate: "profile.create",
  profileEditOwn: "profile.edit.own",
  profileEditAny: "profile.edit.any",
  profileDelete: "profile.delete",
  profileVisibility: "profile.visibility.toggle",
  eduOwn: "profile.education.manage.own",
  eduAny: "profile.education.manage.any",
  workOwn: "profile.work_experience.manage.own",
  workAny: "profile.work_experience.manage.any",

  usersCreate: "users.create",
  usersDelete: "users.delete",

  permGrant: "permissions.grant",
  groupsManage: "permissions.groups.manage",
  groupsAssign: "permissions.groups.assign",

  notifCreate: "notifications.create",
  notifEdit: "notifications.edit",
  notifDelete: "notifications.delete",
  notifPublish: "notifications.publish",

  companiesCreate: "companies.create",
  institutionsCreate: "institutions.create",
} as const;

/** Anyone holding one of these gets the Users area. */
export const USERS_AREA: string[] = [
  P.usersCreate,
  P.usersDelete,
  P.profileEditAny,
  P.profileVisibility,
  P.profileDelete,
  P.eduAny,
  P.workAny,
  P.permGrant,
  P.groupsAssign,
];

export const NOTIFICATIONS_AREA: string[] = [
  P.notifCreate,
  P.notifEdit,
  P.notifDelete,
  P.notifPublish,
];

/** Anyone who can grant permissions or manage/assign permission groups. */
export const ACCESS_CONTROL_AREA: string[] = [
  P.permGrant,
  P.groupsManage,
  P.groupsAssign,
];
