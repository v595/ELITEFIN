import { useEffect, useState } from "react";
import { Star, MessageSquareHeart } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { getAllReviews, getUserReviews } from "../utils/storage";
import type { Review } from "../data/demoReviews";

export default function CrmReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReviewIds, setUserReviewIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setReviews(getAllReviews());
    setUserReviewIds(new Set(getUserReviews().map((r) => r.id)));
  }, []);

  return (
    <div className="p-5 lg:p-8">
      <h1 className="text-2xl font-extrabold text-primary mb-1">Reviews</h1>
      <p className="text-muted text-sm mb-6">
        Customer reviews shown on the public website — includes visitor-submitted reviews plus demo/sample data.
      </p>

      {reviews.length === 0 ? (
        <Card><EmptyState icon={<MessageSquareHeart size={28} />} title="No reviews yet" /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <Card key={r.id} className="p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < r.rating ? "fill-gold text-gold" : "text-slate-200"} />
                  ))}
                </div>
                {userReviewIds.has(r.id) ? (
                  <Badge variant="success">Visitor-Submitted</Badge>
                ) : (
                  <Badge variant="muted">Demo Data</Badge>
                )}
              </div>
              <p className="text-sm text-ink mb-3">&ldquo;{r.review}&rdquo;</p>
              <p className="text-xs text-muted">{r.name} · {r.city} · {r.carType}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
