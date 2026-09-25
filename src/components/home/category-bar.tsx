"use client";

import React from "react";
import {
  LayoutGrid,
  Zap,
  Smartphone,
  Laptop,
  Home,
  Shirt,
  Printer,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryBarProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export function CategoryBar({
  activeCategory = "all",
  onSelectCategory,
}: CategoryBarProps) {
  const categories = [
    { id: "all", label: "All Categories", icon: LayoutGrid },
    { id: "electronics", label: "Electronics", icon: Zap },
    { id: "mobiles", label: "Mobiles & Accessories", icon: Smartphone },
    { id: "laptops", label: "Laptops", icon: Laptop },
    { id: "home", label: "Home & Living", icon: Home },
    { id: "fashion", label: "Fashion", icon: Shirt },
    { id: "office", label: "Office Equipment", icon: Printer },
    { id: "other", label: "Other", icon: Compass },
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1">
      <div className="flex items-center gap-2.5 min-w-max">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory?.(cat.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border shrink-0 shadow-2xs",
                isActive
                  ? "bg-[#FFC107] text-[#111827] border-[#FFC107] shadow-xs"
                  : "bg-white text-[#4B5563] hover:text-[#111827] border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
