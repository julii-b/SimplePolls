import type { Request, Response, NextFunction } from 'express';
import * as HttpError from '../types/httpError.js';
import * as pollRepository from './../repositories/pollRepository.js';
import * as answerRepository from './../repositories/answerRepository.js';
import * as voteRepository from './../repositories/voteRepository.js';
import type { Answer } from '../types/answer.js';
import * as answerService from '../services/answerService.js'

/**
 * Creates a new answer for a poll
 * 
 * @param {Request} req
 * @param {number} req.userId - userId assigned by the middleware
 * @param {string} req.params.pollId - public pollId of the poll to create the answer for, sent by the client as a parameter in the route
 * @param {string} req.body.answerText - text of the answer, sent by the client in the request body
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 201: Answer sucesfully created, returns Answer object
 * - 400: Bad request
 * - 500: Internal server error
 */
export const createNewAnswer = async (
  req: Request,
  res: Response,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // check if the client sent pollId and answerText:
  const publicPollId = req.params.pollId;
  const answerText = req.body?.answerText;
  if (typeof publicPollId !== 'string' || publicPollId.trim().length === 0) {
    throw HttpError.badRequest('pollId must be a string');
  }
  if (typeof answerText !== 'string' || answerText.trim().length === 0) {
    throw HttpError.badRequest('answerText must be a string');
  }
  // get pollId from publicPollId:
  const pollId: number | null = await pollRepository.getPrivateID(publicPollId);
  if (!pollId) throw HttpError.notFound('poll not found');
  // create new answer:
  const newAnswer: answerRepository.Answer | null =
    await answerRepository.createAnswer(req.userId, pollId, answerText.trim());
  if (!newAnswer) throw HttpError.serverError('failed to create answer');
  // get full answer object:
  const answerWithVotes: Answer|null = await answerService.getAnswerWithVotes(newAnswer.id);
  if (!answerWithVotes) throw HttpError.serverError('failed to retreive created answer');

  res
    .status(201)
    .location('/polls/' + pollId + '/answers/' + newAnswer.id)
    .json(answerWithVotes);
};

/**
 * Get all answers for a poll by pollId
 * 
 * @param {Request} req
 * @param {string}req.params.pollId - pollId of the poll to get the answers of, sent by the client as a parameter in the route
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 201: returns Answer[] array
 * - 400: Bad request
 * - 500: Internal server error
 */
export const getAnswers = async (
  req: Request,
  res: Response,
) => {
  // check if the client sent pollId:
  const publicPollId = req.params.pollId;
  if (typeof publicPollId !== 'string' || publicPollId.trim().length === 0) {
    throw HttpError.badRequest('pollId must be a string');
  }
  // get pollId from publicPollId:
  const pollId: number | null = await pollRepository.getPrivateID(publicPollId);
  if (!pollId) throw HttpError.notFound('poll not found');
  // get answers:
  const answers: answerRepository.Answer[] =
    await answerRepository.getAnswersForPoll(pollId);
  // get votes for answers:
  const answersWithVotes: Answer[] = [];
  for (const answer of answers) {
    let answerWithVotes: Answer|null = await answerService.getAnswerWithVotes(answer.id);
    if (answerWithVotes) answersWithVotes.push(answerWithVotes);
  }

  res.json(answersWithVotes);
};

/**
 * Get an answer by answerId
 * 
 * @param {Request} req
 * @param {number}req.params.answerId - answerId of the answer to get, sent by the client as a parameter in the route
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 201: returns Answer object
 * - 400: Bad request
 * - 500: Internal server error
 */
export const getAnswer = async (
  req: Request,
  res: Response,
) => {
  // check if the client sent answerId:
  const answerId = Number(req.params.answerId);
  if (!Number.isInteger(answerId) || answerId <= 0) {
    throw HttpError.badRequest('answerId must be an integer');
  }
  // get answer:
  const answer: Answer|null = await answerService.getAnswerWithVotes(answerId);
  if (!answer) throw HttpError.notFound('answer not found');

  res.json(answer);
};

/**
 * Change answerText of an answer
 * 
 * @param {Request} req
 * @param {number} req.userId - userId assigned by the middleware
 * @param {number}req.params.answerId - answerId of the answer of which to change the answerText, sent by the client as a parameter in the route
 * @param {string} req.body.answerText - new text of the answer, sent by the client in the request body
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 200: Answer sucesfully changed, returns Answer object
 * - 400: Bad request
 * - 500: Internal server error
 */
export const changeAnswerText = async (
  req: Request,
  res: Response,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // check if the client sent answerId:
  const answerId = Number(req.params.answerId);
  if (!Number.isInteger(answerId) || answerId <= 0) {
    throw HttpError.badRequest('answerId must be an integer');
  }
  // check if client sent answerText:
  const answerText = req.body?.answerText;
  if (typeof answerText !== 'string' || answerText.trim().length === 0) {
    throw HttpError.badRequest('answerText must be a string');
  }
  // update answer:
  const answer: answerRepository.Answer | null =
    await answerRepository.updateAnswerText(
      req.userId,
      answerId,
      answerText.trim(),
    );
  if (!answer) throw HttpError.notFound('answer not found');
  // get full answer object:
  const answerWithVotes: Answer|null = await answerService.getAnswerWithVotes(answerId);
  if (!answerWithVotes) throw HttpError.notFound('answer not found');

  res.status(200).json(answerWithVotes);
};

/**
 * Delete an answer
 * 
 * @param {Request} req
 * @param {number} req.userId - userId assigned by the middleware
 * @param {number}req.params.answerId - answerId of the answer to delete, sent by the client as a parameter in the route
 * 
 * @param {Response} res
 * 
 * @returns Sends:
 * - 204: Answer sucesfully deleted
 * - 400: Bad request
 * - 500: Internal server error
 */
export const deleteAnswer = async (
  req: Request,
  res: Response,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // check if the client sent answerId:
  const answerId = Number(req.params.answerId);
  if (!Number.isInteger(answerId) || answerId <= 0) {
    throw HttpError.badRequest('answerId must be an integer');
  }
  // delete answer:
  const result: boolean = await answerRepository.deleteAnswer(
    req.userId,
    answerId,
  );

  if (!result) throw HttpError.notFound('answer not found');
  else res.status(204).end();
};
