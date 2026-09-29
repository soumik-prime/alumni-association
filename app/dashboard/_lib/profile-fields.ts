import { BLOOD_GROUP_LABEL, GENDER_LABEL } from "../_constants/options";
import { optDate, optEnum, optInt, optStr, maxLen, optUrl, optEmail, required, str } from "./form";
import { ActionError } from "./guards";

/** Academic identity — shared by "create profile", "edit profile" and "register user". */
export function readAcademic(fd: FormData) {
  const regNo = required(str(fd, "regNo"), "Registration no.", 9);
  if (!/^[A-Za-z0-9]+$/.test(regNo)) throw new ActionError("Registration no. can only contain letters and digits.");
  const session = required(str(fd, "session"), "Session");
  if (!/^\d{4}-\d{2}$/.test(session)) throw new ActionError("Session must look like 2021-22.");
  const batch = optInt(str(fd, "batch"), "Batch", 1, 500);
  if (batch === null) throw new ActionError("Batch is required.");
  return {
    regNo,
    session,
    batch,
    graduationDate: optDate(str(fd, "graduationDate"), "Graduation date"),
  };
}

export function readIdentity(fd: FormData) {
  return {
    name: required(str(fd, "name"), "Name", 100),
    ...readAcademic(fd),
    photo: optUrl(optStr(fd, "photo"), "Photo link"),
    bio: maxLen(optStr(fd, "bio"), "Bio", 1000),
    gender: optEnum(str(fd, "gender"), GENDER_LABEL, "gender"),
    bloodGroup: optEnum(str(fd, "bloodGroup"), BLOOD_GROUP_LABEL, "blood group"),
  };
}

export function readSocial(fd: FormData) {
  return {
    email: optEmail(optStr(fd, "email"), "Contact email"),
    facebook: optUrl(optStr(fd, "facebook"), "Facebook link"),
    github: optUrl(optStr(fd, "github"), "GitHub link"),
    linkedin: optUrl(optStr(fd, "linkedin"), "LinkedIn link"),
    googleScholar: optUrl(optStr(fd, "googleScholar"), "Google Scholar link"),
    portfolio: optUrl(optStr(fd, "portfolio"), "Portfolio link"),
  };
}
