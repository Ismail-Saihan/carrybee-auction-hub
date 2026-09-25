import { Controller, Get, Query } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { Public } from '../../auth/public.decorator';

@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Public()
  @Get()
  async getAuctions(@Query('status') status?: string) {
    if (status === 'LIVE') {
      return this.auctionService.getLiveAuctions();
    }
    return this.auctionService.getLiveAuctions();
  }

  @Public()
  @Get('ending-soon')
  async getEndingSoon() {
    return this.auctionService.getEndingSoonAuctions();
  }
}

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly auctionService: AuctionService) {}

  @Public()
  @Get('summary')
  async getSummary() {
    return this.auctionService.getDashboardSummary();
  }
}
