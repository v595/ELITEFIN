import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UploadCloud, FileSpreadsheet, CheckCircle2, XCircle, AlertTriangle, Download } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { parseExcelFile, validateAndTransformRows, type ImportValidationResult } from "../utils/excel";
import { addLead, generateLeadId, getLeads } from "../utils/storage";
import type { Lead } from "../types";

type Step = "upload" | "preview" | "done";

export default function ImportExcel() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("upload");
  const [fileName, setFileName] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnMap, setColumnMap] = useState<Record<string, string>>({});
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [validation, setValidation] = useState<ImportValidationResult | null>(null);
  const [importedCount, setImportedCount] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const INTERNAL_FIELDS = [
    "", "name", "mobile", "email", "city", "employmentType", "carType", "carModel",
    "carPrice", "loanAmount", "tenure", "status", "quality", "lastCall", "nextFollowUp",
    "assignedTo", "notes", "leadId",
  ];

  async function handleFile(file: File) {
    const validExt = /\.(xlsx|xls|csv)$/i.test(file.name);
    if (!validExt) {
      toast.error("Please upload a .xlsx, .xls or .csv file.");
      return;
    }
    try {
      const parsed = await parseExcelFile(file);
      if (parsed.rows.length === 0) {
        toast.error("No rows detected in this file.");
        return;
      }
      setFileName(file.name);
      setHeaders(parsed.headers);
      setColumnMap(parsed.columnMap);
      setRows(parsed.rows);
      const result = validateAndTransformRows(parsed.rows, parsed.columnMap, getLeads());
      setValidation(result);
      setStep("preview");
    } catch (err) {
      toast.error("Failed to read the Excel file. Please check the file format.");
      console.error(err);
    }
  }

  function handleMapChange(header: string, field: string) {
    const newMap = { ...columnMap, [header]: field };
    setColumnMap(newMap);
    const result = validateAndTransformRows(rows, newMap, getLeads());
    setValidation(result);
  }

  function handleImportAll() {
    if (!validation || validation.valid.length === 0) {
      toast.error("No valid rows to import.");
      return;
    }
    const now = new Date().toISOString();
    validation.valid.forEach((partial) => {
      const lead: Lead = {
        id: crypto.randomUUID(),
        leadId: partial.leadId || generateLeadId(),
        name: partial.name || "Unnamed",
        mobile: partial.mobile || "",
        status: partial.status || "New",
        quality: partial.quality || "Warm",
        createdAt: now,
        updatedAt: now,
        source: "Excel Import",
        ...partial,
      };
      addLead(lead);
    });
    setImportedCount(validation.valid.length);
    setStep("done");
    toast.success(`${validation.valid.length} leads imported successfully.`);
  }

  function reset() {
    setStep("upload");
    setFileName("");
    setHeaders([]);
    setColumnMap({});
    setRows([]);
    setValidation(null);
  }

  return (
    <div className="p-5 lg:p-8 max-w-5xl">
      <h1 className="text-2xl font-extrabold text-primary mb-1">Import Leads</h1>
      <p className="text-muted text-sm mb-6">Upload an Excel or CSV file to bulk-import leads into the CRM.</p>

      {step === "upload" && (
        <Card className="p-10">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
            }}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${dragOver ? "border-blue bg-blue/5" : "border-slate-200"}`}
          >
            <UploadCloud size={40} className="text-blue mx-auto mb-4" />
            <p className="font-semibold text-ink mb-1">Drag & drop your file here</p>
            <p className="text-muted text-sm mb-5">Accepts .xlsx, .xls, .csv</p>
            <label>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm cursor-pointer hover:bg-primary-light">
                Browse Files
              </span>
            </label>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm">
            <a href="/EliteFin_Lead_Template.xlsx" download className="inline-flex items-center gap-2 text-blue font-semibold">
              <Download size={15} /> Download Excel Template
            </a>
          </div>
        </Card>
      )}

      {step === "preview" && validation && (
        <div className="space-y-6">
          <Card className="p-5 flex items-center gap-3">
            <FileSpreadsheet size={20} className="text-blue" />
            <div>
              <p className="font-semibold text-ink">{fileName}</p>
              <p className="text-xs text-muted">{rows.length} rows detected</p>
            </div>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={FileSpreadsheet} label="Rows Detected" value={rows.length} color="bg-blue/10 text-blue" />
            <StatCard icon={CheckCircle2} label="Valid Rows" value={validation.valid.length} color="bg-success/10 text-success" />
            <StatCard icon={XCircle} label="Invalid Rows" value={validation.invalid.length} color="bg-danger/10 text-danger" />
            <StatCard icon={AlertTriangle} label="Duplicate Rows" value={validation.duplicates.length} color="bg-gold/15 text-gold" />
          </div>

          <Card className="p-6">
            <h3 className="font-bold text-ink mb-4">Column Mapping</h3>
            <p className="text-xs text-muted mb-4">
              We've auto-detected columns where possible. Adjust any mapping below if needed.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {headers.map((h) => (
                <div key={h} className="flex items-center gap-2">
                  <span className="text-sm text-ink font-medium w-1/2 truncate" title={h}>{h}</span>
                  <select
                    value={columnMap[h] || ""}
                    onChange={(e) => handleMapChange(h, e.target.value)}
                    className="flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
                  >
                    {INTERNAL_FIELDS.map((f) => <option key={f} value={f}>{f || "— Ignore —"}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-ink mb-4">Preview (first 8 valid rows)</h3>
            <div className="overflow-x-auto thin-scrollbar">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-left text-muted text-xs uppercase border-b border-slate-100">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Mobile</th>
                    <th className="py-2 pr-4">City</th>
                    <th className="py-2 pr-4">Car Model</th>
                    <th className="py-2 pr-4">Loan Amount</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {validation.valid.slice(0, 8).map((r, i) => (
                    <tr key={i} className="border-b border-slate-50">
                      <td className="py-2 pr-4">{r.name}</td>
                      <td className="py-2 pr-4">{r.mobile}</td>
                      <td className="py-2 pr-4">{r.city || "—"}</td>
                      <td className="py-2 pr-4">{r.carModel || "—"}</td>
                      <td className="py-2 pr-4">{r.loanAmount || "—"}</td>
                      <td className="py-2 pr-4">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {validation.invalid.length > 0 && (
              <div className="mt-5 pt-5 border-t border-slate-100">
                <p className="text-sm font-semibold text-danger mb-2">Invalid rows ({validation.invalid.length}):</p>
                <ul className="text-xs text-muted space-y-1 max-h-32 overflow-y-auto">
                  {validation.invalid.slice(0, 10).map((inv, i) => (
                    <li key={i}>Row {i + 1}: {inv.reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          <div className="flex gap-3">
            <Button variant="primary" size="lg" onClick={handleImportAll} disabled={validation.valid.length === 0}>
              Import All ({validation.valid.length})
            </Button>
            <Button variant="outline" size="lg" onClick={reset}>Cancel</Button>
          </div>
        </div>
      )}

      {step === "done" && (
        <Card className="p-10 text-center">
          <CheckCircle2 size={48} className="text-success mx-auto mb-4" />
          <h3 className="text-xl font-bold text-ink mb-2">Import Complete!</h3>
          <p className="text-muted mb-6">{importedCount} leads were successfully imported into the CRM.</p>
          <div className="flex gap-3 justify-center">
            <Button variant="primary" onClick={() => navigate("/crm/leads")}>View Leads</Button>
            <Button variant="outline" onClick={reset}>Import Another File</Button>
          </div>
        </Card>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ComponentType<{ size?: number }>; label: string; value: number; color: string }) {
  return (
    <Card className="p-4">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${color}`}>
        <Icon size={17} />
      </div>
      <p className="text-xl font-extrabold text-ink">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </Card>
  );
}
