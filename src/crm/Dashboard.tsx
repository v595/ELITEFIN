import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, UserPlus, CalendarClock, PhoneCall, Flame, FileText, CheckCircle2, XCircle, ArrowRight,
} from "lucide-react";
import Card from "../components/ui/Card";
import Badge, { statusVariant } from "../components/ui/Badge";
import { getLeads, getCalls, getFollowUps } from "../utils/storage";
import { formatCurrency } from "../utils/calculations";
import type { Lead } from "../types";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

const CHART_COLORS = ["#1769E0", "#D9A441", "#12B76A", "#F04438", "#667085", "#163A63", "#F2C76E"];

function isToday(dateStr?: string) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [callsToday, setCallsToday] = useState(0);
  const [followUpsToday, setFollowUpsToday] = useState(0);

  useEffect(() => {
    setLeads(getLeads());
    setCallsToday(getCalls().filter((c) => isToday(c.date)).length);
    setFollowUpsToday(getFollowUps().filter((f) => f.date === new Date().toISOString().slice(0, 10) && f.status === "Pending").length);
  }, []);

  const stats = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter((l) => l.status === "New").length;
    const interested = leads.filter((l) => l.status === "Interested").length;
    const inProgress = leads.filter((l) => l.status === "Application In Progress").length;
    const converted = leads.filter((l) => l.status === "Disbursed" || l.status === "Approved").length;
    const notInterested = leads.filter((l) => l.status === "Not Interested" || l.status === "Not Eligible" || l.status === "Lost").length;
    return { total, newLeads, interested, inProgress, converted, notInterested };
  }, [leads]);

  const statusChartData = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => map.set(l.status, (map.get(l.status) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const carTypeChartData = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => {
      const key = l.carType || "Unspecified";
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const recentLeads = leads.slice(0, 6);

  const cards = [
    { label: "Total Leads", value: stats.total, icon: Users, color: "bg-blue/10 text-blue" },
    { label: "New Leads", value: stats.newLeads, icon: UserPlus, color: "bg-success/10 text-success" },
    { label: "Follow-Ups Today", value: followUpsToday, icon: CalendarClock, color: "bg-gold/15 text-gold" },
    { label: "Calls Today", value: callsToday, icon: PhoneCall, color: "bg-primary/10 text-primary" },
    { label: "Interested Customers", value: stats.interested, icon: Flame, color: "bg-danger/10 text-danger" },
    { label: "Applications In Progress", value: stats.inProgress, icon: FileText, color: "bg-blue/10 text-blue" },
    { label: "Converted", value: stats.converted, icon: CheckCircle2, color: "bg-success/10 text-success" },
    { label: "Not Interested", value: stats.notInterested, icon: XCircle, color: "bg-slate-100 text-muted" },
  ];

  return (
    <div className="p-5 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Dashboard</h1>
          <p className="text-muted text-sm">Overview of your car loan leads and activity.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon size={19} />
            </div>
            <p className="text-2xl font-extrabold text-ink">{value}</p>
            <p className="text-muted text-xs font-medium mt-0.5">{label}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="font-bold text-ink mb-4">Leads by Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(d) => d.name}>
                  {statusChartData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-ink mb-4">Leads by Car Type</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={carTypeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef1f5" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#1769E0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-ink">Recent Leads</h3>
          <Link to="/crm/leads" className="text-blue text-sm font-semibold inline-flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto thin-scrollbar">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted text-xs uppercase border-b border-slate-100">
                <th className="pb-3 pr-4">Lead ID</th>
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Car</th>
                <th className="pb-3 pr-4">Loan Amount</th>
                <th className="pb-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((l) => (
                <tr key={l.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 pr-4 font-mono text-xs text-muted">{l.leadId}</td>
                  <td className="py-3 pr-4 font-semibold text-ink">
                    <Link to={`/crm/leads/${l.id}`} className="hover:text-blue">{l.name}</Link>
                  </td>
                  <td className="py-3 pr-4 text-muted">{l.carModel || "—"}</td>
                  <td className="py-3 pr-4 text-muted">{l.loanAmount ? formatCurrency(l.loanAmount) : "—"}</td>
                  <td className="py-3 pr-4"><Badge variant={statusVariant(l.status)}>{l.status}</Badge></td>
                </tr>
              ))}
              {recentLeads.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-muted">No leads yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
