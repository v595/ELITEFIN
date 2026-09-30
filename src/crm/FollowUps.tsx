import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, Phone, CheckCircle2, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Badge, { priorityVariant } from "../components/ui/Badge";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { getFollowUps, updateFollowUp } from "../utils/storage";
import type { FollowUp } from "../types";

type TabFilter = "All" | "Today" | "Overdue" | "Upcoming" | "Completed";

function classify(f: FollowUp): "Overdue" | "Today" | "Upcoming" {
  const today = new Date().toISOString().slice(0, 10);
  if (f.date < today) return "Overdue";
  if (f.date === today) return "Today";
  return "Upcoming";
}

const indicatorStyles: Record<string, string> = {
  Overdue: "bg-danger/10 text-danger",
  Today: "bg-gold/15 text-gold",
  Upcoming: "bg-blue/10 text-blue",
};

export default function FollowUps() {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [tab, setTab] = useState<TabFilter>("All");

  function refresh() {
    setFollowUps(getFollowUps());
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    let result: FollowUp[];
    switch (tab) {
      case "Today":
        result = followUps.filter((f) => classify(f) === "Today" && f.status === "Pending");
        break;
      case "Overdue":
        result = followUps.filter((f) => classify(f) === "Overdue" && f.status === "Pending");
        break;
      case "Upcoming":
        result = followUps.filter((f) => classify(f) === "Upcoming" && f.status === "Pending");
        break;
      case "Completed":
        result = followUps.filter((f) => f.status === "Completed");
        break;
      case "All":
      default:
        result = followUps;
    }

    return [...result].sort((a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime());
  }, [followUps, tab]);

  function markComplete(id: string) {
    updateFollowUp(id, { status: "Completed" });
    toast.success("Follow-up marked complete.");
    refresh();
  }

  function reschedule(id: string) {
    updateFollowUp(id, { status: "Rescheduled" });
    toast.success("Follow-up marked for reschedule.");
    refresh();
  }

  const todayCount = followUps.filter((f) => classify(f) === "Today" && f.status === "Pending").length;
  const overdueCount = followUps.filter((f) => classify(f) === "Overdue" && f.status === "Pending").length;

  return (
    <div className="p-5 lg:p-8">
      <h1 className="text-2xl font-extrabold text-primary mb-1">Follow-Ups</h1>
      <p className="text-muted text-sm mb-6">
        {todayCount} due today · {overdueCount} overdue
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {(["All", "Today", "Overdue", "Upcoming", "Completed"] as TabFilter[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${tab === t ? "bg-primary text-white border-primary" : "border-slate-200 text-muted"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState icon={<CalendarClock size={28} />} title="No follow-ups scheduled for today." description="Follow-ups you schedule from lead pages will show up here." />
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((f) => {
            const bucket = classify(f);
            return (
              <Card key={f.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 ${indicatorStyles[bucket]}`}>
                    {bucket}
                  </div>
                  <div className="min-w-0">
                    <Link to={`/crm/leads/${f.leadId}`} className="font-semibold text-ink hover:text-blue">{f.customerName}</Link>
                    <p className="text-xs text-muted">{f.reason}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {new Date(f.date).toLocaleDateString("en-IN")} at {f.time} ·{" "}
                      <Badge variant={priorityVariant(f.priority)}>{f.priority}</Badge>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button href={`tel:${f.phone}`} variant="outline" size="sm" icon={<Phone size={14} />}>Call</Button>
                  {f.status === "Pending" && (
                    <>
                      <Button variant="secondary" size="sm" icon={<CheckCircle2 size={14} />} onClick={() => markComplete(f.id)}>Complete</Button>
                      <Button variant="outline" size="sm" icon={<RotateCcw size={14} />} onClick={() => reschedule(f.id)}>Reschedule</Button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
