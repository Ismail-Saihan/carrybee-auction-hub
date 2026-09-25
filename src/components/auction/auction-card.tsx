"use client";

import React from "react";
import Image from "next/image";
import { Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AuctionCardProps {
  title?: string;
  category?: string;
  condition?: string;
  currentBid?: number | string;
  bidCount?: number;
  timeRemaining?: string;
  imageUrl?: string;
  status?: "live" | "ending-soon" | "upcoming" | "ended";
  onViewDetails?: () => void;
  className?: string;
}

export function AuctionCard({
  title = "Laptop - Dell Latitude 5420",
  category = "Electronics",
  condition = "Open Box",
  currentBid = "28,000",
  bidCount = 12,
  timeRemaining = "02:14:32",
  imageUrl = "/dell-laptop.png",
  status = "live",
  onViewDetails,
  className,
}: AuctionCardProps) {
  const [isWatchlisted, setIsWatchlisted] = React.useState(false);

  const formattedBid =
    typeof currentBid === "number" ? currentBid.toLocaleString() : currentBid;

  return (
    <div
      className={cn(
        "w-full max-w-[480px] bg-white rounded-xl border border-[#E5E7EB] p-3.5 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col gap-3",
        className
      )}
    >
      {/* Top Section: Horizontal layout of image + details */}
      <div className="flex gap-3.5 items-start">
        {/* Left: Product Image with LIVE Badge */}
        <div className="relative w-36 h-28 rounded-lg overflow-hidden bg-[#F3F4F6] shrink-0 border border-[#F1F5F9]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 144px, 160px"
          />
          {status === "live" && (
            <div className="absolute top-2 left-2 z-10">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981] text-white shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </span>
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full pt-0.5">
          {/* Header row: Title & Watchlist */}
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-[#111827] truncate">
              {title}
            </h4>
            <button
              type="button"
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              aria-label="Add to watchlist"
              className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors p-0.5 shrink-0"
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  isWatchlisted && "fill-[#EF4444] text-[#EF4444]"
                )}
              />
            </button>
          </div>

          {/* Badges row */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#DBEAFE] text-[#2563EB]">
              {category}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#EDE9FE] text-[#7C3AED]">
              {condition}
            </span>
          </div>

          {/* Bidding metrics */}
          <div className="mt-2.5">
            <span className="text-[11px] text-[#6B7280] block font-normal">
              Current Bid
            </span>
            <div className="flex items-baseline justify-between gap-2 mt-0.5">
              <span className="text-base font-bold text-[#111827]">
                ৳ {formattedBid}
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#6B7280]">{bidCount} bids</span>
                <span className="inline-flex items-center gap-1 text-[#EF4444] font-medium">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  {timeRemaining}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button: Full-width Yellow View Details */}
      <Button
        variant="primary"
        size="medium"
        onClick={onViewDetails}
        className="w-full font-semibold shadow-xs"
      >
        View Details
      </Button>
    </div>
  );
}
