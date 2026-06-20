import { z } from "zod";

const phoneRegex = /^[0-9+()\-\s]{7,20}$/;

export const quoteSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  companyName: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  cargoType: z.string().trim().min(2, "Cargo type is required"),
  serviceNeeded: z.string().trim().min(2, "Select a service"),
  pickupLocation: z.string().trim().min(2, "Pickup city and state are required"),
  deliveryLocation: z.string().trim().min(2, "Delivery city and state are required"),
  pickupDate: z.string().trim().min(1, "Pickup date is required"),
  preferredDeliveryDate: z.string().trim().optional(),
  estimatedWeight: z.string().trim().min(1, "Estimated weight is required"),
  dimensions: z.string().trim().min(1, "Dimensions are required"),
  pieceCount: z.string().trim().min(1, "Number of pieces is required"),
  loadingMethod: z.string().trim().min(2, "Loading method is required"),
  specialRequirements: z.string().trim().optional(),
  message: z.string().trim().optional(),
  consentToContact: z
    .boolean()
    .refine((v) => v === true, "Consent to be contacted is required"),
  // Honeypot: must stay empty. Real users never see or fill this field.
  honeypot: z.string().trim().max(0, "Spam detected").optional(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
