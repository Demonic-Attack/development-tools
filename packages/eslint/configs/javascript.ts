import globals from 'globals';

import { ECMA_VERSION } from '../constants';
import { eslintJsPlugin } from '../plugins';
import type { IOptionsJs, IOptionsOverrides, TFlatConfigItem } from '../types';

import { getAirbnbBaseRules } from './airbnb';
import { eslintConfigBase, eslintConfigformatting } from './eslint-config';

const getSharedRules = async (): Promise<TFlatConfigItem['rules']> => ({
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
});

const javascript = async (options: IOptionsJs & IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { configurations = {}, overrides = {} } = options;

    const defaultConfigurations: IOptionsJs['configurations'] = {
        onEslintAirBnbBaseConfigRules: false,
        onEslintAllConfigRules: false,
        /**
         * By @default true
         */
        onEslintBaseEslintConfigRules: true,
        onEslintBaseEslintFormattingConfigRules: false,
        /**
         * By @default true
         */
        onEslintRecommendedConfigRules: true,
    };

    const {
        onEslintAirBnbBaseConfigRules,
        onEslintAllConfigRules,
        onEslintBaseEslintConfigRules,
        onEslintBaseEslintFormattingConfigRules,
        onEslintRecommendedConfigRules,
    } = { ...defaultConfigurations, ...configurations };

    const { all, recommended } = eslintJsPlugin.configs;

    const sharedRules = await getSharedRules();
    const { js } = await eslintConfigBase();
    const { formatting } = await eslintConfigformatting();
    const airbnbRules = await getAirbnbBaseRules();

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
                ...(onEslintAllConfigRules ? all.rules : {}),
                ...(onEslintRecommendedConfigRules ? recommended.rules : {}),
                ...(onEslintBaseEslintConfigRules ?
                    {
                        ...js.rules,
                        'func-style': [
                            'error',
                            'expression',
                        ],
                    }
                :   {}),
                ...(onEslintBaseEslintFormattingConfigRules ? formatting.rules : {}),
                ...(onEslintAirBnbBaseConfigRules ? airbnbRules : {}),
                ...sharedRules,
                ...overrides,
            },
        },
    ];
};

export { javascript };
