// ============================================================================
// EliteFin — Demo/Sample Reviews
// ----------------------------------------------------------------------------
// These are clearly marked sample testimonials for development purposes.
// Replace with verified customer feedback before publishing.
// ============================================================================

export interface Review {
  id: string;
  name: string;
  city: string;
  carType: string;
  rating: number; // 1-5
  review: string;
  date: string;
}

export const demoReviews: Review[] = [
  {
    id: "r1", name: "Amit S.", city: "Mumbai", carType: "New Car — Hyundai Creta", rating: 5,
    date: "2026-08-12",
    review: "Sample testimonial — replace with verified customer feedback before publishing. The team explained every step of the financing process clearly.",
  },
  {
    id: "r2", name: "Sunita R.", city: "Pune", carType: "Used Car — Honda City", rating: 4,
    date: "2026-08-03",
    review: "Sample testimonial — replace with verified customer feedback before publishing. Good follow-up and helpful guidance on documentation.",
  },
  {
    id: "r3", name: "Deepak K.", city: "Bengaluru", carType: "New Car — Tata Nexon", rating: 5,
    date: "2026-07-22",
    review: "Sample testimonial — replace with verified customer feedback before publishing. Smooth coordination between me and the lender.",
  },
  {
    id: "r4", name: "Farah A.", city: "Hyderabad", carType: "Car Refinance", rating: 4,
    date: "2026-07-15",
    review: "Sample testimonial — replace with verified customer feedback before publishing. Helped me understand refinancing options I wasn't aware of.",
  },
  {
    id: "r5", name: "Manoj T.", city: "Chennai", carType: "New Car — Kia Seltos", rating: 5,
    date: "2026-06-30",
    review: "Sample testimonial — replace with verified customer feedback before publishing. Very responsive and transparent throughout.",
  },
  {
    id: "r6", name: "Ritu P.", city: "Delhi", carType: "Used Car — Maruti Swift", rating: 4,
    date: "2026-06-18",
    review: "Sample testimonial — replace with verified customer feedback before publishing. Appreciated the clear breakdown of EMI options.",
  },
];
