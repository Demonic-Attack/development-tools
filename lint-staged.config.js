// import { config } from '@demonicattack/lint-staged';
// **/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,json,prisma,md}\
/**
 * @type {import('@demonicattack/lint-staged').TLintStagedConfig}
 */
export default {
    '*/**': [
        // 'pnpm typecheck',
        'pnpm lint:fix',
        'pnpm format:fix',
    ],
};
