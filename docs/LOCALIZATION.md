# Localization System

This document describes the localization (i18n) system implemented in SimplePolls.

## Overview

The localization system follows best practices for web applications:
1. **Centralized translations** stored in a database table
2. **API endpoint** to fetch all translations
3. **Global context** in the client for easy access to translations
4. **Translation function** that returns localized text or falls back to the key

## Architecture

### Database Layer

**Table: `translations`**
- `key` (TEXT, PRIMARY KEY) - The English label used as a key
- `en` (TEXT) - The English translation

To add support for additional languages, simply add more columns (e.g., `es`, `fr`, `de`).

**Migration:** `server/prisma/migrations/20251114143500_add_translations_table/migration.sql`

### Server-Side

**API Endpoint:**
```
GET /translations
```

Returns all translations as a JSON object:
```json
{
  "Create a new poll": "Create a new poll",
  "Participate in a poll": "Participate in a poll",
  "Go to home page": "Go to home page"
}
```

**Implementation Files:**
- `server/src/repositories/translationRepository.ts` - Database access
- `server/src/services/translationService.ts` - Business logic
- `server/src/controllers/translationController.ts` - Request handler
- `server/src/routes/translationsRouter.ts` - Route definition

**Tests:**
- `server/tests/routes/translationsRouter.test.js`

### Client-Side

The client loads all translations on app initialization and makes them available globally.

**Implementation Files:**
- `client/src/services/translationService.ts` - API call to fetch translations
- `client/src/contexts/TranslationContext.tsx` - React Context and hook

**Context Provider:**
The `TranslationProvider` wraps the entire app in `client/src/main.tsx`:

```tsx
import { TranslationProvider } from './contexts/TranslationContext.tsx';

<TranslationProvider>
  <RouterProvider router={router} />
</TranslationProvider>
```

## Usage

### In React Components

Import the `useTranslation` hook and use the `t()` function:

```tsx
import { useTranslation } from '../contexts/TranslationContext';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('Create a new poll')}</h1>
      <button>{t('Save poll')}</button>
    </div>
  );
};
```

### In JSX Attributes

The translation function works in any JSX context:

```tsx
<input
  placeholder={t("Type poll's ID")}
  aria-label={t('Input ID of the poll to open')}
/>

<button
  title={t('Share')}
  aria-label={t('Share poll')}
>
  <FontAwesomeIcon icon={faShare} />
</button>
```

### Interpolation

For dynamic content, use template literals:

```tsx
aria-label={`${t('Edit poll')} ${pollId}`}
```

### Loading State

The context provides an `isLoading` property:

```tsx
const { t, isLoading } = useTranslation();

if (isLoading) {
  return <LoadingSpinner />;
}
```

## Adding New Translations

### 1. Add to Database

Insert new translation keys into the `translations` table:

```sql
INSERT INTO "translations" ("key", "en") VALUES
('My new text', 'My new text');
```

### 2. Use in Components

Use the translation key in your React components:

```tsx
<div>{t('My new text')}</div>
```

The system will automatically return the translation from the database, or fall back to the key itself if not found.

## Adding New Languages

### 1. Update Database Schema

Add a new column for the language in `server/prisma/schema.prisma`:

```prisma
model translations {
  key String @id
  en  String
  es  String  // Spanish
  fr  String  // French
}
```

### 2. Create Migration

Generate a Prisma migration:

```bash
cd server
npx prisma migrate dev --name add_spanish_french_translations
```

### 3. Populate Translations

Insert translations for the new language:

```sql
UPDATE "translations" SET "es" = 'Crear una nueva encuesta' WHERE "key" = 'Create a new poll';
UPDATE "translations" SET "fr" = 'Créer un nouveau sondage' WHERE "key" = 'Create a new poll';
```

### 4. Update API Response

Modify `server/src/repositories/translationRepository.ts` to include the new language:

```typescript
export interface Translation {
  key: string;
  en: string;
  es: string;
  fr: string;
}
```

### 5. Add Language Selector (Optional)

Create a language selector component that switches between available translations:

```tsx
const { translations } = useTranslation();
const [language, setLanguage] = useState('en');

// Use translations[language] to get the appropriate translation
```

## Best Practices

1. **Use descriptive keys:** Use the English text as the key for clarity
2. **Consistency:** Use the same key for the same text across the app
3. **Context in dynamic content:** When combining translations with dynamic data, ensure the context is clear
4. **Test missing translations:** The system gracefully falls back to the key if a translation is missing
5. **Avoid hardcoded text:** All user-facing text should go through the translation system

## Error Handling

The translation system is designed to be resilient:

- If the API call fails, the app continues with an empty translations object
- If a translation key is not found, `t()` returns the key itself
- Console errors are logged for debugging, but the app remains functional

## Performance

- Translations are loaded once on app initialization
- All translations are stored in memory for fast access
- No additional API calls are made during normal app usage
- The translations object is shared across all components via React Context
