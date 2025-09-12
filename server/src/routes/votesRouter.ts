import { Router } from 'express';

const pollsRouter = Router({ mergeParams: true })

pollsRouter.post('/', () => { }); // vote
pollsRouter.delete('/', () => {}); // delete vote


export default pollsRouter;