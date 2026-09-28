import { Link } from "react-router-dom";
import { Car, CarFront, RefreshCw, ArrowLeftRight, ArrowRight } from "lucide-react";
import Card from "../ui/Card";

const loanTypes = [
  {
    icon: Car,
    title: "New Car Loan",
    description: "Finance assistance for purchasing a brand-new car of your choice.",
    to: "/loans/new-car",
  },
  {
    icon: CarFront,
    title: "Used Car Loan",
    description: "Financing assistance for eligible pre-owned vehicles.",
    to: "/loans/used-car",
  },
  {
    icon: RefreshCw,
    title: "Car Refinance",
    description: "Explore refinancing and balance-transfer possibilities.",
    to: "/loans/refinance",
  },
  {
    icon: ArrowLeftRight,
    title: "Car Loan Balance Transfer",
    description: "Explore alternate financing options where applicable.",
    to: "/loans/refinance",
  },
];

export default function LoanTypes() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest text-gold uppercase mb-3">
            Loan Products
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Finance For Every Drive</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanTypes.map(({ icon: Icon, title, description, to }) => (
            <Card key={title} hover className="p-6 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-5">
                <Icon size={24} />
              </div>
              <h3 className="font-bold text-ink text-lg mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed flex-1">{description}</p>
              <Link
                to={to}
                className="mt-5 inline-flex items-center gap-1.5 text-blue font-semibold text-sm group"
              >
                Explore
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
