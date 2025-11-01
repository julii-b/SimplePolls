import type { JSX } from "react";
import EditPoll from "./CreatePageForm"
import { useLoaderData } from "react-router-dom";
import type { Poll } from "../../types/poll";
import style from './CreatePage.module.css';

/**
 * Renders the page to create a new poll
 * 
 * @returns 
 */
const CreatePage = (): JSX.Element => {

  const loaderData = useLoaderData();
  let poll: Poll|undefined = loaderData.poll;

  return (
    <div className={`cardsContainer`} >
      <div className={`contentCard ${style.createPageCard}`} >
        { poll ?
          <EditPoll poll={poll} /> : // If loader retrieved poll, use it in EditPoll
          <EditPoll /> // Use EditPoll component without sending a poll to edit
        }
      </div>
    </div>
  );
};

export default CreatePage;
export { loader } from "./loader";
export { action } from "./action";