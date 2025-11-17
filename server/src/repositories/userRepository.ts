import { Prisma } from '@prisma/client';
import * as hashService from '../services/hashService.js';
import { prismaClient } from '../db/prismaClient.js';

export interface User {
  id: number;
  userToken: string;
  createdAt: string; // ISO from timestamptz
}

export async function createUser(userToken: string): Promise<User | null> {

  // create/update user:
  const result: any | null = await prismaClient.users.upsert({
    where: { hashedUserToken: hashService.sha256(userToken) },
    update: {},
    create: { hashedUserToken: hashService.sha256(userToken) },
  });

  if (!result) return null;
  
  // return user:
  const user: User = {
    id: result.id,
    userToken: userToken,
    createdAt: result.createdAt.toISOString(),
  };
  return user;
}

export async function getUserById(id: number): Promise<User | null> {

  // find user by id:
  const result: any | null = await prismaClient.users.findUnique({
    where: { id: id },
  });
  
  if (!result) return null;

  // return retrieved user:
  const user: User = {
    id: result.id,
    userToken: result.userToken,
    createdAt: result.createdAt.toISOString(),
  };
  return user;
}

export async function getUserByUserToken(
  userToken: string,
): Promise<User | null> {

  // find user by userToken:
  const result: any | null = await prismaClient.users.findUnique({
    where: { hashedUserToken: hashService.sha256(userToken) },
  });

  if (!result) return null;

  // return retrieved user:
  const user: User = {
    id: result.id,
    userToken: result.userToken,
    createdAt: result.createdAt.toISOString(),
  };
  return user;
}

export async function deleteUser(id: number): Promise<boolean> {

  try {
    // delete user by id:
    const result: any | null = await prismaClient.users.delete({
      where: { id: id },
    });
    return true;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') return false;
    else throw e;
  }
}


export async function deleteUnusedUsersOlderThan(days: number): Promise<number> {

   // delete users older than specified days:
   const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
   const result = await prismaClient.users.deleteMany({
     where: {
       createdAt: {
         lt: cutoff,
       },
       polls: {
        none: {}
      },
     },
   });
   return result.count;
}