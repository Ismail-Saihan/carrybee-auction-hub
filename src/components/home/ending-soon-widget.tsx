"use client";

import React from "react";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";

export interface EndingSoonItem {
  id: string;
  auctionId: string;
  title: string;
  bidCount: number;
  timeRemaining: string;
  imageUrl: string;
}

interface EndingSoonWidgetProps {
  items?: EndingSoonItem[];
  onViewAll?: () => void;
  onSelectLot?: (item: EndingSoonItem) => void;
}

export function EndingSoonWidget({
  items,
  onViewAll,
  onSelectLot,
}: EndingSoonWidgetProps) {
  const defaultItems: EndingSoonItem[] = [
    {
      id: "es-1",
      auctionId: "AUC-2026-0913-021",
      title: "Apple Watch Series 8",
      bidCount: 12,
      timeRemaining: "00:10:32",
      imageUrl: "/auction/apple-watch.png",
    },
    {
      id: "es-2",
      auctionId: "AUC-2026-0913-019",
      title: "Sony WH-1000XM4",
      bidCount: 24,
      timeRemaining: "00:24:18",
      imageUrl: "/auction/sony-headphones.png",
    },
    {
      id: "es-3",
      auctionId: "AUC-2026-0913-017",
      title: "Nintendo Switch (Used)",
      bidCount: 18,
      timeRemaining: "00:42:55",
      imageUrl: "/auction/nintendo-switch.png",
    },
    {
      id: "es-4",
      auctionId: "AUC-2026-0913-020",
      title: "Logitech MX Master 3",
      bidCount: 9,
      timeRemaining: "01:12:33",
      imageUrl: "/auction/logitech-mouse.png",
    },
  ];

  const lotList = items || defaultItems;

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#F59E0B]" />
          <h2 className="text-sm sm:text-base font-bold text-[#111827]">
            Ending Soon
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

      {/* Lot List */}
      <div className="divide-y divide-[#F1F5F9] mt-1">
        {lotList.map((lot) => (
          <div
            key={lot.id}
            onClick={() => onSelectLot?.(lot)}
            className="py-3 flex items-center justify-between gap-3 hover:bg-[#F9FAFB] -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
          >
            {/* Left: Thumbnail & Details */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] overflow-hidden shrink-0 flex items-center justify-center">
                <Image
                  src={lot.imageUrl}
                  alt={lot.title}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full p-1"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors truncate">
                  {lot.title}
                </h3>
                <p className="text-[10px] text-[#9CA3AF] font-mono mt-0.5">
                  {lot.auctionId}
                </p>
                <p className="text-[11px] text-[#6B7280] font-medium">
                  {lot.bidCount} bids
                </p>
              </div>
            </div>

            {/* Right: Urgent Timer Badge */}
            <div className="shrink-0">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2] text-[#EF4444] font-mono text-xs font-extrabold tracking-tight">
                {lot.timeRemaining}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
