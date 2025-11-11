import cron, { type ScheduledTask } from 'node-cron';
import { pool } from '../db/pool.js';
import * as pollRepository from '../repositories/pollRepository.js';
import * as userRepository from '../repositories/userRepository.js';

/**
 * Cleans up the database by:
 * 1. deleting all polls older than 30 days
 * 2. deleting all users whithout polls who are older than 30 days
 */
async function cleanupOnce(): Promise<void> {

  try {
    console.time('cleanup time'); // start timer

    // delete all polls older than 30 days:
    const deletedPolls = await pollRepository.deletePollsOlderThan(30);
    
    // delete all users oulder than 30 days AND without polls
    const deletedUsers = await userRepository.deleteUnusedUsersOlderThan(30)

    console.log(
      `deleted polls=${deletedPolls}, users=${deletedUsers}`
    );
    console.timeEnd('cleanup time'); //stop timer
  } catch (err) {
    console.error('db cleanup failed:', err);
  }
}

/**
 * Start a cron job to clean up the database once a day by deleting old polls and inactive users.
 */
export function startDbCleanupScheduler(): ScheduledTask {
  // Run cleanup once, when the scheduler is started:
  cleanupOnce();

  // Schedule cleanip to happen every day at 3:00:
  const task: ScheduledTask = cron.schedule('0 3 * * *', cleanupOnce, { timezone: 'Europe/Brussels' });

  console.log('cleanup scheduler started (every day at 3:00)');
  return task;
}

/**
 * Clean up the database once by deleting old polls and inactive users.
 */
export async function runDbCleanupNow(): Promise<void> {
  await cleanupOnce();
}
