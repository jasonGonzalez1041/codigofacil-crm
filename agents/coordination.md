# 🤝 Agent Coordination & Communication

**Purpose:** Define how agents collaborate, share information, and avoid conflicts during development.

## 📋 Agent Communication Matrix

### 🔄 Dependency Flow
```
Infrastructure → Authentication → API Development
                     ↓              ↓
                  UI/UX ← → Dashboard
                     ↓              ↓
                Workflow ← → Testing
                     ↓
                  Mobile
```

## 🎯 Handoff Requirements

### Infrastructure → Authentication
**Deliverables:**
- ✅ Database fully migrated and seeded
- ✅ Environment variables configured
- ✅ Sample users created in database

**Validation:**
```bash
# Test database connection
npm run db:migrate
node src/scripts/create-sample-data.ts
```

### Authentication → API Development
**Deliverables:**
- ✅ NextAuth.js v5 configured
- ✅ User sessions working
- ✅ Role-based permissions implemented

**Validation:**
```typescript
// Test authentication in API routes
const session = await auth()
if (!session) return unauthorized()
```

### API Development → UI/UX
**Deliverables:**
- ✅ Complete CRUD endpoints
- ✅ Zod validation schemas
- ✅ Standardized API responses

**Validation:**
```bash
# Test all API endpoints
curl -X GET http://localhost:3000/api/leads
curl -X POST http://localhost:3000/api/companies
```

### UI/UX → Dashboard
**Deliverables:**
- ✅ Form components for all entities
- ✅ Enhanced data tables
- ✅ Loading and error states

**Validation:**
- All forms work with real API data
- Tables display and filter correctly

### Dashboard → Workflow
**Deliverables:**
- ✅ Real-time dashboard metrics
- ✅ Chart components
- ✅ Analytics framework

**Validation:**
- Dashboard shows actual database data
- Charts render without errors

### Workflow → Testing
**Deliverables:**
- ✅ Pipeline management system
- ✅ Activity tracking
- ✅ Automation workflows

**Validation:**
- Pipeline drag & drop works
- Activities create and update correctly

### Testing → Mobile
**Deliverables:**
- ✅ Test suite with 85%+ coverage
- ✅ Performance monitoring
- ✅ Error tracking

**Validation:**
```bash
npm test
npm run test:e2e
```

## 🚧 Conflict Resolution

### Common Integration Issues

1. **API Contract Changes**
   - **Problem:** API structure changes break frontend
   - **Solution:** Version APIs, use TypeScript interfaces
   - **Prevention:** Document API contracts before implementation

2. **Component Dependencies**
   - **Problem:** Circular dependencies between UI components
   - **Solution:** Create shared component library
   - **Prevention:** Define clear component hierarchy

3. **Database Schema Changes**
   - **Problem:** Schema changes break existing code
   - **Solution:** Use database migrations, backward compatibility
   - **Prevention:** Finalize schema before dependent development

## 📚 Shared Resources

### Common Files All Agents Use
```
src/
├── lib/
│   ├── db.ts              # Database connection (Infrastructure)
│   ├── auth.ts            # Authentication (Authentication)
│   ├── validations.ts     # Zod schemas (API Development)
│   └── utils.ts           # Shared utilities (All)
├── types/
│   ├── api.ts             # API types (API Development)
│   ├── database.ts        # Database types (Infrastructure)
│   └── auth.ts            # Auth types (Authentication)
└── components/
    ├── ui/                # Base UI components (UI/UX)
    ├── forms/             # Form components (UI/UX)
    └── shared/            # Shared components (All)
```

### Communication Channels

1. **Code Documentation**
   - Each agent documents their public APIs
   - TypeScript interfaces for all shared types
   - Comments for complex business logic

2. **Integration Testing**
   - Test integration points between agents
   - Validate handoff requirements
   - Automated testing for critical paths

3. **Regular Sync Points**
   - Weekly integration reviews
   - Conflict resolution meetings
   - Progress tracking and blockers

## 🔄 Development Workflow

### Branch Strategy
```
main                    # Production-ready code
├── develop            # Integration branch
├── feature/infra-*    # Infrastructure features
├── feature/auth-*     # Authentication features
├── feature/api-*      # API features
├── feature/ui-*       # UI/UX features
├── feature/dash-*     # Dashboard features
├── feature/workflow-* # Workflow features
├── feature/test-*     # Testing features
└── feature/mobile-*   # Mobile features
```

### Integration Points
1. **Daily:** Merge completed features to develop
2. **Weekly:** Full integration testing
3. **Milestone:** Merge develop to main

### Code Review Process
- Each agent reviews code from dependent agents
- Cross-functional reviews for integration points
- Security reviews for authentication and API code

## 🚨 Escalation Procedures

### Blocked by Dependency
1. **Immediate:** Contact blocking agent directly
2. **24 hours:** Escalate to project coordination
3. **48 hours:** Adjust priorities or find workaround

### Technical Conflicts
1. **Document the conflict** in agents/conflicts.md
2. **Schedule resolution meeting** with affected agents
3. **Implement agreed solution** with timeline
4. **Update documentation** with resolution

### Quality Issues
1. **Identify root cause** and affected components
2. **Create fix plan** with responsible agent
3. **Implement fix** with comprehensive testing
4. **Update processes** to prevent recurrence

## 📊 Success Metrics

### Individual Agent Success
- Deliverables completed on time
- Quality standards met
- Integration tests passing
- Documentation complete

### Cross-Agent Success
- Zero integration conflicts
- Smooth handoffs between agents
- Shared components reused effectively
- Overall system performance targets met

### Project Success
- All user stories implemented
- Performance and security requirements met
- High code quality and test coverage
- Successful deployment and user adoption

---

**This coordination document ensures smooth collaboration between all agents and successful project delivery.**