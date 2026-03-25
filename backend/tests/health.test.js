import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('GET /health', () => {
  it('returns 200 and body.status is ok', async () => {
    const res = await request(app).get('/health').expect(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
    expect(Number.isNaN(new Date(res.body.timestamp).getTime())).toBe(false);
  });
});
