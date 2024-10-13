import { config } from '@demonicattack/eslint';

export default config({
    js: {
        overrides: {
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
        },
    },
    sonarjs: {
        overrides: {
            'sonarjs/new-cap': 'off',
        },
    },
    ts: {
        tsconfigPath: 'tsconfig.json',
    },
});
