import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AuctionService {
  constructor(private readonly prisma: PrismaService) {}

  async getLiveAuctions() {
    return this.prisma.auction.findMany({
      where: { status: 'LIVE' },
      include: {
        item: {
          include: {
            category: true,
          },
        },
      },
      orderBy: { endsAt: 'asc' },
      take: 20,
    });
  }

  async getEndingSoonAuctions() {
    return this.prisma.auction.findMany({
      where: { status: 'LIVE' },
      include: {
        item: true,
      },
      orderBy: { endsAt: 'asc' },
      take: 10,
    });
  }

  async getDashboardSummary() {
    const [liveCount, endingSoonCount, scheduledCount, completedCount] = await Promise.all([
      this.prisma.auction.count({ where: { status: 'LIVE' } }),
      this.prisma.auction.count({
        where: {
          status: 'LIVE',
          endsAt: {
            lte: new Date(Date.now() + 2 * 60 * 60 * 1000), // ending in next 2 hours
          },
        },
      }),
      this.prisma.auction.count({ where: { status: 'SCHEDULED' } }),
      this.prisma.auction.count({ where: { status: 'COMPLETED' } }),
    ]);

    return {
      liveAuctionsCount: liveCount,
      endingSoonCount,
      upcomingAuctionsCount: scheduledCount,
      completedAuctionsCount: completedCount,
    };
  }
}
