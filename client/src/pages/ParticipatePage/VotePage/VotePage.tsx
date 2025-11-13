import { useLoaderData, useRevalidator, useSearchParams } from "react-router-dom";
import type { Poll } from "../../../types/poll";
import { useEffect, useState, type JSX } from "react";
import VotePageAnswers from "./Answers";
import VotePageHeader from "./Header";
import styles from './votePage.module.css';
import ShareWindow from "./ShareWindow/ShareWindow";


/**
 * Renders the page to vote for a poll.
 * 
 * @returns { JSX.Element }
 */
const VotePage = (): JSX.Element	 => {

  let { poll, votedAnswers, createdPolls }: {poll: Poll, votedAnswers: number[], createdPolls: string[]} = useLoaderData();
  
  let [searchParams ] = useSearchParams();

  const [showShareWindow, setShowShareWindow] = useState<boolean>(() => searchParams.has('showShare'));

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
    <>
      {showShareWindow && ( // Show ShareWindow if showShareWindow is true
        <ShareWindow
        pollId={poll.id}
        toggleVisibility={() => {
          setShowShareWindow(false);
          // Remove ?showShare from URL:
          const url = new URL(window.location.href);
          url.searchParams.delete('showShare');
          window.history.replaceState(window.history.state, '', url);
        }}
      />
    )}
 
      <div
      className={styles.votePageContainer}
      aria-hidden={showShareWindow} //hide for screen readers if share window is open
      >

        <VotePageHeader
          questionText={poll.questionText}
          userIsOwner={createdPolls.includes(poll.id)}
          pollId={poll.id}
          showShareWindow={() => setShowShareWindow(true)}
        />

        <VotePageAnswers 
          answers={poll.answers}
          votedAnswers={votedAnswers}
        />

      </div>
    </>
  );

};


export default VotePage;
export { loader } from "./loader";
export { action } from "./action";