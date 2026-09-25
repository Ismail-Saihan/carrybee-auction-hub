import { SetMetadata } from '@nestjs/common';
import { PermissionName } from './permissions.enum';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: (PermissionName | string)[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
