import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, UserCircle } from "lucide-react";
import Card from "../components/ui/Card";
import Badge, { statusVariant } from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { getLeads } from "../utils/storage";
import { formatCurrency } from "../utils/calculations";
import type { Lead } from "../types";

/** "Customers" = leads that have progressed beyond raw enquiry (Interested and further). */
const CUSTOMER_STATUSES = new Set([
  "Interested", "Documents Pending", "Application In Progress", "Approved", "Disbursed", "Follow-Up",
]);

export default function Customers() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLeads(getLeads());
  }, []);

  const customers = useMemo(() => {
    let result = leads.filter((l) => CUSTOMER_STATUSES.has(l.status));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((l) => l.name.toLowerCase().includes(q) || l.mobile.includes(q) || (l.city || "").toLowerCase().includes(q));
    }
    return result;
  }, [leads, search]);

  return (
    <div className="p-5 lg:p-8">
      <h1 className="text-2xl font-extrabold text-primary mb-1">Customers</h1>
      <p className="text-muted text-sm mb-6">{customers.length} active customers (leads that have progressed past initial enquiry)</p>

      <div className="relative max-w-md mb-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue"
        />
      </div>

      {customers.length === 0 ? (
        <Card><EmptyState icon={<UserCircle size={28} />} title="No customers yet" description="Leads marked Interested or further along will appear here." /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((c) => (
            <Card key={c.id} className="p-5" hover>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                  {c.name[0]}
                </div>
                <div className="min-w-0">
                  <Link to={`/crm/leads/${c.id}`} className="font-semibold text-ink hover:text-blue truncate block">{c.name}</Link>
                  <p className="text-xs text-muted">{c.city || "—"}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted">{c.carModel || c.carType || "—"}</span>
                <span className="font-semibold text-ink">{c.loanAmount ? formatCurrency(c.loanAmount) : "—"}</span>
              </div>
              <Badge variant={statusVariant(c.status)}>{c.status}</Badge>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
