import type { Vote } from './vote.js';

export interface Answer {
  id: number;
  pollId: number;
  answerText: string;
  votes: Vote[]
}