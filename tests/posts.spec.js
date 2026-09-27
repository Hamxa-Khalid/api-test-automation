// @ts-check
import { test, expect } from '@playwright/test';
import { expectShape, POST_SCHEMA } from '../utils/schema.js';

/**
 * Full CRUD lifecycle for the /posts resource.
 *
 * JSONPlaceholder fakes write operations but returns realistic status codes
 * and echoed bodies, which is exactly what we assert against here.
 */
test.describe('Posts - CRUD lifecycle', () => {
  test('GET /posts returns a non-empty array of posts', async ({ request }) => {
    const response = await request.get('/posts');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expectShape(expect, posts[0], POST_SCHEMA);
  });

  test('GET /posts/:id returns the requested post', async ({ request }) => {
    const response = await request.get('/posts/1');

    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post.userId).toBe(1);
    expect(post.title).toEqual(expect.any(String));
    expect(post.title.length).toBeGreaterThan(0);
  });

  test('POST /posts creates a post and echoes the body', async ({ request }) => {
    const payload = {
      title: 'Automated test post',
      body: 'Created by the Playwright API suite.',
      userId: 1,
    };

    const response = await request.post('/posts', { data: payload });

    // JSONPlaceholder returns 201 Created for a successful POST.
    expect(response.status()).toBe(201);

    const created = await response.json();
    expect(created.title).toBe(payload.title);
    expect(created.body).toBe(payload.body);
    expect(created.userId).toBe(payload.userId);
    // The API assigns a fresh id (101) to the created resource.
    expect(created).toHaveProperty('id');
    expect(typeof created.id).toBe('number');
  });

  test('PUT /posts/:id fully replaces a post', async ({ request }) => {
    const payload = {
      id: 1,
      title: 'Updated title via PUT',
      body: 'Fully replaced body.',
      userId: 1,
    };

    const response = await request.put('/posts/1', { data: payload });

    expect(response.status()).toBe(200);

    const updated = await response.json();
    expect(updated.title).toBe(payload.title);
    expect(updated.body).toBe(payload.body);
    expect(updated.id).toBe(1);
  });

  test('PATCH /posts/:id partially updates a post', async ({ request }) => {
    const response = await request.patch('/posts/1', {
      data: { title: 'Partially updated title via PATCH' },
    });

    expect(response.status()).toBe(200);

    const patched = await response.json();
    expect(patched.title).toBe('Partially updated title via PATCH');
    // The untouched field is preserved by the API.
    expect(patched).toHaveProperty('body');
    expect(patched.id).toBe(1);
  });

  test('DELETE /posts/:id removes a post', async ({ request }) => {
    const response = await request.delete('/posts/1');

    expect(response.status()).toBe(200);

    // A successful delete returns an empty object.
    const body = await response.json();
    expect(body).toEqual({});
  });
});
