# 🧪 Testing & Quality Agent

**Domain:** Testing, Monitoring, Quality Assurance, Performance  
**Priority:** Quality (Phase 3)  
**Dependencies:** All other agents

## 🎯 Mission
Ensure the CodigoFacil CRM meets high quality standards through comprehensive testing, monitoring, and performance optimization.

## 📋 Responsibilities

### 🔍 Testing Implementation
- [ ] **Unit Testing**
  - API route testing with Jest
  - Component testing with Testing Library
  - Utility function testing
  - Database operation testing
  
- [ ] **Integration Testing**
  - End-to-end user workflows
  - API integration tests
  - Database transaction testing
  - Authentication flow testing
  
- [ ] **E2E Testing**
  - Critical user journey testing
  - Cross-browser compatibility
  - Mobile device testing
  - Performance testing

### 📊 Monitoring & Analytics
- [ ] **Error Tracking**
  - Implement Sentry or similar
  - Custom error logging
  - Performance monitoring
  - User behavior analytics
  
- [ ] **Performance Monitoring**
  - API response time tracking
  - Database query optimization
  - Frontend performance metrics
  - Resource usage monitoring

## 🛠️ Technical Implementation

### Test Structure
```typescript
// __tests__/api/leads.test.ts
describe('Leads API', () => {
  beforeEach(async () => {
    await setupTestDatabase()
  })
  
  test('GET /api/leads returns paginated leads', async () => {
    // Test implementation
  })
})
```

### E2E Testing
```typescript
// e2e/lead-management.spec.ts
test('User can create and manage leads', async ({ page }) => {
  await page.goto('/dashboard/leads')
  await page.click('[data-testid=create-lead]')
  // Test flow
})
```

## ✅ Success Criteria

1. **Test Coverage**: 85%+ code coverage
2. **Performance**: All pages load under 3 seconds
3. **Reliability**: 99.9% uptime in production
4. **Security**: Zero security vulnerabilities
5. **Monitoring**: Real-time error tracking

## 🔄 Integration Points

### Provides To Other Agents
- **Test Utilities**: Shared testing helpers
- **Quality Metrics**: Performance and reliability data
- **Monitoring**: Error and performance tracking

### Requires From Other Agents
- **All Components**: Complete system for testing
- **APIs**: All endpoints for integration testing

---

**Agent Contact**: Quality assurance specialist for testing, monitoring, and performance optimization.