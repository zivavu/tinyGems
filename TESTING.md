# TinyGems Testing Guide

This document outlines the test-driven development (TDD) approach for the tinyGems project.

## Testing Stack

- **Unit/Integration Tests**: Vitest + React Testing Library
- **E2E Tests**: Cypress
- **API Mocking**: MSW (Mock Service Worker)
- **Coverage**: C8

## Getting Started

### Running Tests

```bash
# Run all tests
bun run test

# Watch mode (for development)
bun run test:watch

# Run with coverage report
bun run test:coverage

# Run E2E tests
bun run test:e2e

# Open Cypress GUI
bun run cy:open
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
// Example Cypress test
describe('Basic E2E Tests', () => {
  it('should visit the home page', () => {
    cy.visit('/');
    cy.get('h1').should('exist');
  });
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

   - Place test files next to the code they test
   - Use `.test.ts` or `.test.tsx` suffix for test files

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

5. **General Guidelines**
   - Keep tests fast and independent
   - Use descriptive test names
   - Favor testing outputs over implementation details
   - Use proper assertions and matchers

## Coverage Goals

- **Components**: 90%+ coverage
- **Hooks**: 95%+ coverage
- **tRPC Routers**: 85%+ coverage
- **Utility Functions**: 100% coverage

## Working with the CI/CD Pipeline

Tests run automatically on GitHub Actions when:

- Opening a pull request
- Pushing to main branch

The pipeline will report test results and coverage metrics.
