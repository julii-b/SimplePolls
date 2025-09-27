import type { Request, Response, NextFunction } from 'express';
import * as HttpError from '../errors/httpError.js';
import * as voteRepository from './../repositories/voteRepository.js';

// POST /polls/:pollId/answers/:answerId/votes -> vote
// DELETE /polls/:pollId/answers/:answerId/votes -> delete vote

export const castVote = async (
    req: Request,
    res: Response,
    next: NextFunction,
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
    // validate if vote was casted:
    if (!newVote) throw HttpError.serverError('failed to cast vote');

    res.status(201).json(newVote);
};

export const deleteVote = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // check if userId was assigned by the middleware:
    if (!req.userId)
        throw HttpError.serverError("middleware couldn't assign userId");
    // parse and validate answerId:
    const answerId = Number(req.params.answerId);
    if (!Number.isInteger(answerId))
        throw HttpError.badRequest('answerId must be an integer');
    // delete vote:
    const result: boolean = await voteRepository.deleteVote(
        req.userId,
        answerId,
    );

    if (!result) throw HttpError.notFound('vote not found');
    else res.status(204).end();
};
