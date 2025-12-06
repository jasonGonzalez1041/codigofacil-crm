# 🔧 Infrastructure & Setup Agent

**Domain:** Database, Environment, Core System Setup  
**Priority:** Critical (Phase 1)  
**Dependencies:** None (Foundation Agent)

## 🎯 Mission
Establish the foundational infrastructure for the CodigoFacil CRM system, ensuring database connectivity, proper environment configuration, and build system functionality.

## 📋 Responsibilities

### 🗄️ Database Management
- [ ] **Environment Configuration**
  - Set up `.env.local` with Turso credentials
  - Configure database connection strings
  - Validate environment variables
  
- [ ] **Database Migration & Schema**
  - Run `npm run db:migrate` successfully
  - Ensure all tables are created properly
  - Verify foreign key relationships
  - Add database indexes for performance
  
- [ ] **Data Seeding**
  - Fix TypeScript module resolution in scripts
  - Seed pipeline stages (Lead → Closed Won/Lost)
  - Create default admin user
  - Add sample companies and contacts
  - Generate test leads and activities

### ⚙️ Build & Configuration
- [ ] **TypeScript Configuration**
  - Fix module resolution issues in `/src/scripts/`
  - Ensure proper path mapping
  - Resolve import/export errors
  
- [ ] **Development Environment**
  - Verify Next.js dev server runs properly
  - Configure Drizzle Studio access
  - Set up hot reloading
  - Optimize build performance

### 🔗 Integration Setup
- [ ] **Database Connectivity**
  - Test Turso connection stability
  - Implement connection pooling if needed
  - Add connection error handling
  - Monitor database performance

## 🛠️ Technical Implementation

### Environment Variables Required
```bash
# .env.local
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### Key Files to Modify
- `drizzle.config.ts` - Verify configuration
- `src/lib/db.ts` - Add connection error handling
- `src/lib/seed.ts` - Fix module imports
- `src/scripts/*.ts` - Resolve TypeScript issues

### Database Seed Data Structure
```typescript
// Pipeline Stages (6 default stages)
// Users (1 admin user)
// Companies (3-5 sample companies)
// Contacts (2-3 contacts per company)
// Leads (4-6 leads across different stages)
// Activities (Sample interactions)
```

## ✅ Success Criteria

1. **Database Connection**: Successfully connects to Turso database
2. **Migrations Run**: All tables created without errors
3. **Seeding Works**: Sample data populated successfully
4. **Scripts Execute**: All TypeScript scripts run without module errors
5. **Dev Server**: Next.js development server starts on first try
6. **API Tests**: All basic API endpoints return data

## 🔄 Integration Points

### Provides To Other Agents
- **Database Schema**: Complete and migrated tables
- **Sample Data**: Realistic test data for development
- **Environment**: Working development environment
- **Scripts**: Functional utility scripts

### Depends On
- **External**: Turso database service
- **Configuration**: Project package.json and configs

## 🧪 Testing & Validation

### Infrastructure Tests
```bash
# Test database connection
npm run db:migrate

# Test seeding
node src/scripts/create-sample-data.ts

# Validate API connectivity  
node src/scripts/test-crm-functionality.ts

# Verify development server
npm run dev
```

### Health Checks
- [ ] Database responds within 2 seconds
- [ ] All API endpoints return 200 status
- [ ] Sample data is properly related (foreign keys)
- [ ] No TypeScript compilation errors

## 📚 Documentation Requirements

- [ ] **Setup Guide**: Step-by-step environment setup
- [ ] **Database Schema**: ERD and table relationships
- [ ] **Seed Data Guide**: What data is created and why
- [ ] **Troubleshooting**: Common setup issues and solutions

## 🚨 Known Issues & Considerations

### Current Issues
1. **Module Resolution**: Scripts can't import from `src/lib/db`
2. **Environment Variables**: May need validation
3. **Migration Dependencies**: Ensure proper order

### Best Practices
- Always backup database before major schema changes
- Use transactions for data seeding
- Implement proper error handling for database operations
- Log all database operations during development

## 🎯 Next Steps After Completion

Once infrastructure is stable:
1. **Authentication Agent** can implement user sessions
2. **API Development Agent** can build on solid database foundation
3. **UI/UX Agent** can consume reliable APIs
4. **Dashboard Agent** can display real data

## 📊 Success Metrics

- **Setup Time**: New developer can set up environment in < 15 minutes
- **Database Performance**: Queries respond in < 500ms
- **Test Coverage**: 100% of API endpoints return valid data
- **Error Rate**: Zero module resolution or connection errors

---

**Agent Contact**: Infrastructure specialist for database, environment, and build system issues.