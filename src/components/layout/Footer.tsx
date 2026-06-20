import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { siteContact, footerNav } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0d1f3a] text-slate-300">
      <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-300/15 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-bold text-white">{siteContact.companyName}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Reliable Sprinter van freight and cargo delivery built around your
            schedule.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Quick Links</p>
          <ul className="mt-3 space-y-2">
            {footerNav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4" aria-hidden="true" />
              <a href={siteContact.phoneHref} className="transition-colors hover:text-white">
                {siteContact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4" aria-hidden="true" />
              <a href={`mailto:${siteContact.email}`} className="transition-colors hover:text-white">
                {siteContact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4" aria-hidden="true" />
              <a
                href={siteContact.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {siteContact.address}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4" aria-hidden="true" />
              <span>{siteContact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-700/70 px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {siteContact.companyName}. All rights reserved.
      </div>
    </footer>
  );
}
