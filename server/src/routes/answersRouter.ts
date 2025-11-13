import { Router } from 'express';
import votesRouter from './votesRouter.js';
import * as answerController from '../controllers/answerController.js';

const answersRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /polls/{pollId}/answers:
 *   post:
 *     summary: Create a new answer for a poll
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pollId
 *         required: true
 *         schema:
 *           type: sting
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answerText:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created answer
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 */
answersRouter.post('/', answerController.createNewAnswer); // create new answer

/**
 * @openapi
 * /polls/{pollId}/answers:
 *   get:
 *     summary: Get all answers for a poll, including the votes for each answer
 *     parameters:
 *       - in: path
 *         name: pollId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of answers including their votes
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 */
answersRouter.get('/', answerController.getAnswers);

/**
 * @openapi
 * /answers/{answerId}:
 *   get:
 *     summary: Get answer, including votes for the answer
 *     parameters:
 *       - in: path
 *         name: answerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: answer including their votes
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 */
answersRouter.get('/:answerId', answerController.getAnswer);

/**
 * @openapi
 * /answers/{answerId}:
 *   patch:
 *     summary: Change text of an answer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: answerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: answer including their votes
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 */
answersRouter.patch('/:answerId', answerController.changeAnswerText);

/**
 * @openapi
 * /answers/{answerId}:
 *   delete:
 *     summary: Delete an answer
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
 *         description: answer deleted
 *         headers:
 *           X-New-Token:
 *             $ref: '#/components/headers/X-New-Token'
 */
answersRouter.delete('/:answerId', answerController.deleteAnswer);

answersRouter.use('/:answerId/votes', votesRouter);

export default answersRouter;
