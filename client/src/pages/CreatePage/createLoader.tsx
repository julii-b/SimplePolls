import type { Poll } from "../../types/poll";
import * as pollService from "../../services/pollService";

export async function loader ( { params }: { params: { pollId?: string } }): Promise<{ poll: Poll|undefined }> {

  const pollId: string|undefined = params.pollId;

  let poll: Poll|undefined;
  
  if (pollId) {
    poll = await pollService.getPoll(Number(pollId))
  }

  return { poll: poll };
}