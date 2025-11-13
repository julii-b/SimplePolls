-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_pollId_fkey";

-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "pollId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "polls"("publicId") ON DELETE CASCADE ON UPDATE NO ACTION;
