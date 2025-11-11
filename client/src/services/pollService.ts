import type { Poll } from "../types/poll";
import type { UserProfile } from "../types/userProfile";
import * as backendApi from './backendApi';

/**
 * Call the API to create a new poll.
 * 
 * @param { string } questionText - Queston text of the poll to create
 * @returns { Promise<Poll> } The newly created Poll object
 */
export async function createPoll (questionText: string): Promise<Poll> {
  // create request body:
  const requestBody = {
    questionText: questionText,
  }
  // make request:
  const poll: Poll = await backendApi.post<Poll>(`/polls`, requestBody);
  // return answerId of created Answer:
  return poll;
}

/**
 * Change the text of a poll through the API.
 * 
 * @param { string } pollId - Id of the poll to change
 * @param { string } questionText - New text of the poll
 * @returns { Poll } the changed Poll object
 */
export async function changePollText (pollId: string, questionText: string): Promise<Poll> {
  // create request body:
  const requestBody = {
    questionText: questionText,
  }
  // make request:
  const poll: Poll = await backendApi.patch<Poll>(`/polls/${pollId}`, requestBody);
  return poll;
}

/**
 * Get a poll from the API
 * 
 * @param { string } pollId - Id of the poll to get
 * @returns { Poll } The retrieved Poll object
 */
export async function getPoll (pollId: string): Promise<Poll> {
  // make request:
  const poll: Poll = await backendApi.get<Poll>(`/polls/${pollId}`);
  return poll;
}

/**
 * Get all polls the user either created or participated in from the API.
 * 
 * @returns { Promise<Poll[]> } Array of all polls the user either created or participated in
 */
export async function getAllUsersPolls (): Promise<Poll[]> {
  // get userProfile, which includes all polls:
  const userProfile: UserProfile = await backendApi.get<UserProfile>(`/me`);
  // filter participated polls, to exclude created polls, so all polls are unique:
  let uniquePolls: Poll[] = userProfile.createdPolls; // all created polls are included
  for (const participatedPoll of userProfile.participatedPolls) { // all participated polls not yet included are included
    let isInUniquePollsArray: boolean = false;
    for (const uniquePoll of uniquePolls) { 
      if (uniquePoll.id === participatedPoll.id){
        isInUniquePollsArray = true;
        break;
      }
    }
    if (!isInUniquePollsArray) uniquePolls.push(participatedPoll);
  }

  return uniquePolls;
}

/**
 * Get all polls the user created from the API.
 * 
 * @returns { Promise<Poll[]> } Ar ray of all polls the user created
 */
export async function getUsersCreatedPolls (): Promise<Poll[]> {
  // get userProfile, which includes all created polls:
  const userProfile: UserProfile = await backendApi.get<UserProfile>(`/me`);

  return userProfile.createdPolls;
}