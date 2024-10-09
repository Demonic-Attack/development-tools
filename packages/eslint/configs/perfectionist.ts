import { eslintPerfectionistPlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';

const p11tOptions = {
    type: 'natural',
    ignoreCase: false,
    order: 'asc',
} as const;

const p11tGroups = {
    customGroups: {
        id: [
            '_',
            'id',
            'key',
            'self',
        ],
        type: [
            'type',
            'kind',
        ],
        meta: [
            'name',
            'meta',
            'title',
            'description',
        ],
        alias: [
            'alias',
            'as',
        ],
        rules: [
            'node',
            'messageId',
        ],
    },
    groups: [
        'id',
        'type',
        'meta',
        'alias',
        'rules',
        'unknown',
    ],
} as const;

const p11t = {
    ...p11tOptions,
    ...p11tGroups,
};

const perfectionist = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;
    return [
        {
            name: 'perfectionist/rules',
            plugins: {
                ['perfectionist']: eslintPerfectionistPlugin,
            },
            rules: {
                'perfectionist/sort-array-includes': 'error',
                'perfectionist/sort-astro-attributes': 'off',
                'perfectionist/sort-classes': 'off',
                'perfectionist/sort-enums': 'error',
                'perfectionist/sort-exports': 'off',
                'perfectionist/sort-imports': 'off',
                'perfectionist/sort-interfaces': [
                    'error',
                    p11t as any,
                ],
                'perfectionist/sort-intersection-types': 'error',
                'perfectionist/sort-jsx-props': 'error',
                'perfectionist/sort-maps': 'error',
                'perfectionist/sort-named-exports': 'off',
                'perfectionist/sort-named-imports': 'off',
                'perfectionist/sort-object-types': [
                    'error',
                    p11t as any,
                ],
                'perfectionist/sort-objects': [
                    'error',
                    p11t as any,
                ],
                'perfectionist/sort-sets': 'error',
                'perfectionist/sort-svelte-attributes': 'off',
                'perfectionist/sort-switch-case': 'error',
                'perfectionist/sort-union-types': [
                    'error',
                    p11tOptions,
                ],
                'perfectionist/sort-variable-declarations': 'error',
                'perfectionist/sort-vue-attributes': 'off',
                ...overrides,
            },
            settings: {
                perfectionist: {
                    partitionByComment: true,
                },
            },
        },
    ];
};

export { perfectionist };
