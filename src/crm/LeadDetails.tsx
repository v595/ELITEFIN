import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft, Phone, MessageCircle, StickyNote, CalendarPlus, RefreshCcw,
  PhoneCall, PhoneOff, Clock, User, Car, Mail, MapPin, Briefcase,
} from "lucide-react";
import Card from "../components/ui/Card";
import Badge, { statusVariant, qualityVariant } from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { getLeadById, updateLead, getCalls, saveCall, saveFollowUp, getFollowUps } from "../utils/storage";
import { getWhatsAppLink } from "../utils/whatsapp";
import { formatCurrency, formatDuration } from "../utils/calculations";
import type { CallOutcome, CallRecord, CustomerQuality, FollowUp, FollowUpPriority, Lead, LeadStatus } from "../types";

const STATUS_OPTIONS: LeadStatus[] = [
  "New", "Contacted", "Interested", "Documents Pending", "Application In Progress",
  "Approved", "Disbursed", "Follow-Up", "Not Interested", "Not Eligible", "Lost",
];
const QUALITY_OPTIONS: CustomerQuality[] = ["Hot", "Warm", "Cold", "Better", "Poor"];
const CALL_OUTCOMES: CallOutcome[] = ["Connected", "No Answer", "Busy", "Call Back Later", "Interested", "Not Interested", "Wrong Number"];

