import type { JSX } from "react";
import EditPoll from "./CreatePageForm"
import { useLoaderData } from "react-router-dom";
import type { Poll } from "../../types/poll";

/**
 * Renders the page to create a new poll
 * 
 * @returns 
 */
const CreateContainer = (): JSX.Element => {

  const loaderData = useLoaderData();
  let poll: Poll|undefined = loaderData.poll;

  return (
    <>
    { poll ?
      <EditPoll poll={poll} /> : // If loader retrieved poll, use it in EditPoll
      <EditPoll /> // Use EditPoll component without sending a poll to edit
    }
    </>
  );
};
export default CreateContainer;