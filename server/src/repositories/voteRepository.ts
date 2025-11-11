import { Prisma } from '@prisma/client';
import { pool } from '../db/pool.js';
import { prismaClient } from '../db/prismaClient.js';

export interface Vote {
  userId: number;
  answerId: number;
  createdAt: string; // ISO from timestamptz
}

export async function vote(
  userId: number,
  answerId: number,
): Promise<Vote | null> {

  const result: any | null = await prismaClient.answers_given_by_users.upsert({
    where: {
      userId_answerId: {
        userId: userId,
        answerId: answerId,
      },
    },
    update: {},
    create: {
      userId: userId,
      answerId: answerId,
    },
  });

  if (!result) return null;

  // return created vote:
  const vote: Vote = {
    userId: result.userId,
    answerId: result.answerId,
    createdAt: result.createdAt.toISOString(),
  };
  return vote;
}

export async function getVotesByUser(userId: number): Promise<Vote[]> {

  // get votes by user:
  const result: any[] = await prismaClient.answers_given_by_users.findMany({
    where: { userId: userId },
  });

  // return votes:
  const votes: Vote[] = result.map((row) => ({
    userId: row.userId,
    answerId: row.answerId,
    createdAt: row.createdAt.toISOString(),
  }));
  return votes;
}

export async function getVotesForAnswer(answerId: number): Promise<Vote[]> {

  // find votes for answer:
  const result: any[] = await prismaClient.answers_given_by_users.findMany({
    where: { answerId: answerId },
  });

  // return votes:
  const votes: Vote[] = result.map((row) => ({
    userId: row.userId,
    answerId: row.answerId,
    createdAt: row.createdAt.toISOString(),
  }));
  return votes;
}

export async function deleteVote(
  userId: number,
  answerId: number,
): Promise<boolean> {

  try {
    // delete vote:
    const result: any | null = await prismaClient.answers_given_by_users.delete({
      where: {
        userId_answerId: {
          userId: userId,
          answerId: answerId,
        },
      },
    });
    return true;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') return false;
    else throw e;
  }
}
