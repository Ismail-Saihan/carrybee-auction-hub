import { Module } from '@nestjs/common';
import { AuctionController, DashboardController } from './auction.controller';
import { AuctionService } from './auction.service';

@Module({
  controllers: [AuctionController, DashboardController],
  providers: [AuctionService],
  exports: [AuctionService],
})
export class AuctionModule {}
