import Image from "next/image";
import { ArrowUpRight, Clock3 } from "lucide-react";

import { siteContact } from "@/content/site";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#eef5ff] to-[#eafdf6]" />
      <div className="absolute -left-24 top-8 -z-10 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="absolute -right-24 top-8 -z-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="animated-enter">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
            Local and regional Sprinter freight
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Reliable Freight Transportation Built Around Your Schedule
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
            Request reliable local and regional cargo van freight service for
            shipments that fit safely inside a 2024 Mercedes-Benz Sprinter
            high-roof extended van, with responsive scheduling, secure
            handling, and clear communication from pickup to delivery.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote"
              className="ring-brand inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand-strong)]"
            >
              Request a Quote
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href="#appointment"
              className="ring-brand inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
            >
              Book Appointment
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <div className="mt-8 flex max-w-2xl items-center gap-3 border-t border-slate-200 pt-5 text-sm text-slate-700">
            <Clock3 aria-hidden="true" className="size-5 shrink-0 text-[var(--brand)]" />
            <p>
              <span className="font-semibold text-slate-900">Operating hours:</span>{" "}
              {siteContact.hours}
            </p>
          </div>
        </div>

        <div className="animated-enter-delay relative">
          <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-blue-200/50 to-emerald-200/50 blur-xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white p-3 shadow-xl">
            <Image
              src="/images/main.jpg"
              alt="Freight delivery partners shaking hands in front of a truck"
              width={1400}
              height={960}
              className="aspect-[3/2] w-full rounded-2xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
