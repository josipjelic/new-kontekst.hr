import { describe, expect, it } from 'vitest';
import { apiUrlFromBase, getApiBaseFromEnv } from './apiBase.js';

describe('getApiBaseFromEnv', () => {
  it('returns empty string when unset or blank', () => {
    expect(getApiBaseFromEnv(undefined)).toBe('');
    expect(getApiBaseFromEnv('')).toBe('');
    expect(getApiBaseFromEnv('  ')).toBe('');
  });

  it('strips trailing slash', () => {
    expect(getApiBaseFromEnv('http://localhost:3000/')).toBe('http://localhost:3000');
  });
});

describe('apiUrlFromBase', () => {
  it('uses relative path when base is empty', () => {
    expect(apiUrlFromBase('', '/api/contact')).toBe('/api/contact');
  });

  it('prefixes base', () => {
    expect(apiUrlFromBase('http://localhost:3000', '/api/contact')).toBe(
      'http://localhost:3000/api/contact',
    );
  });

  it('normalizes path without leading slash', () => {
    expect(apiUrlFromBase('', 'api/x')).toBe('/api/x');
  });
});
