import { Home } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface text-center p-6">
      <p className="text-7xl font-extrabold text-primary/10 mb-2">404</p>
      <h1 className="text-2xl font-bold text-ink mb-2">Page Not Found</h1>
      <p className="text-muted mb-6">The page you're looking for doesn't exist.</p>
      <Button to="/" variant="primary" icon={<Home size={16} />}>
        Back to Home
      </Button>
    </div>
  );
}
