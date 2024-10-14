import { eslintPrettierConfig } from './config';
import { reformattedRules } from './utils';

const prettierReformattedRules = async (): Promise<Record<string, any>> => ({
    ...reformattedRules(eslintPrettierConfig.rules),
});

export { prettierReformattedRules };
