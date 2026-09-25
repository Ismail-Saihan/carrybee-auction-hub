import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RedisService } from '../../redis/redis.service';

export interface HealthCheckResult {
  status: 'ok' | 'degraded' | 'down';
  uptime: number;
  timestamp: string;
  services: {
    database: {
      status: 'up' | 'down';
    };
    redis: {
      status: 'up' | 'down';
    };
  };
}

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async check(): Promise<HealthCheckResult> {
    const isDbUp = await this.prisma.checkHealth();
    const isRedisUp = await this.redis.checkHealth();

    let overallStatus: 'ok' | 'degraded' | 'down' = 'ok';
    if (!isDbUp) {
      overallStatus = 'down'; // Database is authoritative, essential for operation
    } else if (!isRedisUp) {
      overallStatus = 'degraded';
    }

    return {
      status: overallStatus,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: isDbUp ? 'up' : 'down',
        },
        redis: {
          status: isRedisUp ? 'up' : 'down',
        },
      },
    };
  }
}
