import { eslintNextPlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';

import { fixupPluginRules } from '@eslint/compat';

const next = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;
    return [
        {
            name: 'next/rules',
            plugins: {
                '@next/next': fixupPluginRules(eslintNextPlugin),
            },
            rules: {
                ...eslintNextPlugin.configs.recommended.rules,
                ...overrides,
            },
        },
    ];
};

export { next };
