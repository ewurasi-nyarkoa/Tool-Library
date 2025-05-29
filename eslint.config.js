import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettierConfig,
  {
    ignores: ["dist/**", "node_modules/**", "**/*.test.*", "**/__tests__/**"], // Ignore test files and folders
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        window: 'readonly',
      }
    },
    plugins: {
      '@typescript-eslint': plugin,
      'prettier': prettierPlugin,
    },
    rules: {
      'no-console': 'warn',
      'prettier/prettier': 'error',
    },
  },
];