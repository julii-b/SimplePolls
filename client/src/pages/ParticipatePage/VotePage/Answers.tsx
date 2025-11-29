import { useState, type JSX } from "react";
import type { Answer } from "../../../types/answer";
import stylesAnswers from './Answers.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import * as voteService from '../../../services/voteService';
import { useRevalidator } from "react-router-dom";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";


/**
 * Renders all answers in an array as forms to vote, or remove vote to answer.
 * Includes information about the amount of votes.
 * Votes and removes votes through voteService.
 * 
 * @param param
 * @param { Answers[] } param.answers - Array of all answers to render
 * @param { number[] } param.votedAnswers  - Array of the answerIds, the user voted for
 * @returns { JSX.Element }
 */
const VoteAnswers = ({answers, votedAnswers}: {answers: Answer[], votedAnswers: number[]}): JSX.Element => {
  const {t} = useTranslation();
  const revalidator = useRevalidator();
  const [isLoading, setIsLoading] =  useState<boolean>(false);
  
  // Count all votes to calculate percentages:
  let totalVotes: number = 0;
  for (const answer of answers) {
    totalVotes += answer.votes.length;
  }

  // Render one Form per answer. Is different if user already voted for answer:
  let answersJSX: JSX.Element[] = [];
  for (const answer of answers) {
    const answerJSX: JSX.Element = (
      <div
      key={'answer'+answer.id}
      className={stylesAnswers.answerContainer}
  >
        <input  // store poll id in form
          type='hidden'
          name='pollId'
          value={answer.pollId}
          aria-hidden="true"
        />
        <input // store answer id in form
        type='hidden'
        name='answerId'
        value={answer.id}
        aria-hidden='true'
        />

        <div className={stylesAnswers.checkBoxContainer}>
          {votedAnswers.includes(answer.id)
          ? (
            <button // button if user voted for the answer
            className={`${stylesAnswers.checkBox} ${stylesAnswers.button} button`}
            onClick={async () => {
              // Remove vote and revalidate loader data:
              setIsLoading(true);
              await voteService.deleteVote(answer.id);
              await revalidator.revalidate();
              setIsLoading(false);
            }}
            aria-label={t('participate.removeVoteAriaLabel', { index: answer.id })}
            title={t('participate.removeVoteTitle')} // tooltip
            >
              <FontAwesomeIcon className={stylesAnswers.checkMark} icon={faCheck} />
            </button>
          ) : (
            <button // Button if user didn't vote for the answer
            className={`${stylesAnswers.checkBox} ${stylesAnswers.button} button`}
            onClick={async () => {
              // Cast vote and revalidate loader data:
              setIsLoading(true);
              await voteService.vote(answer.id);
              await revalidator.revalidate();
              setIsLoading(false);
            }}
            aria-label={t('participate.castVoteAriaLabel', { index: answer.id })}
            title={t('participate.castVoteTitle')} // tooltip
            >
            </button>
          )}
        </div>

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
        
      </div>
    );
    answersJSX.push(answerJSX);
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className={stylesAnswers.answersContainer}>
        {answersJSX}
      </div>
    </>
  );
}
export default VoteAnswers;