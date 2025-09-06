import { Pool } from 'pg';
import config from '../config/config.js';

export const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
})


export async function healthCheck() {
  let {rows} = await pool.query('SELECT 1 AS ok');
  let healthResult = rows[0].ok == 1 ? true : false;
  return healthResult;
}
