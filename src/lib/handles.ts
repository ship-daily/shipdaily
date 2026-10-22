export const HANDLE_MIN = 3;
export const HANDLE_MAX = 30;

const HANDLE_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

// Route names and words that could be confused with the site itself.
const RESERVED = new Set([
  "admin", "api", "app", "auth", "badge", "blog", "credits", "dashboard", "discord", "docs", "help",
  "home", "launch", "launches", "login", "logout", "me", "new", "onboarding", "p", "pro", "products",
  "settings", "shipdaily", "sign-in", "sign-out", "signin", "signup", "support", "u", "user", "users",
]);

/** Returns an error message, or null when the handle is valid. Doesn't check availability. */
export function validateHandle(handle: string): string | null {
  if (handle.length < HANDLE_MIN || handle.length > HANDLE_MAX) {
    return `Handles are ${HANDLE_MIN}–${HANDLE_MAX} characters.`;
  }
  if (!HANDLE_PATTERN.test(handle)) {
    return "Use lowercase letters, numbers and dashes. No dash at the start or end.";
  }
  if (handle.includes("--")) return "No double dashes, please.";
  if (RESERVED.has(handle)) return "That handle is reserved.";
  return null;
}

/** Best-effort handle suggestion from a name or email. */
export function suggestHandle(name: string | null | undefined, email: string): string {
  const base = (name?.trim() || email.split("@")[0])
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, HANDLE_MAX);
  return base.length >= HANDLE_MIN ? base : "";
}
