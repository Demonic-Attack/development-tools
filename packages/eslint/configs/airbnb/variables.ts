import { noUnusedVariablesOptions } from '../../constants';
import type { TFlatConfigItem } from '../../types';

const variables = async (): Promise<TFlatConfigItem['rules']> => ({
    'no-label-var': 'error',
    'no-shadow': 'off',
    'no-undef-init': 'warn',
    'no-unused-vars': [
        'error',
        noUnusedVariablesOptions as any,
    ],
    'no-use-before-define': [
        'error',
        {
            classes: false,
            functions: false,
            variables: true,
        },
    ],
});

export { variables };
