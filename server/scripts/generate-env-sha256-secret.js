import fs from 'fs';
import crypto from 'crypto';

// Generate SHA256_SECRET and write it to the .env file

// generate secret:
const secret = crypto.randomBytes(32).toString('hex');

// read .env file and add SHA256_SECRET if not present:
let env = fs.readFileSync('.env', 'utf8');
if (!env.includes('\nSHA256_SECRET=')) {
  env += 'SHA256_SECRET=' + secret + '\n';
  fs.writeFileSync('.env', env.trimEnd() + '\n');
}
