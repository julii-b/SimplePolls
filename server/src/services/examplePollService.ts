import * as pollRepository from '../repositories/pollRepository.js';
import * as answerRepository from '../repositories/answerRepository.js';

const examplePoll = {
  question: 'This is an example poll. Do you want to know more?',
  answers: [
    "Yes. This is an answer you can vote for. Cast your vote and see how the number on the right changes.",
    "No, but I want to share this poll with someone: Above you see this poll's ID.You can use this ID to join the poll on another device, or use the 'Share' button to share the poll.",
    "No, but I want to create my own poll: Go back to the home page and click on 'Create Poll' to create your own poll with custom questions and answers."
  ]
}


/**
 * Creates an example poll with predefined questions and answers.
 * @param {number} userId The ID of the user creating the poll.
 * @returns {Promise<void>}
 */
export async function createExamplePoll(userId: number): Promise<void> {
  const newPoll: pollRepository.Poll | null = await pollRepository.createPoll(
      userId,
      examplePoll.question
    );

  if (!newPoll) throw new Error('Failed to create poll');

  for (const answerText of examplePoll.answers) {
    const newAnswer: answerRepository.Answer | null = await answerRepository.createAnswer(
      userId,
      newPoll.publicId,
      answerText
    );
    if (!newAnswer) throw new Error('Failed to create answer');
  }

  return;
}