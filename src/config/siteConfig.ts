// ============================================================================
// EliteFin — Central Site Configuration
// ----------------------------------------------------------------------------
// Every business-specific value (contact details, WhatsApp number, demo CRM
// credentials, etc.) lives here so it can be replaced in ONE place before
// this project goes anywhere near production.
// ============================================================================

export const siteConfig = {
  companyName: "EliteFin",
  legalName: "EliteFin Financial Services",
  tagline: "Drive Your Dream. Finance It Smarter.",
  alternateTagline: "Your Car. Your Loan. Your Way.",

  // --- Contact details (PLACEHOLDERS — replace before going live) ---------
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsapp: "+919876543210", // digits only, with country code, no spaces/symbols for wa.me links
  email: "hello@elitefin.demo",
  address: "5th Floor, Prestige Business Tower, Bengaluru, Karnataka, India",
  serviceArea: "Serving customers across India",
  businessHours: "Mon – Sat: 9:30 AM – 7:00 PM",

  // --- Social links (placeholders) -----------------------------------------
  socialLinks: {
    facebook: "https://facebook.com/elitefin",
    instagram: "https://instagram.com/elitefin",
    linkedin: "https://linkedin.com/company/elitefin",
    twitter: "https://twitter.com/elitefin",
  },

  // --- WhatsApp default message ---------------------------------------------
  whatsappDefaultMessage:
    "Hello EliteFin, I am interested in car loan options. Please help me with the details.",

  // --- CRM demo credentials (frontend-only demo auth — NOT production auth) -
  crmDemoCredentials: {
    email: "admin@elitefin.demo",
    password: "EliteFin@123",
  },

  // --- SEO ---------------------------------------------------------------
  seo: {
    title: "EliteFin | Car Loan Assistance & Financing Options",
    description:
      "Explore car loan assistance for new and used cars with EliteFin. Submit an enquiry and receive personalized guidance based on your requirements.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
