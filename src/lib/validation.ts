// Client-side business rules. Server enforces the same rules in stage 3.

export const PASSWORD_MIN_LENGTH = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 12-digit runs are Aadhaar-shaped; the questionnaire must never collect them.
const AADHAAR_RE = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
// Bank account numbers are 9-18 digit runs; blocked in free-text answers.
const BANK_RE = /\b\d{9,18}\b/;

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required.';
  if (!EMAIL_RE.test(email.trim())) return 'Enter a valid email address.';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required.';
  if (password.length < PASSWORD_MIN_LENGTH)
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) return 'Name is required.';
  if (name.trim().length > 80) return 'Name must be 80 characters or fewer.';
  return null;
}

export function validateConfirm(password: string, confirm: string): string | null {
  if (password !== confirm) return 'Passwords do not match.';
  return null;
}

export function validateNoSensitiveId(text: string): string | null {
  if (AADHAAR_RE.test(text))
    return 'Do not enter an Aadhaar number. This platform never asks for it.';
  if (BANK_RE.test(text))
    return 'Do not enter bank account numbers. This platform never asks for them.';
  return null;
}

export function validateDeadlineVerified(verified: boolean, verifiedDate: string): string | null {
  if (verified && !verifiedDate) return 'A verified deadline needs a verified date.';
  return null;
}
