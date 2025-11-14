import { Router } from 'express';
import * as translationController from '../controllers/translationController.js';

const translationsRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /translations:
 *   get:
 *     summary: Get all translations
 *     responses:
 *       200:
 *         description: Object with all translations as key-value pairs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: string
 *             example:
 *               "Create a new poll": "Create a new poll"
 *               "Participate in a poll": "Participate in a poll"
 *               "Go to home page": "Go to home page"
 */
translationsRouter.get('/', translationController.getTranslations);

export default translationsRouter;
