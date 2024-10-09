import { eslintNoCommentedCodePlugin } from '../plugins';
import type { TFlatConfigItem } from '../types';

const noCommentedCode = async (): Promise<TFlatConfigItem[]> => [
    {
        name: 'no-commented-code/rules',
        plugins: {
            ['no-commented-code']: eslintNoCommentedCodePlugin,
        },
        rules: {
            'no-commented-code/no-commented-code': 'error',
        },
    },
];

export { noCommentedCode };
