import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import {
  DashboardSummaryDto,
  LiveAuctionDto,
  UserBidDto,
} from '@/types/api';
import {
  adaptLiveAuction,
  adaptUserBid,
  FALLBACK_LIVE_AUCTIONS,
} from '@/lib/adapters/dashboard-adapter';
import { LiveAuctionItem } from '@/components/home/live-auction-card';
import { UserBidRow } from '@/components/home/my-auctions-table';

export function useDashboardSummary() {
  return useQuery<DashboardSummaryDto>({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => apiClient<DashboardSummaryDto>('/dashboard/summary'),
    staleTime: 30 * 1000,
    retry: 1,
  });
}

export function useLiveAuctions() {
  return useQuery<LiveAuctionItem[]>({
    queryKey: ['auctions', 'live'],
    queryFn: async () => {
      try {
        const dtos = await apiClient<LiveAuctionDto[]>('/auctions?status=LIVE');
        if (Array.isArray(dtos) && dtos.length > 0) {
          return dtos.map(adaptLiveAuction);
        }
        return FALLBACK_LIVE_AUCTIONS;
      } catch {
        // Return fallback data during development or when backend is starting up
        return FALLBACK_LIVE_AUCTIONS;
      }
    },
    staleTime: 10 * 1000,
    retry: false,
  });
}

export function useEndingSoonAuctions() {
  return useQuery<LiveAuctionDto[]>({
    queryKey: ['auctions', 'ending-soon'],
    queryFn: () => apiClient<LiveAuctionDto[]>('/auctions/ending-soon'),
    staleTime: 10 * 1000,
    retry: false,
  });
}

export function useMyBids(status?: string) {
  return useQuery<UserBidRow[]>({
    queryKey: ['me', 'bids', status],
    queryFn: async () => {
      const endpoint = status ? `/me/bids?status=${status}` : '/me/bids';
      const dtos = await apiClient<UserBidDto[]>(endpoint);
      return dtos.map(adaptUserBid);
    },
    staleTime: 15 * 1000,
    retry: false,
    enabled: false, // will be enabled when user is authenticated with active session
  });
}
