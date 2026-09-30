import { useEffect, useMemo, useState } from "react";
import { PhoneCall } from "lucide-react";
import Card from "../components/ui/Card";
import Badge, { callOutcomeVariant } from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { getCalls } from "../utils/storage";
import { formatDuration } from "../utils/calculations";
import type { CallRecord } from "../types";

type DateFilter = "All" | "Today" | "Yesterday" | "This Week" | "This Month";

function inRange(dateStr: string, filter: DateFilter): boolean {
  if (filter === "All") return true;
  const d = new Date(dateStr);
  const now = new Date();
  if (filter === "Today") return d.toDateString() === now.toDateString();
  if (filter === "Yesterday") {
    const y = new Date(now);
    y.setDate(y.getDate() - 1);
    return d.toDateString() === y.toDateString();
  }
  if (filter === "This Week") {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    start.setHours(0, 0, 0, 0);
    return d >= start;
  }
  if (filter === "This Month") {
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }
  return true;
}

export default function Calls() {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [filter, setFilter] = useState<DateFilter>("All");

  useEffect(() => {
    setCalls(getCalls());
  }, []);

  const filtered = useMemo(
    () => calls.filter((c) => inRange(c.date, filter)).sort((a, b) => new Date(b.date + " " + b.time).getTime() - new Date(a.date + " " + a.time).getTime()),
    [calls, filter]
  );

  return (
    <div className="p-5 lg:p-8">
      <h1 className="text-2xl font-extrabold text-primary mb-1">Call History</h1>
      <p className="text-muted text-sm mb-6">{filtered.length} calls recorded</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {(["All", "Today", "Yesterday", "This Week", "This Month"] as DateFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${filter === f ? "bg-primary text-white border-primary" : "border-slate-200 text-muted"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState icon={<PhoneCall size={28} />} title="No calls recorded" description="Calls logged from lead pages will appear here." />
        ) : (
          <div className="overflow-x-auto thin-scrollbar">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-surface">
                <tr className="text-left text-muted text-xs uppercase">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Agent</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Outcome</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-t border-slate-50">
                    <td className="px-4 py-3 text-muted">{new Date(c.date).toLocaleDateString("en-IN")} {c.time}</td>
                    <td className="px-4 py-3 font-semibold text-ink">{c.customerName}</td>
                    <td className="px-4 py-3 text-muted">{c.phone}</td>
                    <td className="px-4 py-3 text-muted">{c.agent}</td>
                    <td className="px-4 py-3 font-mono text-ink">{formatDuration(c.durationSeconds)}</td>
                    <td className="px-4 py-3"><Badge variant={callOutcomeVariant(c.outcome)}>{c.outcome}</Badge></td>
                    <td className="px-4 py-3 text-muted max-w-xs truncate">{c.notes || "—"}</td>
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
