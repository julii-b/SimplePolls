import type { Request, Response, NextFunction } from 'express';
import * as HttpError from '../errors/httpError.js';
import * as pollRepository from './../repositories/pollRepository.js';
import * as answerRepository from './../repositories/answerRepository.js';
import * as voteRepository from './../repositories/voteRepository.js';
import type { UserProfile } from '../types/userProfile.js';

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
  // get poll ids for created polls:
  const createdPolls: pollRepository.Poll[] =
    await pollRepository.getPollsByOwner(req.userId);
  const createdPollsIds: number[] = [];
  for (const poll of createdPolls) createdPollsIds.push(poll.id);
  // get votes:
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

  const userProfile: UserProfile = {
    createdPolls: createdPollsIds,
    participatedPolls: participatedPollsIds,
  };

  res.json(userProfile);
};
