import { eslintSonarjsPlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';

const sonarjs = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;

    return [
        {
            name: 'sonarjs/rules',
            plugins: {
                ['sonarjs']: eslintSonarjsPlugin,
            },
            rules: {
                ...eslintSonarjsPlugin.configs.recommended.rules,
                'sonarjs/cognitive-complexity': 'off',
                'sonarjs/no-duplicate-string': 'off',
                'sonarjs/no-nested-template-literals': 'off',
                'sonarjs/prefer-immediate-return': 'off',
                'sonarjs/prefer-single-boolean-return': 'off',
                ...overrides,
            },
        },
    ];
};

export { sonarjs };
