import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import Card from "../ui/Card";
import { calculateEmi, formatCurrency } from "../../utils/calculations";

export default function LoanCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(9.5);
  const [tenureYears, setTenureYears] = useState(5);

  const result = useMemo(() => calculateEmi(amount, rate, tenureYears * 12), [amount, rate, tenureYears]);

  return (
    <section className="py-20 bg-white">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest text-gold uppercase mb-3">
            EMI Calculator
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Estimate Your Monthly EMI</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          <Card className="p-8">
            <div className="space-y-7">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label htmlFor="loan-amount" className="text-sm font-semibold text-ink">Loan Amount</label>
                  <span className="text-blue font-bold">{formatCurrency(amount)}</span>
                </div>
                <input
                  id="loan-amount"
                  type="range"
                  min={100000}
                  max={5000000}
                  step={50000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-blue"
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label htmlFor="interest-rate" className="text-sm font-semibold text-ink">Interest Rate (p.a.)</label>
                  <span className="text-blue font-bold">{rate}%</span>
                </div>
                <input
                  id="interest-rate"
                  type="range"
                  min={6}
                  max={18}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-blue"
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label htmlFor="tenure-years" className="text-sm font-semibold text-ink">Loan Tenure</label>
                  <span className="text-blue font-bold">{tenureYears} {tenureYears === 1 ? "Year" : "Years"}</span>
                </div>
                <input
                  id="tenure-years"
                  type="range"
                  min={1}
                  max={7}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-blue"
                />
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-6 bg-primary text-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold-light flex items-center justify-center shrink-0">
                <Calculator size={22} />
              </div>
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">Monthly EMI</p>
                <p className="text-2xl font-extrabold text-gold-light">{formatCurrency(result.emi)}</p>
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-5">
                <p className="text-muted text-xs font-semibold uppercase tracking-wide mb-1">Total Interest</p>
                <p className="text-xl font-bold text-ink">{formatCurrency(result.totalInterest)}</p>
              </Card>
              <Card className="p-5">
                <p className="text-muted text-xs font-semibold uppercase tracking-wide mb-1">Total Payable</p>
                <p className="text-xl font-bold text-ink">{formatCurrency(result.totalPayable)}</p>
              </Card>
            </div>
            <p className="text-xs text-muted leading-relaxed px-1">
              Illustrative calculation only. Actual rates, tenure and repayment terms may vary based on lender
              criteria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
