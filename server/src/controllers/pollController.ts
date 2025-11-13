import type { Request, Response, NextFunction } from 'express';
import * as HttpError from '../types/httpError.js';
import * as pollRepository from './../repositories/pollRepository.js';
import type { Poll } from '../types/poll.js';
import * as pollService from '../services/pollService.js';

/**
 * Creates a new poll
 * 
 * @param {Request} req
 * @param {number} req.userId - userId assigned by the middleware
 * @param {string} req.body.questionText - text of the question, sent by the client in the request body
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 201: Poll sucesfully created, returns Poll object
 * - 400: Bad request
 * - 500: Internal server error
 */
export const createNewPoll = async (
  req: Request,
  res: Response,
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
  if (!newPoll) throw HttpError.serverError('failed to create poll');
  // get full poll object:
  const pollWithAnswers: Poll|null = await pollService.getPollWithAnswers(newPoll.publicId)
  if (!pollWithAnswers) throw HttpError.serverError('failed to retreive created answer');

  res
    .status(201)
    .location('/polls/' + pollWithAnswers.id)
    .json(pollWithAnswers);
};

/**
 * Get a poll by public pollId
 * 
 * @param {Request} req
 * @param {string}req.params.pollId - public pollId of the poll to get, sent by the client as a parameter in the route
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 201: returns Poll object
 * - 400: Bad request
 * - 500: Internal server error
 */
export const getPoll = async (
  req: Request,
  res: Response,
) => {
  // parse and validate public pollId:
  const publicId = req.params.pollId;
  if (typeof publicId !== 'string' || publicId.trim().length === 0)
    throw HttpError.badRequest('pollId must be a string');
  // get poll:
  const poll: Poll|null = await pollService.getPollWithAnswers(publicId)
  if (!poll) throw HttpError.notFound('poll not found');

  res.json(poll);
};

/**
 * Change questionText of a poll
 * 
 * @param {Request} req
 * @param {number} req.userId - userId assigned by the middleware
 * @param {string} req.params.pollId - public pollId of the poll of which to change the questioText, sent by the client as a parameter in the route
 * @param {string} req.body.questionText - new text of the question, sent by the client in the request body
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 200: Poll sucesfully changed, returns Poll object
 * - 400: Bad request
 * - 500: Internal server error
 */
export const changePollText = async (
  req: Request,
  res: Response,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // parse and validate public pollId:
  const publicId = req.params.pollId;
  if (typeof publicId !== 'string' || publicId.trim().length === 0)
    throw HttpError.badRequest('pollId must be a string');
  // check if client sent questionText:
  const questionText = req.body?.questionText;
  if (typeof questionText !== 'string' || questionText.trim().length === 0) {
    throw HttpError.badRequest('questionText must be a string');
  }
  // update poll:
  const poll: pollRepository.Poll | null = await pollRepository.updatePollText(
    req.userId,
    publicId,
    questionText.trim(),
  );
  if (!poll) throw HttpError.notFound('poll not found');
  // get full poll object:
  const pollWithAnswers: Poll|null = await pollService.getPollWithAnswers(poll.publicId)
  if (!pollWithAnswers) throw HttpError.serverError('failed to retreive created answer');

  res.status(200).json(pollWithAnswers);
};

/**
 * Delete a poll
 * 
 * @param {Request} req
 * @param {number} req.userId - userId assigned by the middleware
 * @param {number}req.params.pollId - pollId of the poll to delete, sent by the client as a parameter in the route
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 204: Poll sucesfully deleted
 * - 400: Bad request
 * - 500: Internal server error
 */
export const deletePoll = async (
  req: Request,
  res: Response,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // parse and validate publicId:
  const publicId = req.params.pollId;
  if (typeof publicId !== 'string' || publicId.trim().length === 0)
    throw HttpError.badRequest('pollId must be a string');
  // delete poll:
  const result: boolean = await pollRepository.deletePoll(req.userId, publicId);

  if (!result) throw HttpError.notFound('poll not found');
  else res.status(204).end();
};
