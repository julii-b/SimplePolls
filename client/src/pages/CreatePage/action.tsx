import { redirect } from 'react-router-dom';
import type { Poll } from '../../types/poll';
import * as pollService from '../../services/pollService';
import * as answerService from '../../services/answerService';


/**
 * Receives the request caused by submitting the Form rendered by EditPoll.
 * - Deletes answers, if delete button was pressed
 * - Creates new poll if no poll exists
 * - Updates question if poll exists
 * - Updates answers if poll exists
 * - Creates new answers if needed
 * 
 * @param { { request: Request } } param - Request object
 * @returns { Promise<void> }
 */
export async function action({request}: {request: Request}): Promise<void|Response> {

  const formData: FormData = await request.formData();

  // get value of key action (if it exists) - it is 'delete-<id>' or 'save':
  const action: string|undefined = formData.get('action')?.toString();
  // Array of all promises, to wait at the end:
  const promises: Promise<any>[] = []; 
  // tracks which action was performed to control redirect at the end:
  let performedAction: 'answerDeleted'|'pollCreated'|'pollChanged' = 'pollChanged';
  console.log(action);
  // Delete answer if action is 'delete-<id>':
  let deletedAnswerId: number|null = null;
  if(action?.includes('delete-')){
    const [_, answerId] = action.split('-');
    console.log(answerId);
    const newPromise = answerService.deleteAnswer(Number(answerId));
    promises.push(newPromise);
    deletedAnswerId = Number(answerId);
    performedAction = 'answerDeleted';
  }

  // Everything else is saved, regardless if request was caused by save or delete button:

  // Create new poll, or get existing pollId:
  let pollId: string|undefined;
  const newQuestionText: FormDataEntryValue|null = formData.get('newQuestion');
  if(newQuestionText && String(newQuestionText).length > 0){  // Create new poll if necessary and store pollId
    const newPoll: Poll = await pollService.createPoll(String(newQuestionText));
    pollId = newPoll.id;
    performedAction = 'pollCreated';
  } else if (newQuestionText && String(newQuestionText).length === 0) {
    throw new Error("The question text can't be empty.");
  } else { // Get pollId if poll already exists
    pollId = String(formData.get('pollId')!);
  }

  // Change question texts and answer texts, and create new answers:
  for (const [key, value] of formData.entries()) {
    if (key.includes('existingQuestion-')) { // Change text of existing question
      if (String(value).length > 0) {
        const newPromise = pollService.changePollText(pollId, String(value));
        promises.push(newPromise);
      } else {
        throw new Error("The question text can't be empty.");
      }
    } else if (key.includes('existingAnswer-')) { // Change text of existing answer
      if (String(value).length > 0) {
        const [_, answerId] = key.split('-');
        if (Number(answerId) != deletedAnswerId) {
          const newPromise = answerService.changeAnswerText(Number(answerId), String(value));
          promises.push(newPromise);
        }
      } else {
        throw new Error("The answer text can't be empty.");
      }
    } else if (key.includes('newAnswer-')) { // Create new answer if necessary
      if (String(value).length > 0) {
        const newPromise = answerService.createAnswer(pollId, String(value));
        promises.push(newPromise);
      }
    }
  }

  await Promise.all(promises);

  if (performedAction === 'pollCreated') return redirect(`/participate/${pollId}?showShare`);
  else if (performedAction === 'pollChanged') return redirect(`/participate/${pollId}`);
  else if (performedAction === 'answerDeleted') return redirect(`/create/${pollId}`);
}