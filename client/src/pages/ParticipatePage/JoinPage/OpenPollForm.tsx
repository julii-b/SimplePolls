import { useState, type JSX } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import stylesOpenPollForm from './OpenPollForm.module.css';


/**
 * Renders an input field to input a poll id and a button to open the poll.
 * 
 * @returns { JSX.Element }
 */
const OpenPollForm = (): JSX.Element => {

  const [joinPollId, setJoinPollId] = useState<string>('');
  const navigate = useNavigate();
  
  return(
    <Form
      className={stylesOpenPollForm.openPollFormContainer}
      onSubmit={(e) => { // on submit navigate to the poll page
        e.preventDefault();
        navigate('/participate/'+joinPollId);
      }}
    >
      <input // input field for poll id
        type='number'
        value={joinPollId}
        min='1'
        placeholder="Type poll's ID"
        className={`inputField ${stylesOpenPollForm.pollIdInput}`}
        onChange={(e) => setJoinPollId(e.target.value)}
        aria-label='Input ID of the poll to open'
      />
      <button // button to open poll
        type='submit'
        disabled={joinPollId === ''}
        className={`button ${stylesOpenPollForm.joinButton}`}
      >Open</button>
    </Form>
  );
}
export default OpenPollForm;