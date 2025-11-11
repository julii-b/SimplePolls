/*
  Warnings:

  - You are about to drop the column `answer_text` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `poll_id` on the `answers` table. All the data in the column will be lost.
  - The primary key for the `answers_given_by_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `answer_id` on the `answers_given_by_users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `answers_given_by_users` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `answers_given_by_users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `polls` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `polls` table. All the data in the column will be lost.
  - You are about to drop the column `question_text` on the `polls` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_token` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answerText` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pollId` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answerId` to the `answers_given_by_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `answers_given_by_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `polls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionText` to the `polls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userToken` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_poll_id_fkey";

-- DropForeignKey
ALTER TABLE "answers_given_by_users" DROP CONSTRAINT "answers_given_by_users_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "answers_given_by_users" DROP CONSTRAINT "answers_given_by_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "polls" DROP CONSTRAINT "polls_owner_id_fkey";

-- DropIndex
DROP INDEX "idx_answers_poll_id";

-- DropIndex
DROP INDEX "idx_answers_given_by_users_answer_id";

-- DropIndex
DROP INDEX "idx_polls_created_at";

-- DropIndex
DROP INDEX "idx_polls_owner_id";

-- DropIndex
DROP INDEX "idx_users_created_at";

-- DropIndex
DROP INDEX "users_user_token_key";

-- AlterTable
ALTER TABLE "answers" DROP COLUMN "answer_text",
DROP COLUMN "created_at",
DROP COLUMN "poll_id",
ADD COLUMN     "answerText" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "pollId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "answers_given_by_users" DROP CONSTRAINT "answers_given_by_users_pkey",
DROP COLUMN "answer_id",
DROP COLUMN "created_at",
DROP COLUMN "user_id",
ADD COLUMN     "answerId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "answers_given_by_users_pkey" PRIMARY KEY ("userId", "answerId");

-- AlterTable
ALTER TABLE "polls" DROP COLUMN "created_at",
DROP COLUMN "owner_id",
DROP COLUMN "question_text",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "questionText" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "user_token",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userToken" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "idx_answers_poll_id" ON "answers"("pollId");

-- CreateIndex
CREATE INDEX "idx_answers_given_by_users_answer_id" ON "answers_given_by_users"("answerId");

-- CreateIndex
CREATE INDEX "idx_polls_created_at" ON "polls"("createdAt");

-- CreateIndex
CREATE INDEX "idx_polls_owner_id" ON "polls"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "users_userToken_key" ON "users"("userToken");

-- CreateIndex
CREATE INDEX "idx_users_created_at" ON "users"("createdAt");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answers_given_by_users" ADD CONSTRAINT "answers_given_by_users_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answers_given_by_users" ADD CONSTRAINT "answers_given_by_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "polls" ADD CONSTRAINT "polls_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
