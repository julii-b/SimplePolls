import { prismaClient } from '../db/prismaClient.js';

export interface Translation {
  key: string;
  en: string;
}

/**
 * Get all translations from the database
 * @returns Promise<Translation[]> - Array of all translations
 */
export async function getAllTranslations(): Promise<Translation[]> {
  const translations = await prismaClient.translations.findMany({
    select: {
      key: true,
      en: true,
    },
  });
  return translations;
}
