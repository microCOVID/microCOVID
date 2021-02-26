import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import cs from './locales/cs.json'
import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import hu from './locales/hu.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      de: { translation: de },
      hu: { translation: hu },
      cs: { translation: cs },
      es: { translation: es },
    },
    fallbackLng: 'en',
    keySeparator: '.',
    nsSeparator: false,
    detection: {
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: true,
      transKeepBasicHtmlNodesFor: [
        'br',
        'strong',
        'i',
        'em',
        'p',
        'u',
        'li',
        'ul',
      ],
    },
    debug: false,
  })

export default i18n
