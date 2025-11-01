import * as pollService from '../../../services/pollService';
import type { Poll } from '../../../types/poll';

/**
 * Loads all polls the user created and participated in.
 * 
 * @returns { Promise<{polls: Poll[]}> }
 */
export async function loader (): Promise<{polls: Poll[]}> {
  const polls: Poll[] = await pollService.getAllUsersPolls();

  return { polls: polls };
}