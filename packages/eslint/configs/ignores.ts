import { EXCLUDE_PATTERNS } from '../constants';
import type { TFlatConfigItem } from '../types';

const ignores = async (ignores: string[] = []): Promise<TFlatConfigItem[]> => [
    {
        name: 'files/ignores',
        ignores: [
            ...EXCLUDE_PATTERNS,
            ...ignores,
        ],
    },
];

export { ignores };
