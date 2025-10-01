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
 *         description: List of poll ids of polls created and participated in by the user.
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
 *                     type: integer
 *                 participatedPolls:
 *                   type: array
 *                   items:
 *                     type: integer
 */
meRouter.get('/', meController.getUserInformation);

export default meRouter;
