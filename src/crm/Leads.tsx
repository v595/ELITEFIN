import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, Filter, Download, Plus, ChevronDown, Users, Phone, MessageCircle, Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Badge, { statusVariant, qualityVariant } from "../components/ui/Badge";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { getLeads } from "../utils/storage";
import { exportLeadsToExcel } from "../utils/excel";
import { formatCurrency } from "../utils/calculations";
import { getWhatsAppLink } from "../utils/whatsapp";
import type { Lead, LeadStatus, CustomerQuality } from "../types";

const STATUS_OPTIONS: LeadStatus[] = [
  "New", "Contacted", "Interested", "Documents Pending", "Application In Progress",
  "Approved", "Disbursed", "Follow-Up", "Not Interested", "Not Eligible", "Lost",
];
const QUALITY_OPTIONS: CustomerQuality[] = ["Hot", "Warm", "Cold", "Better", "Poor"];

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [qualityFilter, setQualityFilter] = useState<string>("");
  const [carTypeFilter, setCarTypeFilter] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [sortKey, setSortKey] = useState<"createdAt" | "name" | "loanAmount">("createdAt");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLeads(getLeads());
  }, []);

  const cities = useMemo(() => Array.from(new Set(leads.map((l) => l.city).filter(Boolean))) as string[], [leads]);

  const filtered = useMemo(() => {
    let result = [...leads];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.mobile.includes(q) ||
          (l.email || "").toLowerCase().includes(q) ||
          (l.city || "").toLowerCase().includes(q) ||
          (l.carModel || "").toLowerCase().includes(q) ||
          l.leadId.toLowerCase().includes(q)
      );
    }
    if (statusFilter) result = result.filter((l) => l.status === statusFilter);
    if (qualityFilter) result = result.filter((l) => l.quality === qualityFilter);
    if (carTypeFilter) result = result.filter((l) => l.carType === carTypeFilter);
    if (cityFilter) result = result.filter((l) => l.city === cityFilter);

    result.sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "loanAmount") return (b.loanAmount || 0) - (a.loanAmount || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return result;
  }, [leads, search, statusFilter, qualityFilter, carTypeFilter, cityFilter, sortKey]);

  function handleExport() {
    if (filtered.length === 0) {
      toast.error("No leads to export.");
      return;
    }
    exportLeadsToExcel(filtered);
    toast.success("Excel exported successfully.");
  }

  return (
    <div className="p-5 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Leads</h1>
          <p className="text-muted text-sm">{filtered.length} of {leads.length} leads</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Download size={15} />} onClick={handleExport}>
            Export Excel
          </Button>
          <Button variant="primary" size="sm" icon={<Plus size={15} />}>
            <Link to="/crm/import">Import Leads</Link>
          </Button>
        </div>
      </div>

      <Card className="p-4 mb-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search by name, phone, email, city, car model, lead ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-ink"
          >
            <Filter size={15} /> Filters <ChevronDown size={14} className={showFilters ? "rotate-180 transition-transform" : "transition-transform"} />
          </button>
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as typeof sortKey)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
            <option value="createdAt">Sort: Newest First</option>
            <option value="name">Sort: Name (A-Z)</option>
            <option value="loanAmount">Sort: Loan Amount (High-Low)</option>
          </select>
        </div>

        {showFilters && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={qualityFilter} onChange={(e) => setQualityFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
              <option value="">All Quality</option>
              {QUALITY_OPTIONS.map((q) => <option key={q} value={q}>{q}</option>)}
            </select>
            <select value={carTypeFilter} onChange={(e) => setCarTypeFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
              <option value="">All Car Types</option>
              <option value="New Car">New Car</option>
              <option value="Used Car">Used Car</option>
            </select>
            <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
              <option value="">All Cities</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}
      </Card>

      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users size={28} />}
            title="No leads found"
            description="Try adjusting your search or filters, or import leads from Excel."
            action={<Button variant="primary" size="sm"><Link to="/crm/import">Import Leads</Link></Button>}
          />
        ) : (
          <div className="overflow-x-auto thin-scrollbar">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-surface">
                <tr className="text-left text-muted text-xs uppercase">
                  <th className="px-4 py-3">Lead ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Car</th>
                  <th className="px-4 py-3">Loan Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Quality</th>
                  <th className="px-4 py-3">Next Follow-Up</th>
                  <th className="px-4 py-3">Assigned To</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-t border-slate-50 hover:bg-surface/60">
                    <td className="px-4 py-3 font-mono text-xs text-muted">{l.leadId}</td>
                    <td className="px-4 py-3">
                      <Link to={`/crm/leads/${l.id}`} className="font-semibold text-ink hover:text-blue">{l.name}</Link>
                      <p className="text-xs text-muted">{l.employmentType || "—"}</p>
                    </td>
                    <td className="px-4 py-3 text-ink">{l.mobile}</td>
                    <td className="px-4 py-3 text-muted">{l.city || "—"}</td>
                    <td className="px-4 py-3 text-muted">{l.carModel || l.carType || "—"}</td>
                    <td className="px-4 py-3 text-ink">{l.loanAmount ? formatCurrency(l.loanAmount) : "—"}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(l.status)}>{l.status}</Badge></td>
                    <td className="px-4 py-3"><Badge variant={qualityVariant(l.quality)}>{l.quality}</Badge></td>
                    <td className="px-4 py-3 text-muted">{l.nextFollowUp ? new Date(l.nextFollowUp).toLocaleDateString("en-IN") : "—"}</td>
                    <td className="px-4 py-3 text-muted">{l.assignedTo || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <a href={`tel:${l.mobile}`} className="w-8 h-8 rounded-lg bg-blue/10 text-blue flex items-center justify-center" aria-label="Call">
                          <Phone size={14} />
                        </a>
                        <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-success/10 text-success flex items-center justify-center" aria-label="WhatsApp">
                          <MessageCircle size={14} />
                        </a>
                        <Link to={`/crm/leads/${l.id}`} className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center" aria-label="View">
                          <Eye size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
