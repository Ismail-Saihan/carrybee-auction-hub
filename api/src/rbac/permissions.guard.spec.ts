import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';
import { RoleName } from './roles.enum';

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new PermissionsGuard(reflector);
  });

  function createMockExecutionContext(user?: Record<string, unknown>): ExecutionContext {
    return {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    } as unknown as ExecutionContext;
  }

  it('should allow access when no permissions are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);
    const context = createMockExecutionContext();
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw UnauthorizedException when no user is attached to request', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['auction:create']);
    const context = createMockExecutionContext(undefined);
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should allow SUPER_ADMIN regardless of explicit permissions', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['auction:create']);
    const context = createMockExecutionContext({
      roleName: RoleName.SUPER_ADMIN,
      permissions: [],
    });
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow user with required permission', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['auction:create']);
    const context = createMockExecutionContext({
      roleName: RoleName.AUCTION_ADMIN,
      permissions: ['auction:create', 'auction:view'],
    });
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw ForbiddenException when user lacks required permission', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['auction:create']);
    const context = createMockExecutionContext({
      roleName: RoleName.EMPLOYEE,
      permissions: ['auction:view'],
    });
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
