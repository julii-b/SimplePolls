import { Router } from 'express';
import votesRouter from './votesRouter.js'

const pollsRouter = Router({ mergeParams: true })

pollsRouter.post('/', () => { }); // create new answer
pollsRouter.get('/', () => {}); // get all answers wit aggregated vote counts
pollsRouter.patch('/:answerId', () => {}); // change answer text
pollsRouter.delete('/:answerId', () => {}); // delete answer

pollsRouter.use('/:answerId/votes', votesRouter);


export default pollsRouter;