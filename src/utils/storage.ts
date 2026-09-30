// ============================================================================
// EliteFin — LocalStorage Abstraction Layer
// ----------------------------------------------------------------------------
// All localStorage access for the app is funneled through this file so no
// component ever touches `window.localStorage` directly.
// ============================================================================

import type { Lead, CallRecord, FollowUp, CrmSession } from "../types";
import { demoLeads } from "../data/demoLeads";
import { demoFollowUps } from "../data/demoFollowUps";
import { demoReviews, type Review } from "../data/demoReviews";

const KEYS = {
  leads: "elitefin_leads",
  calls: "elitefin_calls",
  followUps: "elitefin_followups",
  session: "elitefin_crm_session",
  seeded: "elitefin_seeded_v1",
  userReviews: "elitefin_user_reviews",
  leadIdCounter: "elitefin_lead_id_counter",
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
    safeSet(KEYS.followUps, demoFollowUps);
    safeSet(KEYS.leadIdCounter, 1000 + demoLeads.length);
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

/**
 * Generates the next sequential Lead ID (EF-1001, EF-1002, ...) using a
 * persistent counter, so every lead — whether created via the public
 * enquiry forms, the CRM, or an Excel import — shares one numbering
 * scheme with no collisions, even when several IDs are reserved in a
 * row before any of them are saved (e.g. a batch Excel import).
 */
export function generateLeadId(): string {
  const current = safeGet<number>(KEYS.leadIdCounter, 1000);
  const next = current + 1;
  safeSet(KEYS.leadIdCounter, next);
  return `EF-${next}`;
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

// --- Reviews (visitor-submitted, layered on top of the demo set) -----------

/** Visitor-submitted reviews only (not the built-in demo/sample set). */
export function getUserReviews(): Review[] {
  return safeGet<Review[]>(KEYS.userReviews, []);
}

export function addUserReview(review: Review): void {
  const reviews = getUserReviews();
  reviews.unshift(review);
  safeSet(KEYS.userReviews, reviews);
}

/** All reviews shown on the site: visitor-submitted first, then the demo set. */
export function getAllReviews(): Review[] {
  return [...getUserReviews(), ...demoReviews];
}
