import { useParams } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";

const content: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "EliteFin respects your privacy. Information submitted through our enquiry forms (such as name, mobile number, email and loan requirement details) is used solely to provide car loan assistance and to contact you regarding your enquiry.",
      "This is a frontend demo application. Enquiry data submitted here is stored locally in your browser (localStorage) and is not transmitted to any external server or third party.",
      "In a production deployment, EliteFin would implement appropriate data protection safeguards in line with applicable law and would only share information with lenders as necessary to process your loan enquiry, with your consent.",
      "For any privacy-related questions, please contact us using the details on our Contact page.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: [
      `By using the ${siteConfig.companyName} website, you agree to use it for lawful purposes related to exploring car loan assistance.`,
      "EliteFin acts as a car-loan DSA / financial assistance platform. We do not guarantee loan approval, interest rates, or terms — these are determined solely by the respective lender based on their own policies and your eligibility.",
      "Content on this website, including the EliteFin name, logo and design, is the property of EliteFin and may not be reproduced without permission.",
      "This is a demonstration/prototype website built for illustrative purposes. It does not process real loan applications or payments.",
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    body: [
      `${siteConfig.companyName} operates as a car-loan assistance/DSA platform. Loan approval, interest rates, processing fees, tenure and other terms are subject to the respective lender's policies, eligibility criteria and final approval.`,
      "Information displayed on this website is for general informational purposes and does not constitute a guarantee of loan approval, a specific interest rate, or specific loan terms.",
      "The EMI calculator on this website provides an illustrative estimate only, based on the standard reducing-balance formula. Actual EMI, interest rate and repayment terms may vary based on the lender's assessment.",
      "Customer reviews shown on this website (where marked as sample/demo data) are for illustrative purposes during development and do not represent verified customer feedback until explicitly replaced with real, verified testimonials.",
    ],
  },
};

export default function Legal() {
  const { page } = useParams<{ page: string }>();
  const data = content[page || "disclaimer"] || content.disclaimer;

  return (
    <div className="bg-surface py-16">
      <div className="container-x max-w-3xl">
        <h1 className="text-3xl font-extrabold text-primary mb-8">{data.title}</h1>
        <div className="space-y-5">
          {data.body.map((p, i) => (
            <p key={i} className="text-muted leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
