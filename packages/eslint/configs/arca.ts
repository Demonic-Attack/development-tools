import { eslintArcaPlugin } from '../plugins';
import type { IOptionsOverrides, IOptionsProjectType, TFlatConfigItem } from '../types';

const arca = async (options: IOptionsOverrides & IOptionsProjectType = {}): Promise<TFlatConfigItem[]> => {
    const { type = 'app', overrides = {} } = options;
    return [
        {
            name: 'arca/rules',
            plugins: {
                ['arca']: eslintArcaPlugin,
            },
            rules: {
                'arca/curly': 'error',
                'arca/import-quotes': 'error',
                ...(type === 'app' ?
                    {
                        'arca/jsx-import-react': 'error',
                        'arca/jsx-longhand-props': 'error',
                        'arca/jsx-no-html-attrs': 'error',
                        'arca/jsx-no-string-styles': 'error',
                    }
                :   {}),
                'arca/melted-constructs': 'error',
                'arca/no-default-export': 'error',
                ...overrides,
            },
        },
    ];
};

export { arca };
