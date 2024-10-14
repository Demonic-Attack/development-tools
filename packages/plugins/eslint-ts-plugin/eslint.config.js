import { config } from '@demonicattack/eslint';
import { configs } from './dist/index.js';

export default config(
  // configs.recommended,
  // {
  //   rules: {
  //     "interface-prefix": ["error", "always"]
  //   }
  // },
  {
    js: {
        configurations: {
            onEslintAirBnbBaseConfigRules: true,
        },
        overrides: {
            'no-undefined': 'off',
        },
    },
    ts: {
        tsconfigPath: 'tsconfig.json',
        overridesTypeAware: {
            'ts/no-unsafe-argument': 'off',
        },
    },
    import: {
        overrides: {
            'import/prefer-default-export': 'off',
            'import/no-default-export': 'off',
        },
    },
    sonarjs: true,
    arca: true,
    prettier: {
        onPrettierRecommendedConfigRules: true,
    },
});
