import { pool } from '../db/pool.js';
import { prismaClient } from '../db/prismaClient.js';
import config from '../config/config.js';
import * as pollRepository from './pollRepository.js';
import * as voteRepository from './voteRepository.js';
import { Prisma } from '@prisma/client';

export interface Answer {
  id: number;
  pollId: string;
  answerText: string;
  createdAt: string; // ISO from timestamptz
}

async function verifyAnswerOwnership(
  userId: number,
  answerId: number,
): Promise<boolean> {
  // check if user is owner of answers poll:
  const answer: Answer | null = await getAnswerById(answerId);
  if (!answer) return false;
  const poll: pollRepository.Poll | null = await pollRepository.getPollById(
    answer.pollId,
  );
  if (!poll || poll.ownerId !== userId) return false;
  return true;
}

export async function createAnswer(
  userId: number,
  publicPollId: string,
  answerText: string,
): Promise<Answer | null> {

  // check if user is poll owner:
  const poll: pollRepository.Poll | null =
    await pollRepository.getPollById(publicPollId);
  if (!poll || poll.ownerId != userId) return null;

  // create answer:
  const result: any | null = await prismaClient.answers.create({
    data: {
      pollId: publicPollId,
      answerText: answerText,
    },
  });

  if (!result) return null;

  // return created answer:
  const answer: Answer = {
    id: result.id,
    pollId: result.pollId,
    answerText: result.answerText,
    createdAt: result.createdAt.toISOString(),
  };
  return answer;
}

export async function getAnswersForPoll(publicPollId: string): Promise<Answer[]> {  

  // find answers for pollId:
  const results: any[] = await prismaClient.answers.findMany({
    where: {
      pollId: publicPollId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: config.dbQueryLimit,
  });

  // return answers:
  const answers: Answer[] = results.map((result) => ({
    id: result.id,
    pollId: result.pollId,
    answerText: result.answerText,
    createdAt: result.createdAt.toISOString(),
  }));
  return answers;
}

export async function getAnswerById(id: number): Promise<Answer | null> {

  // find answer by id:
  const result = await prismaClient.answers.findUnique({
    where: {
      id: id,
    },
  });

  if (!result) return null;

  // return answer:
  const answer: Answer = {
    id: result.id,
    pollId: result.pollId,
    answerText: result.answerText,
    createdAt: result.createdAt.toISOString(),
  };
  return answer;
}

export async function updateAnswerText(
  userId: number,
  answerId: number,
  answerText: string,
): Promise<Answer | null> {

  // verify ownership of answer:
  const userIsOwner: boolean = await verifyAnswerOwnership(userId, answerId);
  if (!userIsOwner) return null;
  
  try {
    // update answer text:
    const result = await prismaClient.answers.update({
      where: {
        id: answerId,
      },
      data: {
      answerText: answerText,
      },
    });

    // return updated answer:
    const answer: Answer = {
      id: result.id,
      pollId: result.pollId,
      answerText: result.answerText,
      createdAt: result.createdAt.toISOString(),
    };
    return answer;

  } catch (e) {
    // if answer to update not found, return null:
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') return null;
    else throw e;
  }

  
}

export async function deleteAnswer(
  userId: number,
  answerId: number,
): Promise<boolean> {

  // verify ownership of answer:
  const userIsOwner: boolean = await verifyAnswerOwnership(userId, answerId);
  if (!userIsOwner) return false;

  try {
    // delete answer:
    const result: any | null = await prismaClient.answers.delete({
      where: {
        id: answerId,
      },
    });
    return true;
  } catch (e) {
    // if answer to delete not found, return false:
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') return false;
    else throw e;
  }
}
