import { useState, type JSX } from 'react';
import { Link } from 'react-router-dom';


/**
 * Renders an input field to input a poll id and a button to open the poll.
 * 
 * @returns { JSX.Element }
 */
const JoinNewInput = (): JSX.Element => {

  const [joinPollId, setJoinPollId] = useState<string>('');
  return(
    <>
      <input
        type='number'
        value={joinPollId}
        min='1'
        onChange={(e) => setJoinPollId(e.target.value)}
      />
      <Link to={'/participate/'+joinPollId} >Join</Link>
    </>
  );
}
export default JoinNewInput;