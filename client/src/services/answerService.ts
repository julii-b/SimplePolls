import type { Answer } from '../types/answer';
import * as backendApi from './backendApi';

/**
 * Call the API to create a new answer for a poll.
 * 
 * @param { string } pollId - Id of the poll to create the answer for
 * @param { string } answerText - Text of the new answer
 * @returns { Promise<Answer> } The newly created Answer object
 */
export async function createAnswer (pollId: string, answerText: string): Promise<Answer> {
  // create request body:
  const requestBody = {
    answerText: answerText,
  }
  // make request:
  const answer: Answer = await backendApi.post<Answer>(`/polls/${pollId}/answers`, requestBody);
  // return answerId of created Answer:
  return answer;
}

/**
 * Get an answer by it's id from the API.
 * 
 * @param { number } answerId - Id of the answer to get
 * @returns { Promise<Answer> }
 */
export async function getAnswer (answerId: number): Promise<Answer> {
  // make request:
  const answer: Answer = await backendApi.get<Answer>(`/answers/${answerId}`);
  return answer;
}

/**
 * Change the text of an answer through the API.
 * 
 * @param { number } answerId - Id of the answer to change
 * @param { string } answerText - New text of the answer
 * @returns { Promise<Answer> } The changed answer object
 */
export async function changeAnswerText (answerId: number, answerText: string): Promise<Answer> {
  // create request body:
  const requestBody = {
    answerText: answerText,
  }
  // make request:
  const answer: Answer = await backendApi.patch<Answer>(`/answers/${answerId}`, requestBody);
  return answer;
}

/**
 * Delete an answer through the API.
 * 
 * @param { string } answerId - Id of the answer to delete
 * @returns { Promise<void> }
 */
export async function deleteAnswer (answerId: number): Promise<void> {
  // make request:
  await backendApi.del<null>(`/answers/${answerId}`);
  return;
}