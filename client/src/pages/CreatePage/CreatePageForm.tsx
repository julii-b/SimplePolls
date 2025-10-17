import { Form } from 'react-router-dom';
import type { Poll } from '../../types/poll';
import { useState } from 'react';
import EditAnswers from './CreateAnswers';


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