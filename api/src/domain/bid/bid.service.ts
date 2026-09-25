import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class BidService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserBids(userId: string) {
    return this.prisma.bid.findMany({
      where: { bidderId: userId },
      include: {
        auction: {
          include: {
            item: true,
          },
        },
      },
      orderBy: { placedAt: 'desc' },
      take: 20,
    });
  }
}
