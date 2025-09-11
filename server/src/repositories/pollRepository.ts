import { pool } from '../db/pool.js';

export interface Poll {
  id: number;
  ownerId: number;
  questionText: string;
  createdAt: string; // ISO from timestamptz
}


export async function createPoll(ownerId: number, questionText: string): Promise<Poll | null> {
  const { rows } = await pool.query<Poll>(
    `INSERT INTO polls (owner_id, question_text)
     VALUES ($1, $2)
     RETURNING id, owner_id AS "ownerId", question_text AS "questionText", created_at AS "createdAt"`,
    [ownerId, questionText]
  );
  return rows[0] ?? null;
}

export async function getPollById(id: number): Promise<Poll | null> {
  const { rows } = await pool.query<Poll>(
    `SELECT id, owner_id AS "ownerId", question_text AS "questionText", created_at AS "createdAt"
     FROM polls WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function getPollsByOwner(ownerId: number): Promise<Poll[]> {
  const { rows } = await pool.query<Poll>(
    `SELECT id, owner_id AS "ownerId", question_text AS "questionText", created_at AS "createdAt"
     FROM polls WHERE owner_id = $1 ORDER BY id DESC`,
    [ownerId]
  );
  return rows;
}

export async function deletePoll(id: number): Promise<boolean> {
  let { rowCount } = await pool.query(
    `DELETE FROM polls WHERE id = $1`,
    [id]
  )
  rowCount = rowCount ?? 0
  return (rowCount > 0);
}

/*
To be implemented in the future if needed:
changePollText(id, text)
*/