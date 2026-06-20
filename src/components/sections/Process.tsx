import { processSteps } from "@/content/site";
import { Section } from "@/components/ui/Section";

export function Process() {
  return (
    <Section id="process">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How It Works</h2>
      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <li key={step.title} className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-[0_8px_24px_rgba(13,42,84,0.08)]">
            <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-sm font-semibold text-[var(--brand)]">
              Step {index + 1}
            </span>
            <h3 className="mt-3 font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
