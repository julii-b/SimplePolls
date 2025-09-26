import { describe, test, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';

import app from '../../src/app.ts';

vi.mock('../../src/repositories/voteRepository.js'); // mock voteRepository
import * as voteRepository from '../../src/repositories/voteRepository.js';

describe('votesRouter', () => {

    let exampleVote = {};

    beforeEach(() => {
        exampleVote = {
            userId: 1,
            answerId: 2,
            createdAt: 'axample time'
        };

        vi.clearAllMocks();
        vi.mocked(voteRepository.vote).mockReturnValue(exampleVote);
        vi.mocked(voteRepository.deleteVote).mockReturnValue(true);
    });

    test('POST /polls/:pollId/answers/:answerId/votes works', async () => {
        // vote for answer that exists:
        let result = await request(app).post('/polls/1/answers/2/votes').send();
        expect(result.body).toEqual(exampleVote);
        expect(result.status).toBe(201);
        // vote for answer that doesn't exist:
        vi.mocked(voteRepository.vote).mockReturnValue(null);
        result = await request(app).get('/polls/1/answers/2/votes').send();
        expect(result.status).toBe(404);
    });

    test('DELETE /polls/:pollId/answers/:answerId/votes', async () => {
        // delete vote for answer that exists:
        let result = await request(app).delete('/polls/1/answers/2/votes').send();
        expect(result.status).toBe(204);
        // delete vote for answer that doesn't exist:
        vi.mocked(voteRepository.deleteVote).mockReturnValue(false);
        result = await request(app).delete('/polls/1/answers/2/votes').send();
        expect(result.status).toBe(404);
    });
});