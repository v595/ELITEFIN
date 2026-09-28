import { useState } from "react";
import toast from "react-hot-toast";
import { Send, CheckCircle2 } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { addLead } from "../../utils/storage";
import type { CarType, ContactMethod, EmploymentType, Lead, LoanTenure } from "../../types";

const EMPLOYMENT_OPTIONS: EmploymentType[] = ["Salaried", "Self Employed", "Business Owner", "Other"];
const TENURE_OPTIONS: LoanTenure[] = ["1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "6 Years", "7 Years"];
const CONTACT_OPTIONS: ContactMethod[] = ["Call", "WhatsApp", "Email"];

interface FormState {
  name: string;
  mobile: string;
  email: string;
  city: string;
  employmentType: EmploymentType | "";
  carType: CarType | "";
  carModel: string;
  carPrice: string;
  loanAmount: string;
  tenure: LoanTenure | "";
  preferredContact: ContactMethod | "";
  message: string;
}

const initialState: FormState = {
  name: "", mobile: "", email: "", city: "", employmentType: "", carType: "New Car",
  carModel: "", carPrice: "", loanAmount: "", tenure: "", preferredContact: "Call", message: "",
};

export default function EnquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!/^\d{10}$/.test(form.mobile.replace(/\D/g, ""))) next.mobile = "Enter a valid 10-digit mobile number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);

    const now = new Date().toISOString();
    const lead: Lead = {
      id: crypto.randomUUID(),
      leadId: `EF-${Date.now().toString().slice(-6)}`,
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim() || undefined,
      city: form.city.trim() || undefined,
      employmentType: (form.employmentType || undefined) as EmploymentType | undefined,
      carType: (form.carType || undefined) as CarType | undefined,
      carModel: form.carModel.trim() || undefined,
      carPrice: form.carPrice ? Number(form.carPrice) : undefined,
      loanAmount: form.loanAmount ? Number(form.loanAmount) : undefined,
      tenure: (form.tenure || undefined) as LoanTenure | undefined,
      preferredContact: (form.preferredContact || undefined) as ContactMethod | undefined,
      message: form.message.trim() || undefined,
      status: "New",
      quality: "Warm",
      source: "Website Enquiry Form",
      createdAt: now,
      updatedAt: now,
    };

    setTimeout(() => {
      addLead(lead);
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Enquiry submitted successfully!");
    }, 600);
  }

  if (submitted) {
    return (
      <Card className="p-10 text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">Thank you!</h3>
        <p className="text-muted leading-relaxed">
          Your enquiry has been received. Our team will contact you shortly.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => { setForm(initialState); setSubmitted(false); }}>
          Submit Another Enquiry
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full Name" required error={errors.name}>
            <input
              type="text" value={form.name} onChange={(e) => update("name", e.target.value)}
              className={inputClass(!!errors.name)} placeholder="Your full name"
            />
          </Field>
          <Field label="Mobile Number" required error={errors.mobile}>
            <input
              type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)}
              className={inputClass(!!errors.mobile)} placeholder="10-digit mobile number"
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
              className={inputClass(!!errors.email)} placeholder="you@example.com"
            />
          </Field>
          <Field label="City">
            <input
              type="text" value={form.city} onChange={(e) => update("city", e.target.value)}
              className={inputClass(false)} placeholder="Your city"
            />
          </Field>
          <Field label="Employment Type">
            <select value={form.employmentType} onChange={(e) => update("employmentType", e.target.value as EmploymentType)} className={inputClass(false)}>
              <option value="">Select employment type</option>
              {EMPLOYMENT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Car Type">
            <div className="flex gap-3 pt-1">
              {(["New Car", "Used Car"] as CarType[]).map((opt) => (
                <label key={opt} className={radioPillClass(form.carType === opt)}>
                  <input type="radio" name="carType" className="sr-only" checked={form.carType === opt} onChange={() => update("carType", opt)} />
                  {opt}
                </label>
              ))}
            </div>
          </Field>
          <Field label="Car Model">
            <input
              type="text" value={form.carModel} onChange={(e) => update("carModel", e.target.value)}
              className={inputClass(false)} placeholder="e.g. Hyundai Creta"
            />
          </Field>
          <Field label="Approximate Car Price (₹)">
            <input
              type="number" value={form.carPrice} onChange={(e) => update("carPrice", e.target.value)}
              className={inputClass(false)} placeholder="e.g. 1200000"
            />
          </Field>
          <Field label="Required Loan Amount (₹)">
            <input
              type="number" value={form.loanAmount} onChange={(e) => update("loanAmount", e.target.value)}
              className={inputClass(false)} placeholder="e.g. 1000000"
            />
          </Field>
          <Field label="Preferred Loan Tenure">
            <select value={form.tenure} onChange={(e) => update("tenure", e.target.value as LoanTenure)} className={inputClass(false)}>
              <option value="">Select tenure</option>
              {TENURE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Preferred Contact Method">
          <div className="flex flex-wrap gap-3 pt-1">
            {CONTACT_OPTIONS.map((opt) => (
              <label key={opt} className={radioPillClass(form.preferredContact === opt)}>
                <input type="radio" name="contact" className="sr-only" checked={form.preferredContact === opt} onChange={() => update("preferredContact", opt)} />
                {opt}
              </label>
            ))}
          </div>
        </Field>

        <Field label="Message">
          <textarea
            rows={4} value={form.message} onChange={(e) => update("message", e.target.value)}
            className={inputClass(false)} placeholder="Tell us more about your requirement (optional)"
          />
        </Field>

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting} icon={<Send size={18} />}>
          {submitting ? "Submitting..." : "Request a Callback"}
        </Button>
      </form>
    </Card>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-1.5">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue ${
    hasError ? "border-danger" : "border-slate-200"
  }`;
}

function radioPillClass(active: boolean) {
  return `cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
    active ? "bg-primary text-white border-primary" : "border-slate-200 text-muted hover:border-primary/40"
  }`;
}
