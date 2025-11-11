import type { Answer } from './answer.js';

export interface Poll {
  id: string;
  ownerId: number;
  questionText: string;
  answers: Answer[]
};