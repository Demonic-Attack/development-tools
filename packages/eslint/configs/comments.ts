import { eslintCommentsPlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';
import { renameRules } from '../utils';

const comments = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;
    return [
        {
            name: 'comments/rules',
            plugins: {
                ['comments']: eslintCommentsPlugin,
            },
            rules: {
                ...renameRules(eslintCommentsPlugin.configs.recommended.rules, {
                    '@eslint-community/eslint-comments': 'comments',
                }),
                'comments/disable-enable-pair': 'error',
                'comments/no-aggregating-enable': 'error',
                'comments/no-duplicate-disable': 'error',
                'comments/no-unlimited-disable': 'error',
                'comments/no-unused-enable': 'error',
                ...overrides,
            },
        },
    ];
};

export { comments };
