# TinyGems Testing Guide

This document outlines the test-driven development (TDD) approach for the tinyGems project.

## Testing Stack

- **Unit/Integration Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **API Mocking**: MSW (Mock Service Worker)

## Getting Started

### Prerequisites

Before you start writing and running tests, ensure you have:

- Project dependencies installed: `bun install`
- Playwright browsers installed: `bunx playwright install`

### Setting Up New Tests

#### Unit/Component Tests

1. Create a test file next to the component or function you're testing with a `.test.ts` or `.test.tsx` extension:

```typescript
// src/features/shared/components/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });
});
```

#### API/tRPC Tests

1. For testing tRPC endpoints, create mock contexts and callers:

```typescript
// src/server/api/routers/example.test.ts
import { describe, it, expect, vi } from 'vitest';

// Mock dependencies and setup test data
vi.mock('@/server/db/db', () => ({
  connectToDb: vi.fn().mockResolvedValue({
    // Mock database methods
  }),
}));

describe('Example Router', () => {
  // Create mock router
  const mockRouter = {
    exampleMethod: vi.fn().mockResolvedValue({ data: 'test' }),
  };

  it('returns expected data', async () => {
    const result = await mockRouter.exampleMethod();
    expect(result.data).toBe('test');
  });
});
```

#### E2E Tests

1. Create test files in the `tests/e2e` directory with a `.spec.ts` extension:

```typescript
// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('homepage has the expected title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/tinyGems/);
  await expect(page.locator('h1')).toContainText('Discover');
});
```

### Running Tests

```bash
# Run all unit/integration tests
bun run test

# Watch mode (for development)
bun run test:watch

# Run E2E tests
bun run test:e2e

# Run E2E tests with UI
bun run test:e2e:ui

# Show E2E test report
bun run test:e2e:report
```

## Testing Workflow

### AI-Powered TDD Approach

1. **Define Requirements**

   - Clearly define what the feature should do
   - Identify edge cases and error states

2. **Write Tests First**

   - Create test files that verify the requirements
   - Test both happy paths and edge cases
   - Generate tests with AI assistance

3. **Implement the Feature**

   - Write minimal code to make tests pass
   - Refactor while ensuring tests remain green

4. **Review & Iterate**
   - Review test coverage
   - Add edge cases as needed

## Test Structure

### Unit Tests

Unit tests focus on testing individual components or functions in isolation:

```typescript
// Example component test
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography Component', () => {
  it('renders with default variant p', () => {
    render(<Typography>Test Text</Typography>);
    const element = screen.getByText('Test Text');

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P');
  });
});
```

### Integration Tests

Integration tests focus on how components work together or how the app interacts with services:

```typescript
// Example tRPC router test
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { appRouter } from '../root';
import { createCallerFactory } from '@trpc/server';
import { createInnerTRPCContext } from '../trpc';

describe('Gems Router', () => {
  // Test setup...

  it('should get all gems', async () => {
    const result = await caller.gems.getAll();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Artist');
  });
});
```

### E2E Tests

End-to-end tests verify the application works correctly from a user's perspective:

```typescript
// Example Playwright test
import { test, expect } from '@playwright/test';

test('should visit the home page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});

// Testing iframe embeds (platform specific)
test('should handle Spotify embed', async ({ page }) => {
  await page.goto('/artists/example');

  // Access iframe content - Playwright's key advantage!
  const spotifyIframe = page.locator('iframe[src*="spotify.com"]');
  await expect(spotifyIframe).toBeVisible();

  const spotifyFrame = page.frameLocator('iframe[src*="spotify.com"]');
  const playButton = spotifyFrame.locator('[data-testid="play-button"]');
  if ((await playButton.count()) > 0) {
    await expect(playButton).toBeVisible();
  }
});
```

## Mocking

### API Mocking with MSW

```typescript
// Define handlers for API endpoints
export const handlers = [
  http.get('/api/gems', () => {
    return HttpResponse.json([
      {
        id: '1',
        name: 'Test Artist',
        // ...more properties
      },
    ]);
  }),
];
```

## Best Practices

1. **File Organization**

   - Place unit/integration test files next to the code they test
   - Use `.test.ts` or `.test.tsx` suffix for unit/integration tests
   - Place E2E tests in the `tests/e2e` directory
   - Use `.spec.ts` suffix for E2E tests

2. **Testing React Components**

   - Test behavior, not implementation details
   - Use user-event for simulating user interactions
   - Test accessibility where possible

3. **Testing Hooks**

   - Use renderHook from React Testing Library
   - Test lifecycle behavior with act()

4. **Testing tRPC Endpoints**

   - Mock database operations
   - Test with and without authorization
   - Verify input validation works correctly

5. **Testing Embeds (tinyGems Specific)**

   - Use Playwright's frameLocator to test inside iframes
   - Test cross-platform embed switching
   - Use multiple browser contexts to test different user states

6. **General Guidelines**
   - Keep tests fast and independent
   - Use descriptive test names
   - Favor testing outputs over implementation details
   - Use proper assertions and matchers
