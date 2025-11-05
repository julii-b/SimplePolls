// Define types of .env variables:
interface Config {
  apiUrl: string;
  clientUrl: string;
  appMode: 'production' | 'development';
}

// Define and export typed config object from .env variables:
export const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:513',
  clientUrl: import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173',
  appMode: import.meta.env.VITE_APP_MODE ?? 'development',
};
export default config;
