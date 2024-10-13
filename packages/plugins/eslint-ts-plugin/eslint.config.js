import { config } from '@demonicattack/eslint';

export default config({
    js: {
        overrides: {
            curly: 'off',
            'new-cap': 'off',
            'func-style': [
                'error',
                'expression',
            ],
        },
    },
    import: {
        overrides: {
            'import/prefer-default-export': 'off',
            'import/no-default-export': 'off',
        },
    },
    sonarjs: {
        overrides: {
            'sonarjs/new-cap': 'off',
        },
    },
    ts: {
        tsconfigPath: 'tsconfig.json',
        overridesTypeAware: {
            'ts/no-unsafe-argument': 'off',
        },
    },
    arca: true,
});
