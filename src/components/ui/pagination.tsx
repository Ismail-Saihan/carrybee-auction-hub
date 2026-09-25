"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  className,
}: PaginationProps) {
  const [page, setPage] = React.useState(currentPage);

  const activePage = onPageChange ? currentPage : page;

  const handlePageClick = (p: number) => {
    if (p < 1 || p > totalPages) return;
    if (!onPageChange) setPage(p);
    onPageChange?.(p);
  };

  // Generate page numbers with ellipsis matching reference (1, 2, 3, 4, 5, ..., 10)
  const renderPages = () => {
    const items: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1, 2, 3, 4, 5, "...", totalPages);
    }

    return items.map((item, idx) => {
      if (item === "...") {
        return (
          <span
            key={`ellipsis-${idx}`}
            className="flex items-center justify-center w-8 h-8 text-sm text-[#6B7280] select-none"
          >
            ...
          </span>
        );
      }

      const pNum = Number(item);
      const isSelected = pNum === activePage;

      return (
        <button
          key={pNum}
          type="button"
          onClick={() => handlePageClick(pNum)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors select-none",
            isSelected
              ? "bg-[#FFC107] text-[#111827] font-semibold shadow-sm"
              : "border border-[#D1D5DB] bg-white text-[#374151] hover:bg-[#F3F4F6]"
          )}
        >
          {pNum}
        </button>
      );
    });
  };

  return (
    <nav
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={activePage <= 1}
        onClick={() => handlePageClick(activePage - 1)}
        aria-label="Previous page"
        className="w-8 h-8 flex items-center justify-center rounded-md border border-[#D1D5DB] bg-white text-[#374151] hover:bg-[#F3F4F6] disabled:opacity-40 disabled:cursor-not-allowed select-none"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {renderPages()}

      <button
        type="button"
        disabled={activePage >= totalPages}
        onClick={() => handlePageClick(activePage + 1)}
        aria-label="Next page"
        className="w-8 h-8 flex items-center justify-center rounded-md border border-[#D1D5DB] bg-white text-[#374151] hover:bg-[#F3F4F6] disabled:opacity-40 disabled:cursor-not-allowed select-none"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
