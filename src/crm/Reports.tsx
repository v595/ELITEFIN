import { useEffect, useMemo, useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, LineChart, Line, Legend,
} from "recharts";
import Card from "../components/ui/Card";
import { getLeads, getCalls, getFollowUps } from "../utils/storage";
import type { Lead, CallRecord, FollowUp } from "../types";

const COLORS = ["#1769E0", "#D9A441", "#12B76A", "#F04438", "#667085", "#163A63", "#F2C76E", "#0B1F3A"];

const PIPELINE_ORDER = [
  "New", "Contacted", "Interested", "Documents Pending", "Application In Progress", "Approved", "Disbursed",
];

export default function Reports() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);

  useEffect(() => {
    setLeads(getLeads());
    setCalls(getCalls());
    setFollowUps(getFollowUps());
  }, []);

  const statusData = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => map.set(l.status, (map.get(l.status) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const carTypeData = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => map.set(l.carType || "Unspecified", (map.get(l.carType || "Unspecified") || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const callsPerDay = useMemo(() => {
    const map = new Map<string, number>();
    calls.forEach((c) => map.set(c.date, (map.get(c.date) || 0) + 1));
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-14)
      .map(([date, count]) => ({ date: new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }), count }));
  }, [calls]);

  const followUpStatusData = useMemo(() => {
    const map = new Map<string, number>();
    followUps.forEach((f) => map.set(f.status, (map.get(f.status) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [followUps]);

  const pipelineData = useMemo(() => {
    return PIPELINE_ORDER.map((status) => ({
      name: status,
      value: leads.filter((l) => l.status === status).length,
    }));
  }, [leads]);

  const sourceData = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => {
      const key = l.source || "CRM / Manual Entry";
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [leads]);

  return (
    <div className="p-5 lg:p-8">
      <h1 className="text-2xl font-extrabold text-primary mb-1">Reports & Analytics</h1>
      <p className="text-muted text-sm mb-6">Insights across leads, calls, and follow-ups.</p>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-ink mb-4">Leads by Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(d) => d.name}>
                  {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
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
              <BarChart data={carTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef1f5" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#1769E0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-ink mb-4">Calls Per Day (Last 14 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={callsPerDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef1f5" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#D9A441" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-ink mb-4">Follow-Ups by Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={followUpStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(d) => d.name}>
                  {followUpStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="font-bold text-ink mb-4">Conversion Pipeline</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef1f5" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={160} />
                <Tooltip />
                <Bar dataKey="value" fill="#12B76A" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="font-bold text-ink mb-4">Lead Source</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef1f5" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Leads" fill="#163A63" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
