import { useEffect, useRef, useState, type JSX } from "react";
import type { Answer } from "../../../types/answer";
import stylesInpAnsws from './InputsAnswers.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

/**
 * Renders the elements needed in a form to edit/delete an already existing Answer object.
 * 
 * @param props 
 * @param { Answer } props.answer - Answer which should be edited with this element
 * @returns {JSX.Element}
 */
const InputExistingAnswer = ({answer}: {answer: Answer}): JSX.Element => {
  const { t } = useTranslation();

  // State to store form input value:
  const [answerText, setAnswerText] = useState(answer.answerText);

  // auomatically resize textarea to fit content:
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      const cs = getComputedStyle(textAreaRef.current);
      const borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
      textAreaRef.current.style.height = (textAreaRef.current.scrollHeight + borderY) + 'px';
    }
  }, [answerText]);

  return (

    <div className={`${stylesInpAnsws.answerContainer}`} >
      <div className={stylesInpAnsws.answerInputContainer}>
        <textarea // Input field for answer text
        className={`inputField ${stylesInpAnsws.answerInput}`}
        ref={textAreaRef}
        name={'existingAnswer-'+answer.id} // 'existingAnswer-<id>', so action function knows what to do
        value={answerText}
        rows={1}
        onChange={(e) => {
          if (e.target.value.length <= 1000) {
            setAnswerText(e.target.value);
          }
        }}
        aria-label={t('create.answerInputAriaLabel', { index: answer.id })}
        />

        <span className={stylesInpAnsws.charCount}>
          {answerText.length} / 1000
        </span>
      </div>

      <button // delete button for this answer
      type='submit'
      className={`button ${stylesInpAnsws.deleteAnswerButton}`}
      name='action' // action: delete - can later be used to determine if form was submitted using delete button
      value={'delete-'+answer.id} // 'delete-<id>', so action function knows which answer to delete
      aria-label={t('create.answerDeleteAriaLabel', { index: answer.id })}
      title={t('create.answerDeleteTitle')} // for tooltip
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>

    </div>
  );
}
export default InputExistingAnswer;