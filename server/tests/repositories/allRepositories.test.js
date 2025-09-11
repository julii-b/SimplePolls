import { beforeAll, afterAll, describe, test, expect, afterEach, beforeEach } from 'vitest';
import { pool } from '../../src/db/pool.js';
import * as userRepository from '../../src/repositories/userRepository.ts';
import * as pollRepository from '../../src/repositories/pollRepository.ts';
import * as answerRepository from '../../src/repositories/answerRepository.ts';
import * as voteRepository from '../../src/repositories/voteRepository.ts';


describe('Users Repository', () => {

    test('createUser works', async () => {
        // create new user:
        const user = await userRepository.createUser('testhash-userRepository-createUser');
        expect(user.clientHash).toBe('testhash-userRepository-createUser');
        // create user with hash that already exists:
        const user2 = await userRepository.createUser('testhash-userRepository-createUser');
        expect(user).toEqual(user2);
        // delete user again:
        userRepository.deleteUser(user.id);
    });

    test('getUserById works', async () => async () => {
        // get user that exists:
        const user = await userRepository.createUser('testhash-userRepository-getUserById');
        const user2 = await userRepository.getUserById(user.id);
        expect(user2).toEqual(user);
        userRepository.deleteUser(user.id);
        // get user that doesn't exist:
        const user3 = await userRepository.getUserById(-1);
        expect(user3).toBe(null);
    });

    test('getUserByClientHash works', async () => {
        // get user that exists:
        const user = await userRepository.createUser('testhash-userRepository-getUserByclientHash');
        const user2 = await userRepository.getUserByClientHash(user.clientHash);
        expect(user2).toEqual(user);
        userRepository.deleteUser(user.id);
        // get user that doesn't exist:
        let user3 = await userRepository.getUserByClientHash('nonexistanthash');
        expect(user3).toBe(null)
    });

    test('deleteUser works', async () => {
        // delete user that exists:
        const user = await userRepository.createUser('testhash-userRepository-deleteUser');
        let success1 = await userRepository.deleteUser(user.id);
        expect(success1).toBe(true);
        // try to get deleted user:
        let user2 = await userRepository.getUserById(user.id);
        expect(user2).toBe(null);
        // delete user that doesn't exist:
        let success2 = await userRepository.deleteUser(-1);
        expect(success2).toBe(false);
    });
});


describe('Polls Repository', async () => {
    
    let user = {}

    beforeAll( async () => {
        user = await userRepository.createUser('testhash-pollRepository');
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
        user = await userRepository.createUser('testhash-pollRepository-getPollsByOwner-0');
        const polls0 = await pollRepository.getPollsByOwner(user.id);
        expect(polls0).toEqual([]);
        await userRepository.deleteUser(user.id);
        // get all polls from a user with 1 poll:
        user = await userRepository.createUser('testhash-pollRepository-getPollsByOwner-1');
        await pollRepository.createPoll(user.id, "What do I ask?");
        const polls1 = await pollRepository.getPollsByOwner(user.id);
        expect(polls1.every(row => row.ownerId === user.id)).toBe(true);
        expect(polls1.length).toBe(1);
        await userRepository.deleteUser(user.id);
        // get all polls from a user with 2 polls:
        user = await userRepository.createUser('testhash-pollRepository-getPollsByOwner-2');
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
        console.log(answer);
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
        console.log(answers1);
        expect(answers1.length).toBe(0);

        // delete answer that doesn't exist:
        const answer3 = await answerRepository.deleteAnswer(-1);
        expect(answer3).toBe(false);
    });
});

describe('Votes Repository', () => {

    let user1 = {};
    let user2 = {};
    let poll = {};
    let answer1 = {};
    let answer2 = {};

    beforeEach( async () => {
        user1 = await userRepository.createUser('testhash-voteRepository-1');
        user2 = await userRepository.createUser('testhash-voteRepository-2');
        poll = await pollRepository.createPoll(user1.id, 'How are you?');
        answer1 = await answerRepository.createAnswer(poll.id, 'good');
        answer2 = await answerRepository.createAnswer(poll.id, 'bad');
    });
    afterEach( async () => {
        await userRepository.deleteUser(user1.id);
        await userRepository.deleteUser(user2.id);
    });

    test('vote works', async () => {
        // vote once:
        const vote1 = await voteRepository.vote(user1.id, answer1.id);
        expect(vote1.userId).toBe(user1.id);
        expect(vote1.answerId).toBe(answer1.id);
        // cast the same vote again:
        const vote2 = await voteRepository.vote(user1.id, answer1.id);
        expect(vote2.userId).toBe(user1.id);
        expect(vote2.answerId).toBe(answer1.id);
        // vote as a user that doesn't exist:
        const vote3 =  voteRepository.vote(-1, answer1.id);
        await expect(vote3).rejects.toMatchObject({ code: '23503' }); // foreign key violation
        // vote for an answer that doesn't exist:
        const vote4 =  voteRepository.vote(user1.id, -1);
        await expect(vote4).rejects.toMatchObject({ code: '23503' }); // foreign key violation
    });

    test('getVotesByUser works', async () => {
        // get votes from user with 0 votes:
         const votes0 = await voteRepository.getVotesByUser(user1.id);
        expect(votes0).toEqual([]);
        // user with 1 vote:
        await voteRepository.vote(user1.id, answer1.id);
        const votes1 = await voteRepository.getVotesByUser(user1.id);
        expect(votes1.every(row => row.userId === user1.id)).toBe(true);
        expect(votes1.length).toBe(1);
        // user with 2 vote1:
        await voteRepository.vote(user1.id, answer2.id);
        const votes2 = await voteRepository.getVotesByUser(user1.id);
        expect(votes2.every(row => row.userId === user1.id)).toBe(true);
        expect(votes2.length).toBe(2);
        // get votes for a user that doesn't exist:
        const votes3 = await voteRepository.getVotesByUser(-1);
        expect(votes3).toEqual([]);
    });

    test('getVotesForAnswer works', async () => {
        // answer with 0 votes:
        const votes0 = await voteRepository.getVotesForAnswer(answer1.id);
        expect(votes0).toEqual([]);
        // answer with 1 vote:
        await voteRepository.vote(user1.id, answer1.id);
        const votes1 = await voteRepository.getVotesForAnswer(answer1.id);
        expect(votes1.every(row => row.answerId === answer1.id)).toBe(true);
        expect(votes1.length).toBe(1);
        // answer with 2 votes:
        await voteRepository.vote(user2.id, answer1.id);
        const votes2 = await voteRepository.getVotesForAnswer(answer1.id);
        expect(votes2.every(row => row.answerId === answer1.id)).toBe(true);
        expect(votes2.length).toBe(2);
        // answer that doesn't exist:
        const votes3 = await voteRepository.getVotesForAnswer(-1);
        expect(votes3).toEqual([]);
    })

    test('deleteVote works', async () => {
        // delete vote that exists:
        const vote1 = await voteRepository.vote(user1.id, answer1.id);
        const vote2 = await voteRepository.deleteVote(vote1.userId, vote1.answerId);
        expect(vote2).toBe(true);
        const votes1 = await voteRepository.getVotesByUser(user1.id);
        expect(votes1.length).toBe(0);
        expect()
        // delete vote that doesn't exist:
        const vote3 = await voteRepository.deleteVote(vote1.userId, vote1.answerId);
        expect(vote3).toBe(false);
    });
});
