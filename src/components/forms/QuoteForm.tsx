
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

export function QuoteForm() {
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
      cargoType: formData.get("cargoType"),
      serviceNeeded: formData.get("serviceNeeded"),
      pickupLocation: formData.get("pickupLocation"),
      deliveryLocation: formData.get("deliveryLocation"),
      pickupDate: formData.get("pickupDate"),
      preferredDeliveryDate: formData.get("preferredDeliveryDate"),
      estimatedWeight: formData.get("estimatedWeight"),
      dimensions: formData.get("dimensions"),
      pieceCount: formData.get("pieceCount"),
      loadingMethod: formData.get("loadingMethod"),
      specialRequirements: formData.get("specialRequirements"),
      message: formData.get("message"),
      consentToContact: formData.get("consentToContact") === "on",
      honeypot: formData.get("website"),
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit your request.");
      }

      setSuccess(true);
      setMessage("Your quote request has been submitted successfully. Our team will contact you soon.");
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
          <label className={labelClass}>Cargo type *</label>
          <Select name="cargoType" required defaultValue="">
            <option value="" disabled>Select cargo type</option>
            <option value="General goods">General goods</option>
            <option value="Perishable goods">Perishable goods</option>
            <option value="Fragile goods">Fragile goods</option>
            <option value="Industrial equipment">Industrial equipment</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Service needed *</label>
          <Select name="serviceNeeded" required defaultValue="">
            <option value="" disabled>Select a service</option>
            <option value="Road freight">Road freight</option>
            <option value="Air freight">Air freight</option>
            <option value="Sea freight">Sea freight</option>
            <option value="Warehousing">Warehousing</option>
            <option value="Customs clearance">Customs clearance</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Pickup location *</label>
          <Input name="pickupLocation" required minLength={2} placeholder="City, State" />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Delivery location *</label>
          <Input name="deliveryLocation" required minLength={2} placeholder="City, State" />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Pickup date *</label>
          <Input name="pickupDate" type="date" required />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Preferred delivery date</label>
          <Input name="preferredDeliveryDate" type="date" />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Estimated weight *</label>
          <Input name="estimatedWeight" required placeholder="e.g. 500 kg" />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Dimensions *</label>
          <Input name="dimensions" required placeholder="e.g. 120 x 80 x 100 cm" />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Number of pieces *</label>
          <Input name="pieceCount" required placeholder="e.g. 10" />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Loading method *</label>
          <Select name="loadingMethod" required defaultValue="">
            <option value="" disabled>Select loading method</option>
            <option value="Manual loading">Manual loading</option>
            <option value="Forklift">Forklift</option>
            <option value="Crane">Crane</option>
            <option value="Other">Other</option>
          </Select>
        </div>
      </div>

      <div className={fieldClass}>
        <label className={labelClass}>Special requirements</label>
        <Textarea name="specialRequirements" rows={3} />
      </div>

      <div className={fieldClass}>
        <label className={labelClass}>Additional message</label>
        <Textarea name="message" rows={4} />
      </div>

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <Input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-600">
        <Checkbox name="consentToContact" required />
        <span>I agree to be contacted by WASSI GLOBAL SERVICES regarding this request. *</span>
      </label>

      {message && (
        <p role="status" aria-live="polite" className={success ? "text-sm text-green-700" : "text-sm text-red-600"}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Request a Quote"}
      </button>
    </form>
  );
}
