import type { JSX } from "react";
import EditPoll, {action as editPollAction} from "../../components/EditPoll/EditPollContainer"
import { useLoaderData } from "react-router-dom";
import type { Poll } from "../../types/poll";

export async function action ({request}: {request: Request}) {
  return editPollAction({request}); // Use action function from EditPoll
}

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