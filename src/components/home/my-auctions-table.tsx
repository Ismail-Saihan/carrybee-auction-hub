"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Gavel, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UserBidRow {
  id: string;
  auctionId: string;
  productName: string;
  category: string;
  myBid: number;
  currentBid: number;
  status: "winning" | "outbid" | "won" | "lost";
  endsIn: string;
  imageUrl: string;
  actionText: string;
}

interface MyAuctionsTableProps {
  onViewAll?: () => void;
  onAction?: (row: UserBidRow) => void;
}

export function MyAuctionsTable({ onViewAll, onAction }: MyAuctionsTableProps) {
  const [activeTab, setActiveTab] = useState<"active" | "won" | "lost" | "payment">("active");

  const tabs = [
    { id: "active", label: "My Active Bids", count: 3 },
    { id: "won", label: "Won Auctions", count: 2 },
    { id: "lost", label: "Lost Auctions", count: 5 },
    { id: "payment", label: "Payment Pending", count: 1 },
  ] as const;

  const activeBidsData: UserBidRow[] = [
    {
      id: "bid-1",
      auctionId: "AUC-2026-0914-002",
      productName: "iPhone 14",
      category: "Mobiles",
      myBid: 80000,
      currentBid: 84000,
      status: "outbid",
      endsIn: "01:32:15",
      imageUrl: "/auction/iphone-14.png",
      actionText: "Bid Again",
    },
    {
      id: "bid-2",
      auctionId: "AUC-2026-0914-001",
      productName: "Dell Latitude 5420",
      category: "Laptops",
      myBid: 28000,
      currentBid: 28000,
      status: "winning",
      endsIn: "02:14:32",
      imageUrl: "/auction/dell-latitude.png",
      actionText: "Increase Bid",
    },
    {
      id: "bid-3",
      auctionId: "AUC-2026-0913-015",
      productName: "AirPods Pro 2",
      category: "Audio",
      myBid: 20000,
      currentBid: 22000,
      status: "outbid",
      endsIn: "00:12:08",
      imageUrl: "/auction/airpods-pro.png",
      actionText: "Bid Again",
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFC107]/20 flex items-center justify-center text-[#D97706]">
            <Gavel className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#111827]">
            My Auctions
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

      {/* Tabs Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0",
                isActive
                  ? "bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] shadow-2xs"
                  : "bg-[#F3F4F6] text-[#4B5563] hover:text-[#111827] hover:bg-[#E5E7EB]"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center",
                  isActive
                    ? "bg-[#FFC107] text-[#111827]"
                    : "bg-[#E5E7EB] text-[#4B5563]"
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto mt-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
              <th className="py-2.5 px-2">Product</th>
              <th className="py-2.5 px-2">Auction ID</th>
              <th className="py-2.5 px-2">My Bid</th>
              <th className="py-2.5 px-2">Current Bid</th>
              <th className="py-2.5 px-2">Status</th>
              <th className="py-2.5 px-2">Ends In</th>
              <th className="py-2.5 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-xs">
            {activeTab === "active" ? (
              activeBidsData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#F9FAFB] transition-colors group"
                >
                  {/* Product Thumbnail + Name + Category */}
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#F3F4F6] border border-[#E5E7EB] shrink-0">
                        <Image
                          src={row.imageUrl}
                          alt={row.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                          {row.productName}
                        </div>
                        <div className="text-[11px] text-[#9CA3AF]">
                          {row.category}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Auction ID */}
                  <td className="py-3 px-2 font-mono text-[#6B7280]">
                    {row.auctionId}
                  </td>

                  {/* My Bid */}
                  <td className="py-3 px-2 font-semibold text-[#111827]">
                    ৳ {row.myBid.toLocaleString()}
                  </td>

                  {/* Current Bid */}
                  <td className="py-3 px-2 font-bold text-[#111827]">
                    ৳ {row.currentBid.toLocaleString()}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-2">
                    {row.status === "winning" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">
                        Winning
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEF2F2] text-[#EF4444] border border-[#FEE2E2]">
                        Outbid
                      </span>
                    )}
                  </td>

                  {/* Ends In */}
                  <td className="py-3 px-2 font-mono text-[#6B7280]">
                    {row.endsIn}
                  </td>

                  {/* Action Button */}
                  <td className="py-3 px-2 text-right">
                    <button
                      type="button"
                      onClick={() => onAction?.(row)}
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] active:bg-[#F3F4F6] text-[#111827] font-semibold text-xs transition-colors shadow-2xs"
                    >
                      {row.actionText}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#9CA3AF]">
                  No auctions found in this tab.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
