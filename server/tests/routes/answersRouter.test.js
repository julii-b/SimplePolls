import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import request from 'supertest';

import app from '../../src/app.js';

vi.mock('../../src/repositories/pollRepository.js'); // mock pollRepository
import * as pollRepository from '../../src/repositories/pollRepository.js';
vi.mock('../../src/repositories/answerRepository.js'); // mock answerRepository
import * as answerRepository from '../../src/repositories/answerRepository.js';
vi.mock('../../src/repositories/voteRepository.js'); // mock voteRepository
import * as voteRepository from '../../src/repositories/voteRepository.js';

describe('answersRouter', () => {

    let examplePoll;
    let exampleAnswer;
    let exampleAnswerWithVotes;

    beforeEach(() => {
        examplePoll = {
            id: 1,
            ownerId: 2,
            questionText: 'Whill this test work?',
            createdAt: 'exampleTime'
        };
        exampleAnswer = {
            id: 2,
            pollId: 1,
            answerText: 'Yes',
            createdAt: 'exampleTime'
        };
        exampleAnswerWithVotes = {
            ...exampleAnswer,
            votes: []
        };
        vi.clearAllMocks();
        vi.mocked(pollRepository.createPoll).mockResolvedValue(examplePoll);
        vi.mocked(pollRepository.getPollById).mockResolvedValue(examplePoll);
        vi.mocked(pollRepository.getPollsByOwner).mockResolvedValue([examplePoll]);
        vi.mocked(pollRepository.updatePollText).mockResolvedValue(examplePoll);
        vi.mocked(pollRepository.deletePoll).mockResolvedValue(true);

        vi.mocked(answerRepository.createAnswer).mockResolvedValue(exampleAnswer);
        vi.mocked(answerRepository.getAnswerById).mockResolvedValue(exampleAnswer);
        vi.mocked(answerRepository.getAnswersForPoll).mockResolvedValue([exampleAnswer]);
        vi.mocked(answerRepository.updateAnswerText).mockResolvedValue(examplePoll);
        vi.mocked(answerRepository.deleteAnswer).mockResolvedValue(true);

        vi.mocked(voteRepository.getVotesForAnswer).mockResolvedValue([]);
    });

    test('POST /polls/:pollId/answers/ works', async () => {
        // create answer correctly:
        let result = await request(app).post('/polls/1/answers/').send({ answerText: 'Yes' });
        console.log(result.body)
        expect(result.body).toEqual(exampleAnswer);
        expect(result.status).toBe(201);
        expect(result.headers.location).toBe('/polls/1/answers/2');
        // create answer without answerText:
        result = await request(app).post('/polls/1/answers').send({});
        expect(result.status).toBe(400);
        // create answer with empty answerText:
        result = await request(app).post('/polls/1/answers').send({ questionText: '   ' });
        expect(result.status).toBe(400);
    });

    test('GET /polls/:pollId/answers/ works', async () => {
        // get answer that exists:
        let result = await request(app).get('/polls/1/answers/').send();
        expect(result.body).toEqual([exampleAnswerWithVotes]);
        expect(result.status).toBe(200);
        // get answer that doesn't exist:
        vi.mocked(pollRepository.getPollById).mockResolvedValue(null);
        result = await request(app).get('/polls/1').send();
        expect(result.status).toBe(404);
    });

    test('GET /polls/:pollId/answers/:answerId works', async () => {
        // get answer that exists:
        let result = await request(app).get('/polls/1/answers/2').send();
        expect(result.body).toEqual(exampleAnswerWithVotes);
        expect(result.status).toBe(200);
        // get answer that doesn't exist:
        vi.mocked(pollRepository.getPollById).mockResolvedValue(null);
        result = await request(app).get('/polls/1').send();
        expect(result.status).toBe(404);
    });

    test('PATCH /polls/:pollId/:answerId works', async () => {
        // change answerText of answer that exists:
        let result = await request(app).patch('/polls/1/answers/2').send({ answerText: 'No' });
        expect(result.body).toEqual(examplePoll);
        expect(result.status).toBe(200);
        // change other user's answer or unknown answer:
        vi.mocked(answerRepository.updateAnswerText).mockResolvedValue(null);
        result = await request(app).patch('/polls/1/answers/2').send({ answerText: 'Maybe' });
        expect(result.status).toBe(404);
    });

    test('DELETE /polls/:pollId/answers/:answerId works', async () => {
        // delete answer:
        let result = await request(app).delete('/polls/1/answers/2').send();
        expect(result.status).toBe(204);
        // delete other user's or non-existent answer:
        vi.mocked(answerRepository.deleteAnswer).mockResolvedValue(false);
        result = await request(app).delete('/polls/1/answers/2').send();
        expect(result.status).toBe(404);
    });

})
