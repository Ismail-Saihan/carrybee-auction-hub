import React from "react";
import { cn } from "@/lib/utils";

export type BadgeStatus =
  | "live"
  | "ending-soon"
  | "upcoming"
  | "ended"
  | "won"
  | "lost"
  | "payment-pending"
  | "completed"
  | "cancelled";

export type BadgeVariant = "solid" | "subtle" | "tag";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: BadgeStatus;
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({
  className,
  status,
  variant = "subtle",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  let styleClasses = "bg-[#F3F4F6] text-[#374151]";

  if (variant === "solid") {
    switch (status) {
      case "live":
        styleClasses = "bg-[#10B981] text-white";
        break;
      case "ending-soon":
        styleClasses = "bg-[#F59E0B] text-white";
        break;
      case "upcoming":
        styleClasses = "bg-[#3B82F6] text-white";
        break;
      case "ended":
        styleClasses = "bg-[#6B7280] text-white";
        break;
      case "won":
        styleClasses = "bg-[#059669] text-white";
        break;
      case "lost":
        styleClasses = "bg-[#EF4444] text-white";
        break;
      case "payment-pending":
        styleClasses = "bg-[#D97706] text-white";
        break;
      case "completed":
        styleClasses = "bg-[#2563EB] text-white";
        break;
      case "cancelled":
        styleClasses = "bg-[#9CA3AF] text-white";
        break;
      default:
        styleClasses = "bg-[#111827] text-white";
        break;
    }
  } else if (variant === "subtle") {
    switch (status) {
      case "live":
        styleClasses = "bg-[#DCFCE7] text-[#059669] font-medium";
        break;
      case "ending-soon":
        styleClasses = "bg-[#FEF3C7] text-[#D97706] font-medium";
        break;
      case "upcoming":
        styleClasses = "bg-[#DBEAFE] text-[#2563EB] font-medium";
        break;
      case "ended":
        styleClasses = "bg-[#F3F4F6] text-[#4B5563] font-medium";
        break;
      case "won":
        styleClasses = "bg-[#D1FAE5] text-[#059669] font-medium";
        break;
      case "lost":
        styleClasses = "bg-[#FEE2E2] text-[#DC2626] font-medium";
        break;
      case "payment-pending":
        styleClasses = "bg-[#FEF3C7] text-[#B45309] font-medium";
        break;
      case "completed":
        styleClasses = "bg-[#DBEAFE] text-[#1D4ED8] font-medium";
        break;
      case "cancelled":
        styleClasses = "bg-[#F3F4F6] text-[#6B7280] font-medium";
        break;
      default:
        styleClasses = "bg-[#F3F4F6] text-[#374151]";
        break;
    }
  } else if (variant === "tag") {
    // For Category & Condition tags: e.g. Open Box, Electronics, etc.
    styleClasses = "bg-[#F1F5F9] text-[#475569] font-medium hover:bg-[#E2E8F0]";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs rounded-full font-medium transition-colors select-none",
        styleClasses,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            variant === "solid" ? "bg-white" : "bg-current"
          )}
        />
      )}
      {children}
    </span>
  );
}
