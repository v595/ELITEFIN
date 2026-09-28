import { RefreshCw } from "lucide-react";
import LoanTypePage from "../../components/public/LoanTypePage";

export default function Refinance() {
  return (
    <LoanTypePage
      icon={RefreshCw}
      eyebrow="Car Refinance"
      title="Explore Refinancing & Balance Transfer"
      description="Already have a car loan? We help you explore refinancing and balance-transfer possibilities that may better suit your current financial situation, where applicable."
      heroImage="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80"
      highlights={[
        "Explore balance-transfer possibilities for your existing car loan",
        "Understand how refinancing could affect your EMI and tenure",
        "Guidance on eligibility for refinancing with alternate lenders",
        "Support with paperwork for a smooth transition",
        "Clear explanation of any applicable charges before you decide",
        "Assistance comparing your current terms against alternate options",
      ]}
    />
  );
}
