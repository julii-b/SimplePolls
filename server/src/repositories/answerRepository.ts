import { pool } from '../db/pool.js';

export interface Answer {
  id: number;
  pollId: number;
  answerText: string;
  createdAt: string; // ISO from timestamptz
}


export async function createAnswer(pollId: number, answerText: string): Promise<Answer | null> {
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

export async function deleteAnswer(id: number): Promise<boolean> {
  let { rowCount } = await pool.query(
    `DELETE FROM answers WHERE id = $1`,
    [id]
  )
  rowCount = rowCount ?? 0
  return (rowCount > 0);
}
