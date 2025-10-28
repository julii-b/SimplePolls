import type { JSX } from "react";
import type { Answer } from "../../../types/answer";
import { Form } from "react-router-dom";
import styles from './votePage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


/**
 * Renders all answers in an array as forms to vote, or remove vote to answer.
 * Includes information about the amount of votes
 * 
 * @param param
 * @param { Answers[] } param.answers - Array of all answers to render
 * @param { number[] } param.votedAnswers  - Array of the answerIds, the user voted for
 * @returns { JSX.Element }
 */
const VoteAnswers = ({answers, votedAnswers}: {answers: Answer[], votedAnswers: number[]}): JSX.Element => {

  // Count all votes to calculate percentages:
  let totalVotes: number = 0;
  for (const answer of answers) {
    totalVotes += answer.votes.length;
  }

  // Render one Form per answer. Is different if user already voted for answer:
  let answersJSX: JSX.Element[] = [];
  for (const answer of answers) {
    const answerJSX: JSX.Element = (
      <Form method='post'
        key={'answer'+answer.id}
        className={styles.answerContainer}
      >
        <input // store answer id in form
          type='hidden'
          name='answerId'
          value={answer.id}
        />
        {votedAnswers.includes(answer.id) ?
        (<button // button if user voted for the answer
          type='submit'
          name='action'
          className={`${styles.checkBox} ${styles.button} button`}
          value={'removeVote'}
        ><FontAwesomeIcon className={styles.checkMark} icon={faCheck} /></button>) :
        (<button // Button of user didn't vote for the answer
          type='submit'
          name='action'
          className={`${styles.checkBox} ${styles.button} button`}
          value={'castVote'}
        > </button>)}
        <div className={styles.answerText}>
          {answer.answerText}
        </div>
        <div className={styles.answerResult}>
          {answer.votes.length === 0 ? ' 0%' : (answer.votes.length/totalVotes*100).toFixed(0)+'%'}
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{width: totalVotes === 0 ? '0%' : (answer.votes.length/totalVotes*100).toFixed(0)+'%'}}
              />
          </div>
        </div>
      </Form>
    );
    answersJSX.push(answerJSX);
  }

  return (
    <div className={styles.answersContainer}>
      {answersJSX}
    </div>
  );
}
export default VoteAnswers;