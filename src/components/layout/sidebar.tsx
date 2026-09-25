"use client";

import React from "react";
import {
  LayoutDashboard,
  Gavel,
  Clock,
  Target,
  ShieldCheck,
  CreditCard,
  Bell,
  User,
  HelpCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeItem?: string;
  onNavigate?: (id: string) => void;
}

export function Sidebar({
  isOpen = false,
  onClose,
  activeItem = "dashboard",
  onNavigate,
}: SidebarProps) {
  const auctionNavItems = [
    { id: "live", label: "Live Auctions", icon: Gavel },
    { id: "upcoming", label: "Upcoming Auctions", icon: Clock },
    { id: "my-bids", label: "My Bids", icon: Target },
    { id: "won", label: "Won Auctions", icon: ShieldCheck },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell, badge: 5 },
  ];

  const accountNavItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  const handleItemClick = (id: string) => {
    onNavigate?.(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-40 w-60 bg-white border-r border-[#E5E7EB] flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-in-out md:translate-x-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)]",
          isOpen ? "translate-x-0 shadow-xl md:shadow-none" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 space-y-6">
          {/* Top Primary Active Link: Dashboard */}
          <div>
            <button
              type="button"
              onClick={() => handleItemClick("dashboard")}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all text-left",
                activeItem === "dashboard"
                  ? "bg-[#FFC107] text-[#111827] shadow-xs"
                  : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6]"
              )}
            >
              <LayoutDashboard className="w-5 h-5 shrink-0" />
              <span>Dashboard</span>
            </button>
          </div>

          {/* AUCTION Section */}
          <div>
            <p className="px-3 text-[11px] font-bold tracking-wider text-[#9CA3AF] uppercase mb-2">
              AUCTION
            </p>
            <nav className="space-y-1">
              {auctionNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-medium transition-colors text-left",
                      isActive
                        ? "bg-[#FFC107] text-[#111827] font-semibold shadow-xs"
                        : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="w-4 h-4 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ACCOUNT Section */}
          <div>
            <p className="px-3 text-[11px] font-bold tracking-wider text-[#9CA3AF] uppercase mb-2">
              ACCOUNT
            </p>
            <nav className="space-y-1">
              {accountNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors text-left",
                      isActive
                        ? "bg-[#FFC107] text-[#111827] font-semibold shadow-xs"
                        : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6]"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile close button in footer */}
        <div className="p-4 border-t border-[#F3F4F6] md:hidden">
          <button
            type="button"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] bg-[#F9FAFB] rounded-lg"
          >
            <X className="w-4 h-4" />
            Close Menu
          </button>
        </div>
      </aside>
    </>
  );
}
