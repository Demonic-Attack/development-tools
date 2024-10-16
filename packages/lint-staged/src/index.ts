import micromatch from 'micromatch';

import {
    // CHECK,
    ESLINT,
    PRETTIER,
} from './commands';
import { JAVASCRIPT_FILES, JSON_FILES, MARKDOWN_FILES, PRISMA_FILES, TYPESCRIPT_FILES } from './constants';

type TLintStagedConfig = (allStagedFiles: string[]) => string[];

const config: TLintStagedConfig = (allStagedFiles: string[]) => {
    const shFiles = micromatch(allStagedFiles, ['**/src/**/*.sh']);

    if (shFiles.length !== 0) return [`printf '%s\n' "Script files aren't allowed in src directory" >&2`];

    const eslintFiles = micromatch(allStagedFiles, [
        ...JAVASCRIPT_FILES,
        ...TYPESCRIPT_FILES,
    ]);

    const prettierFiles = micromatch(allStagedFiles, [
        ...JAVASCRIPT_FILES,
        ...TYPESCRIPT_FILES,
        ...MARKDOWN_FILES,
        ...PRISMA_FILES,
        ...JSON_FILES,
    ]);

    // const tsFiles = micromatch(allStagedFiles, [
    //     ...TYPESCRIPT_FILES,
    // ]);

    const commands: string[] = [];

    if (eslintFiles.length !== 0) commands.push(`${ESLINT} ${eslintFiles.join(' ')}`);

    if (prettierFiles.length !== 0) commands.push(`${PRETTIER} ${prettierFiles.join(' ')}`);

    // if (tsFiles.length !== 0) commands.push(`${CHECK} ${tsFiles.join(' ')}`);

    return commands;
};

export { config };
export type { TLintStagedConfig };
