import Image from "next/image";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" className="surface-soft rounded-3xl border border-blue-100/70">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">About Us</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">
            We help businesses move Sprinter-van-sized freight with clear
            communication, dependable scheduling, and secure handling. Our team
            focuses on responsive service, practical route planning, and careful
            cargo handling so customers can stay focused on their own operations.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">
            Our current equipment is a 2024 Mercedes-Benz Sprinter high-roof
            extended van, and we serve local and regional routes based on
            operating availability.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/70 bg-white p-2 shadow-lg">
          <Image
            src="/images/van.jpg"
            alt="Freight team loading boxes into a cargo van"
            width={1400}
            height={960}
            className="aspect-[4/5] w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
