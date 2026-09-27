import { randomInt } from "crypto";

interface IPasswordGenerationOptions {
  length?: number;
  includeSpecialChars?: boolean;
}

// Deliberately excludes visually-confusable characters: no `0`/`O`,
// no `1`/`I`/`l`. Don't "fix" these back in — the gaps are intentional
// so a generated password stays unambiguous if anyone ever has to
// read or type it (e.g. from a terminal or a password manager's
// reveal field).
const CHARSETS = {
  uppercase: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  lowercase: "abcdefghijkmnopqrstuvwxyz",
  digit: "23456789",
  specialChars: "!@#$%^&?",
};

const getRandomCharacterFromSet = (charset: string): string => {
  if (!charset.length) {
    throw new Error("Invalid charset provided for password generation");
  }
  return charset[randomInt(0, charset.length)] as string;
};

/**
 * Generates a cryptographically secure random password.
 *
 * - Uses `crypto.randomInt`, not `randomBytes % n`, to avoid modulo bias.
 * - Guarantees at least one uppercase, one lowercase, one digit (and one
 *   special character, if enabled) so the result never accidentally fails
 *   a "must contain X" validation rule on the receiving form.
 * - Shuffles the result (Fisher-Yates) so the guaranteed characters above
 *   don't always land in the same predictable leading positions.
 * - `length` is clamped to [16, 25] regardless of what's passed in.
 */
export const generateSecurePassword = (
  options: IPasswordGenerationOptions = {},
): string => {
  // Use default "true" only when value is undefined or null.
  const includeSpecialChars = options.includeSpecialChars ?? true;
  let length = options.length ?? 16;
  length = Math.min(25, Math.max(16, length));

  const requiredCharsets = [
    CHARSETS.uppercase,
    CHARSETS.lowercase,
    CHARSETS.digit,
  ];

  if (includeSpecialChars) {
    requiredCharsets.push(CHARSETS.specialChars);
  }

  const combinedCharset = requiredCharsets.join("");

  let password = "";

  for (const charset of requiredCharsets) {
    password += getRandomCharacterFromSet(charset);
  }

  while (password.length < length) {
    password += getRandomCharacterFromSet(combinedCharset);
  }

  const chars: string[] = Array.from(password);

  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    const temp = chars[i] as string;
    chars[i] = chars[j] as string;
    chars[j] = temp;
  }

  return chars.join("");
};