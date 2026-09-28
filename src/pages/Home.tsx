import Hero from "../components/public/Hero";
import TrustBar from "../components/public/TrustBar";
import LoanTypes from "../components/public/LoanTypes";
import LoanCalculator from "../components/public/LoanCalculator";
import EligibilitySection from "../components/public/EligibilitySection";
import Process from "../components/public/Process";
import WhyEliteFin from "../components/public/WhyEliteFin";
import ReviewsPreview from "../components/public/ReviewsPreview";
import EnquiryForm from "../components/public/EnquiryForm";
import FAQ from "../components/public/FAQ";
import SectionHeading from "../components/ui/SectionHeading";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <LoanTypes />
      <LoanCalculator />
      <EligibilitySection />
      <Process />
      <WhyEliteFin />
      <ReviewsPreview />
      <section className="py-20 bg-surface" id="enquiry">
        <div className="container-x">
          <SectionHeading
            eyebrow="Get Started"
            title="Request a Callback"
            subtitle="Share your requirement and our team will reach out with personalized guidance."
          />
          <EnquiryForm />
        </div>
      </section>
      <FAQ />
    </>
  );
}
