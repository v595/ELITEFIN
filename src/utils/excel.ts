// ============================================================================
// EliteFin — Excel Import / Export Utilities (SheetJS)
// ============================================================================

import * as XLSX from "xlsx";
import type { Lead, LeadStatus, CustomerQuality, CarType, EmploymentType, LoanTenure } from "../types";
import { generateLeadId } from "./storage";

// Tolerant column-name mapping: many possible header spellings → one internal field
const FIELD_ALIASES: Record<string, string[]> = {
  name: ["name", "customer name", "full name", "customername"],
  mobile: ["mobile", "phone", "mobile number", "phone number", "contact number", "contact"],
  email: ["email", "email address", "e-mail"],
  city: ["city", "location"],
  employmentType: ["employment type", "employment", "occupation"],
  carType: ["car type", "cartype", "vehicle type"],
  carModel: ["car model", "model", "vehicle model", "carmodel"],
  carPrice: ["car price", "vehicle price", "price", "carprice"],
  loanAmount: ["loan amount", "amount", "loanamount", "required loan amount"],
  tenure: ["tenure", "loan tenure", "preferred tenure"],
  status: ["status", "lead status"],
  quality: ["quality", "customer quality"],
  lastCall: ["last call", "lastcall"],
  nextFollowUp: ["next follow-up", "follow up", "follow-up date", "next followup", "followupdate"],
  assignedTo: ["assigned to", "agent", "assignedto"],
  notes: ["notes", "note", "remarks", "message"],
  leadId: ["lead id", "leadid", "id"],
};

function normalizeHeader(header: string): string {
  return header.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Build a map of { rawHeaderFromFile: internalFieldName } */
export function mapColumns(headers: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  headers.forEach((h) => {
    const normalized = normalizeHeader(h);
    for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
      if (aliases.includes(normalized)) {
        map[h] = field;
        return;
      }
    }
    map[h] = ""; // unmapped — ignored unless user maps manually
  });
  return map;
}

export interface ParsedExcelResult {
  headers: string[];
  rows: Record<string, unknown>[];
  columnMap: Record<string, string>;
}

export function parseExcelFile(file: File): Promise<ParsedExcelResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
        const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
        resolve({ headers, rows, columnMap: mapColumns(headers) });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsBinaryString(file);
  });
}

export interface ImportValidationResult {
  valid: Partial<Lead>[];
  invalid: { row: Record<string, unknown>; reason: string }[];
  duplicates: Partial<Lead>[];
}

const VALID_STATUSES: LeadStatus[] = [
  "New", "Contacted", "Interested", "Documents Pending", "Application In Progress",
  "Approved", "Disbursed", "Follow-Up", "Not Interested", "Not Eligible", "Lost",
];
const VALID_QUALITIES: CustomerQuality[] = ["Hot", "Warm", "Cold", "Better", "Poor"];
const VALID_EMPLOYMENT_TYPES: EmploymentType[] = ["Salaried", "Self Employed", "Business Owner", "Other"];
const VALID_CAR_TYPES: CarType[] = ["New Car", "Used Car"];
const VALID_TENURES: LoanTenure[] = ["1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "6 Years", "7 Years"];

/** Matches a raw cell value against a known enum, case-insensitively; returns undefined if no match (never silently trusts an arbitrary string). */
function matchEnum<T extends string>(raw: unknown, options: readonly T[]): T | undefined {
  if (!raw) return undefined;
  const normalized = String(raw).trim().toLowerCase();
  return options.find((o) => o.toLowerCase() === normalized);
}

export function validateAndTransformRows(
  rows: Record<string, unknown>[],
  columnMap: Record<string, string>,
  existingLeads: Lead[]
): ImportValidationResult {
  const valid: Partial<Lead>[] = [];
  const invalid: { row: Record<string, unknown>; reason: string }[] = [];
  const duplicates: Partial<Lead>[] = [];

  const existingMobiles = new Set(existingLeads.map((l) => l.mobile?.replace(/\D/g, "")));
  const seenInBatch = new Set<string>();

  rows.forEach((row) => {
    const mapped: Record<string, unknown> = {};
    Object.entries(row).forEach(([rawHeader, value]) => {
      const field = columnMap[rawHeader];
      if (field) mapped[field] = value;
    });

    const name = String(mapped.name || "").trim();
    const mobileRaw = String(mapped.mobile || "").trim();
    const mobile = mobileRaw.replace(/\D/g, "");

    if (!name) {
      invalid.push({ row, reason: "Missing customer name" });
      return;
    }
    if (!mobile || mobile.length < 10) {
      invalid.push({ row, reason: "Missing or invalid mobile number" });
      return;
    }

    if (existingMobiles.has(mobile) || seenInBatch.has(mobile)) {
      duplicates.push({ name, mobile: mobileRaw });
      return;
    }
    seenInBatch.add(mobile);

    const statusRaw = String(mapped.status || "New").trim();
    const status = VALID_STATUSES.find((s) => s.toLowerCase() === statusRaw.toLowerCase()) || "New";

    const qualityRaw = String(mapped.quality || "Warm").trim();
    const quality = VALID_QUALITIES.find((q) => q.toLowerCase() === qualityRaw.toLowerCase()) || "Warm";

    const carPriceNum = Number(String(mapped.carPrice || "").replace(/[^\d.]/g, "")) || undefined;
    const loanAmountNum = Number(String(mapped.loanAmount || "").replace(/[^\d.]/g, "")) || undefined;

    valid.push({
      leadId: String(mapped.leadId || "") || generateLeadId(),
      name,
      mobile: mobileRaw,
      email: mapped.email ? String(mapped.email) : undefined,
      city: mapped.city ? String(mapped.city) : undefined,
      employmentType: matchEnum(mapped.employmentType, VALID_EMPLOYMENT_TYPES),
      carType: matchEnum(mapped.carType, VALID_CAR_TYPES),
      carModel: mapped.carModel ? String(mapped.carModel) : undefined,
      carPrice: carPriceNum,
      loanAmount: loanAmountNum,
      tenure: matchEnum(mapped.tenure, VALID_TENURES),
      status,
      quality,
      assignedTo: mapped.assignedTo ? String(mapped.assignedTo) : undefined,
      nextFollowUp: mapped.nextFollowUp ? String(mapped.nextFollowUp) : undefined,
      notes: mapped.notes
        ? [{ id: crypto.randomUUID(), text: String(mapped.notes), createdAt: new Date().toISOString() }]
        : undefined,
    });
  });

  return { valid, invalid, duplicates };
}

export function exportLeadsToExcel(leads: Lead[], filename = "EliteFin_Leads_Export.xlsx"): void {
  const rows = leads.map((l) => ({
    "Lead ID": l.leadId,
    "Customer Name": l.name,
    Mobile: l.mobile,
    Email: l.email || "",
    City: l.city || "",
    "Employment Type": l.employmentType || "",
    "Car Type": l.carType || "",
    "Car Model": l.carModel || "",
    "Car Price": l.carPrice || "",
    "Loan Amount": l.loanAmount || "",
    Tenure: l.tenure || "",
    Status: l.status,
    Quality: l.quality,
    "Last Call": l.lastCall || "",
    "Next Follow-Up": l.nextFollowUp || "",
    "Assigned To": l.assignedTo || "",
    Notes: (l.notes || []).map((n) => n.text).join(" | "),
    "Created At": l.createdAt,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
  XLSX.writeFile(workbook, filename);
}
