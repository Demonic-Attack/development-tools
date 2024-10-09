import type { TFlatConfigItem } from '../../types';

const es6 = async (): Promise<TFlatConfigItem['rules']> => ({
    'arrow-body-style': [
        'error',
        'as-needed',
        {
            requireReturnForObjectLiteral: false,
        },
    ],
    'no-restricted-exports': [
        'error',
        {
            restrictedNamedExports: [
                'then',
            ],
        },
    ],
    'no-useless-computed-key': 'warn',
    'no-useless-rename': 'warn',
    'no-var': 'error',
    'object-shorthand': [
        'error',
        'always',
        {
            avoidExplicitReturnArrows: true,
            avoidQuotes: true,
            ignoreConstructors: false,
        },
    ],
    'prefer-const': [
        'error',
        {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
        },
    ],
    'prefer-destructuring': [
        'error',
        {
            AssignmentExpression: {
                array: false,
                object: false,
            },
            VariableDeclarator: {
                array: false,
                object: true,
            },
        },
        {
            enforceForRenamedProperties: false,
        },
    ],
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'warn',
    'symbol-description': 'error',
});

export { es6 };
