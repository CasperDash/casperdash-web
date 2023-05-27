import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEN from './public/locales/en/common.json';
import messageEN from './public/locales/en/message.json';

// the translations
const resources = {
  en: {
    common: commonEN,
    message: messageEN,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: ['common', 'message'], // add the namespaces you want to use
    resources,
    defaultNS: 'common',
    lng: 'en',
    fallbackLng: 'en', // use en if detected lng is not available

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
