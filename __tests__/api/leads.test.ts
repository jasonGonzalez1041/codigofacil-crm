/**
 * @jest-environment node
 */

import { GET, POST } from '@/app/api/leads/route'
import { GET as GET_SINGLE, PUT, DELETE } from '@/app/api/leads/[id]/route'
import { NextRequest } from 'next/server'

// Mock the database
jest.mock('@/lib/db', () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    returning: jest.fn(),
    limit: jest.fn(),
  },
}))

const mockDb = require('@/lib/db').db

describe('/api/leads', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/leads', () => {
    it('should return list of leads with relations', async () => {
      const mockLeads = [
        {
          lead: { id: '1', title: 'Test Lead 1', value: 1000 },
          company: { id: '1', name: 'Test Company' },
          contact: { id: '1', firstName: 'John', lastName: 'Doe' },
          pipelineStage: { id: '1', name: 'Lead' }
        }
      ]

      mockDb.limit.mockResolvedValue(mockLeads)

      const request = new NextRequest('http://localhost:3000/api/leads')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockLeads)
    })

    it('should handle database errors', async () => {
      mockDb.limit.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/leads')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
    })
  })

  describe('POST /api/leads', () => {
    it('should create a new lead', async () => {
      const newLead = {
        title: 'New Lead',
        description: 'Test lead',
        value: 5000,
        pipelineStageId: 'stage-1'
      }
      const createdLead = { id: '1', ...newLead, createdAt: new Date().toISOString() }

      mockDb.returning.mockResolvedValue([createdLead])

      const request = new NextRequest('http://localhost:3000/api/leads', {
        method: 'POST',
        body: JSON.stringify(newLead),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(createdLead)
    })

    it('should validate required fields', async () => {
      const invalidLead = { value: 1000 } // Missing title and pipelineStageId

      const request = new NextRequest('http://localhost:3000/api/leads', {
        method: 'POST',
        body: JSON.stringify(invalidLead),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Validation error')
    })
  })
})

describe('/api/leads/[id]', () => {
  describe('GET /api/leads/[id]', () => {
    it('should return a single lead with relations', async () => {
      const mockLead = {
        lead: { id: '1', title: 'Test Lead', value: 1000 },
        company: { id: '1', name: 'Test Company' },
        contact: { id: '1', firstName: 'John', lastName: 'Doe' },
        pipelineStage: { id: '1', name: 'Lead' },
        assignedUser: { id: '1', name: 'Test User' }
      }
      mockDb.limit.mockResolvedValue([mockLead])

      const request = new NextRequest('http://localhost:3000/api/leads/1')
      const response = await GET_SINGLE(request, { params: { id: '1' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockLead)
    })

    it('should return 404 for non-existent lead', async () => {
      mockDb.limit.mockResolvedValue([])

      const request = new NextRequest('http://localhost:3000/api/leads/999')
      const response = await GET_SINGLE(request, { params: { id: '999' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.success).toBe(false)
    })
  })

  describe('PUT /api/leads/[id]', () => {
    it('should update a lead', async () => {
      const updatedLead = { id: '1', title: 'Updated Lead', value: 2000 }
      mockDb.returning.mockResolvedValue([updatedLead])

      const request = new NextRequest('http://localhost:3000/api/leads/1', {
        method: 'PUT',
        body: JSON.stringify({ title: 'Updated Lead', value: 2000 }),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await PUT(request, { params: { id: '1' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(updatedLead)
    })
  })

  describe('DELETE /api/leads/[id]', () => {
    it('should delete a lead', async () => {
      const deletedLead = { id: '1', title: 'Deleted Lead' }
      mockDb.returning.mockResolvedValue([deletedLead])

      const request = new NextRequest('http://localhost:3000/api/leads/1', {
        method: 'DELETE'
      })

      const response = await DELETE(request, { params: { id: '1' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })
  })
})