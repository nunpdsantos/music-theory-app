import { test, expect } from '@playwright/test';

test.describe('Onboarding — guided tour', () => {
  test('first visit shows guided tour dialog', async ({ page }) => {
    // Do NOT set the onboarding-complete flag — let the tour appear
    await page.addInitScript(() => {
      localStorage.removeItem('music-theory-onboarding-complete');
    });
    await page.goto('/');

    // The tour renders a dialog with the first step title
    const tourDialog = page.getByRole('dialog', { name: 'Pick Your Instrument' });
    await expect(tourDialog).toBeVisible({ timeout: 10_000 });
  });

  test('tour can be dismissed with Skip button', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('music-theory-onboarding-complete');
    });
    await page.goto('/');

    const tourDialog = page.getByRole('dialog', { name: 'Pick Your Instrument' });
    await expect(tourDialog).toBeVisible({ timeout: 10_000 });

    // Click "Skip" to dismiss
    await page.getByRole('button', { name: 'Skip' }).click();

    // Tour dialog should disappear
    await expect(tourDialog).not.toBeVisible();
  });

  test('tour does not appear when already completed', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('music-theory-onboarding-complete', '1');
    });
    await page.goto('/');

    // Wait for app to load
    await expect(page.locator('#root')).not.toBeEmpty();

    // Give a moment for any delayed tour rendering
    await page.waitForTimeout(500);

    // No tour dialog should exist
    const tourDialogs = page.getByRole('dialog');
    await expect(tourDialogs).toHaveCount(0);
  });
});
