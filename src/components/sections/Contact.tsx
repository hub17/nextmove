import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

export function Contact() {
  return (
    <>
      <Section id="quote">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Request a Quote</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Quote submissions are requests, not binding prices. Our team will
          follow up with pricing and availability.
        </p>
        <Card className="mt-8 border-blue-100/80">
          <QuoteForm />
        </Card>
      </Section>

      <Section id="appointment" className="surface-soft rounded-3xl border border-emerald-100/80">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Book an Appointment</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Appointment requests are subject to confirmation and are not
          guaranteed reservations.
        </p>
        <Card className="mt-8 border-emerald-100/80">
          <AppointmentForm />
        </Card>
      </Section>

    </>
  );
}
