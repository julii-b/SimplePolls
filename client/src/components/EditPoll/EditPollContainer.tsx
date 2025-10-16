import { Form, redirect } from 'react-router-dom';
import type { Poll } from '../../types/poll';
import { useState } from 'react';
import * as pollService from '../../services/pollService';
import * as answerService from '../../services/answerService';
import EditAnswers from './EditAnswers';


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
  let pollId: number|undefined;
  const newQuestionText: FormDataEntryValue|null = formData.get('newQuestion');
  if(newQuestionText && String(newQuestionText).length > 0){  // Create new poll if necessary and store pollId
    const newPoll: Poll = await pollService.createPoll(String(newQuestionText));
    pollId = newPoll.id;
    performedAction = 'pollCreated';
  } else if (newQuestionText && String(newQuestionText).length === 0) {
    throw new Error("The question text can't be empty.");
  } else { // Get pollId if poll already exists
    pollId = Number(formData.get('pollId')!);
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

  if (performedAction === 'pollCreated') return redirect(`/create/${pollId}`);
  else if (performedAction === 'pollChanged') return redirect(`/create/${pollId}`);
  //else if (performedAction === 'answerDeleted') return redirect(`/participate/${pollId}`);
}


/**
 * Renders the Form to create/change a poll:
 * - Renders the element needed to create/change the question of a poll.
 * - Calls the function to also render the elements needed for the poll's answers.
 * 
 * @param props
 * @param { Poll } [props.poll] - Optional: The existing poll to edit. 
 * @returns 
 */
const EditPoll = ({poll}: {poll?: Poll|undefined}) => {
  const [questionText, setQuestionText] = useState(poll? poll.questionText : '')

  return (
    <Form method='post' >
      {poll && ( // store pollId as hidden input if poll was passed
        <input 
          type='hidden'
          name='pollId'
          value={poll.id}
        />
      )}
      <input
        name={poll ? 'existingQuestion-'+poll.id : 'newQuestion'} // 'existingQuestion-<id>' or 'newQuestion', so action function knows what to do
        placeholder="Type you poll's question..."
        value={questionText}
        onChange={(e)=>{setQuestionText(e.target.value)}}
      /><br/>

      <EditAnswers answers={poll? poll.answers : []} />

      <button
        type='submit'
        name='action' // action: save - can later be used to determine if form was submitted using save button
        value='save'
      >Save</button>
    </Form>
  );
}
export default EditPoll;