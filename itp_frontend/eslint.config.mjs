// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
  ],
  rules: {
    // Adicione regras específicas ou desative-as aqui se necessário
    // Por exemplo, para ignorar variáveis não utilizadas durante o build:
    '@typescript-eslint/no-unused-vars': 'off',
  },
  languageOptions: {
    parserOptions: {
      project: true,
    },
  },
  ignores: [
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '**/*.js',
    '**/*.mjs'
  ],
});
