import type { TFlatConfigItem } from '../../types';

interface IRules {
    rules: TFlatConfigItem['rules'];
}

interface IEslintConfigBase {
    eslintComments: IRules;
    js: IRules;
    jsdoc: IRules;
    unicorn: IRules;
}

interface IEslintConfigCjs {
    cjs: IRules;
    esm: IRules;
}

interface IEslintConfigFormatting {
    formatting: IRules;
}

export type { IEslintConfigBase, IEslintConfigCjs, IEslintConfigFormatting };
