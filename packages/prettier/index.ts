import type { Config as PrettierConfig } from 'prettier';
import type { MultilineArrayOptions as MultilineArrayPluginConfigOptions } from 'prettier-plugin-multiline-arrays';
import type { PluginOptions as TailwindcssPluginConfigOptions } from 'prettier-plugin-tailwindcss';

type TPrettierConfig = MultilineArrayPluginConfigOptions | PrettierConfig | TailwindcssPluginConfigOptions;

const config = {
    arrowParens: 'avoid',
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: 'lf',
    experimentalTernaries: true,
    jsxSingleQuote: true,
    multilineArraysWrapThreshold: 1,
    plugins: [
        'prettier-plugin-multiline-arrays',
        'prettier-plugin-tailwindcss',
        'prettier-plugin-packagejson',
        'prettier-plugin-sort-json',
        'prettier-plugin-prisma',
    ],
    printWidth: 120,
    proseWrap: 'always',
    quoteProps: 'as-needed',
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    useTabs: false,
} satisfies TPrettierConfig;

export { config };
export type { TPrettierConfig };
