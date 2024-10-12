import { eslintArcaPlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';

const arca = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;

    return [
        {
            name: 'arca/rules',
            plugins: {
                ['arca']: eslintArcaPlugin,
            },
            rules: {
                'arca/curly': 'error',
                'arca/import-quotes': 'error',
                'arca/jsx-import-react': 'error',
                'arca/jsx-longhand-props': 'error',
                'arca/jsx-no-html-attrs': 'error',
                'arca/jsx-no-string-styles': 'error',
                'arca/melted-constructs': 'error',
                'arca/no-default-export': 'error',
                ...overrides,
            },
        },
    ];
};

export { arca };
