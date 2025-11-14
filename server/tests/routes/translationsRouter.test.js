import { describe, test, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';

import app from '../../src/app.ts';

vi.mock('../../src/repositories/translationRepository.js');
import * as translationRepository from '../../src/repositories/translationRepository.js';
vi.mock('../../src/repositories/userRepository.js');
import * as userRepository from '../../src/repositories/userRepository.js';

describe('translationsRouter', () => {
  let exampleTranslations = [
    { key: 'Create a new poll', en: 'Create a new poll' },
    { key: 'Participate in a poll', en: 'Participate in a poll' },
    { key: 'Go to home page', en: 'Go to home page' },
  ];

  let exampleUser = {
    id: 1,
    userToken: 'example-token',
    createdAt: 'example time',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(translationRepository.getAllTranslations).mockReturnValue(exampleTranslations);
    vi.mocked(userRepository.createUser).mockReturnValue(exampleUser);
  });

  test('GET /translations works', async () => {
    const result = await request(app).get('/translations').send();
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      'Create a new poll': 'Create a new poll',
      'Participate in a poll': 'Participate in a poll',
      'Go to home page': 'Go to home page',
    });
  });
});