export default function LeadDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);

  const [noteText, setNoteText] = useState("");
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [fuDate, setFuDate] = useState("");
  const [fuTime, setFuTime] = useState("10:00");
  const [fuReason, setFuReason] = useState("");
  const [fuPriority, setFuPriority] = useState<FollowUpPriority>("Medium");

  // Call timer state
  const [callActive, setCallActive] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [callOutcome, setCallOutcome] = useState<CallOutcome>("Connected");
  const [callNotes, setCallNotes] = useState("");

  function refresh() {
    if (!id) return;
    setLead(getLeadById(id) || null);
    setCalls(getCalls().filter((c) => c.leadId === id));
    setFollowUps(getFollowUps().filter((f) => f.leadId === id));
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!callActive) return;
    const interval = setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [callActive]);

  if (!lead) {
    return (
      <div className="p-8">
        <p className="text-muted">Lead not found.</p>
        <Link to="/crm/leads" className="text-blue font-semibold text-sm">← Back to Leads</Link>
      </div>
    );
  }

  function handleStatusChange(status: LeadStatus) {
    updateLead(lead!.id, { status });
    toast.success("Lead status updated.");
    refresh();
  }

  function handleQualityChange(quality: CustomerQuality) {
    updateLead(lead!.id, { quality });
    toast.success("Customer quality updated.");
    refresh();
  }

  function handleAddNote() {
    if (!noteText.trim()) return;
    const notes = [...(lead!.notes || []), { id: crypto.randomUUID(), text: noteText.trim(), createdAt: new Date().toISOString() }];
    updateLead(lead!.id, { notes });
    setNoteText("");
    toast.success("Note added.");
    refresh();
  }

  function handleScheduleFollowUp(e: React.FormEvent) {
    e.preventDefault();
    if (!fuDate || !fuReason.trim()) {
      toast.error("Please fill in follow-up date and reason.");
      return;
    }
    const fu: FollowUp = {
      id: crypto.randomUUID(),
      leadId: lead!.id,
      customerName: lead!.name,
      phone: lead!.mobile,
      date: fuDate,
      time: fuTime,
      reason: fuReason.trim(),
      priority: fuPriority,
      assignedAgent: lead!.assignedTo,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    saveFollowUp(fu);
    updateLead(lead!.id, { nextFollowUp: fuDate });
    toast.success("Follow-up scheduled.");
    setShowFollowUpModal(false);
    setFuDate(""); setFuReason(""); setFuPriority("Medium");
    refresh();
  }

  function handleStartCall() {
    setCallActive(true);
    setCallSeconds(0);
  }

  function handleEndCall() {
    setCallActive(false);
    setShowOutcomeModal(true);
  }

  function handleSaveCallOutcome() {
    const now = new Date();
    const call: CallRecord = {
      id: crypto.randomUUID(),
      leadId: lead!.id,
      customerName: lead!.name,
      phone: lead!.mobile,
      agent: lead!.assignedTo || "Unassigned",
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 5),
      durationSeconds: callSeconds,
      outcome: callOutcome,
      notes: callNotes.trim() || undefined,
    };
    saveCall(call);
    updateLead(lead!.id, { lastCall: now.toISOString(), lastCallDuration: callSeconds });
    toast.success("Call saved.");
    setShowOutcomeModal(false);
    setCallSeconds(0);
    setCallNotes("");
    setCallOutcome("Connected");
    refresh();
  }

  return (
    <div className="p-5 lg:p-8 max-w-6xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-muted text-sm font-semibold mb-5 hover:text-ink">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-extrabold text-primary">{lead.name}</h1>
            <Badge variant={statusVariant(lead.status)}>{lead.status}</Badge>
            <Badge variant={qualityVariant(lead.quality)}>{lead.quality}</Badge>
          </div>
          <p className="text-muted text-sm mt-1">{lead.leadId} · Created {new Date(lead.createdAt).toLocaleDateString("en-IN")}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {!callActive ? (
            <Button variant="primary" size="sm" icon={<PhoneCall size={15} />} onClick={handleStartCall}>Start Call</Button>
          ) : (
            <Button variant="secondary" size="sm" icon={<PhoneOff size={15} />} onClick={handleEndCall} className="!bg-danger">
              End Call — {formatDuration(callSeconds)}
            </Button>
          )}
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" icon={<MessageCircle size={15} />}>WhatsApp</Button>
          </a>
          <Button variant="outline" size="sm" icon={<CalendarPlus size={15} />} onClick={() => setShowFollowUpModal(true)}>
            Schedule Follow-Up
          </Button>
        </div>
      </div>

      {callActive && (
        <Card className="p-4 mb-6 bg-primary text-white flex items-center gap-3 animate-fade-in">
          <div className="w-10 h-10 rounded-full bg-gold-light/20 text-gold-light flex items-center justify-center animate-pulse">
            <Phone size={18} />
          </div>
          <div>
            <p className="text-xs text-white/60">Call in progress</p>
            <p className="text-xl font-mono font-bold">{formatDuration(callSeconds)}</p>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-ink mb-4">Customer Information</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <InfoRow icon={User} label="Name" value={lead.name} />
              <InfoRow icon={Phone} label="Mobile" value={lead.mobile} />
              <InfoRow icon={Mail} label="Email" value={lead.email || "—"} />
              <InfoRow icon={MapPin} label="City" value={lead.city || "—"} />
              <InfoRow icon={Briefcase} label="Employment" value={lead.employmentType || "—"} />
              <InfoRow icon={User} label="Preferred Contact" value={lead.preferredContact || "—"} />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-ink mb-4">Loan Information</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <InfoRow icon={Car} label="Car Type" value={lead.carType || "—"} />
              <InfoRow icon={Car} label="Car Model" value={lead.carModel || "—"} />
              <InfoRow icon={Car} label="Car Price" value={lead.carPrice ? formatCurrency(lead.carPrice) : "—"} />
              <InfoRow icon={Car} label="Loan Amount" value={lead.loanAmount ? formatCurrency(lead.loanAmount) : "—"} />
              <InfoRow icon={Clock} label="Tenure" value={lead.tenure || "—"} />
              <InfoRow icon={User} label="Assigned Agent" value={lead.assignedTo || "Unassigned"} />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-ink mb-4">Call History</h3>
            {calls.length === 0 ? (
              <p className="text-muted text-sm">No calls recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {calls.map((c) => (
                  <div key={c.id} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-blue/10 text-blue flex items-center justify-center shrink-0">
                      <Phone size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-ink text-sm">{c.outcome}</span>
                        <span className="text-xs text-muted">{formatDuration(c.durationSeconds)}</span>
                      </div>
                      <p className="text-xs text-muted">{new Date(c.date).toLocaleDateString("en-IN")} at {c.time} · Agent: {c.agent}</p>
                      {c.notes && <p className="text-sm text-ink mt-1">{c.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-ink mb-4">Follow-Up History</h3>
            {followUps.length === 0 ? (
              <p className="text-muted text-sm">No follow-ups scheduled yet.</p>
            ) : (
              <div className="space-y-3">
                {followUps.map((f) => (
                  <div key={f.id} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                      <CalendarPlus size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-ink text-sm">{new Date(f.date).toLocaleDateString("en-IN")} at {f.time}</span>
                        <Badge variant={f.priority === "High" ? "danger" : f.priority === "Medium" ? "warning" : "muted"}>{f.priority}</Badge>
                        <Badge variant={f.status === "Completed" ? "success" : f.status === "Missed" ? "danger" : "info"}>{f.status}</Badge>
                      </div>
                      <p className="text-sm text-ink mt-1">{f.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-ink mb-3">Lead Status</h3>
            <select
              value={lead.status}
              onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm mb-5"
            >
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <h3 className="font-bold text-ink mb-3">Customer Quality</h3>
            <div className="flex flex-wrap gap-2">
              {QUALITY_OPTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQualityChange(q)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    lead.quality === q ? "bg-primary text-white border-primary" : "border-slate-200 text-muted"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <StickyNote size={16} className="text-gold" />
              <h3 className="font-bold text-ink">Notes</h3>
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={3}
              placeholder="Add a note about this lead..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm mb-2"
            />
            <Button variant="outline" size="sm" fullWidth onClick={handleAddNote}>Add Note</Button>

            <div className="mt-4 space-y-3 max-h-64 overflow-y-auto thin-scrollbar">
              {(lead.notes || []).slice().reverse().map((n) => (
                <div key={n.id} className="bg-surface rounded-xl p-3">
                  <p className="text-sm text-ink">{n.text}</p>
                  <p className="text-xs text-muted mt-1">{new Date(n.createdAt).toLocaleString("en-IN")}</p>
                </div>
              ))}
              {(!lead.notes || lead.notes.length === 0) && <p className="text-muted text-sm">No notes yet.</p>}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-ink mb-3 flex items-center gap-2"><RefreshCcw size={15} /> Activity Timeline</h3>
            <div className="text-xs text-muted space-y-2">
              <p>Created: {new Date(lead.createdAt).toLocaleString("en-IN")}</p>
              <p>Last Updated: {new Date(lead.updatedAt).toLocaleString("en-IN")}</p>
              {lead.lastCall && <p>Last Call: {new Date(lead.lastCall).toLocaleString("en-IN")}</p>}
              {lead.nextFollowUp && <p>Next Follow-Up: {new Date(lead.nextFollowUp).toLocaleDateString("en-IN")}</p>}
            </div>
          </Card>
        </div>
      </div>

      {/* Schedule Follow-Up Modal */}
      {showFollowUpModal && (
        <Modal onClose={() => setShowFollowUpModal(false)} title="Schedule Follow-Up">
          <form onSubmit={handleScheduleFollowUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">Date</label>
                <input type="date" value={fuDate} onChange={(e) => setFuDate(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">Time</label>
                <input type="time" value={fuTime} onChange={(e) => setFuTime(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Reason</label>
              <input type="text" value={fuReason} onChange={(e) => setFuReason(e.target.value)} placeholder="e.g. Discuss document submission" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Priority</label>
              <div className="flex gap-2">
                {(["High", "Medium", "Low"] as FollowUpPriority[]).map((p) => (
                  <button type="button" key={p} onClick={() => setFuPriority(p)} className={`flex-1 px-3 py-2 rounded-xl text-sm font-semibold border ${fuPriority === p ? "bg-primary text-white border-primary" : "border-slate-200 text-muted"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" variant="primary" fullWidth>Schedule Follow-Up</Button>
          </form>
        </Modal>
      )}

      {/* Call Outcome Modal */}
      {showOutcomeModal && (
        <Modal onClose={handleSaveCallOutcome} title="Call Outcome">
          <div className="space-y-4">
            <p className="text-sm text-muted">Call duration: <span className="font-mono font-bold text-ink">{formatDuration(callSeconds)}</span></p>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Outcome</label>
              <select value={callOutcome} onChange={(e) => setCallOutcome(e.target.value as CallOutcome)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
                {CALL_OUTCOMES.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Notes</label>
              <textarea value={callNotes} onChange={(e) => setCallNotes(e.target.value)} rows={3} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" placeholder="Call summary (optional)" />
            </div>
            <Button variant="primary" fullWidth onClick={handleSaveCallOutcome}>Save Call</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={15} className="text-muted mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-lift w-full max-w-md p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-lg text-primary mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}
