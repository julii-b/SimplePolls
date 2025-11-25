import { useLoaderData } from "react-router-dom";
import type { Poll } from "../../../types/poll";
import OpenPollForm from './OpenPollForm';
import PollList from "./PollList";
import styles from './JoinPage.module.css';

/**
 * Renders the join-page with an input field to type a new poll id and a list of all created and participated polls.
 * Has to be used together with the exported loader function.
 * 
 * @returns { JSX.Element } The JoinPage component to be used as an outlet in the ParticipatePage component.
 */
const JoinPage = () => {
    
  const { polls }: { polls: Poll[]} = useLoaderData();

  return (
    <>
      <div className={styles.joinPageContainer}>
        <OpenPollForm />
        <PollList polls={polls} />
      </div>
    </>
  );
}

export default JoinPage;
export { loader } from "./loader";