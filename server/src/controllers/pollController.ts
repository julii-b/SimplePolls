import type { Request, Response, NextFunction } from 'express';
import * as HttpError from '../errors/httpError.js';
import * as pollRepository from './../repositories/pollRepository.js';

// POST /v1/polls -> create new poll
// GET /v1/polls/:pollId -> get poll text
// PATCH /v1/polls/:pollId -> change poll text
// DELETE /v1/polls/:pollId -> delete poll

export const createNewPoll = async (req: Request, res: Response, next: NextFunction) => {
    // check if userId was assigned by the middleware:
    if (!req.userId) throw HttpError.serverError("middleware couldn't assign userId");
    // check if the client sent a pollText:
    const pollText = req.body?.pollText;
    if (typeof pollText !== 'string' || pollText.trim().length === 0) {
        throw HttpError.badRequest('pollText must be a string');
    }
    // create new poll:
    const newPoll: pollRepository.Poll|null = await pollRepository.createPoll(req.userId, pollText.trim());
    // validate if poll was created:
    if (!newPoll) throw HttpError.serverError('failed to create poll');

    res
        .status(201)
        .location('/v1/polls/'+newPoll.id)
        .json(newPoll);
};

export const getPoll = async (req: Request, res: Response, next: NextFunction) => {
    // parse ad validate pollId:
    const pollId = Number(req.params.pollId);
    if (!Number.isInteger(pollId)) throw HttpError.badRequest('pollId must be an integer');
    // get poll:
    const poll: pollRepository.Poll|null = await pollRepository.getPollById(pollId);
    // validate if poll was retreived:
    if (!poll) throw HttpError.notFound('poll not found');

    res.json(poll);
};

export const changePollText = async (req: Request, res: Response, next: NextFunction) => {
    // check if userId was assigned by the middleware:
    if (!req.userId) throw HttpError.serverError("middleware couldn't assign userId");
    // parse ad validate pollId:
    const pollId = Number(req.params.pollId);
    if (!Number.isInteger(pollId)) throw HttpError.badRequest('pollId must be an integer');
    // check if client sent pollText:
    const pollText = req.body?.pollText;
    if (typeof pollText !== 'string' || pollText.trim().length === 0) {
        throw HttpError.badRequest('pollId must be a number, pollText must be a string');
    }
    // update poll:
    const poll: pollRepository.Poll|null = await pollRepository.updatePollText(req.userId, pollId, pollText.trim());
    // validate if updated poll was returned:
    if (!poll) throw HttpError.notFound('poll not found');

    res.status(200).json(poll);
};

export const deletePoll = async (req: Request, res: Response, next: NextFunction) => {
    // check if userId was assigned by the middleware:
    if (!req.userId) throw HttpError.serverError("middleware couldn't assign userId");
    // parse ad validate pollId:
    const pollId = Number(req.params.pollId);
    if (!Number.isInteger(pollId)) throw HttpError.badRequest('pollId must be an integer');
    // delete poll:
    const result: boolean = await pollRepository.deletePoll(req.userId, pollId);

    if (!result) throw HttpError.notFound('poll not found');
    else res.status(204).end();
}