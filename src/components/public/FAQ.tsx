import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const faqs = [
  {
    q: "What documents are generally required for a car loan?",
    a: "Typically, lenders require identity proof, address proof, income proof (salary slips or ITR), bank statements, and vehicle-related documents. Exact requirements vary by lender and applicant profile.",
  },
  {
    q: "Can I apply for a used car loan?",
    a: "Yes. Financing assistance is available for eligible pre-owned vehicles, subject to the vehicle's age, condition and the lender's policies.",
  },
  {
    q: "Can self-employed customers apply?",
    a: "Yes, self-employed and business-owner applicants can apply. Income documentation requirements may differ from salaried applicants.",
  },
  {
    q: "Can I refinance an existing car loan?",
    a: "Yes, refinancing and balance-transfer options may be available depending on your existing loan and lender policies. Our team can help you explore what applies to your situation.",
  },
  {
    q: "How long does the loan process take?",
    a: "Processing time varies by lender, applicant profile, and documentation completeness. Our team will keep you updated at every stage.",
  },
  {
    q: "What affects car loan eligibility?",
    a: "Eligibility is generally assessed based on income, employment profile, credit history, existing financial obligations, vehicle details, loan amount and tenure.",
  },
  {
    q: "Can I choose the loan tenure?",
    a: "Yes, tenure options are generally available from 1 to 7 years, subject to lender policy and eligibility.",
  },
  {
    q: "Are rates the same for every customer?",
    a: "No. Interest rates are determined by the lender based on the applicant's credit profile, income, loan amount and other eligibility factors.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-surface">
      <div className="container-x max-w-3xl">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest text-gold uppercase mb-3">FAQs</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-ink">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={clsx("text-muted shrink-0 transition-transform duration-300", isOpen && "rotate-180 text-blue")}
                  />
                </button>
                <div
                  className={clsx(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
