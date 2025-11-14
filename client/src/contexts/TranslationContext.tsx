import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { fetchTranslations } from '../services/translationService';

interface TranslationContextType {
  translations: Record<string, string>;
  t: (key: string) => string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

/**
 * Translation Provider component that loads translations from the API
 * and provides them to all child components
 */
export function TranslationProvider({ children }: TranslationProviderProps) {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load translations on mount
    const loadTranslations = async () => {
      try {
        const data = await fetchTranslations();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Set empty translations on error so app still works
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []);

  /**
   * Translation function that returns the translation for a given key
   * Falls back to the key itself if translation is not found
   */
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ translations, t, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * Hook to access translations in any component
 * 
 * @returns { TranslationContextType } Object with translations, t function, and loading state
 * @throws Error if used outside of TranslationProvider
 */
export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
