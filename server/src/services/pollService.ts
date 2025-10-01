import * as pollRepository from '../repositories/pollRepository.js';
import * as answerRepository from '../repositories/answerRepository.js';
import * as answerService from './answerService.js'
import type { Poll } from '../types/poll.js';
import type { Answer } from '../types/answer.js';

export async function getPollWithAnswers(pollId: number): Promise<Poll | null> {

  const dbPoll: pollRepository.Poll|null = await pollRepository.getPollById(pollId);
  if (!dbPoll) return null;

  const dbAnswers: answerRepository.Answer[] = await answerRepository.getAnswersForPoll(dbPoll.id);

  let answers: Answer[] = [];
  for (const dbAnswer of dbAnswers) {
    const answer: Answer|null = await answerService.getAnswerWithVotes(dbAnswer.id);
    if (answer) answers.push(answer);
  }

  let poll: Poll = {
    id: dbPoll.id,
    ownerId: dbPoll.ownerId,
    questionText: dbPoll.questionText,
    answers: answers
  }

  return poll;

}