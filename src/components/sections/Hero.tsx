import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#eef5ff] to-[#eafdf6]" />
      <div className="absolute -left-24 top-8 -z-10 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="absolute -right-24 top-8 -z-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="animated-enter">
          <p className="inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
            WASSI Global Services
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Reliable Freight Transportation Built Around Your Schedule
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-700">
            Request reliable local and regional cargo van freight service for
            shipments that fit safely inside a 2024 Mercedes-Benz Sprinter
            high-roof extended van, with responsive scheduling, secure
            handling, and clear communication from pickup to delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#quote"
              className="ring-brand inline-flex items-center justify-center rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand-strong)]"
            >
              Request a Quote
            </a>
            <a
              href="#appointment"
              className="ring-brand inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
            >
              Book Appointment
            </a>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm sm:max-w-md">
            <li className="rounded-xl border border-blue-100 bg-white/85 px-4 py-3 text-slate-700">
              <span className="block text-xs uppercase tracking-wide text-blue-700">Operating Window</span>
              Mon-Fri, 8 AM - 8 PM
            </li>
            <li className="rounded-xl border border-emerald-100 bg-white/85 px-4 py-3 text-slate-700">
              <span className="block text-xs uppercase tracking-wide text-emerald-700">Service Focus</span>
              Time-sensitive cargo van loads
            </li>
          </ul>
        </div>

        <div className="animated-enter-delay relative">
          <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-blue-200/50 to-emerald-200/50 blur-xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white p-3 shadow-xl">
            <Image
              src="/images/van-hero.svg"
              alt="Illustrated cargo van representing secure freight delivery"
              width={1400}
              height={960}
              className="h-auto w-full rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
