import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { PhoneCall, CheckCircle2, RotateCcw, Flame } from "lucide-react";
import Card from "../components/ui/Card";
import Badge, { qualityVariant } from "../components/ui/Badge";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { getLeads, getFollowUps, updateFollowUp } from "../utils/storage";
import { formatCurrency } from "../utils/calculations";
import type { FollowUp, Lead } from "../types";

const PRIORITY_WEIGHT: Record<string, number> = { High: 0, Medium: 1, Low: 2 };
const STATUS_WEIGHT: Record<string, number> = {
  New: 0, Interested: 1, "Follow-Up": 2, Contacted: 3, "Documents Pending": 4,
  "Application In Progress": 5, Approved: 6,
};

interface NextCallItem {
  followUp: FollowUp;
  lead?: Lead;
}

export default function NextCalls() {
  const [items, setItems] = useState<NextCallItem[]>([]);

  function refresh() {
    const leads = getLeads();
    const followUps = getFollowUps().filter((f) => f.status === "Pending");
    const combined: NextCallItem[] = followUps.map((f) => ({
      followUp: f,
      lead: leads.find((l) => l.id === f.leadId),
    }));

    combined.sort((a, b) => {
      const dateCompare = new Date(a.followUp.date + " " + a.followUp.time).getTime() - new Date(b.followUp.date + " " + b.followUp.time).getTime();
      if (dateCompare !== 0) return dateCompare;
      const prioCompare = (PRIORITY_WEIGHT[a.followUp.priority] ?? 3) - (PRIORITY_WEIGHT[b.followUp.priority] ?? 3);
      if (prioCompare !== 0) return prioCompare;
      const statusA = STATUS_WEIGHT[a.lead?.status || ""] ?? 9;
      const statusB = STATUS_WEIGHT[b.lead?.status || ""] ?? 9;
      return statusA - statusB;
    });

    setItems(combined);
  }

  useEffect(refresh, []);

  function markComplete(id: string) {
    updateFollowUp(id, { status: "Completed" });
    toast.success("Follow-up marked complete.");
    refresh();
  }

  function reschedule(id: string) {
    updateFollowUp(id, { status: "Rescheduled" });
    toast.success("Follow-up rescheduled.");
    refresh();
  }

  return (
    <div className="p-5 lg:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Flame size={22} className="text-gold" />
        <h1 className="text-2xl font-extrabold text-primary">Next Calls</h1>
      </div>
      <p className="text-muted text-sm mb-6">Who to call next, sorted by follow-up time, priority and lead status.</p>

      {items.length === 0 ? (
        <Card>
          <EmptyState icon={<PhoneCall size={28} />} title="No calls queued" description="Scheduled follow-ups will appear here in priority order." />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto thin-scrollbar">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-surface">
                <tr className="text-left text-muted text-xs uppercase">
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Car</th>
                  <th className="px-4 py-3">Loan Amount</th>
                  <th className="px-4 py-3">Last Call</th>
                  <th className="px-4 py-3">Next Follow-Up</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map(({ followUp: f, lead: l }) => (
                  <tr key={f.id} className="border-t border-slate-50">
                    <td className="px-4 py-3">
                      <Link to={`/crm/leads/${f.leadId}`} className="font-semibold text-ink hover:text-blue">{f.customerName}</Link>
                      {l && <div className="mt-0.5"><Badge variant={qualityVariant(l.quality)}>{l.quality}</Badge></div>}
                    </td>
                    <td className="px-4 py-3 text-muted">{f.phone}</td>
                    <td className="px-4 py-3 text-muted">{l?.carModel || l?.carType || "—"}</td>
                    <td className="px-4 py-3 text-muted">{l?.loanAmount ? formatCurrency(l.loanAmount) : "—"}</td>
                    <td className="px-4 py-3 text-muted">{l?.lastCall ? new Date(l.lastCall).toLocaleDateString("en-IN") : "—"}</td>
                    <td className="px-4 py-3 text-ink font-semibold">{new Date(f.date).toLocaleDateString("en-IN")} {f.time}</td>
                    <td className="px-4 py-3"><Badge variant={f.priority === "High" ? "danger" : f.priority === "Medium" ? "warning" : "muted"}>{f.priority}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <a href={`tel:${f.phone}`}>
                          <Button variant="primary" size="sm" icon={<PhoneCall size={13} />}>Call Now</Button>
                        </a>
                        <Button variant="outline" size="sm" icon={<CheckCircle2 size={13} />} onClick={() => markComplete(f.id)} />
                        <Button variant="outline" size="sm" icon={<RotateCcw size={13} />} onClick={() => reschedule(f.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
