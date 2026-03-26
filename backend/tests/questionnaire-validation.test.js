/**
 * questionnaire-validation.test.js
 *
 * Validation error tests for POST /api/questionnaire.
 * Runs in its own Vitest worker process (separate file) so it gets a fresh
 * in-memory rate-limiter store and can verify 422 responses without being
 * blocked by a previous test exhausting the 3-request window.
 *
 * Rate-limit budget: 3 requests per 15-minute window.
 * Slots 1–3: genuine 422 validation assertions (locale missing, invalid locale,
 *            answers too short).
 * Slots 4+:  rate window is exhausted — remaining tests verify 429 behaviour
 *            for the questionId and value validators (mirrors questionnaire.test.js
 *            post-window pattern).
 */

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

const validAnswersHr = [
  { questionId: 'q1', value: 'a' },
  { questionId: 'q2', value: 'b' },
  { questionId: 'q3', value: 'b' },
  { questionId: 'q4', value: 'c' },
  { questionId: 'q5', value: 'b' },
];

describe.sequential('POST /api/questionnaire — validation errors', () => {
  // Slot 1: locale missing
  it('returns 422 when locale is missing', async () => {
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: validAnswersHr })
      .expect(422);

    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.some((e) => e.field === 'locale')).toBe(true);
  });

  // Slot 2: locale is an unsupported value
  it('returns 422 when locale is an unsupported value', async () => {
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: validAnswersHr, locale: 'de' })
      .expect(422);

    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.some((e) => e.field === 'locale')).toBe(true);
  });

  // Slot 3: answers array too short
  it('returns 422 when answers has only 4 items', async () => {
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: validAnswersHr.slice(0, 4), locale: 'hr' })
      .expect(422);

    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.some((e) => e.field === 'answers')).toBe(true);
  });

  // From here on every request returns 429 (rate window exhausted after 3 requests)

  it('returns 429 (rate-limited) for invalid questionId after window', async () => {
    const badAnswers = [
      { questionId: 'q6', value: 'a' },
      ...validAnswersHr.slice(1),
    ];
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: badAnswers, locale: 'hr' })
      .expect(429);

    expect(res.body.error).toBe('Previše pokušaja. Pokušajte za nekoliko minuta.');
  });

  it('returns 429 (rate-limited) for invalid answer value after window', async () => {
    const badAnswers = [
      { questionId: 'q1', value: 'd' },
      ...validAnswersHr.slice(1),
    ];
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: badAnswers, locale: 'hr' })
      .expect(429);

    expect(res.body.error).toBe('Previše pokušaja. Pokušajte za nekoliko minuta.');
  });
});
