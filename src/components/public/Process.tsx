const steps = [
  { num: "01", title: "Submit Enquiry", desc: "Share your car and loan requirement with us." },
  { num: "02", title: "Discuss Your Requirement", desc: "Our team calls to understand your needs in detail." },
  { num: "03", title: "Explore Financing Options", desc: "We help you compare suitable financing options." },
  { num: "04", title: "Complete Lender Process", desc: "We assist you through the lender's application process." },
];

export default function Process() {
  return (
    <section className="py-20 bg-white">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-gold uppercase mb-3">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">A Simple, Guided Process</h2>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/10 via-gold/40 to-primary/10" />
          {steps.map((step) => (
            <div key={step.num} className="relative text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-gold-light font-extrabold text-lg flex items-center justify-center shadow-soft relative z-10">
                {step.num}
              </div>
              <h3 className="mt-5 font-bold text-ink text-lg">{step.title}</h3>
              <p className="mt-2 text-muted text-sm leading-relaxed max-w-[220px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
