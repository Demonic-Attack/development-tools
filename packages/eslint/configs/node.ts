import { eslintNodePlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';

const node = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;
    return [
        {
            name: 'node/rules',
            plugins: {
                ['node']: eslintNodePlugin,
            },
            rules: {
                ...eslintNodePlugin.configs['flat/recommended-module'].rules,
                ...eslintNodePlugin.configs['flat/recommended-script'].rules,
                'node/handle-callback-err': [
                    'error',
                    '^(err|error)$',
                ],
                'node/no-deprecated-api': 'error',
                'node/no-exports-assign': 'error',
                'node/no-new-require': 'error',
                'node/no-path-concat': 'error',
                'node/prefer-global/buffer': [
                    'error',
                    'never',
                ],
                'node/prefer-global/console': [
                    'error',
                    'always',
                ],
                'node/prefer-global/process': [
                    'error',
                    'never',
                ],
                'node/prefer-global/text-decoder': [
                    'error',
                    'always',
                ],
                'node/prefer-global/text-encoder': [
                    'error',
                    'always',
                ],
                'node/prefer-global/url': [
                    'error',
                    'always',
                ],
                'node/prefer-global/url-search-params': [
                    'error',
                    'always',
                ],
                'node/prefer-promises/dns': 'error',
                'node/prefer-promises/fs': 'error',
                'node/process-exit-as-throw': 'error',
                ...overrides,
            },
        },
    ];
};

export { node };
