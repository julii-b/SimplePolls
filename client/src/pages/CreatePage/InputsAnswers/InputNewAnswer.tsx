import { useState, type JSX } from "react";
import styles from '../CreatePage.module.css';
import type { NewAnswer } from "./InputsAnswersContainer";

/**
 * Renders the elements needed in a form to create a new Answer object.
 * 
 * @param props
 * @param { NewAnswer } props.answer - New answer which should be edited with this element
 * @returns {JSX.Element}
 */
const InputNewAnswer = ({answer}: {answer: NewAnswer}): JSX.Element => {

  // States to store form input value:
  const [answerText, setAnswerText] = useState('');
  const [firstChange, setFirstChange] = useState(true); // is initially true, and false after the user typed in the input field
  
  return (

    <div className={`${styles.answerContainer}`} >

      <textarea // Input field for new answer, creates another answer input on first change
        className={`inputField ${styles.answerInput}`}
        name={'newAnswer-'+answer.newAnswerIndex} // 'newAnswer', so action function knows what to do
        placeholder='Type to add a new answer...'
        value={answerText}
        onChange={(e) => {
          if (firstChange) answer.onNewAnswer(); // If the current change is the first change, create new answer input field
          setFirstChange(false);
          setAnswerText(e.target.value)
        }}
      />

    </div>

  );
}
export default InputNewAnswer;