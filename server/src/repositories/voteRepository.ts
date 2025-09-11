import { pool } from '../db/pool.js';

export interface Vote {
  userId: number;
  answerId: number;
  createdAt: string; // ISO from timestamptz
}


export async function vote(userId: number, answerId: number): Promise<Vote | null> {
  const { rows } = await pool.query<Vote>(
    `INSERT INTO answers_given_by_users (user_id, answer_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, answer_id) DO NOTHING
     RETURNING user_id AS "userId", answer_id AS "answerId", created_at AS "createdAt"`,
    [userId, answerId]
  );
  // If DO NOTHING fired, no row is returned, so fetch existing entry:
  if (rows[0]) return rows[0];
  const existing = await pool.query<Vote>(
    `SELECT user_id AS "userId", answer_id AS "answerId", created_at AS "createdAt"
     FROM answers_given_by_users WHERE user_id = $1 AND answer_id = $2`,
    [userId, answerId]
  );
  return existing.rows[0] ?? null;
}

export async function getVotesByUser(userId: number): Promise<Vote[]> {
  const { rows } = await pool.query<Vote>(
    `SELECT user_id AS "userId", answer_id AS "answerId", created_at AS "createdAt"
     FROM answers_given_by_users WHERE user_id = $1`,
    [userId]
  );
  return rows;
}

export async function getVotesForAnswer(answerId: number): Promise<Vote[]> {
  const { rows } = await pool.query<Vote>(
    `SELECT user_id AS "userId", answer_id AS "answerId", created_at AS "createdAt"
     FROM answers_given_by_users WHERE answer_id = $1`,
    [answerId]
  );
  return rows;
}

export async function deleteVote(userId: number, answerId: number): Promise<boolean> {
  let { rowCount } = await pool.query(
    `DELETE FROM answers_given_by_users WHERE user_id = $1 AND answer_id = $2`,
    [userId, answerId]
  )
  rowCount = rowCount ?? 0
  return (rowCount > 0);
}