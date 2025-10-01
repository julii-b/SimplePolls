import type { Vote } from './vote.js';

export interface Answer {
  id: number;
  answerText: string;
  votes: Vote[]
}