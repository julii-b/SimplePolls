import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

export async function healthCheck(): Promise<boolean> {
  try {
    await prismaClient.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    return false;
  }
}