import { config } from '@demonicattack/eslint';

export default config({
    js: {
        configurations: {
            onEslintAirBnbBaseConfigRules: true,
        },
        overrides: {
            'prefer-named-capture-group': 'off',
        },
    },
    ts: {
        tsconfigPath: 'tsconfig.json',
        overridesTypeAware: {
            'ts/no-unsafe-argument': 'off',
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
    arca: true,
    prettier: {
        onPrettierRecommendedConfigRules: true,
    },
});
