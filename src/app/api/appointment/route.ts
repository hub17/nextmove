import { NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validation/appointment";
import { prisma } from "@/lib/db/prisma";
import { sendAppointmentEmails } from "@/lib/email/sendAppointmentEmail";
import { checkRateLimit, getClientIdentifier } from "@/lib/security/rateLimit";
import { enforceSameSitePost } from "@/lib/security/requestGuards";
import { sanitizeText } from "@/lib/security/sanitize";

export async function POST(request: Request) {
  const originBlocked = enforceSameSitePost(request);
  if (originBlocked) {
    return originBlocked;
  }

  const identifier = getClientIdentifier(request);
  const { allowed } = checkRateLimit(identifier, "appointment");
  if (!allowed) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please correct the highlighted fields." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.honeypot) {
    return NextResponse.json({ success: true });
  }

  try {
    await prisma.appointmentRequest.create({
      data: {
        fullName: sanitizeText(data.fullName),
        companyName: sanitizeText(data.companyName),
        email: data.email,
        phone: data.phone,
        preferredDate: new Date(data.preferredDate),
        preferredTimeWindow: sanitizeText(data.preferredTimeWindow),
        discussionType: sanitizeText(data.discussionType),
        pickupLocation: sanitizeText(data.pickupLocation),
        deliveryLocation: sanitizeText(data.deliveryLocation),
        message: sanitizeText(data.message),
        consentToContact: data.consentToContact,
      },
    });
  } catch (error) {
    console.error("Failed to store appointment request", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  try {
    await sendAppointmentEmails(data);
  } catch (error) {
    console.error("Failed to send appointment emails", error);
  }

  return NextResponse.json({ success: true });
}
