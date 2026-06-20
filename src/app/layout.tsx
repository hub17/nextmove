import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteMeta, siteContact } from "@/content/site";

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    siteName: siteContact.companyName,
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteContact.companyName,
  email: siteContact.email,
  telephone: siteContact.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: "54 State Street, Ste 804 #14387",
    addressLocality: "Albany",
    addressRegion: "NY",
    postalCode: "12207",
    addressCountry: "US",
  },
  openingHours: "Mo-Fr 08:00-20:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
