import * as answerRepository from '../repositories/answerRepository.js';
import * as voteRepository from '../repositories/voteRepository.js';
import type { Answer } from '../types/answer.js';

export async function getAnswerWithVotes(answerId: number): Promise<Answer | null> {

  const dbAnswer: answerRepository.Answer|null = await answerRepository.getAnswerById(answerId);
  if (!dbAnswer) return null;

  const dbVotes: voteRepository.Vote[] = await voteRepository.getVotesForAnswer(dbAnswer.id);

  let answer: Answer = {
    id: dbAnswer.id,
    pollId: dbAnswer.pollId,
    answerText: dbAnswer.answerText,
    votes: dbVotes
  }

  return answer;

}