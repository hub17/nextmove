import { NextResponse } from "next/server";

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? process.env.NEXT_PUBLIC_SITE_URL ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter((origin) => origin.length > 0);

function normalizeOrigin(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function enforceSameSitePost(request: Request): NextResponse | null {
  const method = request.method.toUpperCase();
  if (method !== "POST") return null;

  const origin = normalizeOrigin(request.headers.get("origin"));
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? "https";
  const hostOrigin = host ? `${protocol}://${host}` : null;

  // Allow local development without strict origin checks.
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  // If no explicit allow-list is provided, fall back to host origin.
  const validOrigins = allowedOrigins.length > 0 ? allowedOrigins : [hostOrigin].filter(Boolean) as string[];

  if (!origin || !validOrigins.includes(origin)) {
    return NextResponse.json(
      { success: false, message: "Forbidden origin." },
      { status: 403 }
    );
  }

  return null;
}
