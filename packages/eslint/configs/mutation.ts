import { eslintBetterMutationPlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';
import { renameRules } from '../utils';

const mutation = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;
    return [
        {
            name: 'mutation/rules',
            plugins: {
                ['mutation']: eslintBetterMutationPlugin,
            },
            rules: {
                ...renameRules(eslintBetterMutationPlugin.configs.recommended.rules, {
                    'better-mutation': 'mutation',
                }),
                ...overrides,
            },
        },
    ];
};

export { mutation };
