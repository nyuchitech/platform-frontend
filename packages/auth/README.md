# 🇿🇼 Nyuchi Platform - Auth Package

> **Ubuntu Philosophy**: *"I am because we are"* - Authentication utilities for the Nyuchi Platform

## Overview

This package provides authentication utilities for the Nyuchi Platform using Supabase Auth. It includes client functions, Hono middleware, role-based access control (RBAC), and session management.

## Installation

```bash
npm install @nyuchi/auth
```

## Features

- **Supabase Auth Integration** - Sign up, sign in, sign out, password reset
- **JWT Token Verification** - Verify tokens for API routes
- **Hono Middleware** - Authentication and authorization middleware
- **Role-Based Access Control** - User, Contributor, Moderator, Admin roles
- **Session Management** - Session validation, refresh, and storage
- **TypeScript** - Full type safety

## Usage

### Authentication Client

```typescript
import {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  resetPassword,
} from '@nyuchi/auth';

// Sign up new user
const { user, session } = await signUp('user@example.com', 'password123', {
  name: 'John Doe',
});

// Sign in user
const { user, session } = await signIn('user@example.com', 'password123');

// Get current user
const user = await getCurrentUser();

// Sign out
await signOut();

// Reset password
await resetPassword('user@example.com');
```

### Hono Middleware

```typescript
import { Hono } from 'hono';
import {
  authMiddleware,
  requireAdmin,
  requireModerator,
  requireRole,
} from '@nyuchi/auth';

const app = new Hono();

// Require authentication
app.get('/protected', authMiddleware, (c) => {
  const user = c.get('user');
  return c.json({ user });
});

// Require admin role
app.get('/admin', authMiddleware, requireAdmin, (c) => {
  return c.json({ message: 'Admin access granted' });
});

// Require moderator or admin
app.get('/moderate', authMiddleware, requireModerator, (c) => {
  return c.json({ message: 'Moderator access granted' });
});

// Require specific role(s)
app.post('/submit', authMiddleware, requireRole('contributor', 'moderator', 'admin'), (c) => {
  return c.json({ message: 'Submission accepted' });
});
```

### Role-Based Access Control

```typescript
import {
  hasPermission,
  canManageContent,
  canManageListing,
  isAdmin,
  isModerator,
  getRolePermissions,
} from '@nyuchi/auth';

// Check if user has specific permission
if (hasPermission(userRole, 'canPublishContent')) {
  // User can publish content
}

// Check content management permissions
if (canManageContent(userRole, 'publish')) {
  // User can publish content
}

// Check listing management permissions
if (canManageListing(userRole, 'approve')) {
  // User can approve listings
}

// Check role level
if (isAdmin(userRole)) {
  // User is admin
}

if (isModerator(userRole)) {
  // User is moderator or admin
}

// Get all permissions for role
const permissions = getRolePermissions(userRole);
```

### Session Management

```typescript
import {
  getCurrentSession,
  isSessionValid,
  refreshSessionIfNeeded,
  getSessionToken,
  getAuthHeader,
  onAuthStateChange,
} from '@nyuchi/auth';

// Get current session
const session = await getCurrentSession();
if (session) {
  console.log('User:', session.user);
  console.log('Token:', session.accessToken);
  console.log('Expires:', new Date(session.expiresAt));
}

// Check if session is valid
if (await isSessionValid()) {
  // Session is valid
}

// Refresh session if expiring soon
const refreshedSession = await refreshSessionIfNeeded();

// Get session token for API requests
const token = await getSessionToken();

// Get authorization header
const headers = await getAuthHeader();
// { Authorization: 'Bearer <token>' }

// Listen to auth state changes
const unsubscribe = onAuthStateChange((event, session) => {
  console.log('Auth event:', event);
  console.log('Session:', session);
});

// Unsubscribe when done
unsubscribe();
```

## User Roles

The platform has 4 role levels:

1. **User** (Community Member)
   - Access to community directory
   - Can create directory listings
   - View published content

2. **Contributor**
   - All User permissions
   - Can submit content for review
   - Enhanced Ubuntu scoring

3. **Moderator**
   - All Contributor permissions
   - Can review and publish content
   - Can approve directory listings
   - Access to admin interface
   - Can award Ubuntu points

4. **Admin** (Administrator)
   - Full access to all features
   - User management
   - System configuration
   - Ubuntu scoring management

## Role Permissions

```typescript
{
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
```

## Environment Variables

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## API Reference

### Client Functions

- `createAuthClient()` - Create Supabase auth client
- `signUp(email, password, metadata?)` - Register new user
- `signIn(email, password)` - Authenticate user
- `signOut()` - Sign out current user
- `getSession()` - Get current session
- `getCurrentUser()` - Get current user
- `refreshSession()` - Refresh JWT token
- `verifyToken(token)` - Verify JWT token
- `resetPassword(email)` - Send password reset email
- `updatePassword(newPassword)` - Update user password

### Middleware Functions

- `authMiddleware` - Require valid JWT token
- `optionalAuthMiddleware` - Optional authentication
- `requireRole(...roles)` - Require specific role(s)
- `requireAdmin` - Require admin role
- `requireModerator` - Require moderator or admin
- `sessionAuthMiddleware` - Session-based auth

### RBAC Functions

- `hasPermission(role, permission)` - Check permission
- `hasRoleLevel(roleA, roleB)` - Compare role levels
- `getRolePermissions(role)` - Get all permissions
- `canManageContent(role, action)` - Check content permissions
- `canManageListing(role, action)` - Check listing permissions
- `canManageUsers(role, action)` - Check user management
- `isAdmin(role)` - Check if admin
- `isModerator(role)` - Check if moderator or admin
- `isContributor(role)` - Check if contributor or higher
- `getRoleDisplayName(role)` - Get role display name
- `getRoleDescription(role)` - Get role description

### Session Functions

- `getCurrentSession()` - Get session with extended user data
- `isSessionValid()` - Check if session is valid
- `isSessionExpiring(session)` - Check if expiring soon
- `refreshSessionIfNeeded()` - Auto-refresh if expiring
- `getSessionUserId()` - Get current user ID
- `getSessionUserRole()` - Get current user role
- `hasSessionRole(role)` - Check if user has role
- `isSessionAdmin()` - Check if current user is admin
- `isSessionModerator()` - Check if moderator or admin
- `getSessionToken()` - Get JWT token
- `getAuthHeader()` - Get authorization header
- `onAuthStateChange(callback)` - Listen to auth changes
- `storeSessionLocally(session)` - Store in localStorage
- `getLocalSession()` - Get from localStorage
- `clearLocalSession()` - Clear localStorage

## TypeScript Types

```typescript
import type {
  AuthUser,
  UserRole,
  RolePermissions,
  SessionUser,
  SessionData,
} from '@nyuchi/auth';
```

## License

MIT - Built with Ubuntu philosophy for African entrepreneurship

---

**🇿🇼 Nyuchi Africa** | **🟠 Ubuntu Philosophy** | **⚡ Powered by Supabase Auth**

*"I am because we are"*
