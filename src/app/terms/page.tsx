import type { Metadata } from "next";
import { siteContact } from "@/content/site";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteContact.companyName}`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">Terms of Service</h1>
      <p className="mt-4 text-slate-700">
        These terms govern your use of the {siteContact.companyName} website
        and submission of quote or appointment requests.
      </p>
      <p className="mt-4 text-slate-700">
        Quote requests submitted through this website are requests for
        pricing, not binding price quotes. Final pricing is confirmed
        directly by our team after reviewing your shipment details.
      </p>
      <p className="mt-4 text-slate-700">
        Appointment requests submitted through this website are requests for
        scheduling, not guaranteed reservations. Final appointment times are
        confirmed directly by our team by phone or email.
      </p>
      <p className="mt-4 text-slate-700">
        Our current services are limited to freight that fits safely inside
        our Sprinter high-roof extended van. We do not currently offer
        expedited freight, hot shot delivery, LTL, FTL, refrigerated
        shipping, heavy haul, or dedicated tractor-trailer trucking.
      </p>
      <p className="mt-4 text-slate-700">
        Questions about these terms can be directed to{" "}
        {siteContact.companyName} at {siteContact.phoneDisplay} or{" "}
        {siteContact.email}.
      </p>
    </div>
  );
}
