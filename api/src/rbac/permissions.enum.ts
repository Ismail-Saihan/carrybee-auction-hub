export enum PermissionName {
  // Auction permissions
  AUCTION_VIEW = 'auction:view',
  AUCTION_CREATE = 'auction:create',
  AUCTION_EDIT = 'auction:edit',
  AUCTION_PUBLISH = 'auction:publish',
  AUCTION_CANCEL = 'auction:cancel',
  AUCTION_END = 'auction:end',
  AUCTION_EXTEND = 'auction:extend',

  // Bidding permissions
  BID_CREATE = 'bid:create',
  BID_VIEW_OWN = 'bid:view_own',
  BID_VIEW_ALL = 'bid:view_all',

  // Payment & Settlement permissions
  PAYMENT_VIEW = 'payment:view',
  PAYMENT_VERIFY = 'payment:verify',
  SETTLEMENT_VIEW = 'settlement:view',
  SETTLEMENT_MANAGE = 'settlement:manage',

  // User & Role administration
  USER_VIEW = 'user:view',
  USER_MANAGE = 'user:manage',
  ROLE_VIEW = 'role:view',
  ROLE_MANAGE = 'role:manage',

  // Audit & Reporting
  AUDIT_VIEW = 'audit:view',
  REPORT_VIEW = 'report:view',
}
