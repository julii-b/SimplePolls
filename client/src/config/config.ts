// Define types of .env variables:
interface Config {
  apiUrl: string;
  appMode: 'production' | 'development';
}

// Define and export typed config object from .env variables:
export const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:513',
  appMode: import.meta.env.VITE_APP_MODE ?? 'development',
};
export default config;
