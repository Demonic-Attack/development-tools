import type { TFlatConfigItem } from '../../types';

const node = async (): Promise<TFlatConfigItem['rules']> => ({
    'global-require': 'off',
    'handle-callback-err': [
        'error',
        'error',
    ],
});

export { node };
