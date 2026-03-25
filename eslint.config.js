import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const reactRecommended = react.configs.flat.recommended;
const jsxRuntime = react.configs.flat['jsx-runtime'];
const hooksRecommended = reactHooks.configs.flat.recommended;

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      ...reactRecommended.plugins,
      ...jsxRuntime.plugins,
      ...hooksRecommended.plugins,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactRecommended.rules,
      ...jsxRuntime.rules,
      ...hooksRecommended.rules,
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'react/prop-types': 'off',
    },
  },
  eslintConfigPrettier,
];
