import * as pollService from '../../../services/pollService';
import * as voteService from '../../../services/voteService';
import type { Poll } from '../../../types/poll';


/**
 * Loads a poll by it's pollId, the ids of the answers the user voted for and the polls the user created.
 * 
 * @param param
 * @param { { pollId } }param.params - Id of the poll that should be retreived
 * @returns { { poll: Poll, votedAnswers: number[], createdPolls: number[] } }
 */
export async function loader ( { params }: { params: { pollId?: string } }): Promise<{ poll: Poll, votedAnswers: number[], createdPolls: number[] }> {
  // Load poll:
  const pollId: number = Number(params.pollId);
  const poll: Poll = await pollService.getPoll(pollId);
  console.log(poll)
  //Load votedAnswers:
  const votedAnswers = await voteService.getAllUsersVotes();
  //load createdPolls and extract ids:
  const createdPolls: Poll[] = await pollService.getUsersCreatedPolls();
  let createdPollIds: number[] = [];
  for (const poll of createdPolls) createdPollIds.push(poll.id);

  return { poll, votedAnswers, createdPolls: createdPollIds };
}