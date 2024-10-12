import { eslintPrettierConfig, eslintPrettierPlugin } from '../plugins';
import type { IOptionsPrettier, TFlatConfigItem } from '../types';

const prettier = async (options: IOptionsPrettier = {}): Promise<TFlatConfigItem[]> => {
    const { isDisablingRecommendedRulesForPrettier = false } = options;

    return [
        {
            name: 'prettier/rules',
            plugins: {
                ['prettier']: eslintPrettierPlugin,
            },
            rules: {
                'prettier/prettier': 'error',
                ...(isDisablingRecommendedRulesForPrettier && eslintPrettierConfig.rules),
            },
        },
    ];
};

export { prettier };
