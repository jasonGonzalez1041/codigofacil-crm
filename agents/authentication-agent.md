# 🔐 Authentication & Security Agent

**Domain:** User Management, Sessions, Security, Access Control  
**Priority:** Critical (Phase 1)  
**Dependencies:** Infrastructure Agent (database setup)

## 🎯 Mission
Implement secure authentication system with NextAuth.js v5, user management, role-based access control, and session handling for the CodigoFacil CRM.

## 📋 Responsibilities

### 🔑 Authentication System
- [ ] **NextAuth.js v5 Setup**
  - Configure NextAuth providers (credentials, Google, etc.)
  - Set up authentication callbacks
  - Implement JWT and session strategies
  - Configure secure cookies
  
- [ ] **Login/Register Pages**
  - Design login form with validation
  - Create registration workflow
  - Add password reset functionality
  - Implement email verification
  
- [ ] **Session Management**
  - Handle session persistence
  - Implement logout functionality
  - Add session refresh logic
  - Monitor session security

### 👥 User Management
- [ ] **Role-Based Access Control (RBAC)**
  - Define roles: `admin`, `manager`, `user`
  - Implement permission system
  - Create role assignment interface
  - Add role-based route protection
  
- [ ] **User Profile Management**
  - User settings and preferences
  - Profile picture upload
  - Password change functionality
  - Account deactivation/deletion

### 🛡️ Security Implementation
- [ ] **Route Protection**
  - Middleware for authenticated routes
  - Role-based page access
  - API endpoint protection
  - Redirect handling for unauthorized access
  
- [ ] **Security Best Practices**
  - Password hashing and validation
  - CSRF protection
  - Rate limiting for auth endpoints
  - Input sanitization and validation

## 🛠️ Technical Implementation

### NextAuth.js Configuration
```typescript
// src/lib/auth.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      // Implementation
    })
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        role: token.role,
      },
    }),
  },
})
```

### Key Files to Create/Modify
- `src/lib/auth.ts` - NextAuth configuration
- `src/app/api/auth/[...nextauth]/route.ts` - Auth API routes
- `src/app/(auth)/login/page.tsx` - Login page
- `src/app/(auth)/register/page.tsx` - Registration page
- `src/middleware.ts` - Route protection middleware
- `src/components/auth/` - Auth-related components

### Database Schema Extensions
```sql
-- Additional auth tables (handled by NextAuth adapter)
accounts
sessions  
verification_tokens
```

### Role Permission Matrix
```typescript
const PERMISSIONS = {
  admin: ['*'], // All permissions
  manager: [
    'leads:read', 'leads:write', 'leads:delete',
    'companies:read', 'companies:write',
    'contacts:read', 'contacts:write',
    'activities:read', 'activities:write',
    'users:read'
  ],
  user: [
    'leads:read', 'leads:write',
    'companies:read',
    'contacts:read', 'contacts:write',
    'activities:read', 'activities:write'
  ]
}
```

## ✅ Success Criteria

1. **Secure Login**: Users can authenticate with email/password
2. **Session Persistence**: Sessions maintained across browser sessions
3. **Role Protection**: Different access levels enforced correctly
4. **Security Standards**: Passes basic security audits
5. **User Experience**: Smooth login/logout flow
6. **Registration**: New users can create accounts

## 🔄 Integration Points

### Provides To Other Agents
- **User Session**: Current user context for all components
- **Permission System**: Access control for features
- **Security Middleware**: Protected routes and APIs
- **User Data**: User profiles and preferences

### Requires From Other Agents
- **Infrastructure**: Working database and environment
- **UI/UX**: Form components and layouts (can be coordinated)

### API Integration
```typescript
// Example protected API route
export async function GET(request: NextRequest) {
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check role permissions
  if (!hasPermission(session.user.role, 'leads:read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // Continue with protected logic
}
```

## 🧪 Testing & Validation

### Authentication Tests
```typescript
// Test cases to implement
- Login with valid credentials
- Login with invalid credentials
- Registration flow
- Password reset
- Session persistence
- Role-based access control
- Logout functionality
- Protected route access
```

### Security Validation
- [ ] **OWASP Compliance**: Check against common vulnerabilities
- [ ] **Session Security**: Validate JWT tokens and expiration
- [ ] **Route Protection**: Verify unauthorized access blocked
- [ ] **Input Validation**: Test with malicious inputs

## 📚 Documentation Requirements

- [ ] **Authentication Guide**: How to use auth in components
- [ ] **Role Management**: How roles and permissions work
- [ ] **Security Policies**: Password requirements, session policies
- [ ] **API Protection**: How to protect new API endpoints

## 🚨 Known Considerations

### NextAuth.js v5 Breaking Changes
- Updated API and configuration syntax
- New middleware approach
- Different session handling

### Security Requirements
```typescript
// Environment variables needed
NEXTAUTH_SECRET=your-super-secure-random-string
NEXTAUTH_URL=http://localhost:3000
```

### User Experience Flows
```
Unauthenticated User:
/ → /login → /dashboard

New User:
/register → email verification → /login → /dashboard

Existing User:
/login → /dashboard (remember session)

Protected Route Access:
/dashboard/admin → check role → allow/deny
```

## 🎯 Implementation Priority

### Phase 1: Basic Auth (Week 1)
1. NextAuth.js v5 configuration
2. Login/logout functionality
3. Basic session handling
4. Simple route protection

### Phase 2: Advanced Features (Week 2)
1. Registration and email verification
2. Role-based access control
3. Password reset functionality
4. User profile management

### Phase 3: Security Hardening (Week 3)
1. Security auditing
2. Rate limiting
3. Advanced session management
4. Comprehensive testing

## 📊 Success Metrics

- **Security**: Zero authentication vulnerabilities
- **Performance**: Login completes in < 2 seconds
- **UX**: Single sign-on experience across all pages
- **Coverage**: 100% of routes properly protected
- **Compliance**: Meets industry security standards

## 🔗 Component Examples

### Login Component
```tsx
// src/components/auth/login-form.tsx
"use client"
import { signIn } from "next-auth/react"

export function LoginForm() {
  // Implementation with form validation
}
```

### Protected Page Wrapper
```tsx
// src/components/auth/protected-page.tsx
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function ProtectedPage({ 
  children, 
  requiredRole 
}: {
  children: React.ReactNode
  requiredRole?: string
}) {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }
  
  // Role checking logic
  
  return <>{children}</>
}
```

---

**Agent Contact**: Authentication specialist for user management, security, and access control implementation.