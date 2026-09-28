// One-off script to generate /public/EliteFin_Lead_Template.xlsx with 5 demo rows.
// Run with: node scripts/generate-template.mjs
import * as XLSX from "xlsx";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rows = [
  {
    "Lead ID": "EF-2001", "Customer Name": "Sample Kumar", "Mobile": "9800000001",
    "Email": "sample.kumar@example.com", "City": "Mumbai", "Employment Type": "Salaried",
    "Car Type": "New Car", "Car Model": "Hyundai Creta", "Car Price": 1450000, "Loan Amount": 1200000,
    "Tenure": "5 Years", "Status": "New", "Quality": "Warm", "Last Call": "", "Next Follow-Up": "2026-10-05",
    "Assigned To": "Priya Sharma", "Notes": "Sample row — replace with real lead data.",
  },
  {
    "Lead ID": "EF-2002", "Customer Name": "Sample Devi", "Mobile": "9800000002",
    "Email": "sample.devi@example.com", "City": "Pune", "Employment Type": "Self Employed",
    "Car Type": "Used Car", "Car Model": "Maruti Baleno", "Car Price": 650000, "Loan Amount": 500000,
    "Tenure": "3 Years", "Status": "Contacted", "Quality": "Hot", "Last Call": "2026-09-20", "Next Follow-Up": "2026-10-02",
    "Assigned To": "Arjun Nair", "Notes": "Sample row — replace with real lead data.",
  },
  {
    "Lead ID": "EF-2003", "Customer Name": "Sample Rao", "Mobile": "9800000003",
    "Email": "sample.rao@example.com", "City": "Bengaluru", "Employment Type": "Business Owner",
    "Car Type": "New Car", "Car Model": "Tata Nexon", "Car Price": 1250000, "Loan Amount": 1000000,
    "Tenure": "6 Years", "Status": "Interested", "Quality": "Hot", "Last Call": "2026-09-22", "Next Follow-Up": "2026-09-30",
    "Assigned To": "Priya Sharma", "Notes": "Sample row — replace with real lead data.",
  },
  {
    "Lead ID": "EF-2004", "Customer Name": "Sample Iyer", "Mobile": "9800000004",
    "Email": "sample.iyer@example.com", "City": "Chennai", "Employment Type": "Salaried",
    "Car Type": "Used Car", "Car Model": "Honda City", "Car Price": 850000, "Loan Amount": 650000,
    "Tenure": "4 Years", "Status": "Documents Pending", "Quality": "Warm", "Last Call": "2026-09-18", "Next Follow-Up": "2026-10-01",
    "Assigned To": "Arjun Nair", "Notes": "Sample row — replace with real lead data.",
  },
  {
    "Lead ID": "EF-2005", "Customer Name": "Sample Singh", "Mobile": "9800000005",
    "Email": "sample.singh@example.com", "City": "Delhi", "Employment Type": "Salaried",
    "Car Type": "New Car", "Car Model": "Kia Seltos", "Car Price": 1550000, "Loan Amount": 1300000,
    "Tenure": "5 Years", "Status": "Approved", "Quality": "Better", "Last Call": "2026-09-15", "Next Follow-Up": "2026-09-29",
    "Assigned To": "Priya Sharma", "Notes": "Sample row — replace with real lead data.",
  },
];

const worksheet = XLSX.utils.json_to_sheet(rows);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

const outPath = resolve(__dirname, "../public/EliteFin_Lead_Template.xlsx");
XLSX.writeFile(workbook, outPath);
console.log("Template written to", outPath);
