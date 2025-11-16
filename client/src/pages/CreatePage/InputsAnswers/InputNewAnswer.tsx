import { useEffect, useRef, useState, type JSX } from "react";
import stylesInpAnsws from './InputsAnswers.module.css';
import type { NewAnswer } from "./InputsAnswersContainer";
import { useTranslation } from "react-i18next";

/**
 * Renders the elements needed in a form to create a new Answer object.
 * 
 * @param props
 * @param { NewAnswer } props.answer - New answer which should be edited with this element
 * @returns {JSX.Element}
 */
const InputNewAnswer = ({answer}: {answer: NewAnswer}): JSX.Element => {
  const { t } = useTranslation();

  // States to store form input value:
  const [answerText, setAnswerText] = useState('');
  const [firstChange, setFirstChange] = useState(true); // is initially true, and false after the user typed in the input field
  
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
      <div className={`${stylesInpAnsws.answerInputContainer}`} >
        <textarea // Input field for new answer, creates another answer input on first change
          className={`inputField ${stylesInpAnsws.answerInput}`}
          ref={textAreaRef}
          name={'newAnswer-'+answer.newAnswerIndex} // 'newAnswer', so action function knows what to do
          placeholder={t('create.newAnswerPlaceholder')}
          value={answerText}
          rows={1}
          onChange={(e) => {
            if (firstChange) answer.onNewAnswer(); // If the current change is the first change, create new answer input field
            setFirstChange(false);
            if (e.target.value.length <= 1000) {
              setAnswerText(e.target.value)
            }
          }}
          aria-label={t('create.answerInputAriaLabel', { index: answer.newAnswerIndex })}
        />

        <span className={stylesInpAnsws.charCount}>
          {answerText.length} / 1000
        </span>
      </div>

    </div>

  );
}
export default InputNewAnswer;