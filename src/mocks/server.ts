import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This creates a server instance that will listen for requests during tests
export const server = setupServer(...handlers);
