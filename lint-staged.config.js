module.exports = {
  '**/*.{md,json}': ['prettier --write'],
  'src/**/*.{ts,tsx}': ['eslint --fix --cache'],
};
