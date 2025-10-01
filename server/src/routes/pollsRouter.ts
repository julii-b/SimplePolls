import { Router } from 'express';
import answersRouter from './answersRouter.js';
import * as pollController from '../controllers/pollController.js';

const pollsRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /polls/:
 *   post:
 *     summary: Create a new poll
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created poll
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 */
pollsRouter.post('/', pollController.createNewPoll);

/**
 * @openapi
 * /polls/{pollId}:
 *   get:
 *     summary: Get a poll
 *     parameters:
 *       - in: path
 *         name: pollId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The poll
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 *         content:
 *           application/json:
 *             schema:
 *               type: '#/components/schemas/Poll'
 */
pollsRouter.get('/:pollId', pollController.getPoll);

/**
 * @openapi
 * /polls/{pollId}:
 *   patch:
 *     summary: Change text of a poll
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pollId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The changed poll
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 *         content:
 *           application/json:
 *             schema:
 *               type: '#/components/schemas/Poll'
 */
pollsRouter.patch('/:pollId', pollController.changePollText);

/**
 * @openapi
 * /polls/{pollId}:
 *   delete:
 *     summary: Delete a poll
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pollId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: poll deleted
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 */
pollsRouter.delete('/:pollId', pollController.deletePoll);

pollsRouter.use('/:pollId/answers', answersRouter);

export default pollsRouter;
