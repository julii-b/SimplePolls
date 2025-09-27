import type { Request, Response, NextFunction } from 'express';
import * as HttpError from '../errors/httpError.js';
import * as pollRepository from './../repositories/pollRepository.js';

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

    res.status(201)
        .location('/polls/' + newPoll.id)
        .json(newPoll);
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
    const poll: pollRepository.Poll | null =
        await pollRepository.getPollById(pollId);
    // validate if poll was retreived:
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
    const poll: pollRepository.Poll | null =
        await pollRepository.updatePollText(
            req.userId,
            pollId,
            questionText.trim(),
        );
    // validate if updated poll was returned:
    if (!poll) throw HttpError.notFound('poll not found');

    res.status(200).json(poll);
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
