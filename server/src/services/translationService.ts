import * as translationRepository from '../repositories/translationRepository.js';

/**
 * Get all translations formatted as a key-value object
 * @returns Promise<Record<string, string>> - Object with translation keys and English values
 */
export async function getAllTranslations(): Promise<Record<string, string>> {
  const translations = await translationRepository.getAllTranslations();
  
  // Convert array to object with key as the property name
  const translationsObject: Record<string, string> = {};
  for (const translation of translations) {
    translationsObject[translation.key] = translation.en;
  }
  
  return translationsObject;
}
