import type {
  BloodGroup,
  Degree,
  EmploymentType,
  Gender,
  Industry,
  NotificationType,
  PublicationStatus,
  PublicationType,
} from "@/generated/prisma/enums";

/** Display labels mirror the @map(...) values in the Prisma schema. */
export const APP_TIMEZONE = "Asia/Dhaka";

/** <option value> used by institution/company pickers for "add a new one". */
export const NEW_OPTION = "__new__";

export const DEGREE_LABEL = {
  SSC: "SSC", HSC: "HSC", MSC: "MSc", MBA: "MBA", MPHIL: "MPhil",
  PHD: "PhD", POSTDOC: "Postdoc", OTHER: "Other",
} satisfies Record<Degree, string>;

export const EMPLOYMENT_LABEL = {
  FULL_TIME: "Full-time", PART_TIME: "Part-time", INTERNSHIP: "Internship",
  CONTRACT: "Contract", FREELANCE: "Freelance", SELF_EMPLOYED: "Self-employed",
  TEMPORARY: "Temporary", APPRENTICESHIP: "Apprenticeship",
  RESEARCH_ASSISTANTSHIP: "Research Assistantship",
  TEACHING_ASSISTANTSHIP: "Teaching Assistantship", VOLUNTEER: "Volunteer",
  OTHER: "Other",
} satisfies Record<EmploymentType, string>;

export const INDUSTRY_LABEL = {
  SOFTWARE_IT: "Software & IT Services", ARTIFICIAL_INTELLIGENCE: "Artificial Intelligence",
  CYBERSECURITY: "Cybersecurity", CLOUD_COMPUTING: "Cloud Computing",
  BLOCKCHAIN_WEB3: "Blockchain / Web3", GAME_DEVELOPMENT: "Game Development",
  EMBEDDED_IOT: "Embedded / IoT", ROBOTICS_AUTOMATION: "Robotics & Automation",
  TELECOM: "Telecom", FINTECH: "Fintech", BANKING_FINANCE: "Banking & Finance",
  ECOMMERCE: "E-commerce", EDUCATION: "Education", RESEARCH_ACADEMIA: "Research & Academia",
  GOVERNMENT: "Government", HEALTHCARE: "Healthcare", CONSULTING: "Consulting",
  STARTUP: "Startup", MANUFACTURING: "Manufacturing", OTHER: "Other",
} satisfies Record<Industry, string>;

export const GENDER_LABEL = { MALE: "Male", FEMALE: "Female" } satisfies Record<Gender, string>;

export const BLOOD_GROUP_LABEL = {
  A_POSITIVE: "A+", A_NEGATIVE: "A-", B_POSITIVE: "B+", B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+", AB_NEGATIVE: "AB-", O_POSITIVE: "O+", O_NEGATIVE: "O-",
} satisfies Record<BloodGroup, string>;

export const NOTIFICATION_TYPE_LABEL = {
  INFO: "Info", WARNING: "Warning", ANNOUNCEMENT: "Announcement", EVENT: "Event",
  NOTICE: "Notice", DEVELOPMENT: "Development", MAINTENANCE: "Maintenance",
  TESTING: "Testing",
} satisfies Record<NotificationType, string>;

export const PUBLICATION_TYPE_LABEL = {
  JOURNAL: "Journal", CONFERENCE: "Conference", BOOK_CHAPTER: "Book chapter",
  THESIS: "Thesis", OTHER: "Other",
} satisfies Record<PublicationType, string>;

export const PUBLICATION_STATUS_LABEL = {
  DRAFT: "Draft", SUBMITTED: "Submitted", UNDER_REVIEW: "Under review",
  PUBLISHED: "Published", REJECTED: "Rejected",
} satisfies Record<PublicationStatus, string>;

export const CATEGORY_LABEL: Record<string, string> = {
  PROFILE: "Profile", DIRECTORY: "Directory", USER_MANAGEMENT: "User Management",
  PERMISSION_MANAGEMENT: "Permission Management", NOTIFICATIONS: "Notifications",
  REFERENCE_DATA: "Reference Data", PUBLICATIONS: "Publications", BLOGS: "Blogs",
  REPORTS: "Reports", LOGS: "Logs", SYSTEM: "System",
};

/** `{ KEY: "Label" }` -> `[{ value: "KEY", label: "Label" }]` for <Select>. */
export function toOptions<T extends string>(map: Record<T, string>) {
  return (Object.keys(map) as T[]).map((value) => ({ value, label: map[value] }));
}
