import { Pool } from 'pg';
import config from '../config/config.js';

/**
 * Database connection pool using pg
 */
export const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
});

/**
 * Performs a database health check
 *
 * @returns {Promise<boolean>} true if database responds, false if not
 */
export async function healthCheck(): Promise<boolean> {
  const { rows } = await pool.query('SELECT 1 AS ok');
  const healthResult = rows[0].ok == 1 ? true : false;
  return healthResult;
}
