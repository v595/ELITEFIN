import FAQ from "../components/public/FAQ";

export default function FAQs() {
  return (
    <div className="bg-primary text-white py-16 text-center">
      <div className="container-x">
        <span className="inline-block text-xs font-bold tracking-widest text-gold-light uppercase mb-3">Support</span>
        <h1 className="text-4xl font-extrabold mb-2">Frequently Asked Questions</h1>
        <p className="text-white/60 max-w-xl mx-auto">Answers to common questions about car loan assistance.</p>
      </div>
      <div className="bg-surface -mb-16 mt-[-1px]">
        <FAQ />
      </div>
    </div>
  );
}
