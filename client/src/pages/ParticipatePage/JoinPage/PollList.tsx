import type { JSX } from "react";
import type { Poll } from "../../../types/poll";
import { Link } from "react-router-dom";
import styles from './JoinPage.module.css';

/**
 * Renders an array of polls with links to the polls.
 * 
 * @param param
 * @param  { Poll[] } param.polls - Array of polls to render
 * @returns { JSX.Element }
 */
const PollList = ({polls}: {polls: Poll[]}): JSX.Element => {

  let pollsJSX: JSX.Element[] = [];

  for (let poll of polls) { // create array with one link per poll
    const pollJSX = (
      <Link
        className={`button ${styles.pollListButton}`}
        key={poll.id}
        to={'/participate/'+poll.id}
      ><span>
        {poll.questionText}
      </span></Link>
    );
    pollsJSX.push(pollJSX);
  }

  return (
    <div className={styles.pollListContainer}>
     {pollsJSX}
    </div>
  );
}
export default PollList;