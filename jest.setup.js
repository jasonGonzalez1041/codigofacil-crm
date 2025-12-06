import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/dashboard'
  },
}))

// Mock environment variables
process.env.TURSO_DATABASE_URL = 'libsql://test.turso.io'
process.env.TURSO_AUTH_TOKEN = 'test-token'
process.env.NEXTAUTH_SECRET = 'test-secret'
process.env.NEXTAUTH_URL = 'http://localhost:3000'

// Mock fetch globally
global.fetch = jest.fn()

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks()
})