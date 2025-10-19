import type { JSX } from "react";
import type { Answer } from "../../../types/answer";
import { Form } from "react-router-dom";


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
      <div key={'answer'+answer.id}>
        <Form method='post'>
          <input // store answer id in form
            type='hidden'
            name='answerId'
            value={answer.id}
          />
          {votedAnswers.includes(answer.id) ?
          (<button // button if user voted for the answer
            type='submit'
            name='action'
            value={'removeVote'}
          >☑</button>) :
          (<button // Button of user didn't vote for the answer
            type='submit'
            name='action'
            value={'castVote'}
          >☐</button>)}
          {answer.answerText}
          {answer.votes.length === 0 ? ' - 0%' : ' - '+(answer.votes.length/totalVotes*100)+'%'}
        </Form>
      </div>
    );
    answersJSX.push(answerJSX);
  }

  return <>{answersJSX}</>;
}
export default VoteAnswers;