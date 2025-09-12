import { Router } from 'express';
import answersRouter from './answersRouter.js'

const pollsRouter = Router({ mergeParams: true })

pollsRouter.post('/', () => { }); // create new poll
pollsRouter.get('/:pollId', () => {}); // get poll text
pollsRouter.patch('/:pollId', () => {}); // change poll text
pollsRouter.delete('/:pollId', () => {}); // delete poll

pollsRouter.use('/:pollId/answers', answersRouter);


export default pollsRouter;