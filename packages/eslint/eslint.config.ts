import { config } from './config';

export default config({
    /**
     * By default, the plugins is enabled
     */
    node: true,
    arca: true,

    comments: true,
    /**
     * By default, the plugins is enabled if the current package is in your project
     * @example typescript, react, tailwindcss, etc
     */
    eslint: true,
    esx: true,
    ignores: [
        'typegen.d.ts',
        '.eslint-config-inspector',
    ],
    import: true,
    js: {
        configurations: {
            onEslintAirBnbBaseConfigRules: true,
            // onEslintBaseEslintFormattingConfigRules: false,
        },
        overrides: {},
    },
    /**
     * By default, the plugins is disabled
     */
    json: true,
    jsx: true,
    mutation: true,
    next: true,

    'no-commented-code': true,
    perfectionist: true,
    prettier: {
        onPrettierRecommendedConfigRules: true,
    },
    promise: true,
    react: true,
    regexp: true,
    sonarjs: true,

    'sort-class-members': true,
    ts: true,
    tw: true,
    unicorn: {
        onEslintBaseUnicornConfigRules: true,
        onUnicornRecommendedConfigRules: true,
        overrides: {},
    },
});
