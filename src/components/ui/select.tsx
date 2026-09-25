import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | boolean;
  options?: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      options = [],
      placeholder = "Select option",
      children,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const isError = Boolean(error);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-medium text-[#374151]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(
              "w-full h-10 pl-3.5 pr-10 text-sm bg-white text-[#111827] rounded-md border border-[#D1D5DB] appearance-none transition-all duration-150 outline-none focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 cursor-pointer",
              isError && "border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20",
              disabled && "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed border-[#E5E7EB]",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
            {children}
          </select>

          <div className="absolute right-3.5 pointer-events-none text-[#6B7280]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {isError && typeof error === "string" && (
          <p className="text-xs text-[#EF4444] mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
