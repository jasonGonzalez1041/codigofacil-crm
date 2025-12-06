# 📊 API Development Agent

**Domain:** Backend APIs, Data Validation, CRUD Operations  
**Priority:** Critical (Phase 1)  
**Dependencies:** Infrastructure Agent, Authentication Agent

## 🎯 Mission
Complete the backend API ecosystem for the CodigoFacil CRM, implementing full CRUD operations, robust validation, error handling, and advanced querying capabilities.

## 📋 Responsibilities

### 🔧 CRUD Operations Completion
- [ ] **Missing HTTP Methods**
  - Implement PUT/PATCH endpoints for all entities
  - Add DELETE endpoints with soft delete capability
  - Create bulk operation endpoints
  - Add batch update/delete functionality
  
- [ ] **Advanced Querying**
  - Implement search across multiple fields
  - Add advanced filtering (date ranges, status, etc.)
  - Create pagination with cursor-based navigation
  - Add sorting on multiple columns
  
- [ ] **Relationship Management**
  - Handle cascading updates/deletes
  - Implement relationship validation
  - Add nested resource endpoints

### 🛡️ Data Validation & Security
- [ ] **Zod Schema Implementation**
  - Create validation schemas for all entities
  - Implement input sanitization
  - Add custom validation rules
  - Handle validation error responses
  
- [ ] **Security Enhancements**
  - Add rate limiting per endpoint
  - Implement API key authentication for external access
  - Add request/response logging
  - Create audit trail for data changes
  
- [ ] **Error Handling**
  - Standardize error response format
  - Add detailed error codes
  - Implement proper HTTP status codes
  - Create user-friendly error messages

### 📈 Performance & Optimization
- [ ] **Database Optimization**
  - Add proper indexes for query performance
  - Implement connection pooling
  - Create optimized queries with joins
  - Add query result caching
  
- [ ] **API Performance**
  - Implement response compression
  - Add request deduplication
  - Create background job processing
  - Optimize payload sizes

## 🛠️ Technical Implementation

### Complete API Endpoint Matrix
```typescript
// Current Status: ✅ Implemented, ❌ Missing, 🚧 Partial

Entities:
├── /api/companies
│   ├── GET / ✅     POST / ✅
│   ├── GET /[id] ❌ PUT /[id] ❌ DELETE /[id] ❌
│   └── PATCH /[id] ❌
├── /api/contacts
│   ├── GET / ✅     POST / ✅
│   ├── GET /[id] ❌ PUT /[id] ❌ DELETE /[id] ❌
│   └── PATCH /[id] ❌
├── /api/leads
│   ├── GET / ✅     POST / ✅
│   ├── GET /[id] ❌ PUT /[id] ❌ DELETE /[id] ❌
│   └── PATCH /[id] ❌
├── /api/follow-ups
│   ├── GET / ✅     POST / ✅
│   ├── GET /[id] ❌ PUT /[id] ❌ DELETE /[id] ❌
│   └── PATCH /[id] ❌
├── /api/pipeline-stages
│   ├── GET / ✅     POST / ✅
│   ├── PUT /[id] ❌ DELETE /[id] ❌
│   └── PATCH /order ❌
└── /api/activities ❌ (Complete implementation needed)
```

### Zod Validation Schemas
```typescript
// src/lib/validations.ts
import { z } from 'zod'

export const createLeadSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  value: z.number().positive().optional(),
  probability: z.number().min(0).max(100).default(50),
  expectedCloseDate: z.string().datetime().optional(),
  source: z.enum(['website', 'referral', 'cold_call', 'social', 'other']),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  companyId: z.string().uuid().optional(),
  contactId: z.string().uuid().optional(),
  pipelineStageId: z.string().uuid(),
  assignedTo: z.string().uuid().optional(),
})

export const updateLeadSchema = createLeadSchema.partial()

// Similar schemas for companies, contacts, follow-ups
```

### Standardized API Response Format
```typescript
// src/lib/api-response.ts
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  meta?: {
    total: number
    page: number
    limit: number
    hasNext: boolean
  }
}

export function successResponse<T>(data: T, meta?: any): ApiResponse<T> {
  return { success: true, data, meta }
}

export function errorResponse(code: string, message: string, details?: any): ApiResponse<never> {
  return { success: false, error: { code, message, details } }
}
```

### Advanced Query Implementation
```typescript
// src/lib/query-builder.ts
export interface QueryParams {
  search?: string
  filter?: Record<string, any>
  sort?: string[]
  page?: number
  limit?: number
  include?: string[]
}

export function buildQuery(params: QueryParams) {
  // Implementation for dynamic query building
  // Search across multiple fields
  // Apply filters
  // Handle sorting and pagination
  // Include related data
}
```

## ✅ Success Criteria

1. **Complete CRUD**: All entities support full CRUD operations
2. **Validation**: All inputs validated with clear error messages
3. **Performance**: API responses under 500ms for standard queries
4. **Security**: All endpoints properly authenticated and authorized
5. **Documentation**: OpenAPI spec available for all endpoints
6. **Testing**: 90%+ test coverage for API routes

