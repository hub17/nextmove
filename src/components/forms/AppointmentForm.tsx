"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema, type AppointmentFormValues } from "@/lib/validation/appointment";
import { FormField } from "./FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function AppointmentForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      companyName: "",
      pickupLocation: "",
      deliveryLocation: "",
      message: "",
      consentToContact: false,
      honeypot: "",
    },
  });

  async function onSubmit(values: AppointmentFormValues) {
    setSubmitState("submitting");
    try {
      const response = await fetch("/api/appointment", {
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
        Thank you. Your appointment request was received. This is a request
        subject to confirmation, not a guaranteed reservation — our team will
        follow up shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="appointment-honeypot">Leave this field empty</label>
        <input
          id="appointment-honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      <FormField id="appointment-fullName" label="Full name" required error={errors.fullName?.message}>
        <Input id="appointment-fullName" invalid={!!errors.fullName} {...register("fullName")} />
      </FormField>

      <FormField id="appointment-companyName" label="Company name" error={errors.companyName?.message}>
        <Input id="appointment-companyName" {...register("companyName")} />
      </FormField>

      <FormField id="appointment-email" label="Email" required error={errors.email?.message}>
        <Input id="appointment-email" type="email" invalid={!!errors.email} {...register("email")} />
      </FormField>

      <FormField id="appointment-phone" label="Phone" required error={errors.phone?.message}>
        <Input id="appointment-phone" type="tel" invalid={!!errors.phone} {...register("phone")} />
      </FormField>

      <FormField id="appointment-preferredDate" label="Preferred appointment date" required error={errors.preferredDate?.message}>
        <Input id="appointment-preferredDate" type="date" invalid={!!errors.preferredDate} {...register("preferredDate")} />
      </FormField>

      <FormField id="appointment-preferredTimeWindow" label="Preferred time window" required error={errors.preferredTimeWindow?.message}>
        <Select id="appointment-preferredTimeWindow" invalid={!!errors.preferredTimeWindow} defaultValue="" {...register("preferredTimeWindow")}>
          <option value="" disabled>
            Select a time window
          </option>
          <option value="Morning (8 AM - 11 AM)">Morning (8 AM - 11 AM)</option>
          <option value="Midday (11 AM - 2 PM)">Midday (11 AM - 2 PM)</option>
          <option value="Afternoon (2 PM - 5 PM)">Afternoon (2 PM - 5 PM)</option>
          <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
        </Select>
      </FormField>

      <FormField id="appointment-discussionType" label="Service or cargo discussion type" required error={errors.discussionType?.message}>
        <Input id="appointment-discussionType" invalid={!!errors.discussionType} {...register("discussionType")} />
      </FormField>

      <FormField id="appointment-pickupLocation" label="Pickup city and state" error={errors.pickupLocation?.message}>
        <Input id="appointment-pickupLocation" {...register("pickupLocation")} />
      </FormField>

      <FormField id="appointment-deliveryLocation" label="Delivery city and state" error={errors.deliveryLocation?.message}>
        <Input id="appointment-deliveryLocation" {...register("deliveryLocation")} />
      </FormField>

      <FormField id="appointment-message" label="Message" error={errors.message?.message}>
        <Textarea id="appointment-message" rows={3} {...register("message")} />
      </FormField>

      <div className="sm:col-span-2 flex items-start gap-2">
        <Checkbox id="appointment-consentToContact" {...register("consentToContact")} />
        <label htmlFor="appointment-consentToContact" className="text-sm text-slate-700">
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
          {submitState === "submitting" ? "Submitting…" : "Book Appointment"}
        </Button>
      </div>
    </form>
  );
}
