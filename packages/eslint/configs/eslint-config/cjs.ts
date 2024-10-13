import { eslintConfigCjsESLint } from './config';
import type { IEslintConfigCjs } from './types';
import { getRulesByConfigName } from './utils';

const eslintConfigCjs = async (): Promise<IEslintConfigCjs> => ({
    cjs: {
        rules: getRulesByConfigName('eslint-config-eslint/cjs', eslintConfigCjsESLint),
    },
    esm: {
        rules: getRulesByConfigName('eslint-config-eslint/esm', eslintConfigCjsESLint),
    },
});

export { eslintConfigCjs };
