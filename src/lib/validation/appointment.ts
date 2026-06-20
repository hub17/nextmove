import { z } from "zod";

const phoneRegex = /^[0-9+()\-\s]{7,20}$/;

function isNotPastDate(value: string) {
  if (!value) return false;
  const inputDate = new Date(value);
  if (Number.isNaN(inputDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate.getTime() >= today.getTime();
}

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  companyName: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  preferredDate: z
    .string()
    .trim()
    .min(1, "Preferred date is required")
    .refine(isNotPastDate, "Preferred date cannot be in the past"),
  preferredTimeWindow: z.string().trim().min(1, "Select a preferred time window"),
  discussionType: z.string().trim().min(2, "Select a discussion type"),
  pickupLocation: z.string().trim().optional(),
  deliveryLocation: z.string().trim().optional(),
  message: z.string().trim().optional(),
  consentToContact: z
    .boolean()
    .refine((v) => v === true, "Consent to be contacted is required"),
  honeypot: z.string().trim().max(0, "Spam detected").optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
