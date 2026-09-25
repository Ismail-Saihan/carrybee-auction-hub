import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthenticatedUser {
  id: string;
  clerkId: string;
  email: string;
  status: string;
  roleId: string;
  roleName: string;
  permissions: string[];
  employee?: {
    id: string;
    employeeId: string;
    displayName: string;
    department: string;
    designation: string;
    email: string;
    employmentStatus: string;
    isEligibleToBid: boolean;
  } | null;
}

export const CurrentUser = createParamDecorator(
  (data: keyof AuthenticatedUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUser | undefined;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
