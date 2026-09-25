import React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  forceChecked?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
            type="radio"
            disabled={disabled}
            checked={isChecked}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 rounded-full border transition-colors flex items-center justify-center",
              "border-[#D1D5DB] bg-white",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[#FFC107] peer-focus-visible:ring-offset-1",
              isChecked && "border-[#FFC107] bg-white",
              disabled && "bg-[#F3F4F6] border-[#E5E7EB]",
              className
            )}
          >
            {isChecked && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFC107]" />
            )}
          </div>
        </div>
        {label && <span className="text-sm text-[#374151]">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";
