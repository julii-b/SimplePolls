import { describe, test, expect, beforeEach, vi, beforeAll } from 'vitest';
import request from 'supertest';

import app from '../../src/app.js';

vi.mock('../../src/repositories/pollRepository.js'); // mock pollRepository
import * as pollRepository from '../../src/repositories/pollRepository.js';

describe('pollsRouter', () => {
    let examplePoll;

    beforeEach(() => {
        examplePoll = {
            id: 1,
            ownerId: 2,
            questionText: 'Whill this test work?',
            createdAt: 'exampleTime',
        };
        vi.clearAllMocks();
        vi.mocked(pollRepository.createPoll).mockResolvedValue(examplePoll);
        vi.mocked(pollRepository.getPollById).mockResolvedValue(examplePoll);
        vi.mocked(pollRepository.getPollsByOwner).mockResolvedValue([
            examplePoll,
        ]);
        vi.mocked(pollRepository.updatePollText).mockResolvedValue(examplePoll);
        vi.mocked(pollRepository.deletePoll).mockResolvedValue(true);
    });

    test('POST /polls works', async () => {
        // create poll correctly:
        let result = await request(app)
            .post('/polls')
            .send({ questionText: 'Hello?' });
        expect(result.body).toEqual(examplePoll);
        expect(result.status).toBe(201);
        expect(result.headers.location).toBe('/polls/1');
        // create poll without questionText:
        result = await request(app).post('/polls').send({});
        expect(result.status).toBe(400);
        // create poll with empty questionText:
        result = await request(app)
            .post('/polls')
            .send({ questionText: '   ' });
        expect(result.status).toBe(400);
    });

    test('GET /polls/:pollId works', async () => {
        // get poll that exists:
        let result = await request(app).get('/polls/1').send();
        expect(result.body).toEqual(examplePoll);
        expect(result.status).toBe(200);
        // get poll that doesn't exist:
        vi.mocked(pollRepository.getPollById).mockResolvedValue(null);
        result = await request(app).get('/polls/1').send();
        expect(result.status).toBe(404);
    });

    test('PATCH /polls/:pollId works', async () => {
        // change questionText of question that exists:
        let result = await request(app)
            .patch('/polls/1')
            .send({ questionText: 'Is this the new question?' });
        expect(result.body).toEqual(examplePoll);
        expect(result.status).toBe(200);
        // change other user's poll or unknown poll:
        vi.mocked(pollRepository.updatePollText).mockResolvedValue(null);
        result = await request(app)
            .patch('/polls/1')
            .send({ questionText: 'Is this the new question?' });
        expect(result.status).toBe(404);
    });

    test('DELETE /polls/:pollId works', async () => {
        // delete poll:
        let result = await request(app).delete('/polls/1').send();
        expect(result.status).toBe(204);
        // delete other user's or non-existent poll:
        vi.mocked(pollRepository.deletePoll).mockResolvedValue(false);
        result = await request(app).delete('/polls/1').send();
        expect(result.status).toBe(404);
    });
});
