import { CarFront } from "lucide-react";
import LoanTypePage from "../../components/public/LoanTypePage";

export default function UsedCarLoan() {
  return (
    <LoanTypePage
      icon={CarFront}
      eyebrow="Used Car Loan"
      title="Financing Assistance for Pre-Owned Cars"
      description="Looking to buy a pre-owned car? We help you explore financing assistance for eligible used vehicles, subject to the vehicle's age, condition and lender policies."
      heroImage="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
      highlights={[
        "Assistance for eligible pre-owned vehicles across price ranges",
        "Guidance on vehicle age and condition requirements",
        "Help comparing financing terms across lenders",
        "Support with used-vehicle documentation",
        "Flexible tenure options based on vehicle age",
        "Assistance for salaried, self-employed and business-owner applicants",
      ]}
    />
  );
}
