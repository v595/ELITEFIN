# EliteFin — Car Loan DSA Website + Hidden CRM

A complete, professional car-loan DSA (Direct Selling Agent) website with a hidden CRM dashboard for
managing car-loan leads. Built as a **frontend-only prototype** — no real loan-processing backend,
payment system, or lender API integration.

> ⚠️ **This is a demo/prototype project.** Enquiry data, CRM authentication, calls, and follow-ups are all
> stored in browser `localStorage`. Nothing is sent to a real server. Do not use the demo CRM credentials
> or this storage approach in production without building a real backend.

---

## 1. Project Overview

**EliteFin** is a premium, modern car-loan assistance / DSA website targeting Indian customers looking for
new car loans, used car loans, refinancing, and balance transfers. It includes:

- A conversion-focused **public website** (home, loan type pages, reviews, FAQs, contact, EMI calculator)
- A **hidden CRM** at `/crm` (not linked anywhere in public navigation) for lead management, call tracking,
  follow-up scheduling, a "Next Calls" priority queue, Excel import/export, and analytics/reports

---

## 2. Features

### Public Website
- Premium responsive navbar with sticky scroll behavior
- High-converting hero section with a quick-enquiry mini-form
- Trust indicators, loan-type cards (New / Used / Refinance / Balance Transfer)
- Interactive EMI calculator (standard reducing-balance formula)
- Eligibility factors section, 4-step "How It Works" process
- "Why EliteFin" feature grid
- Reviews page with sample/demo testimonials (clearly labeled)
- Full loan enquiry form → automatically creates a CRM lead
- FAQ accordion, floating WhatsApp button, footer with legal pages
- Dedicated pages: `/loans/new-car`, `/loans/used-car`, `/loans/refinance`

### Hidden CRM (`/crm`)
- Demo login screen (frontend-only auth)
- Dashboard with stat cards + charts (Recharts)
- Lead table with search, filters, sorting, and quick actions
- Lead detail page: call timer, call outcomes, notes, follow-up scheduling, activity timeline
- **Next Calls** queue — sorted by follow-up time → priority → lead status
- Call history log with date filters
- Follow-up management with Overdue / Today / Upcoming indicators
- Customers view (leads that progressed past initial enquiry)
- Reports/analytics: status pie chart, car-type bar chart, calls/day line chart, conversion pipeline, lead source
- **Excel import**: drag-and-drop, tolerant column mapping, validation preview, duplicate detection
- **Excel export**: full lead list to `.xlsx`
- Settings page showing current business configuration

---

## 3. Technology Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4**
- **React Router v7** — routing
- **Lucide React** — icons
- **Recharts** — charts/analytics
- **SheetJS (xlsx)** — Excel import/export
- **react-hot-toast** — notifications
- **localStorage** — all data persistence (no backend)

---

## 4. Installation & Running Locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

Build for production:

```bash
npm run build
npm run preview
```

---

## 5. Project Structure

```
elitefin/
├── public/
│   ├── assets/            # logo.svg, logo-dark.svg, favicon.svg
│   └── EliteFin_Lead_Template.xlsx
├── src/
│   ├── components/
│   │   ├── ui/             # Button, Card, Badge, Toast, EmptyState, SectionHeading
│   │   └── public/          # Navbar, Hero, LoanTypes, EnquiryForm, WhatsAppButton, Footer, ...
│   ├── pages/                # Home, Reviews, Contact, FAQs, loans/*, legal/*
│   ├── crm/                   # CrmLayout, Dashboard, Leads, LeadDetails, Calls, FollowUps,
│   │                           # NextCalls, Customers, Reports, ImportExcel, Settings
│   ├── data/                   # demoLeads.ts, demoReviews.ts
│   ├── utils/                   # storage.ts, calculations.ts, excel.ts, whatsapp.ts
│   ├── config/siteConfig.ts      # ALL business info lives here
│   ├── types/index.ts
│   ├── App.tsx
│   └── main.tsx
```

---

## 6. Public Website URL / Path

Local dev: `http://localhost:5173/`

Routes: `/`, `/reviews`, `/contact`, `/faqs`, `/loans/new-car`, `/loans/used-car`, `/loans/refinance`,
`/legal/privacy`, `/legal/terms`, `/legal/disclaimer`

---

## 7. Hidden CRM URL / Path

