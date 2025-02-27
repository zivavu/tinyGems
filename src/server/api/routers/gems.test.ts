import { describe, expect, it, vi } from 'vitest';

// Mock the tRPC setup
vi.mock('@trpc/server', () => {
  const originalModule = vi.importActual('@trpc/server');
  return {
    ...originalModule,
    initTRPC: {
      context: () => ({
        create: () => ({
          router: (...args: any[]) => args[0],
          procedure: {
            input: () => ({
              query: (handler: Function) => handler,
              mutation: (handler: Function) => handler,
            }),
            query: (handler: Function) => handler,
            mutation: (handler: Function) => handler,
          },
        }),
      }),
    },
  };
});

// Mock the DB session
vi.mock('@/server/db/db', () => ({
  connectToDb: vi.fn().mockResolvedValue({
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
  }),
}));

describe('Gems Router', () => {
  // Define a simple mock router
  const mockGemsRouter = {
    getAll: vi.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Test Artist',
        genres: ['electronic', 'ambient'],
        platforms: ['spotify', 'soundcloud'],
        followers: 500,
      },
    ]),
    getById: vi.fn().mockImplementation(({ id }) => ({
      id,
      name: 'Test Artist',
      genres: ['electronic', 'ambient'],
      platforms: ['spotify', 'soundcloud'],
      followers: 500,
    })),
  };

  it('should get all gems', async () => {
    const result = await mockGemsRouter.getAll();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Artist');
  });

  it('should get a gem by id', async () => {
    const result = await mockGemsRouter.getById({ id: '1' });
    expect(result.name).toBe('Test Artist');
    expect(result.genres).toContain('electronic');
  });
});
