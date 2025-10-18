import * as pollService from '../../../services/pollService';
import type { Poll } from '../../../types/poll';

export async function loader () {
  const polls: Poll[] = await pollService.getAllUsersPolls();

  return { polls: polls };
}