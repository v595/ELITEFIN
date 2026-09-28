import { UserCheck, Layers, Car, PhoneForwarded } from "lucide-react";

const items = [
  { icon: UserCheck, label: "Personalized Assistance" },
  { icon: Layers, label: "Multiple Financing Options" },
  { icon: Car, label: "New & Used Cars" },
  { icon: PhoneForwarded, label: "Dedicated Follow-Up" },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-slate-100">
      <div className="container-x py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
              <Icon size={20} />
            </div>
            <span className="text-sm font-semibold text-ink leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
