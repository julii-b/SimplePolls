import { useLoaderData } from "react-router-dom";
import type { Poll } from "../../../types/poll";
import JoinNewInput from './JoinNewInput';
import PollList from "./PollList";
import styles from './JoinPage.module.css';

/**
 * Renders the join-page with an input field to type a new poll id and a list of all created and participated polls.
 * 
 * @returns { JSX.Element }
 */
const JoinPageContainer = () => {
    
  const { polls }: { polls: Poll[]} = useLoaderData();

  return (
    <>
      <div className={styles.joinPageContainer}>
        <JoinNewInput />
        <PollList polls={polls} />
      </div>
    </>
  );
}
export default JoinPageContainer;