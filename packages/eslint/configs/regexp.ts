import { configs } from 'eslint-plugin-regexp';

import type { IOptionsOverrides, IOptionsRegExp, TFlatConfigItem } from '../types';

const regexp = async (options: IOptionsOverrides & IOptionsRegExp = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;

    const config = configs['flat/recommended'] as TFlatConfigItem;

    const rules = {
        ...config.rules,
    };

    if (options.level === 'warn') {
        for (const key in rules) {
            if (rules[key] === 'error') rules[key] = 'warn';
        }
    }

    return [
        {
            ...config,
            name: 'regexp/rules',
            rules: {
                ...rules,
                'regexp/match-any': [
                    'error',
                    {
                        allows: [
                            'dotAll',
                            '[\\S\\s]',
                        ],
                    },
                ],
                'regexp/no-super-linear-move': 'off',
                'regexp/no-useless-flag': [
                    'error',
                    { strictTypes: false },
                ],
                'regexp/order-in-character-class': 'off',
                'regexp/prefer-lookaround': 'off',
                'regexp/prefer-named-capture-group': 'off',
                'regexp/require-unicode-regexp': 'off',
                'regexp/require-unicode-sets-regexp': 'off',
                'regexp/sort-character-class-elements': 'off',
                'regexp/strict': 'off',
                ...overrides,
            },
        },
    ];
};

export { regexp };
