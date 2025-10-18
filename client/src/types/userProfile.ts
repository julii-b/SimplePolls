import type { Poll } from "./poll";

export interface UserProfile {
  createdPolls: Poll[];
  participatedPolls: Poll[];
}