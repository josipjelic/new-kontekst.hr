import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

const validBody = {
  name: 'Ivo Horvat',
  email: 'ivo@primjer.hr',
  message: 'Želim automatizirati narudžbe.',
};

describe.sequential('POST /api/contact', () => {
  it('returns 201 for valid submission', async () => {
    const res = await request(app).post('/api/contact').send(validBody).expect(201);
    expect(res.body.message).toBe('Poruka je poslana.');
  });

  it('returns 422 when name is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ email: 'a@b.hr', message: '1234567890' })
      .expect(422);
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.some((e) => e.field === 'name')).toBe(true);
  });

  it('returns 422 for invalid email', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Ana Anić', email: 'not-an-email', message: '1234567890' })
      .expect(422);
    expect(res.body.errors.some((e) => e.field === 'email')).toBe(true);
  });

  it('returns 422 when message is too short', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Ana Anić', email: 'ana@primjer.hr', message: 'short' })
      .expect(422);
    expect(res.body.errors.some((e) => e.field === 'message')).toBe(true);
  });

  it('returns 429 after 5 requests in the same window', async () => {
    await request(app).post('/api/contact').send(validBody).expect(201);
    const res = await request(app).post('/api/contact').send(validBody).expect(429);
    expect(res.body.error).toBe('Previše zahtjeva. Pokušajte ponovo za nekoliko minuta.');
  });
});