## 🔄 Integration Points

### Provides To Other Agents
- **Complete APIs**: Full CRUD operations for all entities
- **Validation Schemas**: Reusable Zod schemas for forms
- **Error Handling**: Consistent error responses
- **Performance**: Fast and reliable data access

### Requires From Other Agents
- **Infrastructure**: Stable database connection
- **Authentication**: User sessions and permissions
- **UI/UX**: Requirements for API functionality (can be coordinated)

### API Documentation Structure
```yaml
# OpenAPI 3.0 specification
/api/leads:
  get:
    parameters:
      - name: search
        in: query
        schema: { type: string }
      - name: stage
        in: query
        schema: { type: string }
      - name: page
        in: query
        schema: { type: integer }
    responses:
      200:
        description: List of leads
        content:
          application/json:
            schema: { $ref: '#/components/schemas/LeadsResponse' }
```

## 🧪 Testing & Validation

### API Test Coverage
```typescript
// Tests to implement
describe('Leads API', () => {
  describe('GET /api/leads', () => {
    test('returns paginated leads')
    test('filters by pipeline stage')
    test('searches across title and description')
    test('sorts by creation date')
    test('includes related company and contact data')
  })
  
  describe('POST /api/leads', () => {
    test('creates lead with valid data')
    test('validates required fields')
    test('rejects invalid probability values')
    test('handles missing pipeline stage')
  })
  
  describe('PUT /api/leads/[id]', () => {
    test('updates existing lead')
    test('validates permissions')
    test('creates audit log entry')
  })
})
```

### Performance Testing
- [ ] **Load Testing**: 100 concurrent requests
- [ ] **Response Time**: < 500ms for standard queries
- [ ] **Memory Usage**: Efficient query execution
- [ ] **Database Connections**: Proper connection pooling

## 📚 Documentation Requirements

- [ ] **API Reference**: Complete OpenAPI documentation
- [ ] **Integration Guide**: How to consume APIs from frontend
- [ ] **Error Codes**: Comprehensive error code reference
- [ ] **Performance Guide**: Best practices for API usage

## 🚨 Implementation Considerations

### Database Performance
```sql
-- Required indexes for performance
CREATE INDEX idx_leads_pipeline_stage ON leads(pipeline_stage_id);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_contacts_email ON contacts(email);
```

### Rate Limiting Configuration
```typescript
// Rate limiting per endpoint
const rateLimits = {
  'GET /api/*': '100 requests per minute',
  'POST /api/*': '20 requests per minute',
  'PUT /api/*': '30 requests per minute',
  'DELETE /api/*': '10 requests per minute'
}
```

### Audit Trail Implementation
```typescript
// Track all data changes
export interface AuditLog {
  id: string
  entityType: string
  entityId: string
  action: 'create' | 'update' | 'delete'
  userId: string
  changes: Record<string, { old: any, new: any }>
  timestamp: string
  ipAddress: string
}
```

## 🎯 Implementation Priority

### Week 1: Core CRUD
1. Individual resource endpoints (GET /[id], PUT /[id], DELETE /[id])
2. Basic validation with Zod schemas
3. Standardized error responses

### Week 2: Advanced Features
1. Search and filtering
2. Pagination and sorting
3. Bulk operations
4. Performance optimization

### Week 3: Security & Monitoring
1. Rate limiting implementation
2. Audit trail logging
3. API documentation
4. Comprehensive testing

## 📊 Success Metrics

- **Coverage**: 100% of planned endpoints implemented
- **Performance**: 95th percentile response time < 1 second
- **Reliability**: 99.9% uptime during testing
- **Security**: Zero security vulnerabilities found
- **Usability**: Complete API documentation with examples

## 🔗 Example Implementation

### Complete Lead Endpoint
```typescript
// src/app/api/leads/[id]/route.ts
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json(errorResponse('AUTH_REQUIRED', 'Authentication required'), { status: 401 })
  }
  
  const { id } = params
  
  try {
    const lead = await db
      .select({
        lead: leads,
        company: companies,
        contact: contacts,
        stage: pipelineStages,
        assignedUser: users
      })
      .from(leads)
      .leftJoin(companies, eq(leads.companyId, companies.id))
      .leftJoin(contacts, eq(leads.contactId, contacts.id))
      .leftJoin(pipelineStages, eq(leads.pipelineStageId, pipelineStages.id))
      .leftJoin(users, eq(leads.assignedTo, users.id))
      .where(eq(leads.id, id))
      .limit(1)
    
    if (!lead.length) {
      return NextResponse.json(errorResponse('NOT_FOUND', 'Lead not found'), { status: 404 })
    }
    
    return NextResponse.json(successResponse(lead[0]))
  } catch (error) {
    return NextResponse.json(errorResponse('SERVER_ERROR', 'Internal server error'), { status: 500 })
  }
}
```

---

**Agent Contact**: API development specialist for backend services, validation, and data access layer.