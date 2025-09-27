import { Router } from 'express';
import * as meController from '../controllers/meController.js';

const meRouter = Router({ mergeParams: true });

meRouter.get('/', meController.getUserInformation); // get own user object (for user id) with all poll ids (created and voted)

export default meRouter;
