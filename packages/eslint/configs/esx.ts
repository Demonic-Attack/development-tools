import { eslintEsXPlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';

const esx = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;

    return [
        {
            name: 'esx/rules',
            plugins: {
                ['es-x']: eslintEsXPlugin,
            },
            rules: {
                'es-x/no-async-iteration': 'error',
                'es-x/no-malformed-template-literals': 'error',
                'es-x/no-regexp-lookbehind-assertions': 'error',
                'es-x/no-regexp-named-capture-groups': 'error',
                'es-x/no-regexp-s-flag': 'error',
                'es-x/no-regexp-unicode-property-escapes': 'error',
                ...overrides,
            },
        },
    ];
};

export { esx };
