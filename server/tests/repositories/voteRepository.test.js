import { beforeAll, afterAll, describe, test, expect, afterEach, beforeEach } from 'vitest';
import * as userRepository from '../../src/repositories/userRepository.ts';
import * as pollRepository from '../../src/repositories/pollRepository.ts';
import * as answerRepository from '../../src/repositories/answerRepository.ts';


describe('Answers Repository', () => {

    let user = {};
    let poll = {};

    beforeEach( async () => {
        user = await userRepository.createUser('testhash-answerRepository'); 
        poll = await pollRepository.createPoll(user.id, 'Is this true?');
    });
    afterEach( async () => {
        await userRepository.deleteUser(user.id);
    });

    test('createAnswer works', async () => {
        // create a new answer:
        const answer = await answerRepository.createAnswer(poll.id, "42");
        expect(answer.pollId).toBe(poll.id);
        expect(answer.answerText).toBe('42');
    });

    test('getAnswersForPoll', async () => {
        // get answers from poll without answers:
        await pollRepository.deletePoll(user.id);
        poll = pollRepository.createPoll(user.id, 'Am I stupid?');
        const answers0 = await answerRepository.getAnswersForPoll(poll.id);
        expect(answers0).toEqual([]);
        // get answers from poll with 1 answer:
        await pollRepository.deletePoll(user.id);
        poll = await pollRepository.createPoll(user.id, 'What is happening?');
        await answerRepository.createAnswer(poll.id, '41');
        const answers1 = await answerRepository.getAnswersForPoll(poll.id);
        expect(answers1.every(row => row.pollId === poll.id)).toBe(true);
        expect(answers1.length).toBe(1);
        // get answers from poll with 2 answers:
        await pollRepository.deletePoll(user.id);
        poll = await pollRepository.createPoll(user.id, 'What is happening?');
        await answerRepository.createAnswer(poll.id, '41');
        await answerRepository.createAnswer(poll.id, '42');
        const answers2 = await answerRepository.getAnswersForPoll(poll.id);
        expect(answers2.every(row => row.pollId === poll.id)).toBe(true);
        expect(answers2.length).toBe(2);
    });

    test('deleteAnswer works', async () => {
        // delete answer that exists:
        const answer1 = await answerRepository.createAnswer(poll.id, "No");
        const answer2 = await answerRepository.deleteAnswer(answer1.id);
        expect(answer2).toBe(true);
        const answers1 = await answerRepository.getAnswersForPoll(poll.id);
        expect(answers1.length).toBe(0);

        // delete answer that doesn't exist:
        const answer3 = await answerRepository.deleteAnswer(-1);
        expect(answer3).toBe(false);
    });
});