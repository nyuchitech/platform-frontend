/**
 * 🇿🇼 Nyuchi Platform - Role-Based Access Control
 * "I am because we are" - RBAC utilities
 */

/**
 * User role hierarchy
 */
export type UserRole = 'user' | 'contributor' | 'moderator' | 'admin';

/**
 * Role permissions
 */
export interface RolePermissions {
  // Content permissions
  canSubmitContent: boolean;
  canReviewContent: boolean;
  canPublishContent: boolean;
  canDeleteContent: boolean;

  // Directory permissions
  canCreateListing: boolean;
  canReviewListing: boolean;
  canApproveListing: boolean;
  canDeleteListing: boolean;

  // User management
  canViewUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canAssignRoles: boolean;

  // Ubuntu scoring
  canAwardPoints: boolean;
  canEditScoring: boolean;

  // Admin features
  canAccessAdmin: boolean;
  canConfigureSystem: boolean;
  canViewAnalytics: boolean;
}

/**
 * Role permission definitions
 */
export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  user: {
    canSubmitContent: false,
    canReviewContent: false,
    canPublishContent: false,
    canDeleteContent: false,
    canCreateListing: true, // Community can create listings
    canReviewListing: false,
    canApproveListing: false,
    canDeleteListing: false,
    canViewUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canAssignRoles: false,
    canAwardPoints: false,
    canEditScoring: false,
    canAccessAdmin: false,
    canConfigureSystem: false,
    canViewAnalytics: false,
  },
  contributor: {
    canSubmitContent: true,
    canReviewContent: false,
    canPublishContent: false,
    canDeleteContent: false,
    canCreateListing: true,
    canReviewListing: false,
    canApproveListing: false,
    canDeleteListing: false,
    canViewUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canAssignRoles: false,
    canAwardPoints: false,
    canEditScoring: false,
    canAccessAdmin: false,
    canConfigureSystem: false,
    canViewAnalytics: false,
  },
  moderator: {
    canSubmitContent: true,
    canReviewContent: true,
    canPublishContent: true,
    canDeleteContent: true,
    canCreateListing: true,
    canReviewListing: true,
    canApproveListing: true,
    canDeleteListing: true,
    canViewUsers: true,
    canEditUsers: true,
    canDeleteUsers: false,
    canAssignRoles: false,
    canAwardPoints: true,
    canEditScoring: false,
    canAccessAdmin: true,
    canConfigureSystem: false,
    canViewAnalytics: true,
  },
  admin: {
    canSubmitContent: true,
    canReviewContent: true,
    canPublishContent: true,
    canDeleteContent: true,
    canCreateListing: true,
    canReviewListing: true,
    canApproveListing: true,
    canDeleteListing: true,
    canViewUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canAssignRoles: true,
    canAwardPoints: true,
    canEditScoring: true,
    canAccessAdmin: true,
    canConfigureSystem: true,
    canViewAnalytics: true,
  },
};

/**
 * Role hierarchy levels (higher number = more privileges)
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  user: 1,
  contributor: 2,
  moderator: 3,
  admin: 4,
};

/**
 * Check if user has permission
 */
export function hasPermission(
  role: UserRole,
  permission: keyof RolePermissions
): boolean {
  return ROLE_PERMISSIONS[role][permission];
}

/**
 * Check if role A has equal or higher privileges than role B
 */
export function hasRoleLevel(roleA: UserRole, roleB: UserRole): boolean {
  return ROLE_HIERARCHY[roleA] >= ROLE_HIERARCHY[roleB];
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): RolePermissions {
  return ROLE_PERMISSIONS[role];
}

/**
 * Check if user can perform action on content
 */
export function canManageContent(role: UserRole, action: 'submit' | 'review' | 'publish' | 'delete'): boolean {
  switch (action) {
    case 'submit':
      return hasPermission(role, 'canSubmitContent');
    case 'review':
      return hasPermission(role, 'canReviewContent');
    case 'publish':
      return hasPermission(role, 'canPublishContent');
    case 'delete':
      return hasPermission(role, 'canDeleteContent');
    default:
      return false;
  }
}

/**
 * Check if user can manage directory listings
 */
export function canManageListing(role: UserRole, action: 'create' | 'review' | 'approve' | 'delete'): boolean {
  switch (action) {
    case 'create':
      return hasPermission(role, 'canCreateListing');
    case 'review':
      return hasPermission(role, 'canReviewListing');
    case 'approve':
      return hasPermission(role, 'canApproveListing');
    case 'delete':
      return hasPermission(role, 'canDeleteListing');
    default:
      return false;
  }
}

/**
 * Check if user can manage other users
 */
export function canManageUsers(role: UserRole, action: 'view' | 'edit' | 'delete' | 'assignRoles'): boolean {
  switch (action) {
    case 'view':
      return hasPermission(role, 'canViewUsers');
    case 'edit':
      return hasPermission(role, 'canEditUsers');
    case 'delete':
      return hasPermission(role, 'canDeleteUsers');
    case 'assignRoles':
      return hasPermission(role, 'canAssignRoles');
    default:
      return false;
  }
}

/**
 * Check if user has admin access
 */
export function isAdmin(role: UserRole): boolean {
  return role === 'admin';
}

/**
 * Check if user is moderator or admin
 */
export function isModerator(role: UserRole): boolean {
  return role === 'moderator' || role === 'admin';
}

/**
 * Check if user is contributor or higher
 */
export function isContributor(role: UserRole): boolean {
  return hasRoleLevel(role, 'contributor');
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole): string {
  const displayNames: Record<UserRole, string> = {
    user: 'Community Member',
    contributor: 'Contributor',
    moderator: 'Moderator',
    admin: 'Administrator',
  };

  return displayNames[role];
}

/**
 * Get role description
 */
export function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    user: 'Access to community directory and content',
    contributor: 'Can submit content and create directory listings',
    moderator: 'Can review and publish content, manage directory listings',
    admin: 'Full access to all platform features and configurations',
  };

  return descriptions[role];
}
