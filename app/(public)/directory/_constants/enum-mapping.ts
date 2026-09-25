import { BloodGroup, Degree, Gender, Industry } from "@/generated/prisma/enums";

const gender = {
  Male: Gender.MALE,
  Female: Gender.FEMALE,
} as const;

const bloodGroup = {
  "A+": BloodGroup.A_POSITIVE,
  "A-": BloodGroup.A_NEGATIVE,
  "B+": BloodGroup.B_POSITIVE,
  "B-": BloodGroup.B_NEGATIVE,
  "O+": BloodGroup.O_POSITIVE,
  "O-": BloodGroup.O_NEGATIVE,
  "AB+": BloodGroup.AB_POSITIVE,
  "AB-": BloodGroup.AB_NEGATIVE,
} as const;

const degree = {
  MSc: Degree.MSC,
  MBA: Degree.MBA,
  MPhil: Degree.MPHIL,
  PhD: Degree.PHD,
  PostDoc: Degree.POSTDOC,
  Other: Degree.OTHER,
} as const;

const jobIndustry = {
  "Software & IT Services": Industry.SOFTWARE_IT,
  "Artificial Intelligence": Industry.ARTIFICIAL_INTELLIGENCE,
  Cybersecurity: Industry.CYBERSECURITY,
  "Cloud Computing": Industry.CLOUD_COMPUTING,
  "Blockchain / Web3": Industry.BLOCKCHAIN_WEB3,
  "Game Development": Industry.GAME_DEVELOPMENT,
  "Embedded / IoT": Industry.EMBEDDED_IOT,
  "Robotics & Automation": Industry.ROBOTICS_AUTOMATION,
  Telecom: Industry.TELECOM,
  Fintech: Industry.FINTECH,
  "Banking & Finance": Industry.BANKING_FINANCE,
  "E-commerce": Industry.ECOMMERCE,
  Education: Industry.EDUCATION,
  "Research & Academia": Industry.RESEARCH_ACADEMIA,
  Government: Industry.GOVERNMENT,
  Healthcare: Industry.HEALTHCARE,
  Consulting: Industry.CONSULTING,
  Startup: Industry.STARTUP,
  Manufacturing: Industry.MANUFACTURING,
  Other: Industry.OTHER,
} as const;

export const enumMappings = {
  gender,
  bloodGroup,
  degree,
  jobIndustry,
} as const;
