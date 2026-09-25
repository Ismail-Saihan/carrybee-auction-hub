"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  id?: string;
  forceState?: "on" | "off" | "disabled";
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked = false,
      onCheckedChange,
      disabled = false,
      label,
      className,
      id,
      forceState,
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(checked);
    const isControlled = onCheckedChange !== undefined;
    const isDisabled = disabled || forceState === "disabled";

    let active = isControlled ? checked : internalChecked;
    if (forceState === "on") active = true;
    if (forceState === "off") active = false;

    const toggle = () => {
      if (isDisabled) return;
      if (!isControlled) {
        setInternalChecked(!active);
      }
      onCheckedChange?.(!active);
    };

    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex items-center gap-3 select-none",
          isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        )}
      >
        <button
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={active}
          disabled={isDisabled}
          onClick={toggle}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:ring-offset-2",
            active ? "bg-[#FFC107]" : "bg-[#D1D5DB]",
            isDisabled && "bg-[#E5E7EB]",
            className
          )}
        >
          <span
            className={cn(
              "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200",
              active ? "translate-x-5.5" : "translate-x-0.5",
              isDisabled && "bg-white/80"
            )}
          />
        </button>
        {label && <span className="text-sm font-medium text-[#374151]">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = "Switch";
