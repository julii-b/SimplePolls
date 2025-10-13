import type { Vote } from "../types/vote";
import * as backendApi from './backendApi';

/**
 * Vote for an answer through the API.
 * 
 * @param { number } answerId - Id of the answer to vote for
 * @returns { Promise<void> }
 */
export async function vote (answerId: number): Promise<void> {
  await backendApi.post<Vote>(`/answers/${answerId}/vote`, {});
}

/**
 * Delete vote for an answer through the API.
 * 
 * @param answerId - Id of the answer to delete vote for
 * @returns { Promise<void> }
 */
export async function deleteVote (answerId: number): Promise<void> {
  await backendApi.del<null>(`/answers/${answerId}/vote`);
}