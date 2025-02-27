import { createCallerFactory } from '@trpc/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { appRouter } from '../root';
import { createInnerTRPCContext } from '../trpc';

// Mock the DB session
vi.mock('../../db', () => ({
  db: {
    collection: vi.fn().mockReturnValue({
      find: vi.fn().mockReturnValue({
        toArray: vi.fn().mockResolvedValue([
          {
            _id: '1',
            name: 'Test Artist',
            genres: ['electronic', 'ambient'],
            platforms: ['spotify', 'soundcloud'],
            followers: 500,
          },
        ]),
      }),
      findOne: vi.fn().mockResolvedValue({
        _id: '1',
        name: 'Test Artist',
        genres: ['electronic', 'ambient'],
        platforms: ['spotify', 'soundcloud'],
        followers: 500,
      }),
      insertOne: vi.fn().mockResolvedValue({ insertedId: 'new-id' }),
      updateOne: vi.fn().mockResolvedValue({ modifiedCount: 1 }),
      deleteOne: vi.fn().mockResolvedValue({ deletedCount: 1 }),
    }),
  },
}));

// Mock the auth session
const mockSession = {
  user: {
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

describe('Gems Router', () => {
  const createCaller = createCallerFactory(appRouter);
  let caller: ReturnType<typeof createCaller>;

  beforeEach(() => {
    // Create a new caller with the mock session for each test
    const ctx = createInnerTRPCContext({
      session: mockSession,
      headers: new Headers(),
    });
    caller = createCaller(ctx);
  });

  it('should get all gems', async () => {
    const result = await caller.gems.getAll();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Artist');
  });

  it('should get a gem by id', async () => {
    const result = await caller.gems.getById({ id: '1' });
    expect(result.name).toBe('Test Artist');
    expect(result.genres).toContain('electronic');
  });
});
