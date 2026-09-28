import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export default function Card({ children, hover, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl border border-slate-100 shadow-card",
        hover && "transition-all duration-300 hover:shadow-lift hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
