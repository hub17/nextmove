import { Resend } from "resend";
import { siteContact } from "@/content/site";
import type { QuoteFormValues } from "@/lib/validation/quote";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function sendQuoteEmails(data: QuoteFormValues) {
  const resend = getResendClient();
  const companyEmail = process.env.COMPANY_NOTIFICATION_EMAIL || siteContact.email;
  const fromAddress = `${siteContact.companyName} <onboarding@resend.dev>`;

  await resend.emails.send({
    from: fromAddress,
    to: companyEmail,
    subject: `New Quote Request from ${data.fullName}`,
    text: [
      `Full name: ${data.fullName}`,
      `Company: ${data.companyName || "N/A"}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Cargo type: ${data.cargoType}`,
      `Service needed: ${data.serviceNeeded}`,
      `Pickup location: ${data.pickupLocation}`,
      `Delivery location: ${data.deliveryLocation}`,
      `Pickup date: ${data.pickupDate}`,
      `Preferred delivery date: ${data.preferredDeliveryDate || "N/A"}`,
      `Estimated weight: ${data.estimatedWeight}`,
      `Dimensions: ${data.dimensions}`,
      `Piece count: ${data.pieceCount}`,
      `Loading method: ${data.loadingMethod}`,
      `Special requirements: ${data.specialRequirements || "N/A"}`,
      `Message: ${data.message || "N/A"}`,
    ].join("\n"),
  });

  await resend.emails.send({
    from: fromAddress,
    to: data.email,
    subject: `We received your quote request - ${siteContact.companyName}`,
    text: [
      `Hi ${data.fullName},`,
      "",
      "Thank you for requesting a freight quote with us. This is a confirmation that we received your request; it is not a binding price quote.",
      "Our team will follow up with pricing and availability shortly.",
      "",
      `${siteContact.companyName}`,
      `${siteContact.phoneDisplay}`,
      `${siteContact.email}`,
    ].join("\n"),
  });
}
