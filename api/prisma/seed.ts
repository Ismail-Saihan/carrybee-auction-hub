import { PrismaClient, RoleName, UserStatus, EmploymentStatus, ItemCondition, AuctionStatus } from '@prisma/client';

const prisma = new PrismaClient();

const PERMISSIONS = [
  // Auction permissions
  { name: 'auction:view', category: 'AUCTION', description: 'View auctions and details' },
  { name: 'auction:create', category: 'AUCTION', description: 'Create new auctions' },
  { name: 'auction:edit', category: 'AUCTION', description: 'Edit auction parameters' },
  { name: 'auction:publish', category: 'AUCTION', description: 'Publish/schedule auctions' },
  { name: 'auction:cancel', category: 'AUCTION', description: 'Cancel active or scheduled auctions' },
  { name: 'auction:end', category: 'AUCTION', description: 'Manually end active auctions' },
  { name: 'auction:extend', category: 'AUCTION', description: 'Extend auction closing time' },

  // Bidding permissions
  { name: 'bid:create', category: 'BID', description: 'Place bids on active auctions' },
  { name: 'bid:view_own', category: 'BID', description: 'View own bid history' },
  { name: 'bid:view_all', category: 'BID', description: 'View all bidder identities (admin only)' },

  // Finance & Payment permissions
  { name: 'payment:view', category: 'FINANCE', description: 'View payment submissions' },
  { name: 'payment:verify', category: 'FINANCE', description: 'Verify or reject payments' },
  { name: 'settlement:view', category: 'FINANCE', description: 'View settlement queue' },
  { name: 'settlement:manage', category: 'FINANCE', description: 'Update settlement progress' },

  // User & Role management
  { name: 'user:view', category: 'USER', description: 'View employee users' },
  { name: 'user:manage', category: 'USER', description: 'Create and update users and status' },
  { name: 'role:view', category: 'USER', description: 'View roles and permissions' },
  { name: 'role:manage', category: 'USER', description: 'Assign roles and permissions' },

  // Audit & Reports
  { name: 'audit:view', category: 'AUDIT', description: 'View system audit logs' },
  { name: 'report:view', category: 'REPORT', description: 'View financial and operational reports' },
];

const ROLE_PERMISSIONS: Record<RoleName, string[]> = {
  SUPER_ADMIN: PERMISSIONS.map((p) => p.name),
  AUCTION_ADMIN: [
    'auction:view',
    'auction:create',
    'auction:edit',
    'auction:publish',
    'auction:cancel',
    'auction:end',
    'auction:extend',
    'bid:create',
    'bid:view_own',
    'bid:view_all',
    'user:view',
    'role:view',
    'audit:view',
    'report:view',
  ],
  AUCTION_MANAGER: [
    'auction:view',
    'auction:create',
    'auction:edit',
    'auction:publish',
    'bid:create',
    'bid:view_own',
    'report:view',
  ],
  FINANCE: [
    'auction:view',
    'payment:view',
    'payment:verify',
    'settlement:view',
    'settlement:manage',
    'report:view',
  ],
  AUDITOR: [
    'auction:view',
    'bid:view_all',
    'payment:view',
    'settlement:view',
    'audit:view',
    'report:view',
  ],
  EMPLOYEE: [
    'auction:view',
    'bid:create',
    'bid:view_own',
  ],
};

const CATEGORIES = [
  { code: 'LAPTOPS', name: 'Laptops', description: 'Workstations, ultrabooks, and laptops', icon: 'laptop' },
  { code: 'MOBILES', name: 'Mobiles & Accessories', description: 'Smartphones, tablets, and cables', icon: 'smartphone' },
  { code: 'AUDIO', name: 'Audio', description: 'Headphones, earbuds, and speakers', icon: 'headphones' },
  { code: 'OFFICE_EQUIPMENT', name: 'Office Equipment', description: 'Printers, scanners, and monitors', icon: 'printer' },
  { code: 'HOME_LIVING', name: 'Home & Living', description: 'Appliances and home essentials', icon: 'home' },
  { code: 'FASHION', name: 'Fashion', description: 'Apparel and accessories', icon: 'shirt' },
  { code: 'OTHER', name: 'Other', description: 'Miscellaneous recovered lots', icon: 'box' },
];

async function main() {
  console.log('Seeding CarryBee Auction Hub foundation data...');

  // 1. Seed Permissions
  console.log('1. Seeding permissions...');
  for (const perm of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: { category: perm.category, description: perm.description },
      create: perm,
    });
  }

  // 2. Seed Roles
  console.log('2. Seeding roles and role-permission mappings...');
  for (const roleName of Object.values(RoleName)) {
    const role = await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
        description: `CarryBee standard role for ${roleName}`,
      },
    });

    const allowedPermissions = ROLE_PERMISSIONS[roleName] || [];
    for (const permName of allowedPermissions) {
      const permission = await prisma.permission.findUnique({ where: { name: permName } });
      if (permission) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: role.id,
              permissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: role.id,
            permissionId: permission.id,
          },
        });
      }
    }
  }

  // 3. Seed Categories
  console.log('3. Seeding auction categories...');
  for (const cat of CATEGORIES) {
    await prisma.auctionCategory.upsert({
      where: { code: cat.code },
      update: { name: cat.name, description: cat.description, icon: cat.icon },
      create: cat,
    });
  }

  // 4. Seed UI Baseline Employee (Arif Hossain EMP001 matching UI top-nav)
  console.log('4. Seeding baseline employee...');
  const employeeRole = await prisma.role.findUnique({ where: { name: RoleName.EMPLOYEE } });
  if (employeeRole) {
    const employee = await prisma.employee.upsert({
      where: { employeeId: 'EMP001' },
      update: {},
      create: {
        employeeId: 'EMP001',
        displayName: 'Arif Hossain',
        department: 'Operations',
        designation: 'Operations Specialist',
        email: 'arif.hossain@carrybee.com',
        phone: '+8801700000001',
        employmentStatus: EmploymentStatus.ACTIVE,
        isEligibleToBid: true,
      },
    });

    await prisma.user.upsert({
      where: { clerkId: 'user_placeholder_arif' },
      update: {},
      create: {
        clerkId: 'user_placeholder_arif',
        email: employee.email,
        status: UserStatus.ACTIVE,
        roleId: employeeRole.id,
        employeeId: employee.id,
      },
    });
  }

  console.log('Database foundation seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
