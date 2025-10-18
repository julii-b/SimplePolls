import type { Request, Response, NextFunction } from 'express';
import * as HttpError from '../types/httpError.js';
import * as pollRepository from './../repositories/pollRepository.js';
import * as answerRepository from './../repositories/answerRepository.js';
import * as voteRepository from './../repositories/voteRepository.js';
import * as pollService from '../services/pollService.js';
import type { UserProfile } from '../types/userProfile.js';
import type { Poll } from '../types/poll.js';


/**
 * Gets the curent user's user profile
 * 
 * @param {Request} req
 * @param {number} req.userId - userId assigned by the middleware
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 201: returns UserProfile object
 * - 400: Bad request
 * - 500: Internal server error
 */
export const getUserInformation = async (
  req: Request,
  res: Response,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // get created polls from db:
  const createdPollsDb: pollRepository.Poll[] =
    await pollRepository.getPollsByOwner(req.userId);
  // get full created polls with answers from pollService:
  const createdPollsPromise: Promise<Poll|null>[] = [];
  for (const poll of createdPollsDb) createdPollsPromise.push(pollService.getPollWithAnswers(poll.id));
  // filter created polls for null values:
  const createdPolls: Poll[] = (await Promise.all(createdPollsPromise)).filter(poll=>poll!=null);
  
  // get votes from db:
  const votes: voteRepository.Vote[] = await voteRepository.getVotesByUser(
    req.userId,
  );
  // get poll ids for polls where votes were casted:
  const participatedPollsIds: number[] = [];
  for (const vote of votes) {
    const answer: answerRepository.Answer | null =
      await answerRepository.getAnswerById(vote.answerId);
    if (answer) participatedPollsIds.push(answer.pollId);
  }
  // get full participated polls with answers from pollService:
  const participatedPollsPromise: Promise<Poll|null>[] = [];
  for (const pollId of participatedPollsIds) participatedPollsPromise.push(pollService.getPollWithAnswers(pollId));
  // filter participated polls for null values:
  const participatedPolls: Poll[] = (await Promise.all(participatedPollsPromise)).filter(poll=>poll!=null);

  // get user's votes:
  const dbVotes: voteRepository.Vote[] = await voteRepository.getVotesByUser(req.userId);
  const voteIds: number[] = dbVotes.map((vote) => vote.answerId);


  const userProfile: UserProfile = {
    createdPolls: createdPolls,
    participatedPolls: participatedPolls,
    votedAnswers: voteIds,
  };

  res.json(userProfile);
};
