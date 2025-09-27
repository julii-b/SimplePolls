import { Router } from 'express';
import * as voteController from '../controllers/voteConroller.js';

const votesRouter = Router({ mergeParams: true });

votesRouter.post('/', voteController.castVote); // vote
votesRouter.delete('/', voteController.deleteVote); // delete vote

export default votesRouter;
