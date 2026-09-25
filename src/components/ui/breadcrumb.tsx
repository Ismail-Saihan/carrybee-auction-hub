import React from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  className?: string;
}

export function Breadcrumb({
  items,
  showHomeIcon = true,
  className,
}: BreadcrumbProps) {
  return (
    <nav
      className={cn("flex items-center text-sm text-[#6B7280]", className)}
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center gap-1.5 flex-wrap">
        {showHomeIcon && (
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              <Home className="w-4 h-4 mr-1.5 text-[#6B7280]" />
              <span>Dashboard</span>
            </Link>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
              {isLast || !item.href ? (
                <span className="font-medium text-[#111827]">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#111827] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
