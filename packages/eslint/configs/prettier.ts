import { eslintPrettierPlugin } from '../plugins';
import type { IOptionsPrettier, TFlatConfigItem } from '../types';

import { prettierReformattedRules } from './prettier-config';

const prettier = async (options: IOptionsPrettier = {}): Promise<TFlatConfigItem[]> => {
    const { onPrettierRecommendedConfigRules = false } = options;

    const reformattedRules = await prettierReformattedRules();

    return [
        {
            name: 'prettier/rules',
            plugins: {
                ['prettier']: eslintPrettierPlugin,
            },
            rules: {
                'prettier/prettier': 'error',
                ...(onPrettierRecommendedConfigRules ? reformattedRules : {}),
            },
        },
    ];
};

export { prettier };
