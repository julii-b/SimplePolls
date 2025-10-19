import type { UserProfile } from "../types/userProfile";
import type { Vote } from "../types/vote";
import * as backendApi from './backendApi';

/**
 * Vote for an answer through the API.
 * 
 * @param { number } answerId - Id of the answer to vote for
 * @returns { Promise<void> }
 */
export async function vote (answerId: number): Promise<void> {
  await backendApi.post<Vote>(`/answers/${answerId}/votes`, {});
}

/**
 * Delete vote for an answer through the API.
 * 
 * @param answerId - Id of the answer to delete vote for
 * @returns { Promise<void> }
 */
export async function deleteVote (answerId: number): Promise<void> {
  await backendApi.del<null>(`/answers/${answerId}/votes`);
}

/**
 * Get all answer ids the user voted for from the API.
 * 
 * @returns { Promise<number[]> } Answer ids of the answers the user voted for
 */
export async function getAllUsersVotes (): Promise<number[]> {
  const userProfile: UserProfile = await backendApi.get<UserProfile>(`/me`);

  return userProfile.votedAnswers;
}