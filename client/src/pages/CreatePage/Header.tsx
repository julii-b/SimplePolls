import type { Poll } from '../../types/poll';
import { useState } from 'react';
import stylesHeader from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../../contexts/TranslationContext';


/**
 * Renders the part of the form to create/edit the question of a poll.

 * @param props
 * @param { Poll } [props.poll] - Optional: The existing poll to edit. 
 * @returns 
 */
const CreatePageHeader = ({poll}: {poll?: Poll|undefined}) => {
  const { t } = useTranslation();
  const [questionText, setQuestionText] = useState(poll? poll.questionText : '')

  return (
    <div className={stylesHeader.headerContainer}>

      <textarea
        name={poll ? 'existingQuestion-'+poll.id : 'newQuestion'} // 'existingQuestion-<id>' or 'newQuestion', so action function knows what to do
        placeholder={t("Type your poll's question...")}
        className={`inputField ${stylesHeader.questionInput}`}
        value={questionText}
        onChange={(e)=>{setQuestionText(e.target.value)}}
        aria-label={t('Poll question')}
      />

      <button
        type='submit'
        className={`button ${stylesHeader.button} ${stylesHeader.saveButton}`}
        name='action' // action: save - can later be used to determine if form was submitted using save button
        value='save'
        title={t('Save poll')} // for tooltip
        aria-label={t('Save poll')}
      ><FontAwesomeIcon icon={faFloppyDisk} /></button>

    </div>
  );
}
export default CreatePageHeader;