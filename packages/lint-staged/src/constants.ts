export const { JAVASCRIPT_FILES, JSON_FILES, MARKDOWN_FILES, PRISMA_FILES, TYPESCRIPT_FILES } = {
    JAVASCRIPT_FILES: [
        '**/*.?([cm])js?(x)',
    ],
    JSON_FILES: [
        '**/*.json',
    ],
    MARKDOWN_FILES: [
        '**/*.md',
    ],
    PRISMA_FILES: [
        '**/*.prisma',
    ],
    TYPESCRIPT_FILES: [
        '**/*.?([m])ts?(x)',
    ],
} as const;
