"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteFormValues } from "@/lib/validation/quote";
import { FormField, getAriaDescribedBy } from "./FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function QuoteForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      companyName: "",
      preferredDeliveryDate: "",
      specialRequirements: "",
      message: "",
      consentToContact: false,
      honeypot: "",
    },
  });

  async function onSubmit(values: QuoteFormValues) {
    setSubmitState("submitting");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <p role="status" className="rounded-md bg-green-50 p-4 text-green-800">
        Thank you. Your quote request was received. This is a request, not a
        binding price quote — our team will follow up shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      {/* Honeypot field: hidden from real users, bots often fill it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quote-honeypot">Leave this field empty</label>
        <input
          id="quote-honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      <FormField id="quote-fullName" label="Full name" required error={errors.fullName?.message}>
        <Input id="quote-fullName" invalid={!!errors.fullName} aria-describedby={getAriaDescribedBy("quote-fullName", !!errors.fullName)} {...register("fullName")} />
      </FormField>

      <FormField id="quote-companyName" label="Company name" error={errors.companyName?.message}>
        <Input id="quote-companyName" {...register("companyName")} />
      </FormField>

      <FormField id="quote-email" label="Email" required error={errors.email?.message}>
        <Input id="quote-email" type="email" invalid={!!errors.email} {...register("email")} />
      </FormField>

      <FormField id="quote-phone" label="Phone" required error={errors.phone?.message}>
        <Input id="quote-phone" type="tel" invalid={!!errors.phone} {...register("phone")} />
      </FormField>

      <FormField id="quote-cargoType" label="Cargo type" required error={errors.cargoType?.message}>
        <Input id="quote-cargoType" invalid={!!errors.cargoType} {...register("cargoType")} />
      </FormField>

      <FormField id="quote-serviceNeeded" label="Service needed" required error={errors.serviceNeeded?.message}>
        <Input id="quote-serviceNeeded" invalid={!!errors.serviceNeeded} {...register("serviceNeeded")} />
      </FormField>

      <FormField id="quote-pickupLocation" label="Pickup city and state" required error={errors.pickupLocation?.message}>
        <Input id="quote-pickupLocation" invalid={!!errors.pickupLocation} {...register("pickupLocation")} />
      </FormField>

      <FormField id="quote-deliveryLocation" label="Delivery city and state" required error={errors.deliveryLocation?.message}>
        <Input id="quote-deliveryLocation" invalid={!!errors.deliveryLocation} {...register("deliveryLocation")} />
      </FormField>

      <FormField id="quote-pickupDate" label="Pickup date" required error={errors.pickupDate?.message}>
        <Input id="quote-pickupDate" type="date" invalid={!!errors.pickupDate} {...register("pickupDate")} />
      </FormField>

      <FormField id="quote-preferredDeliveryDate" label="Preferred delivery date or window" error={errors.preferredDeliveryDate?.message}>
        <Input id="quote-preferredDeliveryDate" type="date" {...register("preferredDeliveryDate")} />
      </FormField>

      <FormField id="quote-estimatedWeight" label="Estimated weight" required error={errors.estimatedWeight?.message}>
        <Input id="quote-estimatedWeight" invalid={!!errors.estimatedWeight} {...register("estimatedWeight")} />
      </FormField>

      <FormField id="quote-dimensions" label="Dimensions" required error={errors.dimensions?.message}>
        <Input id="quote-dimensions" invalid={!!errors.dimensions} {...register("dimensions")} />
      </FormField>

      <FormField id="quote-pieceCount" label="Number of pallets or pieces" required error={errors.pieceCount?.message}>
        <Input id="quote-pieceCount" invalid={!!errors.pieceCount} {...register("pieceCount")} />
      </FormField>

      <FormField id="quote-loadingMethod" label="Loading method" required error={errors.loadingMethod?.message}>
        <Input id="quote-loadingMethod" placeholder="Hand load, dock, ramp, or forklift" invalid={!!errors.loadingMethod} {...register("loadingMethod")} />
      </FormField>

      <FormField id="quote-specialRequirements" label="Special handling requirements" error={errors.specialRequirements?.message}>
        <Textarea id="quote-specialRequirements" rows={3} {...register("specialRequirements")} />
      </FormField>

      <FormField id="quote-message" label="Additional message" error={errors.message?.message}>
        <Textarea id="quote-message" rows={3} {...register("message")} />
      </FormField>

      <div className="sm:col-span-2 flex items-start gap-2">
        <Checkbox id="quote-consentToContact" {...register("consentToContact")} />
        <label htmlFor="quote-consentToContact" className="text-sm text-slate-700">
          I consent to be contacted by phone, email, or SMS regarding this request.
        </label>
      </div>
      {errors.consentToContact && (
        <p role="alert" className="sm:col-span-2 text-sm text-red-600">
          {errors.consentToContact.message}
        </p>
      )}

      {submitState === "error" && (
        <p role="alert" className="sm:col-span-2 text-sm text-red-600">
          Something went wrong submitting your request. Please try again.
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={submitState === "submitting"}>
          {submitState === "submitting" ? "Submitting…" : "Request a Quote"}
        </Button>
      </div>
    </form>
  );
}
