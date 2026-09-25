"use client";

import React, { useState } from "react";
import {
  BarChart2,
  Gavel,
  Trophy,
  CreditCard,
  XCircle,
  AlertCircle,
  X,
  ArrowRight,
} from "lucide-react";

interface QuickStatsWidgetProps {
  onViewAll?: () => void;
}

export function QuickStatsWidget({ onViewAll }: QuickStatsWidgetProps) {
  const [showNotice, setShowNotice] = useState(true);

  const stats = [
    {
      id: "active",
      label: "My Active Bids",
      count: "3",
      icon: Gavel,
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-[#D97706]",
    },
    {
      id: "won",
      label: "Won Auctions",
      count: "2",
      icon: Trophy,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#10B981]",
    },
    {
      id: "payment",
      label: "Payment Pending",
      count: "1",
      icon: CreditCard,
      iconBg: "bg-[#FFEDD5]",
      iconColor: "text-[#EA580C]",
    },
    {
      id: "lost",
      label: "Lost Auctions",
      count: "5",
      icon: XCircle,
      iconBg: "bg-[#FEE2E2]",
      iconColor: "text-[#EF4444]",
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Quick Stats Container */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 shadow-2xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#F59E0B]" />
            <h2 className="text-sm sm:text-base font-bold text-[#111827]">
              Quick Stats
            </h2>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-[#6B7280] hover:text-[#111827] flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2x2 Grid of Metrics */}
        <div className="grid grid-cols-2 gap-3 mt-3.5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3 flex items-center gap-3"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-black text-[#111827] leading-none">
                    {stat.count}
                  </div>
                  <div className="text-[11px] text-[#6B7280] font-medium mt-1 leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Important Notice Alert */}
      {showNotice && (
        <div className="relative bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 shadow-2xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <div className="flex-1 pr-6">
            <h3 className="text-xs font-bold text-[#92400E]">Important Notice</h3>
            <p className="text-xs text-[#B45309] mt-0.5 leading-relaxed">
              Items won in auction must be collected from the designated CarryBee facility within the specified time period.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowNotice(false)}
            className="absolute top-3.5 right-3.5 text-[#B45309] hover:text-[#78350F] p-1 rounded-lg transition-colors"
            aria-label="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
