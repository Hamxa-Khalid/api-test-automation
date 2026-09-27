// @ts-check
import { test, expect } from '@playwright/test';
import { expectShape, USER_SCHEMA, EMAIL_REGEX } from '../utils/schema.js';

/**
 * Read and response-body validation for the /users resource.
 */
test.describe('Users - read and validation', () => {
  test('GET /users returns 10 users with valid shape', async ({ request }) => {
    const response = await request.get('/users');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users).toHaveLength(10);

    // Validate the shape of every user, not just the first.
    for (const user of users) {
      expectShape(expect, user, USER_SCHEMA);
      expect(user.email).toMatch(EMAIL_REGEX);
      expect(user.address).toHaveProperty('city');
      expect(user.company).toHaveProperty('name');
    }
  });

  test('GET /users/:id returns a single user with expected fields', async ({ request }) => {
    const response = await request.get('/users/1');

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user.name).toBe('Leanne Graham');
    expect(user.username).toBe('Bret');
    expect(user.email).toBe('Sincere@april.biz');
    expect(user.email).toMatch(EMAIL_REGEX);
    expect(user.address.city).toEqual(expect.any(String));
    expect(user.company.name).toEqual(expect.any(String));
  });
});
