// Strips characters that could enable HTML/script injection if free-text
// fields are ever rendered in an admin tool, email template, or future
// dashboard. Does not attempt full HTML sanitization since current
// free-text fields are plain strings, not rendered as HTML.
export function sanitizeText(value: string | undefined): string {
  if (!value) return "";
  return value
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 2000);
}
