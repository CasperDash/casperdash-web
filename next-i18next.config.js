module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de-AT', 'de-DE', 'de-CH'],
  },
  fallbackLng: {
    default: ['en'],
    'de-CH': ['fr'],
  },
  nonExplicitSupportedLngs: true,
  // de, fr and en will be loaded as fallback languages for de-CH
};
