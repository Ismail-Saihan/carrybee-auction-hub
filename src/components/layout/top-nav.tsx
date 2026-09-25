"use client";

import React from "react";
import { Search, Bell, Menu, ChevronDown } from "lucide-react";
import { CarryBeeLogo } from "@/components/brand/carrybee-logo";

interface TopNavProps {
  onToggleSidebar?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function TopNav({
  onToggleSidebar,
  searchQuery = "",
  onSearchChange,
}: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#111827] text-white border-b border-[#1F2937] shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 gap-4">
        {/* Left Section: Logo & Hamburger */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="flex items-center pl-0.5 sm:pl-1">
            <CarryBeeLogo variant="dark" height={40} priority />
          </div>

          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 text-[#9CA3AF] hover:text-white bg-[#1F2937]/80 hover:bg-[#1F2937] border border-[#374151]/70 rounded-xl transition-all flex items-center justify-center shadow-2xs cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-4 h-4 text-[#D1D5DB]" />
          </button>
        </div>

        {/* Center Section: Search Bar with Ctrl + K badge */}
        <div className="flex-1 max-w-xl mx-2 hidden sm:block">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search auctions, products, categories..."
              className="w-full h-10 pl-10 pr-20 bg-white text-[#111827] placeholder:text-[#9CA3AF] text-sm rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all shadow-xs"
            />
            <div className="absolute right-3 flex items-center gap-1 bg-[#F3F4F6] text-[#6B7280] text-[11px] font-medium px-2 py-0.5 rounded border border-[#E5E7EB] pointer-events-none">
              Ctrl + K
            </div>
          </div>
        </div>

        {/* Right Section: Live Sync Status, Notifications, and User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Live Sync Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#064E3B]/40 border border-[#065F46] text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="font-semibold text-white">Live Sync</span>
            <span className="text-[#9CA3AF] font-mono text-[11px]">14ms</span>
          </div>

          {/* Notifications Bell */}
          <button
            type="button"
            className="relative p-2 text-[#D1D5DB] hover:text-white hover:bg-[#1F2937] rounded-lg transition-colors"
            aria-label="View notifications (5 unread)"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#111827]">
              5
            </span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-[#374151]">
            <div className="w-9 h-9 rounded-full bg-[#374151] border border-[#4B5563] text-white font-bold text-xs flex items-center justify-center shrink-0">
              AD
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">
                Arif Hossain
              </span>
              <span className="text-[10px] text-[#9CA3AF] leading-tight mt-0.5">
                EMP001 · Operations
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-[#9CA3AF] hidden md:block" />
          </div>
        </div>
      </div>
    </header>
  );
}
