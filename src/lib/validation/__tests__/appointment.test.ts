import { describe, it, expect } from "vitest";
import { appointmentSchema } from "../appointment";

const validAppointment = {
  fullName: "Jane Smith",
  companyName: "Acme Co",
  email: "jane@example.com",
  phone: "+1 914 555 1234",
  preferredDate: "2030-01-15",
  preferredTimeWindow: "Morning (8 AM - 11 AM)",
  discussionType: "Shipment consultation",
  pickupLocation: "Albany, NY",
  deliveryLocation: "Syracuse, NY",
  message: "",
  consentToContact: true,
  honeypot: "",
};

describe("appointmentSchema", () => {
  it("accepts a valid appointment submission", () => {
    const result = appointmentSchema.safeParse(validAppointment);
    expect(result.success).toBe(true);
  });

  it("rejects a preferred date in the past", () => {
    const result = appointmentSchema.safeParse({
      ...validAppointment,
      preferredDate: "2020-01-01",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing time window", () => {
    const result = appointmentSchema.safeParse({
      ...validAppointment,
      preferredTimeWindow: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing consent", () => {
    const result = appointmentSchema.safeParse({
      ...validAppointment,
      consentToContact: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot field", () => {
    const result = appointmentSchema.safeParse({
      ...validAppointment,
      honeypot: "bot",
    });
    expect(result.success).toBe(false);
  });
});
