import { get } from './backendApi';

/**
 * Fetch all translations from the backend API
 * 
 * @returns { Promise<Record<string, string>> } Object with translation keys and values
 */
export async function fetchTranslations(): Promise<Record<string, string>> {
  return get<Record<string, string>>('/translations');
}
