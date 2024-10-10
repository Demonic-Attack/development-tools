import process from 'node:process';

import { noUnusedVariablesOptions, TYPESCRIPT_FILES } from '../constants';
import type {
    IOptionsComponentExtensions,
    IOptionsFiles,
    IOptionsOverrides,
    IOptionsProjectType,
    IOptionsTypeScriptParserOptions,
    IOptionsTypeScriptWithTypes,
    TFlatConfigItem,
} from '../types';
import { renameRules } from '../utils';

import type { ParserOptions } from '@typescript-eslint/parser';

const typescript = async (
    options: IOptionsComponentExtensions &
        IOptionsFiles &
        IOptionsOverrides &
        IOptionsProjectType &
        IOptionsTypeScriptParserOptions &
        IOptionsTypeScriptWithTypes = {},
): Promise<TFlatConfigItem[]> => {
    const {
        type = 'app',
        componentExtensions = [],
        overrides = {},
        overridesTypeAware = {},
        parserOptions = {},
    } = options;

    const files = [
        ...TYPESCRIPT_FILES,
        ...componentExtensions.map(extension => `**/*${extension}`),
    ];

    const filesTypeAware = options.filesTypeAware ?? [...TYPESCRIPT_FILES];

    const ignoresTypeAware = options.ignoresTypeAware ?? [
        '**/*.md',
    ];

    const tsconfigPath = options?.tsconfigPath ?? undefined;
    const isTypeAware = Boolean(tsconfigPath);

    const typeAwareRules: TFlatConfigItem['rules'] = {
        'dot-notation': 'off',
        'no-implied-eval': 'off',
        'ts/await-thenable': 'error',
        'ts/dot-notation': [
            'error',
            { allowKeywords: true },
        ],
        'ts/no-floating-promises': 'error',
        'ts/no-for-in-array': 'error',
        'ts/no-implied-eval': 'error',
        'ts/no-misused-promises': 'error',
        'ts/no-unnecessary-type-assertion': 'error',
        'ts/no-unsafe-argument': 'error',
        'ts/no-unsafe-assignment': 'error',
        'ts/no-unsafe-call': 'error',
        'ts/no-unsafe-member-access': 'error',
        'ts/no-unsafe-return': 'error',
        'ts/promise-function-async': 'error',
        'ts/restrict-plus-operands': 'error',
        'ts/restrict-template-expressions': 'error',
        'ts/return-await': [
            'error',
            'in-try-catch',
        ],
        'ts/strict-boolean-expressions': [
            'error',
            { allowNullableBoolean: true, allowNullableObject: true },
        ],
        'ts/switch-exhaustiveness-check': 'error',
        'ts/unbound-method': 'error',
    };

    const parserModule = await import('@typescript-eslint/parser');
    const eslintModule = await import('@typescript-eslint/eslint-plugin');
    const tsParser = parserModule.default;
    const tsPlugin = eslintModule.default;

    const parser = (typeAware: boolean, files: string[], ignores?: string[]): TFlatConfigItem => ({
        files,
        ...(ignores ? { ignores } : {}),
        name: `ts/${typeAware ? 'type-aware-parser' : 'parser'}`,
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                extraFileExtensions: componentExtensions.map(extension => `.${extension}`),
                sourceType: 'module',
                ...(typeAware ?
                    {
                        projectService: {
                            allowDefaultProject: ['./*.js'],
                            defaultProject: tsconfigPath,
                        },
                        tsconfigRootDir: process.cwd(),
                    }
                :   {}),
                ...parserOptions,
            } as ParserOptions,
        },
    });

    const recommendedRules = tsPlugin.configs['eslint-recommended']?.overrides?.[0]?.rules;
    const strictRules = tsPlugin.configs?.strict?.rules;

    return [
        {
            name: 'ts/setup',
            plugins: {
                ['ts']: tsPlugin,
            },
        },
        ...(isTypeAware ? [parser(true, filesTypeAware, ignoresTypeAware)] : []),
        {
            name: 'ts/rules',
            files,
            rules: {
                ...renameRules(recommendedRules ?? {}, {
                    '@typescript-eslint': 'ts',
                }),
                ...renameRules(strictRules ?? {}, { '@typescript-eslint': 'ts' }),
                'no-new-symbol': 'off',
                'ts/ban-ts-comment': [
                    'error',
                    { 'ts-expect-error': 'allow-with-description' },
                ],
                'ts/consistent-type-definitions': [
                    'error',
                    'interface',
                ],
                'ts/consistent-type-imports': [
                    'error',
                    {
                        disallowTypeAnnotations: false,
                        prefer: 'type-imports',
                    },
                ],
                'ts/no-unused-vars': [
                    'error',
                    noUnusedVariablesOptions as any,
                ],
                ...(type === 'lib' ?
                    {
                        'ts/explicit-function-return-type': [
                            'error',
                            {
                                allowExpressions: true,
                                allowHigherOrderFunctions: true,
                                allowIIFEs: true,
                            },
                        ],
                    }
                :   {}),
                ...overrides,
            },
        },
        ...(isTypeAware ?
            [
                {
                    name: 'ts/rules-type-aware',
                    files: filesTypeAware,
                    ignores: ignoresTypeAware,
                    rules: {
                        ...typeAwareRules,
                        ...overridesTypeAware,
                    },
                },
            ]
        :   []),
    ];
};

export { typescript };
