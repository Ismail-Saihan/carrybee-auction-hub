"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  const [selected, setSelected] = React.useState(activeTab || tabs[0]?.id);

  const currentTab = activeTab !== undefined ? activeTab : selected;

  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (activeTab === undefined) setSelected(id);
    onChange?.(id);
  };

  return (
    <div className={cn("border-b border-[#E5E7EB]", className)}>
      <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === currentTab;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={() => handleSelect(tab.id, tab.disabled)}
              className={cn(
                "whitespace-nowrap py-3 px-1 border-b-2 text-sm font-medium transition-colors select-none",
                isActive
                  ? "border-[#FFC107] text-[#111827] font-semibold"
                  : "border-transparent text-[#6B7280] hover:text-[#111827] hover:border-[#D1D5DB]",
                tab.disabled && "cursor-not-allowed opacity-40 hover:border-transparent hover:text-[#6B7280]"
              )}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "ml-2 py-0.5 px-2 rounded-full text-xs",
                    isActive
                      ? "bg-[#FFC107]/20 text-[#111827] font-semibold"
                      : "bg-[#F3F4F6] text-[#6B7280]"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
