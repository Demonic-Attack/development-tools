import { config } from '@demonicattack/eslint';

export default config({
    type: 'lib',
    ts: {
      tsconfigPath: 'tsconfig.json',
    },
    "no-commented-code": true,
});
