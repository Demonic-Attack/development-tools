import { builtinRules } from 'eslint/use-at-your-own-risk';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { writeFile } from 'node:fs/promises';

import {
    arca,
    comments,
    esx,
    imrt,
    javascript,
    // json,
    jsx,
    mutation,
    next,
    noCommentedCode,
    node,
    perfectionist,
    prettier,
    promise,
    react,
    regexp,
    sonarjs,
    sortClassMembers,
    tailwindcss,
    typescript,
    unicorn,
} from '../configs';
import { combine } from '../utils';

const configs = await combine(
    {
        plugins: {
            '': {
                rules: Object.fromEntries(builtinRules.entries()),
            },
        },
    },
    javascript(),
    tailwindcss(),
    node(),
    jsx(),
    perfectionist(),
    unicorn(),
    react(),
    next(),
    noCommentedCode(),
    esx(),
    imrt(),
    typescript(),
    prettier(),
    arca(),

    // json(),
    comments(),
    mutation(),
    promise(),
    regexp(),
    sortClassMembers(),
    sonarjs(),
);

const configNames = configs.map(index => index.name).filter(Boolean) as string[];

const dts = await flatConfigsToRulesDTS(configs, {
    includeAugmentation: false,
});

const configType = `
// Names of all the configs
export type ConfigNames = ${configNames.map(index => `'${index}'`).join(' | ')}
`;

await writeFile('typegen.d.ts', dts + configType);
