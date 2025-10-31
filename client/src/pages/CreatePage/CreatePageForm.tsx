import { Form } from 'react-router-dom';
import type { Poll } from '../../types/poll';
import { useState } from 'react';
import InputsAnswers from './InputsAnswers/InputsAnswersContainer';
import styles from './CreatePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';


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
    <Form
      method='post'
      className={styles.votePageContainer}
    >
      {poll && ( // store pollId as hidden input if poll was passed
        <input 
          type='hidden'
          name='pollId'
          value={poll.id}
        />
      )}
      <div className={styles.headerContainer}>

        <textarea
          name={poll ? 'existingQuestion-'+poll.id : 'newQuestion'} // 'existingQuestion-<id>' or 'newQuestion', so action function knows what to do
          placeholder="Type your poll's question..."
          className={`inputField ${styles.questionInput}`}
          value={questionText}
          onChange={(e)=>{setQuestionText(e.target.value)}}
        />

        <button
          type='submit'
          className={`button ${styles.button} ${styles.saveButton}`}
          name='action' // action: save - can later be used to determine if form was submitted using save button
          value='save'
        ><FontAwesomeIcon icon={faFloppyDisk} /></button>

      </div>

      <InputsAnswers answers={poll? poll.answers : []} />

    </Form>
  );
}
export default EditPoll;