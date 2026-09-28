import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";
import EnquiryForm from "./EnquiryForm";
import SectionHeading from "../ui/SectionHeading";

interface LoanTypePageProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  highlights: string[];
}

export default function LoanTypePage({ icon: Icon, eyebrow, title, description, heroImage, highlights }: LoanTypePageProps) {
  return (
    <div className="bg-surface">
      <section className="bg-primary text-white py-16 overflow-hidden">
        <div className="container-x grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-gold-light uppercase mb-4">
              <Icon size={16} /> {eyebrow}
            </span>
            <h1 className="text-4xl font-extrabold leading-tight">{title}</h1>
            <p className="mt-4 text-white/65 leading-relaxed max-w-lg">{description}</p>
            <Button variant="gold" size="lg" className="mt-7">
              <a href="#enquiry">Check Loan Options</a>
            </Button>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lift">
            <img src={heroImage} alt={title} className="w-full h-[300px] object-cover" />
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <SectionHeading eyebrow="Highlights" title="What to Know" align="center" />
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-16">
          {highlights.map((h) => (
            <div key={h} className="flex items-start gap-3 bg-white rounded-xl border border-slate-100 shadow-card p-4">
              <CheckCircle2 size={20} className="text-success shrink-0 mt-0.5" />
              <span className="text-sm text-ink">{h}</span>
            </div>
          ))}
        </div>

        <div id="enquiry">
          <SectionHeading eyebrow="Get Started" title="Request a Callback" />
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
