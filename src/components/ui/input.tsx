import React from "react";
import { Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean;
  success?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  forceState?: "default" | "focused" | "error" | "success";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      disabled,
      forceState,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const isError = Boolean(error) || forceState === "error";
    const isSuccess = Boolean(success) || forceState === "success";
    const isFocused = forceState === "focused";

    let stateBorderClass =
      "border-[#D1D5DB] focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20";

    if (isError) {
      stateBorderClass = "border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20 text-[#EF4444]";
    } else if (isSuccess) {
      stateBorderClass = "border-[#10B981] focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20";
    } else if (isFocused) {
      stateBorderClass = "border-[#FFC107] ring-2 ring-[#FFC107]/20";
    }

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-[#374151]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-[#9CA3AF]">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "w-full h-10 px-3.5 text-sm bg-white text-[#111827] placeholder:text-[#9CA3AF] rounded-md border transition-all duration-150 outline-none",
              leftIcon && "pl-10",
              (rightIcon || isSuccess || isError) && "pr-10",
              disabled && "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed border-[#E5E7EB]",
              stateBorderClass,
              className
            )}
            {...props}
          />

          <div className="absolute right-3 flex items-center pointer-events-none">
            {isSuccess ? (
              <Check className="w-4 h-4 text-[#10B981]" strokeWidth={2.5} />
            ) : isError ? (
              <AlertCircle className="w-4 h-4 text-[#EF4444]" />
            ) : (
              rightIcon
            )}
          </div>
        </div>

        {isError && typeof error === "string" && (
          <p className="text-xs text-[#EF4444] mt-0.5">{error}</p>
        )}
        {!isError && helperText && (
          <p className="text-xs text-[#6B7280] mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
