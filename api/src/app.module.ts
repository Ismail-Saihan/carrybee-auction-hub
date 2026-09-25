import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { PrismaModule } from './database/prisma.module';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { RbacModule } from './rbac/rbac.module';
import { AuctionModule } from './domain/auction/auction.module';
import { BidModule } from './domain/bid/bid.module';
import { RealtimeModule } from './domain/realtime/realtime.module';
import { FinanceModule } from './domain/finance/finance.module';
import { NotificationModule } from './domain/notification/notification.module';
import { AuditModule } from './domain/audit/audit.module';
import { FilesModule } from './domain/files/files.module';
import { JobsModule } from './domain/jobs/jobs.module';
import { ReportsModule } from './domain/reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env', '.env.local'],
    }),
    CoreModule,
    PrismaModule,
    RedisModule,
    AuthModule,
    RbacModule,
    AuctionModule,
    BidModule,
    RealtimeModule,
    FinanceModule,
    NotificationModule,
    AuditModule,
    FilesModule,
    JobsModule,
    ReportsModule,
  ],
})
export class AppModule {}
