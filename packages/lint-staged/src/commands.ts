export const { CHECK, ESLINT, PRETTIER } = {
    CHECK: 'tsc --noEmit',
    ESLINT: 'eslint --fix',
    PRETTIER: 'prettier --write',
} as const;
