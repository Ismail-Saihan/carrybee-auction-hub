"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Info, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LiveAuctionItem {
  id: string;
  auctionId: string;
  title: string;
  category: string;
  condition: string;
  categoryTheme?: "blue" | "purple" | "yellow" | "green";
  conditionTheme?: "green" | "purple" | "yellow" | "blue";
  recommendedPrice: number | string;
  currentBid: number | string;
  bidCount: number;
  imageUrl: string;
  status: "live" | "ending-soon" | "upcoming";
  days: string;
  hours: string;
  mins: string;
  secs: string;
}

interface LiveAuctionCardProps {
  item: LiveAuctionItem;
  onPlaceBid?: (item: LiveAuctionItem) => void;
}

export function LiveAuctionCard({ item, onPlaceBid }: LiveAuctionCardProps) {
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  // Tag color mappings matching CarryBee design system
  const getCategoryBadgeClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "mobiles":
      case "mobiles & accessories":
        return "bg-[#E0F2FE] text-[#0369A1]";
      case "laptops":
        return "bg-[#E0F2FE] text-[#0369A1]";
      case "audio":
        return "bg-[#E0F2FE] text-[#0369A1]";
      case "office equipment":
        return "bg-[#E0F2FE] text-[#0369A1]";
      default:
        return "bg-[#E0F2FE] text-[#0369A1]";
    }
  };

  const getConditionBadgeClass = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "good condition":
        return "bg-[#DCFCE7] text-[#15803D]";
      case "open box":
        return "bg-[#F3E8FF] text-[#7E22CE]";
      case "refurbished":
        return "bg-[#FEF3C7] text-[#B45309]";
      default:
        return "bg-[#DCFCE7] text-[#15803D]";
    }
  };

  const formattedRecPrice =
    typeof item.recommendedPrice === "number"
      ? item.recommendedPrice.toLocaleString()
      : item.recommendedPrice;

  const formattedCurrentBid =
    typeof item.currentBid === "number"
      ? item.currentBid.toLocaleString()
      : item.currentBid;

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] p-3.5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top: Product Image Container */}
        <div className="relative w-full h-36 rounded-xl overflow-hidden bg-[#F3F4F6] border border-[#F1F5F9]">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover object-center group-hover:scale-102 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Status Badge: LIVE or ENDING SOON */}
          <div className="absolute top-2.5 left-2.5 z-10">
            {item.status === "ending-soon" ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F97316] text-white shadow-xs">
                <Clock className="w-3 h-3" />
                ENDING SOON
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10B981] text-white shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </span>
            )}
          </div>

          {/* Watchlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsWatchlisted(!isWatchlisted);
            }}
            aria-label={isWatchlisted ? "Remove from watchlist" : "Add to watchlist"}
            className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-xs flex items-center justify-center text-white transition-colors"
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isWatchlisted
                  ? "fill-[#EF4444] text-[#EF4444]"
                  : "text-white fill-none stroke-[2]"
              )}
            />
          </button>

          {/* Bid Count Pill on bottom-right of image */}
          <div className="absolute bottom-2 right-2 z-10 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
            {item.bidCount} bids
          </div>
        </div>

        {/* Product Information */}
        <div className="mt-3">
          <h3 className="text-sm font-bold text-[#111827] truncate leading-tight">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 text-[11px] text-[#9CA3AF] mt-0.5">
            <Info className="w-3 h-3 shrink-0" />
            <span className="font-mono">{item.auctionId}</span>
          </div>

          {/* Category & Condition Badges */}
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold",
                getCategoryBadgeClass(item.category)
              )}
            >
              {item.category}
            </span>
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold",
                getConditionBadgeClass(item.condition)
              )}
            >
              {item.condition}
            </span>
          </div>

          {/* Pricing Info */}
          <div className="mt-2.5 pt-2 border-t border-[#F1F5F9]">
            <div className="text-[10px] text-[#6B7280]">Recommended Price</div>
            <div className="text-xs font-bold text-[#374151]">
              ৳ {formattedRecPrice}
            </div>

            <div className="text-[10px] text-[#6B7280] mt-1.5">Current Bid</div>
            <div className="text-lg font-black text-[#D97706] tracking-tight">
              ৳ {formattedCurrentBid}
            </div>
          </div>

          {/* 4-Box Segmented Countdown Timer */}
          <div className="grid grid-cols-4 gap-1.5 my-3">
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg py-1 text-center">
              <span className="block text-xs sm:text-sm font-extrabold text-[#111827] leading-none">
                {item.days}
              </span>
              <span className="block text-[8px] sm:text-[9px] text-[#9CA3AF] uppercase font-bold mt-0.5">
                Days
              </span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg py-1 text-center">
              <span className="block text-xs sm:text-sm font-extrabold text-[#111827] leading-none">
                {item.hours}
              </span>
              <span className="block text-[8px] sm:text-[9px] text-[#9CA3AF] uppercase font-bold mt-0.5">
                Hours
              </span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg py-1 text-center">
              <span className="block text-xs sm:text-sm font-extrabold text-[#111827] leading-none">
                {item.mins}
              </span>
              <span className="block text-[8px] sm:text-[9px] text-[#9CA3AF] uppercase font-bold mt-0.5">
                Mins
              </span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg py-1 text-center">
              <span className="block text-xs sm:text-sm font-extrabold text-[#111827] leading-none">
                {item.secs}
              </span>
              <span className="block text-[8px] sm:text-[9px] text-[#9CA3AF] uppercase font-bold mt-0.5">
                Secs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button: Place Bid */}
      <button
        type="button"
        onClick={() => onPlaceBid?.(item)}
        className="w-full bg-[#FFC107] hover:bg-[#FFB800] active:bg-[#E6A700] text-[#111827] font-bold text-xs sm:text-sm py-2 rounded-xl transition-all shadow-2xs hover:shadow-xs mt-1"
      >
        Place Bid
      </button>
    </div>
  );
}
