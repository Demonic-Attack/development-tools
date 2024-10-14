import { name, version } from '../package.json';

import interfacePrefix from './rules/interface-prefix';

const recommendedRules = {
    'interface-prefix': interfacePrefix,
};

const tsPlugin = {
    meta: { name, version },
    rules: { ...recommendedRules },
};

const createConfig = (rules: Record<string, any>, flatConfigName: string) => ({
    ...(flatConfigName && {
        // ...flatConfigBase,
        name: `ts-plugin/${flatConfigName}`,
        plugins: { 'ts-plugin': tsPlugin },
    }),
    rules: { ...rules },
});

const configs = {
    recommended: createConfig(recommendedRules, 'recommended'),
};

export { configs };
