/**
 * @jest-environment node
 */

/**
 * Integration tests for CRM functionality
 * Tests the actual API endpoints running on localhost
 */

const BASE_URL = 'http://localhost:3002'

describe('CRM Integration Tests', () => {
  let testCompanyId: string
  let testContactId: string
  let testLeadId: string

  beforeAll(async () => {
    // Wait for server to be ready
    await new Promise(resolve => setTimeout(resolve, 1000))
  })

  describe('Companies API Integration', () => {
    test('should fetch all companies', async () => {
      const response = await fetch(`${BASE_URL}/api/companies`)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
      expect(data.data.length).toBeGreaterThan(0)

      // Store first company ID for other tests
      testCompanyId = data.data[0].id
    })

    test('should fetch single company', async () => {
      const response = await fetch(`${BASE_URL}/api/companies/${testCompanyId}`)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.id).toBe(testCompanyId)
      expect(data.data.name).toBeDefined()
    })

    test('should create new company', async () => {
      const newCompany = {
        name: `Test Company ${Date.now()}`,
        industry: 'Testing',
        website: 'https://test-company.com',
        phone: '+506 1234-5678',
        city: 'San José',
        country: 'Costa Rica'
      }

      const response = await fetch(`${BASE_URL}/api/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompany)
      })
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data.name).toBe(newCompany.name)
      expect(data.data.industry).toBe(newCompany.industry)

      // Store for cleanup
      testCompanyId = data.data.id
    })

    test('should update company', async () => {
      const updateData = {
        notes: `Updated via test - ${new Date().toISOString()}`
      }

      const response = await fetch(`${BASE_URL}/api/companies/${testCompanyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.notes).toBe(updateData.notes)
    })
  })

  describe('Contacts API Integration', () => {
    test('should fetch all contacts', async () => {
      const response = await fetch(`${BASE_URL}/api/contacts`)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    test('should create new contact', async () => {
      const newContact = {
        firstName: 'Test',
        lastName: 'Contact',
        email: `test-contact-${Date.now()}@example.com`,
        phone: '+506 8888-9999',
        position: 'Test Manager',
        companyId: testCompanyId
      }

      const response = await fetch(`${BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact)
      })
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data.firstName).toBe(newContact.firstName)
      expect(data.data.email).toBe(newContact.email)

      testContactId = data.data.id
    })
  })

  describe('Leads API Integration', () => {
    test('should fetch all leads', async () => {
      const response = await fetch(`${BASE_URL}/api/leads`)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    test('should create new lead', async () => {
      // First get pipeline stages
      const stagesResponse = await fetch(`${BASE_URL}/api/pipeline-stages`)
      const stagesData = await stagesResponse.json()
      const firstStage = stagesData.data[0]

      const newLead = {
        title: `Test Lead ${Date.now()}`,
        description: 'This is a test lead created by integration test',
        value: 5000,
        probability: 75,
        companyId: testCompanyId,
        contactId: testContactId,
        pipelineStageId: firstStage.id,
        source: 'testing',
        priority: 'high'
      }

      const response = await fetch(`${BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      })
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data.title).toBe(newLead.title)
      expect(data.data.value).toBe(newLead.value)

      testLeadId = data.data.id
    })

    test('should fetch single lead with relations', async () => {
      const response = await fetch(`${BASE_URL}/api/leads/${testLeadId}`)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.lead).toBeDefined()
      expect(data.data.company).toBeDefined()
      expect(data.data.contact).toBeDefined()
      expect(data.data.pipelineStage).toBeDefined()
    })
  })

  describe('Pipeline Stages API Integration', () => {
    test('should fetch all pipeline stages', async () => {
      const response = await fetch(`${BASE_URL}/api/pipeline-stages`)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
      expect(data.data.length).toBeGreaterThan(0)

      // Verify standard pipeline stages exist
      const stageNames = data.data.map(stage => stage.name)
      expect(stageNames).toContain('Lead')
      expect(stageNames).toContain('Qualified')
      expect(stageNames).toContain('Proposal')
    })
  })

  describe('Follow-ups API Integration', () => {
    test('should fetch all follow-ups', async () => {
      const response = await fetch(`${BASE_URL}/api/follow-ups`)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    test('should create new follow-up', async () => {
      const newFollowUp = {
        leadId: testLeadId,
        title: 'Test Follow-up',
        description: 'This is a test follow-up',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        priority: 'medium',
        type: 'call'
      }

      const response = await fetch(`${BASE_URL}/api/follow-ups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFollowUp)
      })
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data.title).toBe(newFollowUp.title)
      expect(data.data.type).toBe(newFollowUp.type)
    })
  })

  describe('Dashboard Pages Integration', () => {
    test('should load main dashboard', async () => {
      const response = await fetch(`${BASE_URL}/dashboard`)
      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('text/html')
    })

    test('should load leads dashboard', async () => {
      const response = await fetch(`${BASE_URL}/dashboard/leads`)
      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('text/html')
    })

    test('should load pipeline dashboard', async () => {
      const response = await fetch(`${BASE_URL}/dashboard/pipeline`)
      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('text/html')
    })

    test('should load follow-ups dashboard', async () => {
      const response = await fetch(`${BASE_URL}/dashboard/follow-ups`)
      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('text/html')
    })
  })

  describe('Error Handling', () => {
    test('should return 404 for non-existent company', async () => {
      const response = await fetch(`${BASE_URL}/api/companies/non-existent-id`)
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.success).toBe(false)
    })

    test('should validate required fields for company creation', async () => {
      const invalidCompany = {
        industry: 'Test' // Missing required name field
      }

      const response = await fetch(`${BASE_URL}/api/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidCompany)
      })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Validation error')
    })

    test('should validate email format for contacts', async () => {
      const invalidContact = {
        firstName: 'Test',
        lastName: 'Contact',
        email: 'invalid-email' // Invalid email format
      }

      const response = await fetch(`${BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidContact)
      })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Validation error')
    })
  })

  afterAll(async () => {
    // Cleanup test data
    if (testLeadId) {
      await fetch(`${BASE_URL}/api/leads/${testLeadId}`, { method: 'DELETE' })
    }
    if (testContactId) {
      await fetch(`${BASE_URL}/api/contacts/${testContactId}`, { method: 'DELETE' })
    }
    if (testCompanyId) {
      await fetch(`${BASE_URL}/api/companies/${testCompanyId}`, { method: 'DELETE' })
    }
  })
})