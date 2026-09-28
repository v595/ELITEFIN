import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { getWhatsAppLink } from "../../utils/whatsapp";
import { addLead } from "../../utils/storage";
import type { Lead } from "../../types";
import toast from "react-hot-toast";

export default function Hero() {
  const [form, setForm] = useState({ name: "", mobile: "", loanAmount: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleQuickSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !/^\d{10}$/.test(form.mobile.replace(/\D/g, ""))) {
      toast.error("Please enter a valid name and 10-digit mobile number.");
      return;
    }
    setSubmitting(true);
    const now = new Date().toISOString();
    const lead: Lead = {
      id: crypto.randomUUID(),
      leadId: `EF-${Date.now().toString().slice(-6)}`,
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      loanAmount: Number(form.loanAmount) || undefined,
      status: "New",
      quality: "Warm",
      source: "Hero Quick Enquiry",
      createdAt: now,
      updatedAt: now,
    };
    setTimeout(() => {
      addLead(lead);
      toast.success("Thank you! Your enquiry has been received. Our team will contact you shortly.");
      setForm({ name: "", mobile: "", loanAmount: "" });
      setSubmitting(false);
    }, 500);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary via-primary to-primary-light pt-14 pb-24 md:pt-20 md:pb-32">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-slide-up">
          <span className="inline-flex items-center gap-2 bg-white/10 text-gold-light text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <Sparkles size={14} /> Car Loan Assistance
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Drive Your Dream Car With <span className="text-gold-light">Smarter Financing</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-lg">
            Explore car loan options with personalized assistance from application to lender coordination.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="gold" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
              <a href="#enquiry-form">Check Loan Options</a>
            </Button>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                icon={<MessageCircle size={18} />}
                className="!border-white/30 !text-white hover:!bg-white hover:!text-primary"
              >
                WhatsApp Us
              </Button>
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3 text-white/60 text-sm">
            <ShieldCheck size={18} className="text-gold-light" />
            No guaranteed-approval claims — every application is assessed by the lender.
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden shadow-lift">
            <img
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
              alt="Premium car representing EliteFin car loan assistance"
              className="w-full h-[380px] md:h-[440px] object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
          </div>

          <Card
            id="enquiry-form"
            className="relative lg:absolute lg:-bottom-14 lg:-left-10 mt-6 lg:mt-0 w-full lg:w-[340px] p-6 animate-float"
          >
            <h3 className="font-bold text-primary text-lg mb-1">Quick Enquiry</h3>
            <p className="text-muted text-xs mb-4">Get a callback from our loan assistance team.</p>
            <form onSubmit={handleQuickSubmit} className="space-y-3">
              <div>
                <label htmlFor="hero-name" className="sr-only">Name</label>
                <input
                  id="hero-name"
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="hero-mobile" className="sr-only">Mobile Number</label>
                <input
                  id="hero-mobile"
                  type="tel"
                  placeholder="Mobile Number"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="hero-amount" className="sr-only">Loan Amount</label>
                <input
                  id="hero-amount"
                  type="number"
                  placeholder="Loan Amount (₹)"
                  value={form.loanAmount}
                  onChange={(e) => setForm({ ...form, loanAmount: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue outline-none"
                />
              </div>
              <Button type="submit" variant="primary" fullWidth disabled={submitting}>
                {submitting ? "Submitting..." : "Get Started"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      <div className="hidden lg:block h-14" />
      <Link to="/contact" className="sr-only">
        Contact EliteFin
      </Link>
    </section>
  );
}
