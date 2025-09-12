import { Router } from 'express';

const pollsRouter = Router({ mergeParams: true })

pollsRouter.get('/', () => { }); // get own user object (for user id) with all poll ids (created and voted) and vote ids

export default pollsRouter;