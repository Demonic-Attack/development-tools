import { eslintPromisePlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';

const promise = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;
    return [
        {
            name: 'promise/rules',
            plugins: {
                ['promise']: eslintPromisePlugin,
            },
            rules: {
                ...eslintPromisePlugin.configs.recommended.rules,
                'promise/always-return': 'off',
                'promise/catch-or-return': 'off',
                'promise/no-native': 'off',
                'promise/no-return-wrap': [
                    'error',
                    { allowReject: true },
                ],
                ...overrides,
            },
        },
    ];
};

export { promise };
