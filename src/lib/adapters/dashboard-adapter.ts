import { LiveAuctionDto, UserBidDto } from '@/types/api';
import { LiveAuctionItem } from '@/components/home/live-auction-card';
import { UserBidRow } from '@/components/home/my-auctions-table';

export function calculateTimeRemaining(endsAt: string | Date): {
  days: string;
  hours: string;
  mins: string;
  secs: string;
  formatted: string;
} {
  const end = new Date(endsAt).getTime();
  const now = Date.now();
  const diff = Math.max(0, end - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / 1000 / 60) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const pad = (n: number) => String(n).padStart(2, '0');

  return {
    days: pad(days),
    hours: pad(hours),
    mins: pad(mins),
    secs: pad(secs),
    formatted: `${pad(hours)}:${pad(mins)}:${pad(secs)}`,
  };
}

export function adaptLiveAuction(dto: LiveAuctionDto): LiveAuctionItem {
  const time = calculateTimeRemaining(dto.endsAt);
  const isEndingSoon =
    new Date(dto.endsAt).getTime() - Date.now() < 30 * 60 * 1000;

  return {
    id: dto.id,
    auctionId: dto.auctionNumber,
    title: dto.item?.title || 'Auction Item',
    category: dto.item?.category?.name || 'General',
    condition: dto.item?.condition || 'Good Condition',
    recommendedPrice: Number(dto.item?.recommendedPrice || 0),
    currentBid: Number(dto.currentBid || dto.startingBid || 0),
    bidCount: dto.bidCount || 0,
    imageUrl: dto.item?.images?.[0] || '/auction/dell-latitude.png',
    status: isEndingSoon ? 'ending-soon' : 'live',
    days: time.days,
    hours: time.hours,
    mins: time.mins,
    secs: time.secs,
  };
}

export function adaptUserBid(dto: UserBidDto): UserBidRow {
  const time = calculateTimeRemaining(dto.endsAt);
  let actionText = 'Bid Again';
  if (dto.status === 'winning') actionText = 'Increase Bid';
  if (dto.status === 'won') actionText = 'Proceed to Pay';

  return {
    id: dto.id,
    auctionId: dto.auctionNumber,
    productName: dto.productName,
    category: dto.category,
    myBid: Number(dto.myBid),
    currentBid: Number(dto.currentBid),
    status: dto.status,
    endsIn: time.formatted,
    imageUrl: dto.imageUrl || '/auction/iphone-14.png',
    actionText,
  };
}

/**
 * Fallback static mock data matching design/Home.png
 * Used when the backend has no active auctions or during offline development.
 */
export const FALLBACK_LIVE_AUCTIONS: LiveAuctionItem[] = [
  {
    id: 'lot-1',
    auctionId: 'AUC-2026-0914-001',
    title: 'Dell Latitude 5420',
    category: 'Laptops',
    condition: 'Good Condition',
    recommendedPrice: 50000,
    currentBid: 28000,
    bidCount: 12,
    imageUrl: '/auction/dell-latitude.png',
    status: 'live',
    days: '00',
    hours: '02',
    mins: '14',
    secs: '32',
  },
  {
    id: 'lot-2',
    auctionId: 'AUC-2026-0914-002',
    title: 'iPhone 14',
    category: 'Mobiles',
    condition: 'Open Box',
    recommendedPrice: 70000,
    currentBid: 84000,
    bidCount: 28,
    imageUrl: '/auction/iphone-14.png',
    status: 'live',
    days: '00',
    hours: '01',
    mins: '32',
    secs: '15',
  },
  {
    id: 'lot-3',
    auctionId: 'AUC-2026-0913-015',
    title: 'Apple AirPods Pro 2',
    category: 'Audio',
    condition: 'Refurbished',
    recommendedPrice: 25000,
    currentBid: 22000,
    bidCount: 18,
    imageUrl: '/auction/airpods-pro.png',
    status: 'ending-soon',
    days: '00',
    hours: '00',
    mins: '12',
    secs: '08',
  },
  {
    id: 'lot-4',
    auctionId: 'AUC-2026-0914-008',
    title: 'Canon G2010 Printer',
    category: 'Office Equipment',
    condition: 'Good Condition',
    recommendedPrice: 20000,
    currentBid: 12500,
    bidCount: 7,
    imageUrl: '/auction/canon-printer.png',
    status: 'live',
    days: '00',
    hours: '03',
    mins: '22',
    secs: '41',
  },
];
