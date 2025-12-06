/**
 * @jest-environment jsdom
 */

import { fetchApi, getDashboardMetrics } from '@/lib/api'

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('API Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchApi', () => {
    it('should fetch data successfully', async () => {
      const mockData = { id: '1', name: 'Test' }
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
          success: true,
          data: mockData
        })
      })

      const result = await fetchApi('/api/test')

      expect(result).toEqual(mockData)
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3002/api/test')
    })

    it('should throw error on API failure', async () => {
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
          success: false,
          error: { message: 'API Error' }
        })
      })

      await expect(fetchApi('/api/test')).rejects.toThrow('API Error')
    })

    it('should throw error on network failure', async () => {
      mockFetch.mockRejectedValue(new Error('Network Error'))

      await expect(fetchApi('/api/test')).rejects.toThrow('Network Error')
    })
  })

  describe('getDashboardMetrics', () => {
    it('should calculate metrics correctly', async () => {
      const mockApiResponses = {
        companies: [
          { id: '1', name: 'Company 1' },
          { id: '2', name: 'Company 2' }
        ],
        leads: [
          { lead: { id: '1', status: 'active', value: 1000 } },
          { lead: { id: '2', status: 'won', value: 2000 } },
          { lead: { id: '3', status: 'active', value: 1500 } }
        ],
        contacts: [
          { id: '1', name: 'Contact 1' }
        ],
        followUps: []
      }

      mockFetch
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ success: true, data: mockApiResponses.companies })
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ success: true, data: mockApiResponses.leads })
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ success: true, data: mockApiResponses.contacts })
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ success: true, data: mockApiResponses.followUps })
        })

      const metrics = await getDashboardMetrics()

      expect(metrics.totalCompanies).toBe(2)
      expect(metrics.totalLeads).toBe(3)
      expect(metrics.activeLeads).toBe(2)
      expect(metrics.totalContacts).toBe(1)
      expect(metrics.totalValue).toBe(4500) // 1000 + 2000 + 1500
      expect(metrics.conversionRate).toBe(33) // 1 won out of 3 total = 33%
    })

    it('should handle empty data', async () => {
      const emptyResponses = [[], [], [], []]

      mockFetch
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ success: true, data: emptyResponses[0] })
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ success: true, data: emptyResponses[1] })
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ success: true, data: emptyResponses[2] })
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ success: true, data: emptyResponses[3] })
        })

      const metrics = await getDashboardMetrics()

      expect(metrics.totalCompanies).toBe(0)
      expect(metrics.totalLeads).toBe(0)
      expect(metrics.activeLeads).toBe(0)
      expect(metrics.totalContacts).toBe(0)
      expect(metrics.totalValue).toBe(0)
      expect(metrics.conversionRate).toBe(0)
    })
  })
})