import * as voteService from '../../../services/voteService';

/**
 * Receives the request sent in VotePageContainer (VoteAnsers as it's child) and votes / deletes vote.
 * 
 * @param { { request: Request } } param - Request object
 * @returns 
 */
export async function action ({request}: {request: Request}): Promise<void|Response> {
  const formData = await request.formData();

  const action: string|undefined = formData.get('action')?.toString();
  const answerId: number|undefined = Number(formData.get('answerId'));

  if (action === 'castVote') {
    await voteService.vote(answerId);
  } else if (action === 'removeVote') {
    await voteService.deleteVote(answerId);
  }
  return;
}