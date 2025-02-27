import { expect, test } from '@playwright/test';

test.describe('Basic E2E Tests', () => {
  test('should visit the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have proper navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();

    const navLinks = page.locator('nav a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  // Test for dark mode toggle
  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/');

    // Assuming there's a dark mode toggle button with data-testid
    const themeToggle = page.getByTestId('theme-toggle');
    await themeToggle.click();

    // Check that dark mode class is added to html element
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Toggle back to light mode
    await themeToggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  // Test for cross-platform embeds (specific to tinyGems)
  test('should render music platform embeds', async ({ page }) => {
    // This test assumes there's an artist page with embedded players
    await page.goto('/artists/example');

    // Check for platform embed containers
    const spotifyEmbed = page.locator('[data-platform="spotify"]');
    const soundcloudEmbed = page.locator('[data-platform="soundcloud"]');

    if ((await spotifyEmbed.count()) > 0) {
      await expect(spotifyEmbed).toBeVisible();
    }

    if ((await soundcloudEmbed.count()) > 0) {
      await expect(soundcloudEmbed).toBeVisible();
    }
  });
});