The CRM is **not linked anywhere in the public navigation**. Access it directly:

`http://localhost:5173/crm` → redirects to `/crm/login` if not signed in.

### Demo CRM Login
```
Email:    admin@elitefin.demo
Password: EliteFin@123
```
This is a **frontend-only demo credential check** — not real authentication. Do not reuse this pattern in
production.

CRM routes: `/crm/dashboard`, `/crm/leads`, `/crm/leads/:id`, `/crm/next-calls`, `/crm/customers`,
`/crm/calls`, `/crm/followups`, `/crm/reviews`, `/crm/reports`, `/crm/import`, `/crm/settings`

---

## 8. Excel Import Format

Import via **CRM → Import Excel**. Accepts `.xlsx`, `.xls`, `.csv`.

The importer tolerates varied column header names, auto-mapping things like "Customer Name" and "Name" to
the same internal field. Recognized columns (any close variant is auto-mapped):

| Column | Notes |
|---|---|
| Lead ID | Auto-generated if omitted |
| Customer Name / Name | **Required** |
| Mobile / Phone | **Required**, 10-digit |
| Email | Optional |
| City | Optional |
| Employment Type | Salaried / Self Employed / Business Owner / Other |
| Car Type | New Car / Used Car |
| Car Model | Optional |
| Car Price | Numeric |
| Loan Amount | Numeric |
| Tenure | e.g. "5 Years" |
| Status | Defaults to "New" if unrecognized |
| Quality | Defaults to "Warm" if unrecognized |
| Next Follow-Up | Date |
| Assigned To | Agent name |
| Notes | Free text |

A ready-to-use template with 5 sample rows is available at `/EliteFin_Lead_Template.xlsx` (also linked from
the Import Leads screen).

Duplicate detection is based on mobile number. Invalid rows (missing name/mobile) are flagged and excluded
from import; you'll see counts for rows detected, valid, invalid, and duplicate before confirming import.

---

## 9. Configuration — Changing Business Details

All business-specific values live in **`src/config/siteConfig.ts`**:

```ts
export const siteConfig = {
  companyName: "EliteFin",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",   // used to build the wa.me link — digits only, with country code
  email: "hello@elitefin.demo",
  address: "...",
  crmDemoCredentials: { email: "...", password: "..." },
  // ...
};
```

### Where to change the WhatsApp number
Edit `whatsapp` in `src/config/siteConfig.ts`. It is the single source of truth — used by the floating
WhatsApp button, contact page, and hero CTA. Never hardcode it elsewhere.

### Where to change phone / email / address
Same file — `phone`, `phoneRaw`, `email`, `address`, `businessHours`, `serviceArea`.

---

## 10. Logo & Favicon

- `public/assets/logo.svg` — primary logo (light backgrounds), used in the public navbar
- `public/assets/logo-dark.svg` — logo for dark backgrounds, used in footer, CRM sidebar, CRM login
- `public/assets/favicon.svg` — browser tab icon, referenced in `index.html`

To replace the logo, swap these SVG files (keeping the same filenames), or update the `<img src>` paths in
`Navbar.tsx`, `Footer.tsx`, and `CrmLayout.tsx`.

---

## 11. What Remains Placeholder / Demo Data

- **Contact details** (phone, email, address) in `siteConfig.ts` are placeholders
- **CRM demo login credentials** are for local development only
- **Customer reviews** on `/reviews` and the CRM Reviews page are clearly marked sample/demo testimonials
- **Demo leads** (~20 leads across Indian cities) are seeded into localStorage on first load — fictional data
- **No real backend** — all data lives in the browser's localStorage and will reset if storage is cleared

---

## 12. Deployment

This is a static Vite app. After `npm run build`, deploy the `dist/` folder to any static host (Vercel,
Netlify, Cloudflare Pages, GitHub Pages, etc.). Since routing uses `BrowserRouter`, configure your host to
redirect all paths to `index.html` (SPA fallback) — e.g. a `_redirects` file for Netlify:

```
/*  /index.html  200
```

---

## 13. Legal / Disclaimer

EliteFin operates as a car-loan DSA / financial assistance platform. Final loan approval, interest rate,
tenure, eligibility and terms are determined by the respective lender based on its policies and the
customer's profile. This website makes no guarantee of loan approval, interest rate, or processing time.
