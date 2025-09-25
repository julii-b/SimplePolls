import { Router } from 'express';

const meRouter = Router({ mergeParams: true })

meRouter.get('/', () => { }); // get own user object (for user id) with all poll ids (created and voted) and vote ids

export default meRouter;