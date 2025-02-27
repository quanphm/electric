// @ts-expect-error no types
import js from '@eslint/js'
// @ts-expect-error no types
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'

import eslintTsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

import pluginReact from "@eslint-react/eslint-plugin";
// @ts-expect-error no types
import pluginReactCompiler from "eslint-plugin-react-compiler";
// @ts-expect-error no types
import pluginReactHooks from "eslint-plugin-react-hooks";

const compat = new FlatCompat()

export default [
  js.configs.recommended,
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    languageOptions: {
      parser: eslintTsParser,
      globals: {
        ...globals.browser,
      },
    },
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended?.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn', // or "error"
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-inferrable-types': 'off', // always allow explicit typings
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': 'allow-with-description' },
      ],
      'no-constant-condition': ['error', { checkLoops: false }],
      eqeqeq: ['error'],
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ...pluginReact.configs.recommended,
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "react-compiler": pluginReactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
    },
  },
  {
    files: ["**/test/**"],
    rules: {
      "@typescript-eslint/no-unnecessary-condition": "off",
      "react-compiler/react-compiler": "off",
    },
  },
]
