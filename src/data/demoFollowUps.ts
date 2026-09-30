// ============================================================================
// EliteFin — Demo Follow-Up Data (CRM Prototype)
// ----------------------------------------------------------------------------
// Generated from demoLeads: every demo lead that carries a `nextFollowUp`
// date gets a matching FollowUp record, so the Follow-Ups page, the Next
// Calls queue, and the Reports "Follow-Ups by Status" chart all have real
// data to show on first load — not just the Leads table.
// ============================================================================

import type { FollowUp, FollowUpPriority } from "../types";
import { demoLeads } from "./demoLeads";

const REASONS_BY_STATUS: Record<string, string> = {
  New: "Introductory call to discuss requirement",
  Contacted: "Follow up on initial conversation",
  Interested: "Discuss next steps and documentation",
  "Documents Pending": "Check on pending document submission",
  "Application In Progress": "Update on lender application status",
  Approved: "Confirm disbursal timeline",
  "Follow-Up": "Requested call back",
};

function priorityFromQuality(quality: string): FollowUpPriority {
  if (quality === "Hot") return "High";
  if (quality === "Warm" || quality === "Better") return "Medium";
  return "Low";
}

export const demoFollowUps: FollowUp[] = demoLeads
  .filter((lead) => lead.nextFollowUp)
  .map((lead) => ({
    id: crypto.randomUUID(),
    leadId: lead.id,
    customerName: lead.name,
    phone: lead.mobile,
    date: lead.nextFollowUp as string,
    time: "11:00",
    reason: REASONS_BY_STATUS[lead.status] || "Follow up with customer",
    priority: priorityFromQuality(lead.quality),
    assignedAgent: lead.assignedTo,
    status: "Pending",
    createdAt: lead.updatedAt,
  }));
