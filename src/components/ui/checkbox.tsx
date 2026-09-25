import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  forceChecked?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, disabled, checked, forceChecked, id, onChange, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const isChecked = forceChecked !== undefined ? forceChecked : checked;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex items-center gap-2.5 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            checked={isChecked}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 rounded border transition-colors flex items-center justify-center",
              "border-[#D1D5DB] bg-white",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[#FFC107] peer-focus-visible:ring-offset-1",
              isChecked && "bg-[#FFC107] border-[#FFC107] text-[#111827]",
              disabled && "bg-[#F3F4F6] border-[#E5E7EB]",
              className
            )}
          >
            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
          </div>
        </div>
        {label && <span className="text-sm text-[#374151]">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
