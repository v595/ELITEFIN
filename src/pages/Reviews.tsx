import { useState } from "react";
import { Star, PenLine } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { demoReviews } from "../data/demoReviews";

export default function Reviews() {
  const [filter, setFilter] = useState<number | null>(null);

  const avgRating = (demoReviews.reduce((s, r) => s + r.rating, 0) / demoReviews.length).toFixed(1);
  const filtered = filter ? demoReviews.filter((r) => r.rating === filter) : demoReviews;

  return (
    <div className="bg-surface">
      <section className="bg-primary text-white py-16">
        <div className="container-x text-center">
          <span className="inline-block text-xs font-bold tracking-widest text-gold-light uppercase mb-3">
            Customer Reviews
          </span>
          <h1 className="text-4xl font-extrabold">What Our Customers Say</h1>
          <p className="mt-3 text-white/60 max-w-xl mx-auto text-sm">
            Sample/demo testimonials shown for development purposes — replace with verified customer feedback
            before publishing.
          </p>

          <div className="mt-8 inline-flex items-center gap-4 bg-white/10 rounded-2xl px-8 py-5">
            <div>
              <p className="text-4xl font-extrabold text-gold-light">{avgRating}</p>
              <div className="flex gap-0.5 mt-1 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(Number(avgRating)) ? "fill-gold text-gold" : "text-white/20"} />
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-left text-sm text-white/70">
              <p>{demoReviews.length} demo reviews</p>
              <p className="text-xs text-white/40">Sample data for development</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${!filter ? "bg-primary text-white border-primary" : "border-slate-200 text-muted"}`}
            >
              All Ratings
            </button>
            {[5, 4, 3].map((n) => (
              <button
                key={n}
                onClick={() => setFilter(n)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-1 ${filter === n ? "bg-primary text-white border-primary" : "border-slate-200 text-muted"}`}
              >
                {n} <Star size={13} className="fill-current" />
              </button>
            ))}
          </div>
          <Button variant="gold" size="sm" icon={<PenLine size={15} />}>
            Share Your Experience
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <Card key={r.id} className="p-6" hover>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className={i < r.rating ? "fill-gold text-gold" : "text-slate-200"} />
                ))}
              </div>
              <p className="text-ink text-sm leading-relaxed mb-4">&ldquo;{r.review}&rdquo;</p>
              <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-slate-100">
                <div>
                  <p className="font-semibold text-ink">{r.name}</p>
                  <p>{r.city} · {r.carType}</p>
                </div>
                <span>{new Date(r.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
