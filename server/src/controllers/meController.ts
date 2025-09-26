import type { Request, Response, NextFunction } from 'express';
import * as HttpError from '../errors/httpError.js';
import * as userRepository from './../repositories/userRepository.js';
import * as pollRepository from './../repositories/pollRepository.js';
import * as answerRepository from './../repositories/answerRepository.js';
import * as voteRepository from './../repositories/voteRepository.js';

interface UserProfile {
    createdPolls: number[];
    participatedPolls: number[];
}

// GET /me -> get own user object (for user id) with all poll ids (created and voted)

export const getUserInformation = async (req: Request, res: Response, next: NextFunction) => {
    // check if userId was assigned by the middleware:
    if (!req.userId) throw HttpError.serverError("middleware couldn't assign userId");
    // get poll ids for created polls:
    const createdPolls: pollRepository.Poll[] = await pollRepository.getPollsByOwner(req.userId);
    let createdPollsIds: number[] = [];
    for (let poll of createdPolls) createdPollsIds.push(poll.id);
    // get votes:
    const votes: voteRepository.Vote[] = await voteRepository.getVotesByUser(req.userId);
    // get poll ids for polls where votes were casted:
    let participatedPollsIds: number[] = [];
    for (let vote of votes) {
        const answer: answerRepository.Answer|null = await answerRepository.getAnswerById(vote.answerId);
        if (answer) participatedPollsIds.push(answer.pollId);
    }

    const userProfile: UserProfile = {
        createdPolls: createdPollsIds,
        participatedPolls: participatedPollsIds
    }

    res.json(userProfile);
};
