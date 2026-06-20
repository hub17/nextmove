export const siteContact = {
  companyName: "WASSI GLOBAL SERVICES LLC",
  email: "admin@wassinextmove.com",
  phoneDisplay: "+1 (914) 507-6206",
  phoneHref: "tel:+19145076206",
  hours: "Monday to Friday, 8:00 AM to 8:00 PM EST",
  address: "54 State Street, Ste 804 #14387, Albany, New York 12207",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=54%20State%20Street%2C%20Ste%20804%20%2314387%2C%20Albany%2C%20New%20York%2012207",
};

export const siteMeta = {
  title: "WASSI GLOBAL SERVICES LLC | Sprinter Van Freight & Cargo Delivery",
  description:
    "Request reliable local and regional cargo van freight service for shipments that fit safely inside a 2024 Mercedes-Benz Sprinter high-roof extended van.",
};

export type NavLink = {
  label: string;
  href: string;
};

export const mainNav: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Quote", href: "#quote" },
  { label: "Book Appointment", href: "#appointment" },
];

export const footerNav: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Get Quote", href: "#quote" },
  { label: "Book Appointment", href: "#appointment" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

// Services explicitly NOT offered yet. Kept here so copy across the site
// (hero, services, FAQ, SEO) stays consistent and nothing overpromises.
export const unavailableServices = [
  "Expedited freight",
  "Hot shot delivery",
  "LTL freight",
  "FTL freight",
  "Refrigerated shipping",
  "Heavy haul",
  "Dedicated trucking with tractor-trailers",
];

export const trustSignals = [
  "Sprinter Van Freight",
  "Local and Regional Delivery",
  "High-Roof Extended Cargo Space",
  "Secure Cargo Handling",
  "Responsive Scheduling",
  "Clear Delivery Updates",
];

export const processSteps = [
  {
    title: "Submit shipment details",
    description:
      "Share pickup, delivery, freight, timing, and contact information through our quote or appointment form.",
  },
  {
    title: "Receive confirmation",
    description:
      "Our team reviews the request and confirms pricing, availability, or appointment details.",
  },
  {
    title: "Dispatch and pickup",
    description:
      "The Sprinter van route is confirmed and shipment pickup is coordinated.",
  },
  {
    title: "Delivery and updates",
    description:
      "You receive status updates until the freight is delivered.",
  },
];
