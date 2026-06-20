import { trustSignals } from "@/content/site";

export function TrustBar() {
  return (
    <div className="border-y border-slate-200/70 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-center text-sm font-semibold text-slate-700">
          {trustSignals.map((signal) => (
            <li key={signal} className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
              {signal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
