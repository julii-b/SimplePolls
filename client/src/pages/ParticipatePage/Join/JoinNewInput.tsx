import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JoinPage.module.css';


/**
 * Renders an input field to input a poll id and a button to open the poll.
 * 
 * @returns { JSX.Element }
 */
const JoinNewInput = (): JSX.Element => {

  const [joinPollId, setJoinPollId] = useState<string>('');
  const navigate = useNavigate();
  
  return(
    <form
      className={styles.joinNewInputContainer}
      onSubmit={(e) => {
        e.preventDefault();
        navigate('/participate/'+joinPollId);
      }}
    >
      <input
        type='number'
        value={joinPollId}
        min='1'
        placeholder="Type poll's ID"
        className={`inputField ${styles.pollIdInput}`}
        onChange={(e) => setJoinPollId(e.target.value)}
      />
      <button
        type='submit'
        disabled={joinPollId === ''}
        className={`button ${styles.joinButton}`}
      >Open</button>
    </form>
  );
}
export default JoinNewInput;