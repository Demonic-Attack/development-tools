import type { TFlatConfigItem } from '../../types';

const MAX_PARAMS = 5;
const style = async (): Promise<TFlatConfigItem['rules']> => ({
    camelcase: [
        'error',
        { allow: ['^UNSAFE_'], ignoreDestructuring: false, properties: 'never' },
    ],
    'func-names': [
        'error',
        'as-needed',
    ],
    indent: 'off',
    'lines-between-class-members': [
        'error',
        'always',
        {
            exceptAfterSingleLine: false,
        },
    ],
    'max-len': [
        'error',
        {
            code: 120,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            tabWidth: 4,
        },
    ],
    'max-params': [
        'warn',
        MAX_PARAMS,
    ],
    'max-statements-per-line': [
        'error',
        {
            max: 1,
        },
    ],
    'multiline-ternary': [
        'error',
        'never',
    ],
    'new-cap': [
        'error',
        { capIsNew: false },
    ],
    'new-parens': 'warn',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-continue': 'off',
    'no-lonely-if': 'warn',
    'no-multi-assign': ['error'],
    'no-nested-ternary': 'error',
    'no-plusplus': [
        'error',
        { allowForLoopAfterthoughts: true },
    ],
    'no-restricted-syntax': [
        'error',
        {
            message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            selector: 'LabeledStatement',
        },
        {
            message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            selector: 'WithStatement',
        },
    ],
    'no-unneeded-ternary': 'error',
    'no-unused-vars': [
        'warn',
        {
            args: 'after-used',
            ignoreRestSiblings: true,
            vars: 'all',
        },
    ],
    'prefer-exponentiation-operator': 'error',
    'prefer-object-spread': 'warn',
});

export { style };
