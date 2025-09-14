import { beforeAll, afterAll, describe, test, expect, afterEach, beforeEach } from 'vitest';
import * as userRepository from '../../src/repositories/userRepository.ts';
import * as pollRepository from '../../src/repositories/pollRepository.ts';


describe('Polls Repository', async () => {
    
    let user = {}

    beforeAll( async () => {
        user = await userRepository.createUser('testtoke-pollRepository');
    });
    afterAll( async () => {
        await userRepository.deleteUser(user.id);
    });

    test('createPoll works', async () => {
        // create new poll:
        const poll1 = await pollRepository.createPoll(user.id, 'What do I ask?');
        expect(poll1.ownerId).toBe(user.id);
        expect(poll1.questionText).toBe('What do I ask?');
        // create new poll for nonexistant user:
        let poll2 = pollRepository.createPoll(-1, 'What do I ask?');
        await expect(poll2).rejects.toMatchObject({ code: '23503' }) // foreign key violation
    });

    test('getPollById works', async () => {
        // get poll that exists:
        const poll1 = await pollRepository.createPoll(user.id, 'Where is Waldo?');
        const poll2 = await pollRepository.getPollById(poll1.id);
        expect(poll2).toEqual(poll1);
        // get poll that doesn't exist:
        let poll3 = await pollRepository.getPollById(-1);
        expect(poll3).toBe(null);
    });

    test('getPollsByOwner works', async () => {
        await userRepository.deleteUser(user.id);
        // get all polls from a user wit 0 polls:
        user = await userRepository.createUser('testtoken-pollRepository-getPollsByOwner-0');
        const polls0 = await pollRepository.getPollsByOwner(user.id);
        expect(polls0).toEqual([]);
        await userRepository.deleteUser(user.id);
        // get all polls from a user with 1 poll:
        user = await userRepository.createUser('testtoken-pollRepository-getPollsByOwner-1');
        await pollRepository.createPoll(user.id, "What do I ask?");
        const polls1 = await pollRepository.getPollsByOwner(user.id);
        expect(polls1.every(row => row.ownerId === user.id)).toBe(true);
        expect(polls1.length).toBe(1);
        await userRepository.deleteUser(user.id);
        // get all polls from a user with 2 polls:
        user = await userRepository.createUser('testtoken-pollRepository-getPollsByOwner-2');
        await pollRepository.createPoll(user.id, "What do I ask?");
        await pollRepository.createPoll(user.id, "Who wants to know this?");
        const polls2 = await pollRepository.getPollsByOwner(user.id);
        expect(polls2.every(row => row.ownerId === user.id)).toBe(true);
        expect(polls2.length).toBe(2);
        // get all polls from a user that doesn't exist:
        const polls3 = await pollRepository.getPollsByOwner(-1);
        expect(polls3).toEqual([]);
    });

    test('deletePoll works', async () => {
        // create and delete poll:
        let poll1 = await pollRepository.createPoll(user.id, "Are ther no dumb questions?");
        await pollRepository.deletePoll(poll1.id);
        poll1 = await pollRepository.getPollById(poll1.id);
        expect(poll1).toBe(null);
    });
});