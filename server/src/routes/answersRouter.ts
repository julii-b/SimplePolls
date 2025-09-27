import { Router } from 'express';
import votesRouter from './votesRouter.js';
import * as answerController from '../controllers/answerController.js';

const answersRouter = Router({ mergeParams: true });

answersRouter.post('/', answerController.createNewAnswer); // create new answer
answersRouter.get('/', answerController.getAnswers); // get all answers wit aggregated vote counts
answersRouter.get('/:answerId', answerController.getAnswer); // get answer with aggregated vote count
answersRouter.patch('/:answerId', answerController.changeAnswerText); // change answer text
answersRouter.delete('/:answerId', answerController.deleteAnswer); // delete answer

answersRouter.use('/:answerId/votes', votesRouter);

export default answersRouter;
