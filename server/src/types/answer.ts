import type { Vote } from './vote.js';

export interface Answer {
  id: number;
  pollId: string;
  answerText: string;
  votes: Vote[]
}