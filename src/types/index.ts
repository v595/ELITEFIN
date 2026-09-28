// ============================================================================
// EliteFin — Shared Type Definitions
// ============================================================================

export type EmploymentType = "Salaried" | "Self Employed" | "Business Owner" | "Other";

export type CarType = "New Car" | "Used Car";

export type LoanTenure = "1 Year" | "2 Years" | "3 Years" | "4 Years" | "5 Years" | "6 Years" | "7 Years";

export type ContactMethod = "Call" | "WhatsApp" | "Email";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Interested"
  | "Documents Pending"
  | "Application In Progress"
  | "Approved"
  | "Disbursed"
  | "Follow-Up"
  | "Not Interested"
  | "Not Eligible"
  | "Lost";

export type CustomerQuality = "Hot" | "Warm" | "Cold" | "Better" | "Poor";

export interface Lead {
  id: string;
  leadId: string; // human-readable, e.g. EF-1001
  name: string;
  mobile: string;
  email?: string;
  city?: string;
  employmentType?: EmploymentType;
  carType?: CarType;
  carModel?: string;
  carPrice?: number;
  loanAmount?: number;
  tenure?: LoanTenure;
  preferredContact?: ContactMethod;
  message?: string;
  status: LeadStatus;
  quality: CustomerQuality;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  lastCall?: string;
  lastCallDuration?: number; // seconds
  nextFollowUp?: string;
  notes?: LeadNote[];
  source?: string;
}

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
  createdBy?: string;
}

export type CallOutcome =
  | "Connected"
  | "No Answer"
  | "Busy"
  | "Call Back Later"
  | "Interested"
  | "Not Interested"
  | "Wrong Number";

export interface CallRecord {
  id: string;
  leadId: string;
  customerName: string;
  phone: string;
  agent: string;
  date: string;
  time: string;
  durationSeconds: number;
  outcome: CallOutcome;
  notes?: string;
}

export type FollowUpPriority = "High" | "Medium" | "Low";
export type FollowUpStatus = "Pending" | "Completed" | "Missed" | "Rescheduled";

export interface FollowUp {
  id: string;
  leadId: string;
  customerName: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  reason: string;
  priority: FollowUpPriority;
  notes?: string;
  assignedAgent?: string;
  status: FollowUpStatus;
  createdAt: string;
}

export interface CrmSession {
  email: string;
  name: string;
  loggedInAt: string;
}

export interface EnquiryFormData {
  name: string;
  mobile: string;
  email?: string;
  city?: string;
  employmentType?: EmploymentType;
  carType?: CarType;
  carModel?: string;
  carPrice?: string;
  loanAmount?: string;
  tenure?: LoanTenure;
  preferredContact?: ContactMethod;
  message?: string;
}
