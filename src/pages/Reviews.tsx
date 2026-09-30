import { useEffect, useState } from "react";
import { Star, PenLine, X } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { getAllReviews, addUserReview } from "../utils/storage";
import type { Review } from "../data/demoReviews";

const RATING_OPTIONS = [5, 4, 3, 2, 1];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setReviews(getAllReviews());
  }, []);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";
  const filtered = filter ? reviews.filter((r) => r.rating === filter) : reviews;

  function handleSubmitted(review: Review) {
    addUserReview(review);
    setReviews(getAllReviews());
    setShowModal(false);
    toast.success("Thank you! Your review has been added.");
  }

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
              <p>{reviews.length} reviews</p>
              <p className="text-xs text-white/40">Includes sample data for development</p>
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
            {RATING_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setFilter(n)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-1 ${filter === n ? "bg-primary text-white border-primary" : "border-slate-200 text-muted"}`}
              >
                {n} <Star size={13} className="fill-current" />
              </button>
            ))}
          </div>
          <Button variant="gold" size="sm" icon={<PenLine size={15} />} onClick={() => setShowModal(true)}>
            Share Your Experience
          </Button>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted py-12">No reviews with this rating yet.</p>
        ) : (
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
        )}
      </section>

      {showModal && <ShareReviewModal onClose={() => setShowModal(false)} onSubmitted={handleSubmitted} />}
    </div>
  );
}

function ShareReviewModal({ onClose, onSubmitted }: { onClose: () => void; onSubmitted: (r: Review) => void }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [carType, setCarType] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !review.trim()) {
      toast.error("Please enter your name and a short review.");
      return;
    }
    onSubmitted({
      id: crypto.randomUUID(),
      name: name.trim(),
      city: city.trim() || "India",
      carType: carType.trim() || "Car Loan",
      rating,
      review: review.trim(),
      date: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-2xl shadow-lift w-full max-w-md p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-review-title"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 id="share-review-title" className="font-bold text-lg text-primary">Share Your Experience</h3>
          <button onClick={onClose} className="text-muted hover:text-ink p-1" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Your Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Car / Loan Type</label>
              <input value={carType} onChange={(e) => setCarType(e.target.value)} placeholder="e.g. New Car — Creta" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} star`}>
                  <Star size={24} className={n <= rating ? "fill-gold text-gold" : "text-slate-200"} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Your Review *</label>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required />
          </div>
          <Button type="submit" variant="primary" fullWidth>Submit Review</Button>
        </form>
      </div>
    </div>
  );
}
