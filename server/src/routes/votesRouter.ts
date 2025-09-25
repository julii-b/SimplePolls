import { Router } from 'express';

const votesRouter = Router({ mergeParams: true })

votesRouter.post('/', () => { }); // vote
votesRouter.delete('/', () => {}); // delete vote


export default votesRouter;