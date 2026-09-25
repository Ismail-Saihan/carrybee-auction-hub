"use client";

import React from "react";
import Image from "next/image";
import { Gavel, Clock, Calendar, Trophy, ArrowRight } from "lucide-react";

interface HeroBannerProps {
  onViewLiveAuctions?: () => void;
}

export function HeroBanner({ onViewLiveAuctions }: HeroBannerProps) {
  const stats = [
    { label: "Live Auctions", value: "24", icon: Gavel },
    { label: "Ending Soon", value: "12", icon: Clock },
    { label: "Upcoming", value: "36", icon: Calendar },
    { label: "Completed", value: "218", icon: Trophy },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#111827] border border-[#1F2937] text-white shadow-sm">
      {/* Background Logistics Image overlay on the right half */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 lg:w-1/2 opacity-35 md:opacity-50 pointer-events-none mix-blend-luminosity overflow-hidden">
        <Image
          src="/auction/hero-parcels.png"
          alt="CarryBee Logistics Warehouse Parcels"
          fill
          className="object-cover object-left"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/80 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between p-6 sm:p-8 gap-8">
        {/* Left Column: Headline and Platform Metrics */}
        <div className="flex-1 max-w-2xl">
          <div className="inline-block">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              CarryBee <span className="text-[#FFC107]">Auction Hub</span>
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-[#9CA3AF] font-normal">
              Internal Auction Platform for CarryBee Employees
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 border-t border-[#1F2937]/80">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFC107]/15 border border-[#FFC107]/30 flex items-center justify-center text-[#FFC107] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-white leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#9CA3AF] font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Floating Card: Ongoing Employee Auction Callout */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-[#1F2937]/90 backdrop-blur-md rounded-xl p-5 border border-[#374151] shadow-lg">
            <h2 className="text-sm font-bold text-white tracking-wide">
              Ongoing Employee Auction
            </h2>
            <p className="text-xs text-[#9CA3AF] mt-1 mb-4 leading-relaxed">
              Browse and place bids on approved items from our internal inventory.
            </p>
            <button
              type="button"
              onClick={onViewLiveAuctions}
              className="w-full bg-[#FFC107] hover:bg-[#FFB800] active:bg-[#E6A700] text-[#111827] font-bold text-xs sm:text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>View Live Auctions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
