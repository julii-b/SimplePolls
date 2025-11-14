import type { JSX } from "react";
import type { Answer } from "../../../types/answer";
import { Form } from "react-router-dom";
import stylesAnswers from './Answers.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";


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
  const {t} = useTranslation();
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
      className={stylesAnswers.answerContainer}
      >
        <input // store answer id in form
        type='hidden'
        name='answerId'
        value={answer.id}
        aria-hidden='true'
        />

        {votedAnswers.includes(answer.id)
        ? (
          <button // button if user voted for the answer
          type='submit'
          name='action'
          className={`${stylesAnswers.checkBox} ${stylesAnswers.button} button`}
          value={'removeVote'}
          aria-label={t('participate.removeVoteAriaLabel', { index: answer.id })}
          title={t('participate.removeVoteTitle')} // tooltip
          >
            <FontAwesomeIcon className={stylesAnswers.checkMark} icon={faCheck} />
          </button>
        ) : (
          <button // Button if user didn't vote for the answer
          type='submit'
          name='action'
          className={`${stylesAnswers.checkBox} ${stylesAnswers.button} button`}
          value={'castVote'}
          aria-label={t('participate.castVoteAriaLabel', { index: answer.id })}
          title={t('participate.castVoteTitle')} // tooltip
          >
          </button>
        )}

        <div // answer text
        className={stylesAnswers.answerText}
        >
          {answer.answerText}
        </div>

        <div // answer result (percentage and progress bar)
        className={stylesAnswers.answerResult}
        >
          {answer.votes.length === 0 ? ' 0%' : (answer.votes.length/totalVotes*100).toFixed(0)+'%'}
          <div
          className={stylesAnswers.progressBarContainer}
          aria-hidden='true'
          >
            <div
            className={stylesAnswers.progressBar}
            style={{width: totalVotes === 0 ? '0%' : (answer.votes.length/totalVotes*100).toFixed(0)+'%'}}
            />
          </div>
        </div>
        
      </Form>
    );
    answersJSX.push(answerJSX);
  }

  return (
    <div className={stylesAnswers.answersContainer}>
      {answersJSX}
    </div>
  );
}
export default VoteAnswers;