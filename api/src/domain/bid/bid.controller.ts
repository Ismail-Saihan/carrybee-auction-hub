import { Controller, Get, UseGuards } from '@nestjs/common';
import { BidService } from './bid.service';
import { ClerkAuthGuard } from '../../auth/clerk-auth.guard';
import { CurrentUser, AuthenticatedUser } from '../../auth/current-user.decorator';
import { RequirePermissions } from '../../rbac/require-permissions.decorator';
import { PermissionName } from '../../rbac/permissions.enum';
import { PermissionsGuard } from '../../rbac/permissions.guard';

@Controller('me/bids')
@UseGuards(ClerkAuthGuard, PermissionsGuard)
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Get()
  @RequirePermissions(PermissionName.BID_VIEW_OWN)
  async getMyBids(@CurrentUser() user: AuthenticatedUser) {
    return this.bidService.getUserBids(user.id);
  }
}
