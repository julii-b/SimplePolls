import type { Request, Response, NextFunction } from 'express';
import * as HttpError from '../types/httpError.js';
import * as voteRepository from './../repositories/voteRepository.js';

/**
 * Cast vote for an answer
 * 
 * @param {Request} req
 * @param {number} req.userId - userId assigned by the middleware
 * @param {number} req.params.answerId - answerId of the answer to vote for, sent by the client as a parameter in the route
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 201: Vote succesfully casted, returns Vote object
 * - 400: Bad request
 * - 500: Internal server error
 */
export const castVote = async (
  req: Request,
  res: Response,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // parse and validate answerId:
  const answerId = Number(req.params.answerId);
  if (!Number.isInteger(answerId))
    throw HttpError.badRequest('answerId must be an integer');
  // cast vote:
  const newVote: voteRepository.Vote | null = await voteRepository.vote(
    req.userId,
    answerId,
  );
  if (!newVote) throw HttpError.serverError('failed to cast vote');

  res.status(201).json(newVote);
};

/**
 * Delete vote for an answer
 * 
 * @param {Request} req
 * @param {number} req.userId - userId assigned by the middleware
 * @param {number} req.params.answerId - answerId of the answer to delete the vote for, sent by the client as a parameter in the route
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 204: Vote sucesfully deleted
 * - 400: Bad request
 * - 500: Internal server error
 */
export const deleteVote = async (
  req: Request,
  res: Response,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // parse and validate answerId:
  const answerId = Number(req.params.answerId);
  if (!Number.isInteger(answerId))
    throw HttpError.badRequest('answerId must be an integer');
  // delete vote:
  const result: boolean = await voteRepository.deleteVote(req.userId, answerId);
  if (!result) throw HttpError.notFound('vote not found');

  else res.status(204).end();
};
