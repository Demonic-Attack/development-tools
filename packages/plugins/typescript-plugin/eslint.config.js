import { config } from '../../eslint/dist/index.js';

export default config({
    js: {
        configurations: {
            onEslintAirBnbBaseConfigRules: true,
        },
        overrides: {
            'no-undefined': 'off',
        },
    },
    ts: {
        tsconfigPath: 'tsconfig.json',
    },
    import: {
        overrides: {
            'import/prefer-default-export': 'off',
            'import/no-default-export': 'off',
        },
    },
    eslint: true,
    sonarjs: true,
    arca: true,
    prettier: {
        onPrettierRecommendedConfigRules: true,
    },
});
