import { Router } from 'express';
import * as meController from '../controllers/meController.js';

const meRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /me:
 *   get:
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Arrays of polls created and participated in by the user. And array of anserIds voted for
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 createdPolls:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Poll'
 *                 participatedPolls:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Poll'
 *                 votedAnswers:
 *                   type: arry
 *                   items:
 *                     type: integer
 */
meRouter.get('/', meController.getUserInformation);

export default meRouter;
