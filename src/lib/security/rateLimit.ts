// Simple in-memory rate limiter for the MVP.
// Limits requests per identifier (e.g. IP address) within a time window.
// NOTE: in-memory state resets on server restart and does not share state
// across multiple server instances. This is acceptable for the MVP launch
// scale described in the architecture doc; revisit with a shared store
// (e.g. Redis/Upstash) if traffic or abuse increases.

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;
const MAX_ENTRIES = 10_000;

const requestLog = new Map<string, RateLimitEntry>();

function pruneExpiredEntries(now: number) {
  for (const [key, entry] of requestLog.entries()) {
    if (now - entry.windowStart > WINDOW_MS) {
      requestLog.delete(key);
    }
  }
}

export function checkRateLimit(
  identifier: string,
  scope = "default"
): { allowed: boolean } {
  const now = Date.now();
  const key = `${scope}:${identifier}`;
  const entry = requestLog.get(key);

  if (requestLog.size > MAX_ENTRIES) {
    pruneExpiredEntries(now);
  }

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    requestLog.set(key, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false };
  }

  entry.count += 1;
  return { allowed: true };
}

export function getClientIdentifier(request: Request): string {
  const headersToCheck = [
    "cf-connecting-ip",
    "x-real-ip",
    "x-forwarded-for",
  ];

  for (const headerName of headersToCheck) {
    const value = request.headers.get(headerName);
    if (!value) continue;

    const first = value.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  return "unknown";
}
