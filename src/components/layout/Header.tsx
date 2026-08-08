"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav, siteContact } from "@/content/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="text-lg font-bold tracking-tight text-slate-900">
          {siteContact.companyName}
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {mainNav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[var(--brand)]"
            >
              {link.label}
            </a>
          ))}
          <span className="text-sm font-medium text-slate-700">MC# 1805901</span>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="text-sm font-medium text-slate-700">DoT# 4548146</span>
          <a
            href="#quote"
            className="ring-brand inline-flex items-center justify-center rounded-xl bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand-strong)]"
          >
            Get Quote
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav aria-label="Mobile navigation" className="surface border-t border-slate-200 lg:hidden">
          <ul className="flex flex-col gap-1 px-4 py-3">
            {mainNav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <span className="block rounded-md px-2 py-2 text-sm font-medium text-slate-700">
                MC# 1805901
              </span>
            </li>
            <li>
              <span className="block rounded-md px-2 py-2 text-sm font-medium text-slate-700">
                DoT# 4548146
              </span>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
