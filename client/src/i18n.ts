import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

// Configure internationalization (i18next):
i18n
  .use(HttpBackend) // Load translations from JSON files
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Bind with React
  .init({
    fallbackLng: "en", // Default language
    supportedLngs: ["en", "de", "fr"], // List of supported languages
    debug: true, // Enable debug mode
    backend: { loadPath: '/locales/{{lng}}.json' },
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18n;