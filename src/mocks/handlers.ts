import { http, HttpResponse } from 'msw';

// Define a type for our Gem data structure
interface GemData {
  id?: string;
  name: string;
  genres: string[];
  platforms: string[];
  followers: number;
  [key: string]: unknown;
}

// Define handlers for each API endpoint you want to mock
export const handlers = [
  // Example: Mock a GET request for gems
  http.get('/api/gems', () => {
    return HttpResponse.json([
      {
        id: '1',
        name: 'Test Artist',
        genres: ['electronic', 'ambient'],
        platforms: ['spotify', 'soundcloud'],
        followers: 500,
      },
      // More mock data as needed
    ]);
  }),

  // Example: Mock a POST request
  http.post('/api/gems', async ({ request }) => {
    const newGem = (await request.json()) as GemData;
    return HttpResponse.json({ id: '123', ...newGem }, { status: 201 });
  }),

  // Add more handlers as needed for other API endpoints
];
