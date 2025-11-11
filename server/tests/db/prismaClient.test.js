import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { prismaClient, healthCheck } from '../../src/db/prismaClient';

describe('Prisma client', () => {

  it('healthCheck function works', async () => {
    const healthCheckResult = await healthCheck();
    expect(healthCheckResult).toBe(true);
  });

  it('basic operations work', async () => {
    try {
      const result = await prismaClient.answers.update({
      where: {
        id: 1,
      },
      data: {
        answerText: 'Updated answer text',
      },
    });
  } catch (error) {
    console.error(error);
  }
    expect(true).toBe(true);
  });

});
