import { Resend } from "resend";
import { siteContact } from "@/content/site";
import type { AppointmentFormValues } from "@/lib/validation/appointment";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function sendAppointmentEmails(data: AppointmentFormValues) {
  const resend = getResendClient();
  const companyEmail = process.env.COMPANY_NOTIFICATION_EMAIL || siteContact.email;
  const fromAddress = `${siteContact.companyName} <onboarding@resend.dev>`;

  await resend.emails.send({
    from: fromAddress,
    to: companyEmail,
    subject: `New Appointment Request from ${data.fullName}`,
    text: [
      `Full name: ${data.fullName}`,
      `Company: ${data.companyName || "N/A"}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Preferred date: ${data.preferredDate}`,
      `Preferred time window: ${data.preferredTimeWindow}`,
      `Discussion type: ${data.discussionType}`,
      `Pickup location: ${data.pickupLocation || "N/A"}`,
      `Delivery location: ${data.deliveryLocation || "N/A"}`,
      `Message: ${data.message || "N/A"}`,
    ].join("\n"),
  });

  await resend.emails.send({
    from: fromAddress,
    to: data.email,
    subject: `We received your appointment request - ${siteContact.companyName}`,
    text: [
      `Hi ${data.fullName},`,
      "",
      "Thank you for requesting an appointment. This is a confirmation that we received your request; it is subject to confirmation and is not a guaranteed reservation.",
      "Our team will follow up to confirm the final appointment date and time.",
      "",
      `${siteContact.companyName}`,
      `${siteContact.phoneDisplay}`,
      `${siteContact.email}`,
    ].join("\n"),
  });
}
