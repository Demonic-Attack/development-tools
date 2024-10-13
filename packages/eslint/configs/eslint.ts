import { eslintPlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';

const eslint = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;
    return [
        {
            name: 'eslint-rules/rules',
            plugins: {
                ['eslint-plugin']: eslintPlugin,
            },
            rules: {
                ...eslintPlugin.configs['flat/recommended'].rules,
                ...overrides,
            },
        },
    ];
};

export { eslint };
