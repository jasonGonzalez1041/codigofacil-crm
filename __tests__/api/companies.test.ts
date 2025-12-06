/**
 * @jest-environment node
 */

import { GET, POST } from '@/app/api/companies/route'
import { GET as GET_SINGLE, PUT, DELETE } from '@/app/api/companies/[id]/route'
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
    returning: jest.fn(),
    limit: jest.fn(),
  },
}))

const mockDb = require('@/lib/db').db

describe('/api/companies', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/companies', () => {
    it('should return list of companies', async () => {
      const mockCompanies = [
        { id: '1', name: 'Test Company 1', industry: 'Tech' },
        { id: '2', name: 'Test Company 2', industry: 'Finance' }
      ]

      mockDb.limit.mockResolvedValue(mockCompanies)

      const request = new NextRequest('http://localhost:3000/api/companies')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockCompanies)
    })

    it('should handle database errors', async () => {
      mockDb.limit.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/companies')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
    })
  })

  describe('POST /api/companies', () => {
    it('should create a new company', async () => {
      const newCompany = { name: 'New Company', industry: 'Tech' }
      const createdCompany = { id: '1', ...newCompany, createdAt: new Date().toISOString() }

      mockDb.returning.mockResolvedValue([createdCompany])

      const request = new NextRequest('http://localhost:3000/api/companies', {
        method: 'POST',
        body: JSON.stringify(newCompany),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(createdCompany)
    })

    it('should validate required fields', async () => {
      const invalidCompany = { industry: 'Tech' } // Missing name

      const request = new NextRequest('http://localhost:3000/api/companies', {
        method: 'POST',
        body: JSON.stringify(invalidCompany),
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

describe('/api/companies/[id]', () => {
  describe('GET /api/companies/[id]', () => {
    it('should return a single company', async () => {
      const mockCompany = { id: '1', name: 'Test Company', industry: 'Tech' }
      mockDb.limit.mockResolvedValue([mockCompany])

      const request = new NextRequest('http://localhost:3000/api/companies/1')
      const response = await GET_SINGLE(request, { params: { id: '1' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockCompany)
    })

    it('should return 404 for non-existent company', async () => {
      mockDb.limit.mockResolvedValue([])

      const request = new NextRequest('http://localhost:3000/api/companies/999')
      const response = await GET_SINGLE(request, { params: { id: '999' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.success).toBe(false)
    })
  })

  describe('PUT /api/companies/[id]', () => {
    it('should update a company', async () => {
      const updatedCompany = { id: '1', name: 'Updated Company', industry: 'Tech' }
      mockDb.returning.mockResolvedValue([updatedCompany])

      const request = new NextRequest('http://localhost:3000/api/companies/1', {
        method: 'PUT',
        body: JSON.stringify({ name: 'Updated Company' }),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await PUT(request, { params: { id: '1' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(updatedCompany)
    })
  })

  describe('DELETE /api/companies/[id]', () => {
    it('should delete a company', async () => {
      const deletedCompany = { id: '1', name: 'Deleted Company' }
      mockDb.returning.mockResolvedValue([deletedCompany])

      const request = new NextRequest('http://localhost:3000/api/companies/1', {
        method: 'DELETE'
      })

      const response = await DELETE(request, { params: { id: '1' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })
  })
})