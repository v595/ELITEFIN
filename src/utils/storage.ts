// ============================================================================
// EliteFin — LocalStorage Abstraction Layer
// ----------------------------------------------------------------------------
// All localStorage access for the app is funneled through this file so no
// component ever touches `window.localStorage` directly.
// ============================================================================

import type { Lead, CallRecord, FollowUp, CrmSession } from "../types";
import { demoLeads } from "../data/demoLeads";

const KEYS = {
  leads: "elitefin_leads",
  calls: "elitefin_calls",
  followUps: "elitefin_followups",
  session: "elitefin_crm_session",
  seeded: "elitefin_seeded_v1",
} as const;

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable (private mode / quota) — fail silently
  }
}

/** Seed demo data once on first load. */
export function seedIfEmpty(): void {
  const alreadySeeded = safeGet<boolean>(KEYS.seeded, false);
  if (!alreadySeeded) {
    safeSet(KEYS.leads, demoLeads);
    safeSet(KEYS.calls, []);
    safeSet(KEYS.followUps, []);
    safeSet(KEYS.seeded, true);
  }
}

// --- Leads ------------------------------------------------------------------

export function getLeads(): Lead[] {
  return safeGet<Lead[]>(KEYS.leads, []);
}

export function saveLeads(leads: Lead[]): void {
  safeSet(KEYS.leads, leads);
}

export function addLead(lead: Lead): void {
  const leads = getLeads();
  leads.unshift(lead);
  saveLeads(leads);
}

export function updateLead(id: string, updates: Partial<Lead>): void {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx !== -1) {
    leads[idx] = { ...leads[idx], ...updates, updatedAt: new Date().toISOString() };
    saveLeads(leads);
  }
}

export function deleteLead(id: string): void {
  saveLeads(getLeads().filter((l) => l.id !== id));
}

export function getLeadById(id: string): Lead | undefined {
  return getLeads().find((l) => l.id === id);
}

export function generateLeadId(): string {
  const leads = getLeads();
  const max = leads.reduce((acc, l) => {
    const num = parseInt(l.leadId?.replace(/\D/g, "") || "0", 10);
    return num > acc ? num : acc;
  }, 1000);
  return `EF-${max + 1}`;
}

// --- Calls --------------------------------------------------------------

export function getCalls(): CallRecord[] {
  return safeGet<CallRecord[]>(KEYS.calls, []);
}

export function saveCalls(calls: CallRecord[]): void {
  safeSet(KEYS.calls, calls);
}

export function saveCall(call: CallRecord): void {
  const calls = getCalls();
  calls.unshift(call);
  saveCalls(calls);
}

// --- Follow-ups -----------------------------------------------------------

export function getFollowUps(): FollowUp[] {
  return safeGet<FollowUp[]>(KEYS.followUps, []);
}

export function saveFollowUps(followUps: FollowUp[]): void {
  safeSet(KEYS.followUps, followUps);
}

export function saveFollowUp(followUp: FollowUp): void {
  const followUps = getFollowUps();
  followUps.unshift(followUp);
  saveFollowUps(followUps);
}

export function updateFollowUp(id: string, updates: Partial<FollowUp>): void {
  const followUps = getFollowUps();
  const idx = followUps.findIndex((f) => f.id === id);
  if (idx !== -1) {
    followUps[idx] = { ...followUps[idx], ...updates };
    saveFollowUps(followUps);
  }
}

// --- CRM session ------------------------------------------------------------

export function getSession(): CrmSession | null {
  return safeGet<CrmSession | null>(KEYS.session, null);
}

export function setSession(session: CrmSession): void {
  safeSet(KEYS.session, session);
}

export function clearSession(): void {
  try {
    localStorage.removeItem(KEYS.session);
  } catch {
    /* ignore */
  }
}

// --- Public enquiry form → CRM lead bridge ---------------------------------

export function submitEnquiryAsLead(lead: Lead): void {
  addLead(lead);
}
