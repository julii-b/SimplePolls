import { pool } from '../db/pool.js';

export interface User {
  id: number;
  userToken: string;
  createdAt: string; // ISO from timestamptz
}

export async function createUser(userToken: string): Promise<User | null> {
  const { rows } = await pool.query<User>(
    `INSERT INTO users (user_token) VALUES ($1)
     ON CONFLICT (user_token) DO UPDATE SET user_token = EXCLUDED.user_token
     RETURNING id, user_token AS "userToken", created_at AS "createdAt"`,
    [userToken],
  );
  return rows[0] ?? null;
}

export async function getUserById(id: number): Promise<User | null> {
  const { rows } = await pool.query<User>(
    `SELECT id, user_token AS "userToken", created_at AS "createdAt"
     FROM users WHERE id = $1`,
    [id],
  );
  return rows[0] ?? null;
}

export async function getUserByUserToken(
  userToken: string,
): Promise<User | null> {
  const { rows } = await pool.query<User>(
    `SELECT id, user_token AS "userToken", created_at AS "createdAt"
     FROM users WHERE user_token = $1`,
    [userToken],
  );
  return rows[0] ?? null;
}

export async function deleteUser(id: number): Promise<boolean> {
  let { rowCount } = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  rowCount = rowCount ?? 0;
  return rowCount > 0;
}
