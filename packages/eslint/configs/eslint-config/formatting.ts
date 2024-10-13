import { eslintConfigESLintFormatting } from './config';
import type { IEslintConfigFormatting } from './types';

const eslintConfigformatting = async (): Promise<IEslintConfigFormatting> => ({
    formatting: {
        rules: eslintConfigESLintFormatting.rules,
    },
});

export { eslintConfigformatting };
