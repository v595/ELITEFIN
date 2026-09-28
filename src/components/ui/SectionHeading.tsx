interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"} mb-12`}>
      {eyebrow && (
        <span className="inline-block text-xs font-bold tracking-widest text-gold uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-primary leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-muted text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}
