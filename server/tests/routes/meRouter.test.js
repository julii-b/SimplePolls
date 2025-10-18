import { describe, test, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';

import app from '../../src/app.ts';

vi.mock('../../src/repositories/pollRepository.js'); // mock pollRepository
import * as pollRepository from '../../src/repositories/pollRepository.js';
vi.mock('../../src/repositories/voteRepository.js'); // mock voteRepository
import * as voteRepository from '../../src/repositories/voteRepository.js';
vi.mock('../../src/repositories/answerRepository.js'); // mock answerRepository
import * as answerRepository from '../../src/repositories/answerRepository.js';
vi.mock('../../src/services/pollService.js'); // mock pollService
import * as pollService from '../../src/services/pollService.js';

describe('meRouter', () => {
  let examplePoll = {
      id: 1,
      ownerId: 1,
      questionText: 'example question',
      createdAt: 'example time',
    };
  let examplePolls = [
    examplePoll
  ];
  let exampleVotes = [
    {
      userId: 1,
      answerId: 1,
      createdAt: 'example time',
    },
  ];
  let exampleAnswer = {
    id: 1,
    pollId: 3,
    answerText: 'example answer',
    createdAt: 'example time',
  };
  let exampleUser = {
    createdPolls: examplePolls,
    participatedPolls: examplePolls,
    votedAnswers: [1]
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(pollRepository.getPollsByOwner).mockReturnValue(examplePolls);
    vi.mocked(voteRepository.getVotesByUser).mockReturnValue(exampleVotes);
    vi.mocked(answerRepository.getAnswerById).mockReturnValue(exampleAnswer);
    vi.mocked(pollService.getPollWithAnswers).mockReturnValue(examplePoll);
  });

  test('GET /me works', async () => {
    // get user profile:
    let result = await request(app).get('/me').send();
    expect(result.body).toEqual(exampleUser);
    expect(result.status).toBe(200);
  });
});
