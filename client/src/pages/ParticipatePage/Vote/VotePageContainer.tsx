import { Link, useLoaderData } from "react-router-dom";
import type { Poll } from "../../../types/poll";
import type { JSX } from "react";
import VoteAnswers from "./VoteAnswers";
import styles from './votePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faPencil, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


/**
 * Renders the page to vote for a poll.
 * 
 * @returns { JSX.Element }
 */
const VotePageContainer = (): JSX.Element	 => {

  let { poll, votedAnswers, createdPolls }: {poll: Poll, votedAnswers: number[], createdPolls: number[]} = useLoaderData();

  return (
    <div className={styles.votePageContainer}>
      <div className={styles.headerContainer}>

        <Link
          to='/participate'
          className={`button ${styles.button}`}
        > <FontAwesomeIcon icon={faChevronLeft} /> </Link>

        <div className={styles.questionText}>
          {poll.questionText}<br />
        </div>

        <div className={styles.headerRightContainer}>
          <button
            className={`button ${styles.button}`}
          > <FontAwesomeIcon icon={faShare} /> </button>
          
          {createdPolls.includes(poll.id) && //Link to edit for owner of poll
            <Link
              to={'/create/'+poll.id}
              className={`button ${styles.button}`}
            > <FontAwesomeIcon icon={faPencil} /> </Link>
          }
        </div>
        
      </div>
      <div className={styles.pollId}>
        Poll ID: {poll.id} <br />
      </div>
      <VoteAnswers answers={poll.answers} votedAnswers={votedAnswers} />
    </div>
  );

};
export default VotePageContainer;