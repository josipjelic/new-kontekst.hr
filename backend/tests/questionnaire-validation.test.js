/**
 * questionnaire-validation.test.js
 *
 * Validation error tests for POST /api/questionnaire.
 * Runs in its own Vitest worker process (separate file) so it gets a fresh
 * in-memory rate-limiter store and can verify 422 responses without being
 * blocked by a previous test exhausting the 3-request window.
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
  it('returns 422 when answers has only 4 items', async () => {
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: validAnswersHr.slice(0, 4), locale: 'hr' })
      .expect(422);

    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.some((e) => e.field === 'answers')).toBe(true);
  });

  it('returns 422 for invalid questionId', async () => {
    const badAnswers = [
      { questionId: 'q6', value: 'a' },
      ...validAnswersHr.slice(1),
    ];
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: badAnswers, locale: 'hr' })
      .expect(422);

    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.some((e) => e.field.includes('questionId'))).toBe(true);
  });

  it('returns 422 for invalid answer value', async () => {
    const badAnswers = [
      { questionId: 'q1', value: 'd' },
      ...validAnswersHr.slice(1),
    ];
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: badAnswers, locale: 'hr' })
      .expect(422);

    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.some((e) => e.field.includes('value'))).toBe(true);
  });
});
