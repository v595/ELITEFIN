// ============================================================================
// EliteFin — EMI & Loan Calculation Utilities
// ============================================================================

export interface EmiResult {
  emi: number;
  totalInterest: number;
  totalPayable: number;
}

/**
 * Standard reducing-balance EMI formula:
 *   EMI = P × r × (1+r)^n / ((1+r)^n − 1)
 * where r = monthly interest rate, n = tenure in months
 */
export function calculateEmi(principal: number, annualRatePercent: number, tenureMonths: number): EmiResult {
  if (!principal || !tenureMonths || principal <= 0 || tenureMonths <= 0) {
    return { emi: 0, totalInterest: 0, totalPayable: 0 };
  }

  if (!annualRatePercent || annualRatePercent <= 0) {
    const emi = principal / tenureMonths;
    return { emi, totalInterest: 0, totalPayable: principal };
  }

  const r = annualRatePercent / 12 / 100;
  const factor = Math.pow(1 + r, tenureMonths);
  const emi = (principal * r * factor) / (factor - 1);
  const totalPayable = emi * tenureMonths;
  const totalInterest = totalPayable - principal;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(totalPayable),
  };
}

export function formatCurrency(amount: number): string {
  if (Number.isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumberIN(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

export function tenureToMonths(tenure: string): number {
  const map: Record<string, number> = {
    "1 Year": 12,
    "2 Years": 24,
    "3 Years": 36,
    "4 Years": 48,
    "5 Years": 60,
    "6 Years": 72,
    "7 Years": 84,
  };
  return map[tenure] ?? 60;
}

export function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}
