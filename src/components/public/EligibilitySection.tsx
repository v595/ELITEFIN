import { Wallet, Briefcase, BadgeCheck, Landmark, Car, IndianRupee, CalendarClock } from "lucide-react";
import Button from "../ui/Button";

const factors = [
  { icon: Wallet, label: "Income" },
  { icon: Briefcase, label: "Employment Profile" },
  { icon: BadgeCheck, label: "Credit History" },
  { icon: Landmark, label: "Existing Obligations" },
  { icon: Car, label: "Vehicle Details" },
  { icon: IndianRupee, label: "Loan Amount" },
  { icon: CalendarClock, label: "Tenure" },
];

export default function EligibilitySection() {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:26px_26px]" />
      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-bold tracking-widest text-gold-light uppercase mb-3">
            Eligibility
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Understand Your Car Loan Eligibility
          </h2>
          <p className="mt-4 text-white/65 leading-relaxed max-w-lg">
            Car loan eligibility depends on several factors assessed by the lender. Here's what is generally
            considered:
          </p>
          <Button variant="gold" size="lg" className="mt-8">
            <a href="#enquiry-form">Check My Options</a>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {factors.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-4 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/20 text-gold-light flex items-center justify-center shrink-0">
                <Icon size={18} />
              </div>
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
