import { describe, it, expect } from "vitest";
import { quoteSchema } from "../quote";

const validQuote = {
  fullName: "Jane Smith",
  companyName: "Acme Co",
  email: "jane@example.com",
  phone: "+1 914 555 1234",
  cargoType: "Boxed retail goods",
  serviceNeeded: "Sprinter Van Freight",
  pickupLocation: "Albany, NY",
  deliveryLocation: "Syracuse, NY",
  pickupDate: "2030-01-15",
  preferredDeliveryDate: "2030-01-16",
  estimatedWeight: "500 lbs",
  dimensions: "48x40x36 in",
  pieceCount: "4",
  loadingMethod: "Dock",
  specialRequirements: "",
  message: "",
  consentToContact: true,
  honeypot: "",
};

describe("quoteSchema", () => {
  it("accepts a valid quote submission", () => {
    const result = quoteSchema.safeParse(validQuote);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = quoteSchema.safeParse({ ...validQuote, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid phone number", () => {
    const result = quoteSchema.safeParse({ ...validQuote, phone: "abc" });
    expect(result.success).toBe(false);
  });

  it("rejects missing consent", () => {
    const result = quoteSchema.safeParse({ ...validQuote, consentToContact: false });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot field", () => {
    const result = quoteSchema.safeParse({ ...validQuote, honeypot: "bot" });
    expect(result.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const result = quoteSchema.safeParse({ ...validQuote, fullName: "" });
    expect(result.success).toBe(false);
  });
});
