import type { Poll } from "./poll.js";

export interface UserProfile {
  createdPolls: Poll[];
  participatedPolls: Poll[];
  votedAnswers: number[];
}