import { eslintPrettierConfig, eslintPrettierPlugin } from '../plugins';
import type { IOptionsPrettier, TFlatConfigItem } from '../types';

const prettier = async (options: IOptionsPrettier = {}): Promise<TFlatConfigItem[]> => {
    const { onPrettierRecommendedConfigRules = false } = options;

    const prettierRules = eslintPrettierConfig.rules;

    const reformattedRules = Object.keys(prettierRules).reduce((accumulator: Record<string, any>, rule: string) => {
        const newKey = rule.startsWith('@typescript-eslint/') ? rule.replace('@typescript-eslint/', 'ts/') : rule;
        accumulator[newKey] = prettierRules[rule];
        return accumulator;
    }, {});

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
