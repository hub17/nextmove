import { faqs } from "@/content/faqs";
import { Section } from "@/components/ui/Section";

export function Faq() {
  return (
    <Section id="faq" className="bg-slate-50">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Frequently Asked Questions
      </h2>
      <dl className="mt-8 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <dt className="font-semibold text-slate-900">{faq.question}</dt>
            <dd className="mt-1 text-slate-600">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
