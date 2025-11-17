import dotenv from 'dotenv';

dotenv.config();

// Define types of .env variables:
interface Config {
  // Server config:
  port: number;
  nodeEnv: 'production' | 'development';
  sha256Secret: string;
  // PostgreSQL config:
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  dbQueryLimit: number;
}

// Define and export typed config object from .env variables:
const config: Config = {
  // Server config:
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development' ?
  process.env.NODE_ENV : 'development',
  sha256Secret: process.env.SHA256_SECRET || 'defaultsecret',
  // PostgreSQL config:
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbUser: process.env.DB_USER || 'myuser',
  dbPassword: process.env.DB_PASSWORD || 'mypassword123',
  dbName: process.env.DB_NAME || 'simplepolls',
  dbQueryLimit: Number(process.env.DB_QUERY_LIMIT) || 1000,
};
export default config;
