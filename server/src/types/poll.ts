import type { Answer } from './answer.js';

export interface Poll {
  id: number;
  ownerId: number;
  questionText: string;
  answers: Answer[]
};