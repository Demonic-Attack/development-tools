// import { config } from '@demonicattack/eslint';

// /**
//  * @type {import('eslint').Linter.Config}
//  */
// export default config({
//     type: 'lib',
//     ignores: [
//         'typegen.d.ts',
//         '.eslint-config-inspector',
//     ],
//     /**
//      * Default
//      */
//     js: {
//         overrides: {
//             /* add your overrides here */
//             'no-useless-computed-key': 'off',
//         },
//     },
//     /**
//      * By default, the plugins is enabled
//      */
//     arca: true,
//     regexp: {
//         level: 'error',
//     },
//     import: {
//         react: false,
//         typescript: true,
//         overrides: {
//             /* add your overrides here */
//             'import/extensions': 'off',
//             'import/no-nodejs-modules': 'off',
//             'import/no-extraneous-dependencies': 'off',
//             'import/prefer-default-export': 'off',
//         },
//     },
//     unicorn: {
//         overrides: {
//             /* add your overrides here */
//             'unicorn/prefer-string-raw': 'off',
//         },
//     },
//     node: {
//         overrides: {
//             /* add your overrides here */
//             'node/no-missing-import': 'off',
//         },
//     },
//     /**
//      * By default, the plugins is enabled if the current package is in your project
//      * typescript, react, tailwindcss, etc
//      */
//     react: false,
//     prettier: true,
//     tw: false,
//     ts: {
//         tsconfigPath: 'tsconfig.json',
//         overrides: {
//             /* add your overrides here */
//         },
//         overridesTypeAware: {
//             /* add your TypeAware overrides here */
//             'ts/no-unsafe-call': 'off',
//             'ts/no-explicit-any': 'off',
//             'ts/no-unsafe-return': 'off',
//             'ts/no-unsafe-member-access': 'off',
//             'ts/strict-boolean-expressions': 'off',
//             'ts/promise-function-async': 'off',
//             'ts/no-unsafe-assignment': 'off',
//             'ts/no-non-null-assertion': 'off',
//             'ts/no-non-null-asserted-optional-chain': 'off',
//             'ts/no-unsafe-argument': 'off',
//         },
//     },
//     /**
//      * By default, the plugins is disabled
//      */
//     jsx: false,
//     sonarjs: false,
//     next: false,
//     'sort-class-members': false,
//     'no-commented-code': true,
// }).overrides({
//     'arca/rules': {
//         files: [
//             './configs/regexp.ts',
//         ],
//         rules: {
//             'arca/curly': 'off',
//         },
//     },
// });
import { config } from './dist/index.js';

export default config(
    {
        jsx: false,
        arca: true,
        'no-commented-code': true,
        js: {
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
        unicorn: {
            overrides: {
                'unicorn/prefer-string-raw': 'off',
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
        sonarjs: true,
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
