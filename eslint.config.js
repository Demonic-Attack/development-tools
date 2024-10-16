import { config } from '@demonicattack/eslint';

export default config(
    {
        js: {
            configurations: {
                onEslintAirBnbBaseConfigRules: true,
            },
            overrides: {
                'no-useless-computed-key': 'off',
            },
        },
        ts: {
            tsconfigPath: 'tsconfig.json',
            overridesTypeAware: {
                'ts/no-unsafe-assignment': 'off',
                'ts/no-unsafe-member-access': 'off',
                'ts/strict-boolean-expressions': 'off',
                'ts/no-unsafe-return': 'off',
                'ts/no-explicit-any': 'off',
                'ts/no-unsafe-argument': 'off',
            },
        },
        import: {
            react: false,
            typescript: true,
            overrides: {
                'import/no-nodejs-modules': 'off',
                'import/prefer-default-export': 'off',
            },
        },
        unicorn: {
            overrides: {
                'unicorn/prefer-string-raw': 'off',
            },
        },
        prettier: {
            onPrettierRecommendedConfigRules: true,
        },
        sonarjs: {
            overrides: {
                'sonarjs/no-commented-code': 'off',
            },
        },
        eslint: true,
        arca: true,
    },
    {
        ignores: [
            'typegen.d.ts',
            '.eslint-config-inspector',
        ],
    },
    {
        rules: {
            'sonarjs/deprecation': 'off',
            'sonarjs/todo-tag': 'off',
        },
    },
);
