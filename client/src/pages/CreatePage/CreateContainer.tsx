import type { JSX } from "react";
import EditPoll, {action as editPollAction} from "../../components/EditPoll/EditPollContainer"

export async function action ({request}: {request: Request}) {
  return editPollAction({request}); // Use action function from EditPoll
}

/**
 * Renders the page to create a new poll
 * 
 * @returns 
 */
const CreateContainer = (): JSX.Element => {
  return (
    <EditPoll /> // Use EditPoll component without sending a poll to edit
  );
};
export default CreateContainer;