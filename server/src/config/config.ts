import dotenv from 'dotenv';

dotenv.config();

// Define types of .env variables:
interface Config {

    port: number;
    nodeEnv: string;

    // PostgreSQL:
    dbHost: string;
    dbPort: number;
    dbUser: string;
    dbPassword: string;
    dbName: string;
}

// Define default values of .env variables:
const config: Config = {
    port: Number(process.env.PORT)|| 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // PostgreSQL:
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: Number(process.env.DB_PORT) || 5432,
    dbUser: process.env.DB_USER || 'myuser',
    dbPassword: process.env.DB_PASSWORD || 'mypassword123',
    dbName: process.env.DB_NAME || 'simplepolls'
};

export default config;