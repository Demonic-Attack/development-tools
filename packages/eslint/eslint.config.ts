import { config } from './config';

export default config({
    ignores: [
        'typegen.d.ts',
        '.eslint-config-inspector',
    ],
    js: {
        configurations: {
            // onEslintBaseEslintFormattingConfigRules: false,
        },
        overrides: {},
    },

    /**
     * By default, the plugins is enabled
     */
    node: true,
    arca: true,
    comments: true,
    esx: true,
    import: true,
    mutation: true,
    perfectionist: true,
    promise: true,
    regexp: true,
    unicorn: true,

    /**
     * By default, the plugins is enabled if the current package is in your project
     * @example typescript, react, tailwindcss, etc
     */
    eslint: true,
    next: true,
    'no-commented-code': true,
    prettier: true,
    react: true,
    ts: true,
    tw: true,

    /**
     * By default, the plugins is disabled
     */
    json: true,
    jsx: true,
    sonarjs: true,
    'sort-class-members': true,
});
