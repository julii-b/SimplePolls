import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH ?? '.env.test' });

export default defineConfig({
  test: {
    environment: 'node',
    globals: true, // describe/it/expect... are globals
    include: ['tests/**/*.test.{ts,js}'],
    coverage: { provider: 'v8' },
    // setupFiles: ['tests/_setup.ts'], // potentially usefull in the future for loading init.sql
  },
});
