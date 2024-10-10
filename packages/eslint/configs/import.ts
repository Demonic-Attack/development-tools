import { JAVASCRIPT_FILES, TYPESCRIPT_FILES } from '../constants';
import { eslintImportPlugin, eslintSimpleImportSortPlugin } from '../plugins';
import type { IOptionsImport, IOptionsOverrides, TFlatConfigItem } from '../types';

import { airbnbBaseImports } from './airbnb';

const imrt = async (options: IOptionsImport & IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {}, react = false, typescript = false } = options;

    const airbnbBaseImportsResult = await airbnbBaseImports();

    const baseSettings = {
        'import/resolver': {
            node: { extensions: JAVASCRIPT_FILES },
        },
    };

    const settings = {
        ...baseSettings,
        ...airbnbBaseImportsResult.settings,
        ...(typescript && {
            ...eslintImportPlugin.flatConfigs.typescript.settings,
            'import/resolver': {
                ...eslintImportPlugin.flatConfigs.typescript.settings['import/resolver'],
                typescript: { alwaysTryTypes: true },
            },
        }),
        ...(react && {
            ...eslintImportPlugin.flatConfigs.react.settings,
            'import/resolver': {
                node: {
                    extensions: [
                        ...JAVASCRIPT_FILES,
                        ...TYPESCRIPT_FILES,
                    ],
                },
            },
        }),
    };

    return [
        {
            name: 'import/rules',
            plugins: {
                ['import']: eslintImportPlugin,
                ['simple-import-sort']: eslintSimpleImportSortPlugin,
            },
            rules: {
                ...eslintImportPlugin.flatConfigs.recommended.rules,
                ...(react && eslintImportPlugin.flatConfigs.react.rules),
                ...(typescript && eslintImportPlugin.flatConfigs.typescript.rules),
                ...airbnbBaseImportsResult.rules,
                'import/consistent-type-specifier-style': 'error',
                'import/extensions': [
                    'error',
                    'ignorePackages',
                    {
                        js: 'never',
                        jsx: 'never',
                        mjs: 'never',
                        ts: 'never',
                        tsx: 'never',
                    },
                ],
                'import/imports-first': 'off',
                'import/newline-after-import': 'error',
                'import/no-absolute-path': 'error',
                'import/no-cycle': 'error',
                'import/no-default-export': 'error',
                'import/no-duplicates': 'error',
                'import/no-dynamic-require': 'warn',
                'import/no-extraneous-dependencies': [
                    'error',
                    { includeTypes: true },
                ],
                'import/no-mutable-exports': 'error',
                'import/no-named-default': 'error',
                'import/no-nodejs-modules': 'warn',
                'import/no-relative-packages': 'warn',
                'import/no-self-import': 'error',
                'import/no-unresolved': 'off',
                'import/no-useless-path-segments': ['error'],
                'import/no-webpack-loader-syntax': 'error',
                'import/order': 'off',
                'simple-import-sort/exports': 'error',
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            [
                                '^react',
                                '^next',
                                '^\\w',
                            ],
                            ['^@app(/.*|$)'],
                            ['^@store(/.*|$)'],
                            ['^@components(/.*|$)'],
                            ['^@ui(/.*|$)'],
                            ['^@lib(/.*|$)'],
                            ['^@pages(/.*|$)'],
                            ['^@routes(/.*|$)'],
                            ['^@layouts(/.*|$)'],
                            ['^@widgets(/.*|$)'],
                            ['^@features(/.*|$)'],
                            ['^@entities(/.*|$)'],
                            ['^@utils(/.*|$)'],
                            ['^@assets(/.*|$)'],
                            ['^@helpers(/.*|$)'],
                            ['^@hooks(/.*|$)'],
                            ['^@providers(/.*|$)'],
                            ['^@services(/.*|$)'],
                            ['^@shared(/.*|$)'],
                            ['^\\u0000'],
                            [
                                '^\\.\\.(?!/?$)',
                                '^\\.\\./?$',
                            ],
                            [
                                '^\\./(?=.*/)(?!/?$)',
                                '^\\.(?!/?$)',
                                '^\\./?$',
                            ],
                            ['^.+\\.?(css)$'],
                        ],
                    },
                ],
                ...overrides,
            },
            settings,
        },
    ];
};

export { imrt };
