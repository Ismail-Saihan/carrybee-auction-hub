/**
 * CarryBee Auction Hub — Shared API Contracts and DTOs
 */

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    requestId?: string;
  };
}

export interface ApiErrorEnvelope {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
  requestId: string;
}

export interface DashboardSummaryDto {
  liveAuctionsCount: number;
  endingSoonCount: number;
  upcomingAuctionsCount: number;
  completedAuctionsCount: number;
}

export interface AuctionCategoryDto {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  icon?: string | null;
}

export interface AuctionItemDto {
  id: string;
  lotNumber: string;
  title: string;
  description: string;
  condition: string;
  recommendedPrice: number;
  images: string[];
  category?: AuctionCategoryDto;
}

export interface LiveAuctionDto {
  id: string;
  auctionNumber: string;
  status: string;
  startsAt: string;
  endsAt: string;
  startingBid: number;
  currentBid: number;
  minIncrement: number;
  bidCount: number;
  antiSnipingEnabled: boolean;
  collectionLocation: string;
  item: AuctionItemDto;
}

export interface UserBidDto {
  id: string;
  auctionId: string;
  auctionNumber: string;
  productName: string;
  category: string;
  myBid: number;
  currentBid: number;
  status: 'winning' | 'outbid' | 'won' | 'lost';
  endsAt: string;
  imageUrl: string;
}

export interface HealthCheckDto {
  status: 'ok' | 'degraded' | 'down';
  uptime: number;
  timestamp: string;
  services: {
    database: { status: 'up' | 'down' };
    redis: { status: 'up' | 'down' };
  };
}
