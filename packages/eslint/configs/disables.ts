import { JAVASCRIPT_FILES } from '../constants';
import type { TFlatConfigItem } from '../types';

const disables = async (): Promise<TFlatConfigItem[]> => [
    {
        name: 'disables/nextjs',
        files: [
            'src/app/**/{page,layout,not-found,error,loading}.tsx',
            'src/app/{sitemap,robots}.ts',
            'app/**/{page,layout,not-found,error,loading}.tsx',
            'app/{sitemap,robots}.ts',
            'middleware.ts',
        ],
        rules: {
            'arca/jsx-import-react': 'off',
            'arca/no-default-export': 'off',
            'import/no-default-export': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        name: 'disables/config-files',
        files: [
            `**/*.config.?([cm])js?(x)`,
            `**/*.config.?([m])ts?(x)`,
        ],
        rules: {
            'arca/no-default-export': 'off',
            'import/no-default-export': 'off',
            'no-console': 'off',
            'ts/explicit-function-return-type': 'off',
        },
    },
    {
        name: 'disables/js',
        files: [...JAVASCRIPT_FILES],
        rules: {
            'ts/explicit-function-return-type': 'off',
        },
    },
];

export { disables };
