module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/warnings',
    'plugin:jest-dom/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react-hooks', 'jest-dom', 'no-only-tests', '@typescript-eslint'],
  rules: {
    'jsx-a11y/href-no-hash': [0],
    'jsx-a11y/heading-has-content': [0],
    'no-console': [1, { allow: ['warn', 'error'] }],
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'no-only-tests/no-only-tests': 'error',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
      },
    },
  ],
  globals: {
    chrome: 'readonly',
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
  },
  env: {
    jest: true,
  },
}
