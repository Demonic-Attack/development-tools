import { config } from '../eslint/dist/index.js';

export default config({
    js: {
        configurations: {
            onEslintAirBnbBaseConfigRules: true,
        },
    },
    import: {
        react: false,
        typescript: true,
        overrides: {
            'import/prefer-default-export': 'off',
        },
    },
    ts: {
        tsconfigPath: 'tsconfig.json',
        overridesTypeAware: {
            'ts/no-unsafe-assignment': 'off',
            'ts/no-unsafe-call': 'off',
            'ts/no-unsafe-member-access': 'off',
        },
    },
    arca: true,
    prettier: {
        onPrettierRecommendedConfigRules: true,
    },
});
