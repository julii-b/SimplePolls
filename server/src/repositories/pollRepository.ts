import { Prisma } from '@prisma/client';
import config from '../config/config.js';
import { pool } from '../db/pool.js';
import { prismaClient } from '../db/prismaClient.js';

export interface Poll {
  id: number;
  ownerId: number;
  questionText: string;
  createdAt: string; // ISO from timestamptz
}

export async function createPoll(
  ownerId: number,
  questionText: string,
): Promise<Poll | null> {

  //create poll:
  const result: any | null = await prismaClient.polls.create({
    data: {
      ownerId: ownerId,
      questionText: questionText,
    },
  });

  if (!result) return null;
  
  // return created poll:
  const poll: Poll = {
    id: result.id,
    ownerId: result.ownerId,
    questionText: result.questionText,
    createdAt: result.createdAt.toISOString(),
  };
  return poll;
}

export async function getPollById(id: number): Promise<Poll | null> {

  // find poll by id:
  const result: any | null = await prismaClient.polls.findUnique({
    where: { id: id },
  });

  if (!result) return null;

  // return retrieved poll:
  const poll: Poll = {
    id: result.id,
    ownerId: result.ownerId,
    questionText: result.questionText,
    createdAt: result.createdAt.toISOString(),
  };
  return poll;
}

export async function getPollsByOwner(ownerId: number): Promise<Poll[]> {

  // find polls by ownerId:
  const results: any[] = await prismaClient.polls.findMany({
    where: { ownerId: ownerId },
    orderBy: { createdAt: 'desc' },
    take: config.dbQueryLimit,
  });

  // return retrieved polls:
  const polls: Poll[] = results.map((result) => ({
    id: result.id,
    ownerId: result.ownerId,
    questionText: result.questionText,
    createdAt: result.createdAt.toISOString(),
  }));
  return polls;
}

export async function updatePollText(
  userId: number,
  pollId: number,
  questionText: string,
): Promise<Poll | null> {

  try {
    // update poll text:
    const result: any = await prismaClient.polls.update({
      where: { id: pollId, ownerId: userId },
      data: { questionText: questionText },
    });
    const poll: Poll = {
      id: result.id,
      ownerId: result.ownerId,
      questionText: result.questionText,
      createdAt: result.createdAt.toISOString(),
    };
    return poll;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') return null;
    else throw e;
  }
}

export async function deletePoll(
  userId: number,
  pollId: number,
): Promise<boolean> {

  try {
    // delete poll:
    await prismaClient.polls.deleteMany({
      where: {
        id: pollId,
        ownerId: userId,
      },
    });
    return true;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') return false;
    else throw e;
  }
}

export async function deletePollsOlderThan(days: number): Promise<number> {
  // delete polls older than specified days:
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const result = await prismaClient.polls.deleteMany({
    where: {
      createdAt: {
        lt: cutoff,
      },
    },
  });
  return result.count;
}
