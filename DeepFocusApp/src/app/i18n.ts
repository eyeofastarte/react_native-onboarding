import i18n, { type LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from '../locales/ar.json';
import de from '../locales/de.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import hi from '../locales/hi.json';
import ja from '../locales/ja.json';
import pt from '../locales/pt.json';
import ru from '../locales/ru.json';
import zh from '../locales/zh.json';

const SUPPORTED_LANGUAGE_CODES = ['en', 'zh', 'ja', 'es', 'de', 'fr', 'ar', 'pt', 'ru', 'hi'] as const;

function normalizeToSupportedLanguage(languageTag?: string | null) {
  const code = languageTag?.split(/[-_]/)[0]?.toLowerCase();
  return code && SUPPORTED_LANGUAGE_CODES.includes(code as (typeof SUPPORTED_LANGUAGE_CODES)[number])
    ? code
    : 'en';
}

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector' as const,
  async: true,
  detect: async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.language) {
        return normalizeToSupportedLanguage(navigator.language);
      }

      if (typeof window === 'undefined') {
        return 'en';
      }

      const RNLocalize = await import('react-native-localize');
      const locales = RNLocalize.getLocales();
      return normalizeToSupportedLanguage(locales[0]?.languageTag ?? locales[0]?.languageCode);
    } catch {
      return 'en';
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

if (!i18n.isInitialized) {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      fallbackLng: 'en',
      supportedLngs: [...SUPPORTED_LANGUAGE_CODES],
      nonExplicitSupportedLngs: true,
      resources: {
        en: { translation: { ...en, settings: 'Settings', language: 'Language' } },
        zh: { translation: zh },
        ja: { translation: ja },
        es: { translation: { ...es, settings: 'Ajustes', language: 'Idioma' } },
        de: { translation: de },
        fr: { translation: fr },
        ar: { translation: ar },
        pt: { translation: pt },
        ru: { translation: ru },
        hi: { translation: hi },
      },
      interpolation: { escapeValue: false },
    });
}

export default i18n;
