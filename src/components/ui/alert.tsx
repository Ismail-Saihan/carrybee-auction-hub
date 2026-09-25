"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AlertType;
  title?: string;
  onClose?: () => void;
  dismissible?: boolean;
}

export function Alert({
  className,
  type = "info",
  title,
  onClose,
  dismissible = true,
  children,
  ...props
}: AlertProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const config = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />,
      container: "bg-[#F0FDF4] border-[#10B981]/30 text-[#065F46]",
      closeText: "text-[#065F46] hover:bg-[#10B981]/10",
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0" />,
      container: "bg-[#FEF2F2] border-[#EF4444]/30 text-[#991B1B]",
      closeText: "text-[#991B1B] hover:bg-[#EF4444]/10",
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />,
      container: "bg-[#FFFBEB] border-[#F59E0B]/30 text-[#92400E]",
      closeText: "text-[#92400E] hover:bg-[#F59E0B]/10",
    },
    info: {
      icon: <Info className="w-5 h-5 text-[#3B82F6] shrink-0" />,
      container: "bg-[#EFF6FF] border-[#3B82F6]/30 text-[#1E40AF]",
      closeText: "text-[#1E40AF] hover:bg-[#3B82F6]/10",
    },
  }[type];

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-3 rounded-lg border text-sm transition-all duration-200",
        config.container,
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {config.icon}
        <div className="font-medium">
          {title && <span className="font-semibold mr-1.5">{title}</span>}
          {children}
        </div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleClose}
          aria-label="Dismiss alert"
          className={cn(
            "p-1 rounded-md transition-colors cursor-pointer shrink-0 opacity-70 hover:opacity-100",
            config.closeText
          )}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
