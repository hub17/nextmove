import type { Metadata } from "next";
import { siteContact } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteContact.companyName}`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-4 text-slate-700">
        {siteContact.companyName} (&quot;we&quot;, &quot;us&quot;) collects
        information you submit through our quote and appointment forms,
        including your name, company name, email address, phone number, and
        shipment or appointment details. We use this information solely to
        respond to your request, provide pricing, and coordinate pickup and
        delivery.
      </p>
      <p className="mt-4 text-slate-700">
        We do not sell your personal information. We may share information
        with service providers (such as our email and hosting providers)
        solely to operate our website and respond to your request.
      </p>
      <p className="mt-4 text-slate-700">
        If you consent to be contacted by phone, email, or SMS, we will use
        the contact details you provide for that purpose. You may withdraw
        consent at any time by contacting us at{" "}
        <a href={`mailto:${siteContact.email}`} className="text-blue-700 underline">
          {siteContact.email}
        </a>
        .
      </p>
      <p className="mt-4 text-slate-700">
        For questions about this policy, contact {siteContact.companyName} at{" "}
        {siteContact.phoneDisplay} or {siteContact.email}.
      </p>
    </div>
  );
}
