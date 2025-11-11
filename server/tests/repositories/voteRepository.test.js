import {
  beforeAll,
  afterAll,
  describe,
  test,
  expect,
  afterEach,
  beforeEach,
} from 'vitest';
import * as userRepository from '../../src/repositories/userRepository.ts';
import * as pollRepository from '../../src/repositories/pollRepository.ts';
import * as answerRepository from '../../src/repositories/answerRepository.ts';
import * as voteRepository from '../../src/repositories/voteRepository.ts';

describe('Votes Repository', () => {
  let user1 = {};
  let user2 = {};
  let poll = {};
  let answer1 = {};
  let answer2 = {};

  beforeEach(async () => {
    user1 = await userRepository.createUser('testtoken-voteRepository-1');
    user2 = await userRepository.createUser('testtoken-voteRepository-2');
    poll = await pollRepository.createPoll(user1.id, 'How are you?');
    answer1 = await answerRepository.createAnswer(user1.id, poll.id, 'good');
    answer2 = await answerRepository.createAnswer(user1.id, poll.id, 'bad');
  });
  afterEach(async () => {
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
    const vote3 = voteRepository.vote(-1, answer1.id);
    await expect(vote3).rejects.toMatchObject({ code: 'P2003' }); // foreign key violation
    // vote for an answer that doesn't exist:
    const vote4 = voteRepository.vote(user1.id, -1);
    await expect(vote4).rejects.toMatchObject({ code: 'P2003' }); // foreign key violation
  });

  test('getVotesByUser works', async () => {
    // get votes from user with 0 votes:
    const votes0 = await voteRepository.getVotesByUser(user1.id);
    expect(votes0).toEqual([]);
    // user with 1 vote:
    await voteRepository.vote(user1.id, answer1.id);
    const votes1 = await voteRepository.getVotesByUser(user1.id);
    expect(votes1.every((row) => row.userId === user1.id)).toBe(true);
    expect(votes1.length).toBe(1);
    // user with 2 vote1:
    await voteRepository.vote(user1.id, answer2.id);
    const votes2 = await voteRepository.getVotesByUser(user1.id);
    expect(votes2.every((row) => row.userId === user1.id)).toBe(true);
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
    expect(votes1.every((row) => row.answerId === answer1.id)).toBe(true);
    expect(votes1.length).toBe(1);
    // answer with 2 votes:
    await voteRepository.vote(user2.id, answer1.id);
    const votes2 = await voteRepository.getVotesForAnswer(answer1.id);
    expect(votes2.every((row) => row.answerId === answer1.id)).toBe(true);
    expect(votes2.length).toBe(2);
    // answer that doesn't exist:
    const votes3 = await voteRepository.getVotesForAnswer(-1);
    expect(votes3).toEqual([]);
  });

  test('deleteVote works', async () => {
    // delete vote that exists:
    const vote1 = await voteRepository.vote(user1.id, answer1.id);
    const vote2 = await voteRepository.deleteVote(vote1.userId, vote1.answerId);
    expect(vote2).toBe(true);
    const votes1 = await voteRepository.getVotesByUser(user1.id);
    expect(votes1.length).toBe(0);
    expect();
    // delete vote that doesn't exist:
    const vote3 = await voteRepository.deleteVote(vote1.userId, vote1.answerId);
    expect(vote3).toBe(false);
  });
});
