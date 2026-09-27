// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration for the JSONPlaceholder API test suite.
 *
 * These are pure API tests: no browser is launched. We use Playwright's
 * built-in `request` fixture, which gives us a fast, CI-friendly HTTP client
 * with the same assertion library used across the rest of the suite.
 *
 * @see https://playwright.dev/docs/test-api-testing
 */
export default defineConfig({
  testDir: './tests',

  // Fail the build on CI if test.only is accidentally left in the source.
  forbidOnly: !!process.env.CI,

  // Retry once on CI to absorb transient network flakiness against a public API.
  retries: process.env.CI ? 1 : 0,

  // Reasonable per-test timeout for network calls.
  timeout: 30_000,

  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  },
});
