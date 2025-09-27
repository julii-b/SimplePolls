import { Router } from 'express';
import answersRouter from './answersRouter.js';
import * as pollController from '../controllers/pollController.js';

const pollsRouter = Router({ mergeParams: true });

pollsRouter.post('/', pollController.createNewPoll);
pollsRouter.get('/:pollId', pollController.getPoll);
pollsRouter.patch('/:pollId', pollController.changePollText);
pollsRouter.delete('/:pollId', pollController.deletePoll);

pollsRouter.use('/:pollId/answers', answersRouter);

export default pollsRouter;
