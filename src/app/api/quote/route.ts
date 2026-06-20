import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validation/quote";
import { prisma } from "@/lib/db/prisma";
import { sendQuoteEmails } from "@/lib/email/sendQuoteEmail";
import { checkRateLimit, getClientIdentifier } from "@/lib/security/rateLimit";
import { enforceSameSitePost } from "@/lib/security/requestGuards";
import { sanitizeText } from "@/lib/security/sanitize";

export async function POST(request: Request) {
  const originBlocked = enforceSameSitePost(request);
  if (originBlocked) {
    return originBlocked;
  }

  const identifier = getClientIdentifier(request);
  const { allowed } = checkRateLimit(identifier, "quote");
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

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please correct the highlighted fields." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot field caught something — silently report success so bots
  // don't learn the field is being checked, without storing or emailing.
  if (data.honeypot) {
    return NextResponse.json({ success: true });
  }

  try {
    await prisma.quoteRequest.create({
      data: {
        fullName: sanitizeText(data.fullName),
        companyName: sanitizeText(data.companyName),
        email: data.email,
        phone: data.phone,
        cargoType: sanitizeText(data.cargoType),
        serviceNeeded: sanitizeText(data.serviceNeeded),
        pickupLocation: sanitizeText(data.pickupLocation),
        deliveryLocation: sanitizeText(data.deliveryLocation),
        pickupDate: new Date(data.pickupDate),
        preferredDeliveryDate: data.preferredDeliveryDate
          ? new Date(data.preferredDeliveryDate)
          : null,
        estimatedWeight: sanitizeText(data.estimatedWeight),
        dimensions: sanitizeText(data.dimensions),
        pieceCount: sanitizeText(data.pieceCount),
        loadingMethod: sanitizeText(data.loadingMethod),
        specialRequirements: sanitizeText(data.specialRequirements),
        message: sanitizeText(data.message),
        consentToContact: data.consentToContact,
      },
    });
  } catch (error) {
    console.error("Failed to store quote request", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  try {
    await sendQuoteEmails(data);
  } catch (error) {
    // Submission is already stored; email failure should not lose the lead.
    console.error("Failed to send quote emails", error);
  }

  return NextResponse.json({ success: true });
}
