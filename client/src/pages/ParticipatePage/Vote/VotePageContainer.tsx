import { Link, useLoaderData } from "react-router-dom";

import type { Poll } from "../../../types/poll";
import type { JSX } from "react";
import VoteAnswers from "./VoteAnswers";

/**
 * Renders the page to vote for a poll.
 * 
 * @returns { JSX.Element }
 */
const VotePageContainer = (): JSX.Element	 => {

  let { poll, votedAnswers, createdPolls }: {poll: Poll, votedAnswers: number[], createdPolls: number[]} = useLoaderData();

  return (
    <>
      {createdPolls.includes(poll.id) && <Link to={'/create/'+poll.id}>Edit</Link> }<br />
      poll id: {poll.id} <br />
      {poll.questionText}<br />
      <VoteAnswers answers={poll.answers} votedAnswers={votedAnswers} />
    </>
  );

};
export default VotePageContainer;