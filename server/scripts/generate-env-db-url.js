import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Generate DATABASE_URL and write it to the .env file

// build the URL:
const user = encodeURIComponent(process.env.DB_USER || '');
const password = encodeURIComponent(process.env.DB_PASSWORD || '');
const host = process.env.DB_HOST || '';
const port = process.env.DB_PORT || '';
const name = encodeURIComponent(process.env.DB_NAME || '');
const url = 'postgresql://' + user + ':' + password + '@' + host + ':' + port + '/' + name + '?schema=public';

// read .env file, update or add DATABASE_URL, write back:
let env = fs.readFileSync('.env', 'utf8');
env = env.replace(/(^|\n)DATABASE_URL=.*?(\n|$)/, '');
env += '\nDATABASE_URL=' + url + '\n';
fs.writeFileSync('.env', env.trimEnd() + '\n');
