import { pool } from '../db/pool.js';
import * as pollRepository from './pollRepository.js';
import * as voteRepository from './voteRepository.js';

export interface Answer {
    id: number;
    pollId: number;
    answerText: string;
    createdAt: string; // ISO from timestamptz
}

export interface AnswerWithVotes extends Answer {
    votes: voteRepository.Vote[];
}

async function verifyAnswerOwnership(userId: number, answerId: number): Promise<boolean> {
    // check if user is owner of answers poll:
    const answer: Answer|null = await getAnswerById(answerId);
    if (!answer) return false;
    const poll: pollRepository.Poll|null = await pollRepository.getPollById(answer.pollId);
    if (!poll || poll.ownerId !== userId) return false;
    return true;
}


export async function createAnswer(userId: number, pollId: number, answerText: string): Promise<Answer | null> {
    // check if user is poll owner:
    const poll: pollRepository.Poll|null = await pollRepository.getPollById(pollId);
    if (!poll || poll.ownerId != userId) return null;

    const { rows } = await pool.query<Answer>(
        `INSERT INTO answers (poll_id, answer_text)
        VALUES ($1, $2)
        RETURNING id, poll_id AS "pollId", answer_text AS "answerText", created_at AS "createdAt"`,
        [pollId, answerText]
    );
    return rows[0] ?? null;
}

export async function getAnswersForPoll(pollId: number): Promise<Answer[]> {
    const { rows } = await pool.query<Answer>(
        `SELECT id, poll_id AS "pollId", answer_text AS "answerText", created_at AS "createdAt"
        FROM answers WHERE poll_id = $1 ORDER BY id ASC`,
        [pollId]
    );
    return rows;
}

export async function getAnswerById(id: number): Promise<Answer | null> {
    const { rows } = await pool.query<Answer>(
        `SELECT id, poll_id AS "pollId", answer_text AS "answerText", created_at AS "createdAt"
        FROM answers WHERE id = $1`,
        [id]
    );
    return rows[0] ?? null;
}

export async function updateAnswerText(userId: number, answerId: number, answerText: string): Promise<Answer | null> {
    const userIsOwner: boolean = await verifyAnswerOwnership(userId, answerId);
    if (!userIsOwner) return null;

    const { rows } = await pool.query<Answer>(
        `UPDATE polls
        SET answer_text = $2
        WHERE id = $1
        RETURNING id, poll_id AS "pollId", answer_text AS "answerText", created_at AS "createdAt"`,
        [answerId, answerText]
    );
    return rows[0] ?? null;
}

export async function deleteAnswer(userId: number, answerId: number): Promise<boolean> {
    const userIsOwner: boolean = await verifyAnswerOwnership(userId, answerId);
    if (!userIsOwner) return false;

    let { rowCount } = await pool.query(
        `DELETE FROM answers WHERE id = $1`,
        [answerId]
    )
    rowCount = rowCount ?? 0
    return (rowCount > 0);
}
