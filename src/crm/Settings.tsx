import { useState } from "react";
import { Save, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { siteConfig } from "../config/siteConfig";
import { getSession } from "../utils/storage";

export default function Settings() {
  const session = getSession();
  const [agentName, setAgentName] = useState(session?.name || "Admin");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Settings saved (demo — profile name is not persisted across sessions).");
  }

  return (
    <div className="p-5 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-extrabold text-primary mb-1">Settings</h1>
      <p className="text-muted text-sm mb-6">Manage your CRM profile and view configuration.</p>

      <Card className="p-6 mb-6">
        <h3 className="font-bold text-ink mb-4">Agent Profile</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Display Name</label>
            <input type="text" value={agentName} onChange={(e) => setAgentName(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Email</label>
            <input type="email" value={session?.email || ""} disabled className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-surface text-muted" />
          </div>
          <Button type="submit" variant="primary" icon={<Save size={16} />}>Save Changes</Button>
        </form>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="font-bold text-ink mb-4">Business Configuration</h3>
        <div className="space-y-3 text-sm">
          <ConfigRow label="Company Name" value={siteConfig.companyName} />
          <ConfigRow label="Phone" value={siteConfig.phone} />
          <ConfigRow label="WhatsApp" value={siteConfig.whatsapp} />
          <ConfigRow label="Email" value={siteConfig.email} />
        </div>
        <p className="text-xs text-muted mt-4">
          To change these values, edit <code className="bg-surface px-1.5 py-0.5 rounded">src/config/siteConfig.ts</code>.
        </p>
      </Card>

      <Card className="p-5 bg-gold/10 border border-gold/20 flex items-start gap-3">
        <ShieldAlert size={18} className="text-gold shrink-0 mt-0.5" />
        <p className="text-xs text-ink leading-relaxed">
          This CRM uses frontend-only demo authentication stored in localStorage. It is not suitable for production
          use without a real backend authentication system.
        </p>
      </Card>
    </div>
  );
}

function ConfigRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
