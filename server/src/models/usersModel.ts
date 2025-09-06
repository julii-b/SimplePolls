import { pool } from '../db/pool.js';

export interface User {
  id: number;
  clientHash: string;
  createdAt: string; // ISO from timestamptz
}


export async function createUser(clientHash: string): Promise<User | null> {
  const { rows } = await pool.query<User>(
    `INSERT INTO users (client_hash) VALUES ($1)
     ON CONFLICT (client_hash) DO UPDATE SET client_hash = EXCLUDED.client_hash
     RETURNING id, client_hash AS "clientHash", created_at AS "createdAt"`,
    [clientHash]
  );
  return rows[0] ?? null;
}

export async function getUserById(id: number): Promise<User | null> {
  const { rows } = await pool.query<User>(
    `SELECT id, client_hash AS "clientHash", created_at AS "createdAt"
     FROM users WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function getUserByClientHash(clientHash: string): Promise<User | null> {
  const { rows } = await pool.query<User>(
    `SELECT id, client_hash AS "clientHash", created_at AS "createdAt"
     FROM users WHERE client_hash = $1`,
    [clientHash]
  );
  return rows[0] ?? null;
}