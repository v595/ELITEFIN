import type { ReactNode } from "react";
import clsx from "clsx";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "gold" | "muted";
  className?: string;
}

const styles: Record<string, string> = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-gold/15 text-gold",
  danger: "bg-danger/10 text-danger",
  info: "bg-blue/10 text-blue",
  gold: "bg-gold text-primary",
  muted: "bg-slate-100 text-muted",
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// --- Status/Quality → variant + label mapping helpers ----------------------

export function statusVariant(status: string): BadgeProps["variant"] {
  switch (status) {
    case "New":
      return "info";
    case "Contacted":
    case "Follow-Up":
      return "warning";
    case "Interested":
    case "Approved":
    case "Disbursed":
      return "success";
    case "Documents Pending":
    case "Application In Progress":
      return "gold";
    case "Not Interested":
    case "Not Eligible":
    case "Lost":
      return "danger";
    default:
      return "muted";
  }
}

export function qualityVariant(quality: string): BadgeProps["variant"] {
  switch (quality) {
    case "Hot":
      return "danger";
    case "Warm":
      return "warning";
    case "Cold":
      return "info";
    case "Better":
      return "success";
    case "Poor":
      return "muted";
    default:
      return "muted";
  }
}

export function priorityVariant(priority: string): BadgeProps["variant"] {
  switch (priority) {
    case "High":
      return "danger";
    case "Medium":
      return "warning";
    default:
      return "muted";
  }
}

export function callOutcomeVariant(outcome: string): BadgeProps["variant"] {
  switch (outcome) {
    case "Connected":
    case "Interested":
      return "success";
    case "Busy":
      return "warning";
    case "Call Back Later":
      return "info";
    case "Not Interested":
    case "Wrong Number":
      return "danger";
    default:
      return "muted";
  }
}
