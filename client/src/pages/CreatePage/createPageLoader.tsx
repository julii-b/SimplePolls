import type { Poll } from "../../types/poll";
import * as pollService from "../../services/pollService";

/**
 * Loader function for Create Page. Optionally loads the poll by the pollId in the route
 * 
 * @param param
 * @param { { [pollId] } } param.params - Parameters from the route
 * @returns { { poll } }
 */
async function loader ( { params }: { params: { pollId?: string } }): Promise<{ poll: Poll|undefined }> {

  const pollId: string|undefined = params.pollId;

  let poll: Poll|undefined;
  
  if (pollId) {
    poll = await pollService.getPoll(Number(pollId))
  }

  return { poll: poll };
}
export default loader;