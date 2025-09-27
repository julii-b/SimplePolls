import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { pool, healthCheck } from '../../src/db/pool';

describe('DB pool', () => {
    it('SELECT 1 works', async () => {
        const { rows } = await pool.query('SELECT 1 AS ok');
        expect(rows[0].ok).toBe(1);
    });

    it('healthCheck function works', async () => {
        const healthCheckResult = await healthCheck();
        expect(healthCheckResult).toBe(true);
    });
});
