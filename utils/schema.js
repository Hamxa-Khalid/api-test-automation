// @ts-check
/**
 * Lightweight, dependency-free schema helpers.
 *
 * These keep the test specs readable by centralising the "shape" checks for
 * the API resources we exercise. They intentionally avoid a heavy JSON-schema
 * dependency so the suite stays lean and fast to install in CI.
 */

/**
 * Assert that an object has every expected key with the expected primitive type.
 *
 * @param {import('@playwright/test').Expect} expect - Playwright's expect.
 * @param {Record<string, unknown>} obj - The object under test.
 * @param {Record<string, 'string' | 'number' | 'boolean' | 'object'>} schema - key -> typeof.
 */
export function expectShape(expect, obj, schema) {
  expect(obj, 'expected an object').toBeTruthy();
  for (const [key, type] of Object.entries(schema)) {
    expect(obj, `missing property "${key}"`).toHaveProperty(key);
    expect(typeof obj[key], `property "${key}" should be ${type}`).toBe(type);
  }
}

/** RFC-lite email pattern good enough for validating public sample data. */
export const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Expected top-level shape of a /posts resource. */
export const POST_SCHEMA = {
  userId: 'number',
  id: 'number',
  title: 'string',
  body: 'string',
};

/** Expected top-level shape of a /users resource. */
export const USER_SCHEMA = {
  id: 'number',
  name: 'string',
  username: 'string',
  email: 'string',
  address: 'object',
  phone: 'string',
  website: 'string',
  company: 'object',
};
