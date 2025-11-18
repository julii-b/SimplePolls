import type { Poll } from '../../types/poll';
import { useEffect, useRef, useState } from 'react';
import stylesHeader from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';


/**
 * Renders the part of the form to create/edit the question of a poll.

 * @param props
 * @param { Poll } [props.poll] - Optional: The existing poll to edit. 
 * @returns 
 */
const CreatePageHeader = ({poll}: {poll?: Poll|undefined}) => {
  const { t } = useTranslation();
  const [questionText, setQuestionText] = useState(poll? poll.questionText : '');

  // auomatically resize textarea to fit content:
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      const cs = getComputedStyle(textAreaRef.current);
      const borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
      textAreaRef.current.style.height = (textAreaRef.current.scrollHeight + borderY) + 'px';
    }
  }, [questionText]);

  return (
    <div className={stylesHeader.headerContainer}>

      <div
      className={`${stylesHeader.questionInputContainer}`}
      >
        <textarea
          ref={textAreaRef}
          name={poll ? 'existingQuestion-'+poll.id : 'newQuestion'} // 'existingQuestion-<id>' or 'newQuestion', so action function knows what to do
          placeholder={t('create.questionPlaceholder')}
          className={`inputField ${stylesHeader.questionInput}`}
          value={questionText}
          rows={1}
          onChange={(e)=>{
            if (e.target.value.length <= 1000) {
              setQuestionText(e.target.value);
            }
          }}
          aria-label={t('create.questionAriaLabel')}
        />
        <span className={stylesHeader.charCount}>
          {questionText.length} / 1000
        </span>
      </div>

      <button
        type='submit'
        className={`button ${stylesHeader.button} ${stylesHeader.saveButton}`}
        name='action' // action: save - can later be used to determine if form was submitted using save button
        value='save'
        title={t('create.saveButtonAriaLabel')} // for tooltip
        disabled={questionText.trim().length === 0} // disable button if question is empty
        aria-label={t('create.saveButtonAriaLabel')}
      ><FontAwesomeIcon icon={faFloppyDisk} /></button>

    </div>
  );
}
export default CreatePageHeader;