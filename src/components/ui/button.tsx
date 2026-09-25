import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  forceState?: "default" | "hover" | "active" | "disabled";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "medium",
      leftIcon,
      rightIcon,
      children,
      disabled,
      forceState,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || forceState === "disabled";

    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none select-none rounded-md";

    const sizeStyles = {
      small: "h-8 px-3 text-xs gap-1.5",
      medium: "h-10 px-4 text-sm gap-2",
      large: "h-12 px-6 text-base gap-2.5",
    };

    // Variant style classes handling default, hover, active, and disabled
    let variantStyles = "";

    if (isDisabled) {
      variantStyles = "bg-[#E5E7EB] text-[#9CA3AF] border-transparent shadow-none";
    } else if (forceState === "hover") {
      switch (variant) {
        case "primary":
          variantStyles = "bg-[#FFB800] text-[#111827]";
          break;
        case "secondary":
          variantStyles = "bg-[#111827] text-white";
          break;
        case "outline":
          variantStyles = "border border-[#9CA3AF] bg-[#F9FAFB] text-[#111827]";
          break;
        case "ghost":
          variantStyles = "bg-[#F3F4F6] text-[#111827]";
          break;
        case "danger":
          variantStyles = "bg-[#DC2626] text-white";
          break;
      }
    } else if (forceState === "active") {
      switch (variant) {
        case "primary":
          variantStyles = "bg-[#E6A700] text-[#111827]";
          break;
        case "secondary":
          variantStyles = "bg-[#0F172A] text-white";
          break;
        case "outline":
          variantStyles = "border border-[#6B7280] bg-[#F3F4F6] text-[#111827]";
          break;
        case "ghost":
          variantStyles = "bg-[#E5E7EB] text-[#111827]";
          break;
        case "danger":
          variantStyles = "bg-[#B91C1C] text-white";
          break;
      }
    } else {
      switch (variant) {
        case "primary":
          variantStyles =
            "bg-[#FFC107] text-[#111827] hover:bg-[#FFB800] active:bg-[#E6A700] shadow-sm";
          break;
        case "secondary":
          variantStyles =
            "bg-[#1F2937] text-white hover:bg-[#111827] active:bg-[#0F172A] shadow-sm";
          break;
        case "outline":
          variantStyles =
            "border border-[#D1D5DB] bg-white text-[#111827] hover:bg-[#F9FAFB] hover:border-[#9CA3AF] active:bg-[#F3F4F6]";
          break;
        case "ghost":
          variantStyles =
            "bg-transparent text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111827] active:bg-[#E5E7EB]";
          break;
        case "danger":
          variantStyles =
            "bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C] shadow-sm";
          break;
      }
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(baseStyles, sizeStyles[size], variantStyles, className)}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
