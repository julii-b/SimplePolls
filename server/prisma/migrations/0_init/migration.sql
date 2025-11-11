-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "poll_id" INTEGER NOT NULL,
    "answer_text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers_given_by_users" (
    "user_id" INTEGER NOT NULL,
    "answer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answers_given_by_users_pkey" PRIMARY KEY ("user_id","answer_id")
);

-- CreateTable
CREATE TABLE "polls" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "question_text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "polls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "user_token" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_answers_poll_id" ON "answers"("poll_id");

-- CreateIndex
CREATE INDEX "idx_answers_given_by_users_answer_id" ON "answers_given_by_users"("answer_id");

-- CreateIndex
CREATE INDEX "idx_polls_created_at" ON "polls"("created_at");

-- CreateIndex
CREATE INDEX "idx_polls_owner_id" ON "polls"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_token_key" ON "users"("user_token");

-- CreateIndex
CREATE INDEX "idx_users_created_at" ON "users"("created_at");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "polls"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answers_given_by_users" ADD CONSTRAINT "answers_given_by_users_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answers_given_by_users" ADD CONSTRAINT "answers_given_by_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "polls" ADD CONSTRAINT "polls_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

