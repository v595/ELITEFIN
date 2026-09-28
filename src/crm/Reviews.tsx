import { Star } from "lucide-react";
import Card from "../components/ui/Card";
import { demoReviews } from "../data/demoReviews";

export default function CrmReviews() {
  return (
    <div className="p-5 lg:p-8">
      <h1 className="text-2xl font-extrabold text-primary mb-1">Reviews</h1>
      <p className="text-muted text-sm mb-6">Customer reviews shown on the public website (demo/sample data).</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoReviews.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className={i < r.rating ? "fill-gold text-gold" : "text-slate-200"} />
              ))}
            </div>
            <p className="text-sm text-ink mb-3">&ldquo;{r.review}&rdquo;</p>
            <p className="text-xs text-muted">{r.name} · {r.city} · {r.carType}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
