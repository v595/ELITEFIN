import { Car } from "lucide-react";
import LoanTypePage from "../../components/public/LoanTypePage";

export default function NewCarLoan() {
  return (
    <LoanTypePage
      icon={Car}
      eyebrow="New Car Loan"
      title="Finance Your Brand-New Car"
      description="Explore financing assistance for purchasing a new car — from popular hatchbacks to premium SUVs — with personalized guidance from enquiry to lender coordination."
      heroImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
      highlights={[
        "Assistance for a wide range of new car makes and models",
        "Guidance on comparing financing options from multiple lenders",
        "Support with documentation and application submission",
        "Flexible tenure options from 1 to 7 years",
        "Dedicated follow-up throughout the process",
        "Assistance for salaried, self-employed and business-owner applicants",
      ]}
    />
  );
}
