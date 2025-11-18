import { useEffect, useState, type JSX } from 'react';
import { Form, useNavigate, useSearchParams } from 'react-router-dom';
import stylesOpenPollForm from './OpenPollForm.module.css';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';


/**
 * Renders an input field to input a poll id and a button to open the poll.
 * 
 * @returns { JSX.Element }
 */
const OpenPollForm = (): JSX.Element => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [joinPollId, setJoinPollId] = useState<string>('');

  useEffect(() => {
    if(searchParams.get('pollId')) {
      let prefilledPollId: string = String(searchParams.get('pollId'));
      prefilledPollId = prefilledPollId.toUpperCase(); // convert to uppercase
      prefilledPollId = prefilledPollId.replace(/[^A-Z0-9]/g, ''); // remove non-alphanumeric characters
      prefilledPollId = prefilledPollId.slice(0, 9); // limit to 9 characters
      if (prefilledPollId.length >= 3) prefilledPollId = `${prefilledPollId.slice(0,3)}-${prefilledPollId.slice(3)}`; // add first dash
      if (prefilledPollId.length >= 7) prefilledPollId = `${prefilledPollId.slice(0,7)}-${prefilledPollId.slice(7)}`; // add second dash
      setJoinPollId(prefilledPollId);
    }
  }, []);
  
  return(
    <div className={stylesOpenPollForm.HeaderContainer}>
      <Form
        className={stylesOpenPollForm.openPollFormContainer}
        onSubmit={(e) => { // on submit navigate to the poll page
          e.preventDefault();
          navigate('/participate/'+joinPollId.toLowerCase().trim().replace(/-/g,''));
        }}
      >
        <input // input field for poll id
          value={joinPollId}
          placeholder={t('participate.openPollInputPlaceholder')}
          className={`inputField ${stylesOpenPollForm.pollIdInput}`}
          onChange={(e) =>{
            let newValue: string = e.target.value;
            if (newValue.length > joinPollId.length) { // only format when new characters are added
              newValue = newValue.toUpperCase(); // convert to uppercase
              newValue = newValue.replace(/[^A-Z0-9]/g, ''); // remove non-alphanumeric characters
              newValue = newValue.slice(0, 9); // limit to 9 characters
              if (newValue.length >= 3) newValue = `${newValue.slice(0,3)}-${newValue.slice(3)}`; // add first dash
              if (newValue.length >= 7) newValue = `${newValue.slice(0,7)}-${newValue.slice(7)}`; // add second dash
            }
            setJoinPollId(newValue);
          }}
          aria-label={t('participate.openPollInputAriaLabel')}
        />
        <button // button to open poll
        type='submit'
        disabled={joinPollId === ''}
        className={`button ${stylesOpenPollForm.joinButton}`}
        >
          {t('participate.openPollText')}
        </button>
        
      </Form>
      <div className={stylesOpenPollForm.errorMessage}>
        {searchParams.get('error') === 'poll-retrieval' && (
          <><FontAwesomeIcon icon={faCircleExclamation} className={stylesOpenPollForm.errorMessageIcon}/>
          {t('participate.pollRetrievalErrorMessage')}</>
        )}
      </div>
    </div>
  );
}
export default OpenPollForm;