import { UserCheck, MessagesSquare, Layers3, PhoneCall, CarFront, FileCheck2 } from "lucide-react";
import Card from "../ui/Card";

const features = [
  { icon: UserCheck, title: "Personalized Assistance", desc: "Guidance tailored to your income profile and requirement." },
  { icon: MessagesSquare, title: "Clear Communication", desc: "Transparent updates at every stage of your application." },
  { icon: Layers3, title: "Multiple Financing Options", desc: "Access to a range of financing avenues to compare." },
  { icon: PhoneCall, title: "Dedicated Follow-Up", desc: "A single point of contact who follows up consistently." },
  { icon: CarFront, title: "New & Used Car Assistance", desc: "Support across both new and eligible pre-owned vehicles." },
  { icon: FileCheck2, title: "Application Guidance", desc: "Help with documentation and the lender submission process." },
];

export default function WhyEliteFin() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest text-gold uppercase mb-3">
            Why EliteFin
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Built Around Your Convenience</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card key={title} hover className="p-6">
              <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4">
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
