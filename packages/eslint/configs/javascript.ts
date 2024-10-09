import globals from 'globals';

import { ECMA_VERSION } from '../constants';
import { eslintJsPlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';

import { airbnbBaseRules } from './airbnb';

const javascript = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;
    return [
        {
            name: 'js/setup',
            languageOptions: {
                ecmaVersion: ECMA_VERSION,
                globals: {
                    ...globals.browser,
                    ...globals.es2022,
                    ...globals.node,
                    ...globals.serviceworker,
                    ...globals.builtin,
                    document: 'readonly',
                    navigator: 'readonly',
                    window: 'readonly',
                },
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                    ecmaVersion: ECMA_VERSION,
                    sourceType: 'module',
                },
                sourceType: 'module',
            },
            linterOptions: {
                reportUnusedDisableDirectives: true,
            },
        },
        {
            name: 'js/rules',
            plugins: {
                ['js']: eslintJsPlugin,
            },
            rules: {
                ...eslintJsPlugin.configs.recommended.rules,
                ...(await airbnbBaseRules()),
                'accessor-pairs': [
                    'error',
                    { enforceForClassMembers: true, setWithoutGet: true },
                ],
                'no-console': [
                    'error',
                    {
                        allow: [
                            'warn',
                            'error',
                        ],
                    },
                ],
                'no-restricted-globals': [
                    'error',
                    { name: 'global', message: 'Use `globalThis` instead.' },
                    { name: 'self', message: 'Use `globalThis` instead.' },
                ],
                'no-restricted-properties': [
                    'error',
                    {
                        message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
                        property: '__proto__',
                    },
                    { message: 'Use `Object.defineProperty` instead.', property: '__defineGetter__' },
                    { message: 'Use `Object.defineProperty` instead.', property: '__defineSetter__' },
                    { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupGetter__' },
                    { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupSetter__' },
                ],
                'no-restricted-syntax': [
                    'error',
                    'TSEnumDeclaration[const=true]',
                    'TSExportAssignment',
                ],
                'no-unmodified-loop-condition': 'error',
                'no-unused-expressions': [
                    'error',
                    {
                        allowShortCircuit: true,
                        allowTaggedTemplates: true,
                        allowTernary: true,
                    },
                ],
                'no-use-before-define': [
                    'error',
                    { classes: false, functions: false, variables: true },
                ],
                'prefer-arrow-callback': [
                    'error',
                    {
                        allowNamedFunctions: false,
                        allowUnboundThis: true,
                    },
                ],
                ...overrides,
            },
        },
    ];
};

export { javascript };
