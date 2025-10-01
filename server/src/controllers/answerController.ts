import type { Request, Response, NextFunction } from 'express';
import * as HttpError from '../errors/httpError.js';
import * as answerRepository from './../repositories/answerRepository.js';
import * as voteRepository from './../repositories/voteRepository.js';
import type { Answer } from '../types/answer.js';
import * as answerService from '../services/answerService.js'

// POST /v1/polls/:pollId/answers -> create new answer
// GET /v1/polls/:pollId/answers -> get all answers with votes
// GET /v1/polls/:pollId/answers/:answerId -> get answer with votes
// PATCH /v1/polls/:pollId/answers/:answerId -> change answer text
// DELETE /v1/polls/:pollId/answers/:answerId -> delete answer

export const createNewAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // check if userId was assigned by the middleware:
  if (!req.userId)
    throw HttpError.serverError("middleware couldn't assign userId");
  // check if the client sent pollId and answerText:
  const pollId = Number(req.params.pollId);
  const answerText = req.body?.answerText;
  if (!Number.isInteger(pollId) || pollId <= 0) {
    throw HttpError.badRequest('pollId must be an integer');
  }
  if (typeof answerText !== 'string' || answerText.trim().length === 0) {
    throw HttpError.badRequest('answerText must be a string');
  }
  // create new answer:
  const newAnswer: answerRepository.Answer | null =
    await answerRepository.createAnswer(req.userId, pollId, answerText.trim());
  // validate if answer was created:
  if (!newAnswer) throw HttpError.serverError('failed to create answer');
  // get full answer object:
  const answerWithVotes: Answer|null = await answerService.getAnswerWithVotes(newAnswer.id);
  if (!answerWithVotes) throw HttpError.serverError('failed to retreive created answer');

  res
    .status(201)
    .location('/polls/' + pollId + '/answers/' + newAnswer.id)
    .json(answerWithVotes);
};

export const getAnswers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // check if the client sent pollId:
  const pollId = Number(req.params.pollId);
  if (!Number.isInteger(pollId) || pollId <= 0) {
    throw HttpError.badRequest('pollId must be an integer');
  }
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

export const getAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction,
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

export const changeAnswerText = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  // validate if updated answer was returned:
  if (!answer) throw HttpError.notFound('answer not found');
  // get full answer object:
  const answerWithVotes: Answer|null = await answerService.getAnswerWithVotes(answerId);
  if (!answerWithVotes) throw HttpError.notFound('answer not found');

  res.status(200).json(answerWithVotes);
};

export const deleteAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
