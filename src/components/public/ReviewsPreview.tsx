import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { getAllReviews } from "../../utils/storage";
import type { Review } from "../../data/demoReviews";

export default function ReviewsPreview() {
  const [featured, setFeatured] = useState<Review[]>([]);

  useEffect(() => {
    setFeatured(getAllReviews().slice(0, 3));
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest text-gold uppercase mb-3">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">What Customers Say</h2>
          <p className="mt-3 text-xs text-muted italic">
            Sample/demo testimonials shown for development — replace with verified customer feedback before publishing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((r) => (
            <Card key={r.id} className="p-6" hover>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className={i < r.rating ? "fill-gold text-gold" : "text-slate-200"} />
                ))}
              </div>
              <p className="text-ink text-sm leading-relaxed mb-4">&ldquo;{r.review}&rdquo;</p>
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-semibold text-ink">{r.name} · {r.city}</span>
                <span>{r.carType}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button to="/reviews" variant="outline">
            View All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
}
