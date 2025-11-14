import type { Request, Response } from 'express';
import * as translationService from '../services/translationService.js';

/**
 * Get all translations
 * 
 * @param {Request} req
 * @param {Response} res
 * 
 * @returns Sends:
 * - 200: Object with all translations in the format { key: value }
 * - 500: Internal server error
 */
export const getTranslations = async (
  req: Request,
  res: Response,
) => {
  const translations = await translationService.getAllTranslations();
  res.status(200).json(translations);
};
