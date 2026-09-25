import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | boolean;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const isError = Boolean(error);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-medium text-[#374151]"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={cn(
            "w-full min-h-[96px] p-3 text-sm bg-white text-[#111827] placeholder:text-[#9CA3AF] rounded-md border border-[#D1D5DB] transition-all duration-150 outline-none focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 resize-y",
            isError && "border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20",
            disabled && "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed border-[#E5E7EB]",
            className
          )}
          {...props}
        />

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

Textarea.displayName = "Textarea";
