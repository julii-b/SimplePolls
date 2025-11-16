/*
  Warnings:

  - You are about to alter the column `answerText` on the `answers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `questionText` on the `polls` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "answerText" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "polls" ALTER COLUMN "questionText" SET DATA TYPE VARCHAR(1000);
