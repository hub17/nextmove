
"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";

function todayLocal() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function AppointmentForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      fullName: formData.get("fullName"),
      companyName: formData.get("companyName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      preferredDate: formData.get("preferredDate"),
      preferredTimeWindow: formData.get("preferredTimeWindow"),
      discussionType: formData.get("discussionType"),
      pickupLocation: formData.get("pickupLocation"),
      deliveryLocation: formData.get("deliveryLocation"),
      message: formData.get("message"),
      consentToContact: formData.get("consentToContact") === "on",
      honeypot: formData.get("website"),
    };

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit your appointment request.");
      }

      setSuccess(true);
      setMessage("Your appointment request has been submitted successfully. Our team will contact you to confirm.");
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const fieldClass = "space-y-1";
  const labelClass = "block text-sm font-medium text-slate-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={fieldClass}>
          <label className={labelClass}>Full name *</label>
          <Input name="fullName" required minLength={2} />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Company name</label>
          <Input name="companyName" />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Email address *</label>
          <Input name="email" type="email" required />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Phone number *</label>
          <Input name="phone" type="tel" required />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Preferred date *</label>
          <Input name="preferredDate" type="date" min={todayLocal()} required />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Preferred time *</label>
          <Select name="preferredTimeWindow" required defaultValue="">
            <option value="" disabled>Select a time window</option>
            <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
            <option value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</option>
            <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
          </Select>
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Discussion type *</label>
          <Select name="discussionType" required defaultValue="">
            <option value="" disabled>Select a discussion type</option>
            <option value="General consultation">General consultation</option>
            <option value="Freight quotation">Freight quotation</option>
            <option value="Logistics planning">Logistics planning</option>
            <option value="Shipment tracking">Shipment tracking</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Pickup location</label>
          <Input name="pickupLocation" />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Delivery location</label>
          <Input name="deliveryLocation" />
        </div>
      </div>

      <div className={fieldClass}>
        <label className={labelClass}>Message</label>
        <Textarea name="message" rows={4} placeholder="Tell us more about your needs..." />
      </div>

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <Input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-600">
        <Checkbox name="consentToContact" required />
        <span>I agree to be contacted by WASSI GLOBAL SERVICES regarding this appointment. *</span>
      </label>

      {message && (
        <p role="status" aria-live="polite" className={success ? "text-sm text-green-700" : "text-sm text-red-600"}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Request an Appointment"}
      </button>
    </form>
  );
}
