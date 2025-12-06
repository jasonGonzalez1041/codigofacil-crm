// Database mock for testing
export const mockDb = {
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
}

// Mock the database module
jest.mock('../../src/lib/db', () => ({
  db: mockDb,
}))

export { mockDb as db }