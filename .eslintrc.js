module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:security/recommended',
  ],
  globals: {
    fetch: false,
  },
  parserOptions: {
    ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    node: true,
  },
  plugins: ['import', 'security'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        useTabs: false,
        printWidth: 80,
      },
    ],
    'no-implied-eval': 2,
    'import/prefer-default-export': 0,
    'prefer-destructuring': 0,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          ['internal', 'unknown'],
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'import/no-extraneous-dependencies': 0,
    'no-console': 0,
    quotes: ['error', 'single'],
    'function-paren-newline': 2,
    'consistent-return': 0,
    'no-case-declarations': 0,
    'no-extra-boolean-cast': 0,
    'no-async-promise-executor': 0,
    'max-classes-per-file': ['error', 2],
    'class-methods-use-this': 0,
    'security/detect-child-process': 0,
    'security/detect-object-injection': 0,
    'security/detect-non-literal-regexp': 0,
    'security/detect-non-literal-fs-filename': 0,
  },
};
