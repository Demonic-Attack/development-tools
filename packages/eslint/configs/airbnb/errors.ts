import type { TFlatConfigItem } from '../../types';

const errors = async (): Promise<TFlatConfigItem['rules']> => ({
    'no-cond-assign': [
        'error',
        'except-parens',
    ],
    'no-console': 'error',
    'no-constant-binary-expression': 'error',
    'no-constant-condition': [
        'warn',
        { checkLoops: false },
    ],
    'no-empty': [
        'error',
        { allowEmptyCatch: true },
    ],
    'no-promise-executor-return': 'error',
    'no-setter-return': 'error',
    'no-template-curly-in-string': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-negation': [
        'error',
        { enforceForOrderingRelations: true },
    ],
    'no-unused-private-class-members': 'error',
});

export { errors };
