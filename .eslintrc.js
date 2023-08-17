// eslint-disable-next-line no-undef
module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: 'eslint:recommended',
    overrides: [
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      quotes: ['error', 'single'],
      'no-console': 'error',
    }
  };