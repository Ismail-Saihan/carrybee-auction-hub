"use client";

import React, { useState } from "react";
import {
  Gavel,
  ArrowRight,
  X,
  CheckCircle2,
} from "lucide-react";
import { TopNav } from "@/components/layout/top-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryBar } from "@/components/home/category-bar";
import {
  LiveAuctionCard,
  LiveAuctionItem,
} from "@/components/home/live-auction-card";
import { EndingSoonWidget } from "@/components/home/ending-soon-widget";
import { MyAuctionsTable, UserBidRow } from "@/components/home/my-auctions-table";
import { QuickStatsWidget } from "@/components/home/quick-stats-widget";
import { useLiveAuctions } from "@/hooks/use-dashboard";
import { FALLBACK_LIVE_AUCTIONS } from "@/lib/adapters/dashboard-adapter";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Quick Bidding Modal State
  const [biddingLot, setBiddingLot] = useState<LiveAuctionItem | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [bidToast, setBidToast] = useState<string | null>(null);

  // Live Auctions items matching design/Home.png (backed by TanStack Query with fallback)
  const { data: liveAuctionsData } = useLiveAuctions();
  const liveAuctions: LiveAuctionItem[] = liveAuctionsData || FALLBACK_LIVE_AUCTIONS;

  // Filter lots based on category and search query
  const filteredLots = liveAuctions.filter((lot) => {
    const matchesCategory =
      activeCategory === "all" ||
      lot.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === "electronics" && ["laptops", "mobiles", "audio"].includes(lot.category.toLowerCase()));

    const matchesSearch =
      searchQuery.trim() === "" ||
      lot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.auctionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleOpenBidModal = (lot: LiveAuctionItem) => {
    const current = typeof lot.currentBid === "number" ? lot.currentBid : parseInt(String(lot.currentBid).replace(/,/g, ""), 10);
    setBiddingLot(lot);
    setBidAmount(current + 500);
  };

  const handleConfirmBid = () => {
    if (!biddingLot) return;
    setBidToast(`Bid of ৳ ${bidAmount.toLocaleString()} placed for ${biddingLot.title}!`);
    setBiddingLot(null);
    setTimeout(() => {
      setBidToast(null);
    }, 4000);
  };

  const handleTableAction = (row: UserBidRow) => {
    setBidToast(`Action initiated for ${row.productName} (${row.auctionId})`);
    setTimeout(() => {
      setBidToast(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col antialiased">
      {/* Top Navigation Bar */}
      <TopNav
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Toast Notification */}
      {bidToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111827] text-white px-4 py-3 rounded-xl shadow-xl border border-[#374151] animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{bidToast}</span>
          <button
            onClick={() => setBidToast(null)}
            className="text-[#9CA3AF] hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container with Sidebar + Main Workspace */}
      <div className="flex-1 flex w-full">
        {/* Left Navigation Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activeNavItem}
          onNavigate={(id) => setActiveNavItem(id)}
        />

        {/* Content Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-7 space-y-6 max-w-[1440px]">
          {/* Section 1: Hero Banner */}
          <HeroBanner
            onViewLiveAuctions={() => {
              const el = document.getElementById("live-auctions-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          />

          {/* Section 2: Category Filter Bar */}
          <CategoryBar
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
          />

          {/* Section 3: Live Auctions & Ending Soon Side-by-Side */}
          <div
            id="live-auctions-section"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Live Auctions Section (75% on desktop: lg:col-span-9 or lg:col-span-8) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-8 h-8 rounded-lg bg-[#FFC107]/20 flex items-center justify-center text-[#D97706]">
                    <Gavel className="w-4 h-4" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[#111827]">
                    Live Auctions
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#10B981] ml-1">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Live now</span>
                  </div>
                  <span className="text-xs text-[#9CA3AF] hidden sm:inline">
                    • Real-time bidding
                  </span>
                </div>

                <button
                  type="button"
                  className="text-xs font-semibold text-[#6B7280] hover:text-[#111827] flex items-center gap-1 transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid of 4 Cards */}
              {filteredLots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {filteredLots.map((item) => (
                    <LiveAuctionCard
                      key={item.id}
                      item={item}
                      onPlaceBid={(lot) => handleOpenBidModal(lot)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 text-center text-[#6B7280]">
                  No auction lots found matching your filter.
                </div>
              )}
            </div>

            {/* Ending Soon Widget (25% on desktop: lg:col-span-4 or lg:col-span-3) */}
            <div className="lg:col-span-4 xl:col-span-3">
              <EndingSoonWidget
                onSelectLot={(lot) => {
                  setBidToast(`Selected ${lot.title} (${lot.auctionId})`);
                  setTimeout(() => setBidToast(null), 3000);
                }}
              />
            </div>
          </div>

          {/* Section 4: My Auctions Table & Quick Stats Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* My Auctions Table (approx 65-70%: lg:col-span-8) */}
            <div className="lg:col-span-8">
              <MyAuctionsTable onAction={handleTableAction} />
            </div>

            {/* Quick Stats & Important Notice (approx 30-35%: lg:col-span-4) */}
            <div className="lg:col-span-4">
              <QuickStatsWidget />
            </div>
          </div>
        </main>
      </div>

      {/* Place Bid Interactive Modal */}
      {biddingLot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E7EB] space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-base font-bold text-[#111827]">
                  Place Server Bid
                </h3>
                <p className="text-xs text-[#6B7280] font-mono mt-0.5">
                  {biddingLot.auctionId}
                </p>
              </div>
              <button
                onClick={() => setBiddingLot(null)}
                className="text-[#9CA3AF] hover:text-[#111827] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex justify-between items-center text-xs">
                <span className="text-[#6B7280]">Item</span>
                <span className="font-bold text-[#111827]">
                  {biddingLot.title}
                </span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex justify-between items-center text-xs">
                <span className="text-[#6B7280]">Current Bid</span>
                <span className="font-black text-[#D97706] text-sm">
                  ৳ {biddingLot.currentBid.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex justify-between items-center text-xs">
                <span className="text-[#6B7280]">Minimum Increment</span>
                <span className="font-semibold text-[#111827]">৳ 500</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">
                  Your Bid (BDT)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-sm text-[#6B7280]">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    min={
                      (typeof biddingLot.currentBid === "number"
                        ? biddingLot.currentBid
                        : 20000) + 500
                    }
                    step={500}
                    className="w-full h-11 pl-9 pr-4 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#FFC107] focus:outline-none font-bold text-sm text-[#111827]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBiddingLot(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#4B5563] hover:bg-[#F9FAFB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBid}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#FFC107] hover:bg-[#FFB800] active:bg-[#E6A700] text-[#111827] text-xs font-bold shadow-xs transition-all"
              >
                Confirm Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
