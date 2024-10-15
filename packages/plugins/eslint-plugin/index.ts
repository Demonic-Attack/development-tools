import { name, version } from './package.json';
import { padKeysLeft } from '@demonicattack/shared';
import typescriptPlugin from /** Empty */ '@demonicattack/typescript-plugin';

type Severity = 'error' | 'off' | 'warn';
type RuleDeclaration = [Severity, Record<string, unknown>?] | Severity;
type RulePreset = Record<string, RuleDeclaration>;

// const allPreset = {
//     'interface-prefix': 'error',
// } as const satisfies RulePreset;

const corePreset = {
    'interface-prefix': 'error',
} as const satisfies RulePreset;

const recommendedPreset = {
    ...corePreset,
} as const satisfies RulePreset;

const flatConfigPlugins = {
    '@demonicattack/typescript-plugin': typescriptPlugin,
} as const;

const createFlatConfig = <T extends RulePreset>(rules: T) =>
    ({
        plugins: flatConfigPlugins,
        // eslint-disable-next-line ts/no-unsafe-assignment, ts/no-unsafe-call
        rules: padKeysLeft(rules, '@demonicattack/typescript-plugin/'),
        settings: {},
    }) as const;

export default {
    meta: {
        name,
        version,
    },
    configs: {
        ['recommended']: createFlatConfig(recommendedPreset),
    },
    rules: {
      ...typescriptPlugin.rules,
      // ...padKeysLeft(typescriptPlugin.rules, 'ts/'),
    }
} as const;
