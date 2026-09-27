// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Negative / edge-case tests.
 *
 * Good API coverage is not just the happy path: we confirm the service
 * behaves correctly for resources that do not exist.
 */
test.describe('Negative scenarios', () => {
  test('GET a non-existent post returns 404', async ({ request }) => {
    const response = await request.get('/posts/999999');

    expect(response.status()).toBe(404);
    expect(response.ok()).toBe(false);

    // JSONPlaceholder returns an empty object for a missing resource.
    const body = await response.json();
    expect(body).toEqual({});
  });

  test('GET a non-existent user returns 404', async ({ request }) => {
    const response = await request.get('/users/999999');

    expect(response.status()).toBe(404);
    expect(response.ok()).toBe(false);
  });

  test('GET an unknown route returns 404', async ({ request }) => {
    const response = await request.get('/this-route-does-not-exist');

    expect(response.status()).toBe(404);
    expect(response.ok()).toBe(false);
  });
});
