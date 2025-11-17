/*
  Warnings:

  - You are about to drop the column `userToken` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashedUserToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedUserToken` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_userToken_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userToken",
ADD COLUMN     "hashedUserToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_hashedUserToken_key" ON "users"("hashedUserToken");
