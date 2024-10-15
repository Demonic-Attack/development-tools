import type { IOptionsOverrides, TFlatConfigItem } from '../types';

import eslintPlugin from '@demonicattack/eslint-plugin';

const demonicattack = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;

    return [
        {
            name: 'demonicattack/rules',
            plugins: {
                ['@demonicattack/typescript-plugin']: eslintPlugin,
            },
            rules: {
                ...eslintPlugin.configs.recommended.rules,
                ...overrides,
            },
        },
    ];
};

export { demonicattack };
