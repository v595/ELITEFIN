import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import { siteConfig } from "../config/siteConfig";
import { setSession } from "../utils/storage";

export default function CrmLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    setTimeout(() => {
      const { email: demoEmail, password: demoPassword } = siteConfig.crmDemoCredentials;
      if (email.trim().toLowerCase() === demoEmail.toLowerCase() && password === demoPassword) {
        setSession({ email, name: "Admin", loggedInAt: new Date().toISOString() });
        toast.success("Welcome back!");
        navigate("/crm/dashboard");
      } else {
        setError("Invalid email or password. Please use the demo credentials shown below.");
      }
      setSubmitting(false);
    }, 400);
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:26px_26px]" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/assets/logo-dark.svg" alt="EliteFin" className="h-10 mx-auto mb-2" />
          <p className="text-gold-light text-xs font-bold tracking-widest uppercase">CRM</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lift p-8">
          <h1 className="text-xl font-bold text-primary mb-1">Sign in to EliteFin CRM</h1>
          <p className="text-muted text-sm mb-6">Internal lead management dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue"
                  placeholder="admin@elitefin.demo"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && <p className="text-danger text-sm">{error}</p>}

            <Button type="submit" variant="primary" fullWidth size="lg" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 flex items-start gap-2.5 bg-gold/10 border border-gold/20 rounded-xl p-3.5">
            <ShieldAlert size={16} className="text-gold shrink-0 mt-0.5" />
            <div className="text-xs text-ink leading-relaxed">
              <p className="font-semibold mb-0.5">Demo credentials (frontend-only, not production auth)</p>
              <p>Email: <code className="bg-white px-1 rounded">{siteConfig.crmDemoCredentials.email}</code></p>
              <p>Password: <code className="bg-white px-1 rounded">{siteConfig.crmDemoCredentials.password}</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
