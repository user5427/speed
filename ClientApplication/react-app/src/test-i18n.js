import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialization of i18n with in-memory resources for testing
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          languages: {
            en: "English",
            lt: "Lithuanian",
            de: "German"
          },
        },
      },
      lt: {
        translation: {
          languages: {
            en: "Anglų",
            lt: "Lietuvių",
            de: "Vokiečių"
          },
        },
      },
      de: {
        translation: {
          languages: {
            en: "Englisch",
            lt: "Litauisch",
            de: "Deutsch"
          },
        },
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
