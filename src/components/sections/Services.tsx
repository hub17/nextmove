import { services } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function Services() {
  return (
    <Section id="services" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-3 h-28 rounded-full bg-blue-100/50 blur-3xl" />
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Services</h2>
      <p className="mt-2 max-w-2xl text-slate-600">
        Our current services focus on freight that fits safely inside our
        Sprinter high-roof extended van.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.title} className="transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(13,42,84,0.14)]">
              <div className="inline-flex rounded-xl bg-blue-50 p-2.5">
                <Icon className="h-7 w-7 text-[var(--brand)]" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
