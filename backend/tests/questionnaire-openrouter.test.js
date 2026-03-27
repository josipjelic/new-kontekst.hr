/**
 * questionnaire-openrouter.test.js
 *
 * Integration tests for the OpenRouter fetch path in POST /api/questionnaire.
 * Runs in its own Vitest worker process (separate file) so it gets a fresh
 * in-memory rate-limiter store and a fresh module registry. Each test resets
 * modules and re-imports app so the in-memory store starts at 0 each time.
 *
 * NODE_ENV is temporarily set to 'production' to exercise the real fetch code
 * path. global.fetch is stubbed with vi.stubGlobal to avoid real network calls.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';

const validAnswersHr = [
  { questionId: 'q1', value: 'a' },
  { questionId: 'q2', value: 'b' },
  { questionId: 'q3', value: 'b' },
  { questionId: 'q4', value: 'c' },
  { questionId: 'q5', value: 'b' },
];

const validAnswersEn = [
  { questionId: 'q1', value: 'b' },
  { questionId: 'q2', value: 'c' },
  { questionId: 'q3', value: 'c' },
  { questionId: 'q4', value: 'c' },
  { questionId: 'q5', value: 'c' },
];

// Each test imports a fresh app so the rate-limiter in-memory store is reset.
async function getFreshApp() {
  vi.resetModules();
  const { default: app } = await import('../src/app.js');
  return app;
}

describe('POST /api/questionnaire — OpenRouter integration (mocked fetch)', () => {
  const originalEnv = process.env.NODE_ENV;
  const originalKey = process.env.OPENROUTER_API_KEY;
  const originalDebugLog = process.env.QUESTIONNAIRE_DEBUG_LOG;

  beforeEach(() => {
    process.env.NODE_ENV = 'production';
    process.env.OPENROUTER_API_KEY = 'test-key-mock';
    process.env.QUESTIONNAIRE_DEBUG_LOG = '0';
  });

  // Restore env and all stubs after each test
  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    if (originalKey === undefined) {
      delete process.env.OPENROUTER_API_KEY;
    } else {
      process.env.OPENROUTER_API_KEY = originalKey;
    }
    if (originalDebugLog === undefined) {
      delete process.env.QUESTIONNAIRE_DEBUG_LOG;
    } else {
      process.env.QUESTIONNAIRE_DEBUG_LOG = originalDebugLog;
    }
    vi.restoreAllMocks();
  });

  it('returns 200 when model wraps JSON in markdown fences (```json)', async () => {
    const mockAssessment = 'Fenced mock assessment text that is long enough for display.';
    const inner = JSON.stringify({
      tier: 'ignored',
      score: 99,
      assessment: mockAssessment,
    });
    const mockApiResponse = {
      choices: [
        {
          message: {
            content: '```json\n' + inner + '\n```',
          },
        },
      ],
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      }),
    );

    const app = await getFreshApp();
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: validAnswersHr, locale: 'hr' })
      .expect(200);

    expect(res.body.tier).toBe('Graditelj');
    expect(res.body.assessment).toBe(mockAssessment);
  });

  it('returns 200 with model assessment when OpenRouter responds successfully', async () => {
    const mockAssessment = 'This is a mock personalised assessment from the model.';
    const mockApiResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              tier: 'Builder',
              score: 7,
              assessment: mockAssessment,
            }),
          },
        },
      ],
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      }),
    );

    const app = await getFreshApp();
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: validAnswersHr, locale: 'hr' })
      .expect(200);

    // tier and score are backend-computed (source of truth), not from the model
    expect(res.body.tier).toBe('Graditelj');
    expect(res.body.score).toBe(7);
    // assessment text comes from the model
    expect(res.body.assessment).toBe(mockAssessment);
  });

  it('returns 504 when OpenRouter call times out (AbortError)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => {
        const err = new Error('The operation was aborted.');
        err.name = 'AbortError';
        return Promise.reject(err);
      }),
    );

    const app = await getFreshApp();
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: validAnswersHr, locale: 'hr' })
      .expect(504);

    expect(res.body.error).toBe('Procjena traje predugo. Pokušajte ponovo.');
  });

  it('returns 504 with EN message when locale is en and request times out', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => {
        const err = new Error('The operation was aborted.');
        err.name = 'AbortError';
        return Promise.reject(err);
      }),
    );

    const app = await getFreshApp();
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: validAnswersEn, locale: 'en' })
      .expect(504);

    expect(res.body.error).toBe('Assessment is taking too long. Please try again.');
  });

  it('returns 500 when OpenRouter returns a non-OK HTTP response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal Server Error' }),
      }),
    );

    const app = await getFreshApp();
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: validAnswersHr, locale: 'hr' })
      .expect(500);

    expect(res.body.error).toBe('Greška pri generiranju procjene. Pokušajte ponovo.');
  });

  it('returns 500 when OpenRouter returns malformed JSON in the model response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'not valid json {{{' } }],
        }),
      }),
    );

    const app = await getFreshApp();
    const res = await request(app)
      .post('/api/questionnaire')
      .send({ answers: validAnswersHr, locale: 'hr' })
      .expect(500);

    expect(res.body.error).toBe('Greška pri generiranju procjene. Pokušajte ponovo.');
  });
});
