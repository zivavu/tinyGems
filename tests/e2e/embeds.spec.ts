import { expect, test } from '@playwright/test';

test.describe('Music Platform Embeds', () => {
  test('should handle Spotify embed iframe', async ({ page }) => {
    // Go to a page with a Spotify embed
    await page.goto('/artists/test-with-spotify');

    // Check that the Spotify iframe exists
    const spotifyIframe = page.locator('iframe[src*="spotify.com"]');
    await expect(spotifyIframe).toBeVisible();

    // Access the frame content
    const spotifyFrame = page.frameLocator('iframe[src*="spotify.com"]');

    // Check for the play button within the iframe
    const playButton = spotifyFrame.locator('[data-testid="play-button"]');
    if ((await playButton.count()) > 0) {
      await expect(playButton).toBeVisible();
    }
  });

  test('should handle SoundCloud embed iframe', async ({ page }) => {
    await page.goto('/artists/test-with-soundcloud');

    // Check that the iframe element exists
    const soundcloudIframe = page.locator('iframe[src*="soundcloud.com"]');
    await expect(soundcloudIframe).toBeVisible();

    // Access the frame content
    const soundcloudFrame = page.frameLocator('iframe[src*="soundcloud.com"]');

    // Check that the player is loaded inside the iframe
    const player = soundcloudFrame.locator('.soundcloud-player');
    if ((await player.count()) > 0) {
      await expect(player).toBeVisible();
    }
  });

  test('should test multi-platform switching', async ({ page, context }) => {
    // This tests that users can switch between different platform embeds
    await page.goto('/artists/multi-platform');

    // Click on the Spotify tab/button
    await page.getByTestId('platform-tab-spotify').click();
    await expect(page.locator('[data-platform="spotify"]')).toBeVisible();

    // Click on the SoundCloud tab/button
    await page.getByTestId('platform-tab-soundcloud').click();
    await expect(page.locator('[data-platform="soundcloud"]')).toBeVisible();

    // Test that when a new window/tab opens (like for external links), we can handle it
    // This is a scenario where Playwright excels over Cypress
    const pagePromise = context.waitForEvent('page');
    await page.getByTestId('external-link').click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    // Verify we're on an external page
    expect(newPage.url()).toContain('spotify.com');
  });

  test('should handle multiple browser contexts', async ({ browser }) => {
    // Create two different browser contexts (like having two different browser sessions)
    // This is something Playwright does extremely well compared to Cypress
    const userContext = await browser.newContext();
    const guestContext = await browser.newContext();

    // Create pages for each context
    const userPage = await userContext.newPage();
    const guestPage = await guestContext.newPage();

    // Test logged-in user behavior
    await userPage.goto('/login');
    await userPage.getByLabel('Email').fill('test@example.com');
    await userPage.getByLabel('Password').fill('password123');
    await userPage.getByRole('button', { name: 'Login' }).click();

    // Go to artist page as logged-in user
    await userPage.goto('/artists/example');
    await expect(userPage.getByTestId('user-controls')).toBeVisible();

    // Test guest behavior on the same page
    await guestPage.goto('/artists/example');
    await expect(guestPage.getByTestId('login-prompt')).toBeVisible();

    // Clean up
    await userContext.close();
    await guestContext.close();
  });
});
