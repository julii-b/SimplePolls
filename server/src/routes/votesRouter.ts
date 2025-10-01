import { Router } from 'express';
import * as voteController from '../controllers/voteConroller.js';

const votesRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /answers/{answerId}/vote:
 *   post:
 *     summary: Cast vote for an answer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: answerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Vote casted
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 */
votesRouter.post('/', voteController.castVote); // vote

/**
 * @openapi
 * /answers/{answerId}/vote:
 *   delete:
 *     summary: Delete vote for an answer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: answerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Vote deleted
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 */
votesRouter.delete('/', voteController.deleteVote); // delete vote

export default votesRouter;
