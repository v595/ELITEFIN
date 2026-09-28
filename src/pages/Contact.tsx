import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Card from "../components/ui/Card";
import EnquiryForm from "../components/public/EnquiryForm";
import { siteConfig } from "../config/siteConfig";
import { getWhatsAppLink } from "../utils/whatsapp";

const contactItems = [
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phoneRaw}` },
  { icon: MessageCircle, label: "WhatsApp", value: siteConfig.phone, href: getWhatsAppLink() },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Clock, label: "Business Hours", value: siteConfig.businessHours },
  { icon: MapPin, label: "Service Area", value: siteConfig.serviceArea },
];

export default function Contact() {
  return (
    <div className="bg-surface">
      <section className="bg-primary text-white py-16 text-center">
        <div className="container-x">
          <span className="inline-block text-xs font-bold tracking-widest text-gold-light uppercase mb-3">
            Contact Us
          </span>
          <h1 className="text-4xl font-extrabold">We're Here to Help</h1>
          <p className="mt-3 text-white/60 max-w-xl mx-auto">
            Reach out with any questions about car loan financing — our team is ready to assist.
          </p>
        </div>
      </section>

      <section className="container-x py-14 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {contactItems.map(({ icon: Icon, label, value, href }) => (
            <Card key={label} className="p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue/10 text-blue flex items-center justify-center shrink-0">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">{label}</p>
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-semibold text-ink hover:text-blue break-all">
                    {value}
                  </a>
                ) : (
                  <p className="font-semibold text-ink">{value}</p>
                )}
              </div>
            </Card>
          ))}
          <p className="text-xs text-muted leading-relaxed px-1 pt-2">
            Contact details shown are placeholders for this demo build — update them in{" "}
            <code className="bg-slate-200 px-1 rounded">src/config/siteConfig.ts</code>.
          </p>
        </div>

        <div className="lg:col-span-3">
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
