import { useLoaderData, useRevalidator } from "react-router-dom";
import type { Poll } from "../../../types/poll";
import { useEffect, type JSX } from "react";
import VotePageAnswers from "./Answers";
import VotePageHeader from "./Header";
import styles from './votePage.module.css';


/**
 * Renders the page to vote for a poll.
 * 
 * @returns { JSX.Element }
 */
const VotePage = (): JSX.Element	 => {

  let { poll, votedAnswers, createdPolls }: {poll: Poll, votedAnswers: number[], createdPolls: number[]} = useLoaderData();

  // Use revalidator to periodically refresh the loader data:
  const revalidator = useRevalidator();
  useEffect(() => {
    const interval = 10000; // 10 seconds
    const id = setInterval(() => {
      if (document.visibilityState === "visible") revalidator.revalidate();
    }, interval)

    return () => clearInterval(id);
  }, [revalidator]);

  return (
    <div className={styles.votePageContainer}>

      <VotePageHeader
        questionText={poll.questionText}
        userIsOwner={createdPolls.includes(poll.id)}
        pollId={poll.id}
      />

      <VotePageAnswers 
        answers={poll.answers}
        votedAnswers={votedAnswers}
      />

    </div>
  );

};


export default VotePage;
export { loader } from "./loader";
export { action } from "./action";