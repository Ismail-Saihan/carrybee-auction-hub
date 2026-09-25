import { Controller, Get } from '@nestjs/common';
import { HealthService, HealthCheckResult } from './health.service';
import { Public } from '../../auth/public.decorator';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get()
  async check(): Promise<HealthCheckResult> {
    return this.healthService.check();
  }
}
