import type { Request, Response, NextFunction } from 'express';
import * as HttpError from '../errors/httpError.js';
import * as pollRepository from './../repositories/pollRepository.js';
import type { Poll } from '../types/poll.js';
import * as pollService from '../services/pollService.js';

// POST /v1/polls -> create new poll
// GET /v1/polls/:pollId -> get poll text
// PATCH /v1/polls/:pollId -> change poll text
// DELETE /v1/polls/:pollId -> delete poll

export const createNewPoll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // check if the client sent a questionText:
  const questionText = req.body?.questionText;
  if (typeof questionText !== 'string' || questionText.trim().length === 0) {
    throw HttpError.badRequest('questionText must be a string');
  }
  // create new poll:
  const newPoll: pollRepository.Poll | null = await pollRepository.createPoll(
    req.userId,
    questionText.trim(),
  );
  // validate if poll was created:
  if (!newPoll) throw HttpError.serverError('failed to create poll');
  // get full poll object:
  const pollWithAnswers: Poll|null = await pollService.getPollWithAnswers(newPoll.id)
  if (!pollWithAnswers) throw HttpError.serverError('failed to retreive created answer');

  res
    .status(201)
    .location('/polls/' + newPoll.id)
    .json(pollWithAnswers);
};

export const getPoll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // parse ad validate pollId:
  const pollId = Number(req.params.pollId);
  if (!Number.isInteger(pollId) || pollId <= 0)
    throw HttpError.badRequest('pollId must be an integer');
  // get poll:
  const poll: Poll|null = await pollService.getPollWithAnswers(pollId)
  if (!poll) throw HttpError.notFound('poll not found');

  res.json(poll);
};

export const changePollText = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // parse ad validate pollId:
  const pollId = Number(req.params.pollId);
  if (!Number.isInteger(pollId) || pollId <= 0)
    throw HttpError.badRequest('pollId must be an integer');
  // check if client sent questionText:
  const questionText = req.body?.questionText;
  if (typeof questionText !== 'string' || questionText.trim().length === 0) {
    throw HttpError.badRequest('questionText must be a string');
  }
  // update poll:
  const poll: pollRepository.Poll | null = await pollRepository.updatePollText(
    req.userId,
    pollId,
    questionText.trim(),
  );
  // validate if updated poll was returned:
  if (!poll) throw HttpError.notFound('poll not found');
  // get full poll object:
  const pollWithAnswers: Poll|null = await pollService.getPollWithAnswers(poll.id)
  if (!pollWithAnswers) throw HttpError.serverError('failed to retreive created answer');

  res.status(200).json(pollWithAnswers);
};

export const deletePoll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // parse ad validate pollId:
  const pollId = Number(req.params.pollId);
  if (!Number.isInteger(pollId))
    throw HttpError.badRequest('pollId must be an integer');
  // delete poll:
  const result: boolean = await pollRepository.deletePoll(req.userId, pollId);

  if (!result) throw HttpError.notFound('poll not found');
  else res.status(204).end();
};
