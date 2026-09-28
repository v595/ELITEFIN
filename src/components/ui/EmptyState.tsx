import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/40 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-ink mb-1">{title}</h3>
      {description && <p className="text-muted text-sm max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}
