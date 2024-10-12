import type { Linter } from 'eslint';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';

import type { ConfigNames as TConfigNames, RuleOptions } from './typegen';

import type { ParserOptions } from '@typescript-eslint/parser';

type TRules = RuleOptions;
type Awaitable<T> = Promise<T> | T;
type TConfig = Linter.Config;

interface IOptionsFiles {
    files?: string[];
}

interface IOptionsIsInEditor {
    isInEditor?: boolean;
}

type TFlatConfigItem = {
    plugins?: Record<string, any>;
} & Omit<Linter.Config<Linter.RulesRecord & TRules>, 'plugins'>;

interface IOptionsProjectType {
    type?: 'app' | 'lib';
}

interface IOptionsComponentExtensions {
    componentExtensions?: string[];
}

interface IOptionsOverrides {
    overrides?: TFlatConfigItem['rules'];
}

interface IOptionsTypeScriptParserOptions {
    parserOptions?: Partial<ParserOptions>;

    /**
     * Glob patterns for files that should be type aware.
     * @default ['**\/*.{ts,tsx}']
     */
    filesTypeAware?: string[];

    /**
     * Glob patterns for files that should not be type aware.
     * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
     */
    ignoresTypeAware?: string[];
}

interface IOptionsTypeScriptWithTypes {
    /**
     * When this options is provided, type aware rules will be enabled.
     * @see https://typescript-eslint.io/linting/typed-linting/
     */
    tsconfigPath?: string;

    /**
     * Override type aware rules.
     */
    overridesTypeAware?: TFlatConfigItem['rules'];
}

interface IOptionsPrettier {
    isDisablingRecommendedRulesForPrettier?: boolean;
}

interface IOptionsImport {
    react?: boolean;
    typescript?: boolean;
}

interface IOptionsRegExp {
    level?: 'error' | 'warn';
}

interface IOptionsJs {
    configurations?: Partial<{
        onEslintAirBnbBaseConfigRules?: TFlatConfigItem['rules'] | boolean;
        onEslintAllConfigRules?: TFlatConfigItem['rules'] | boolean;
        onEslintBaseEslintConfigRules?: TFlatConfigItem['rules'] | boolean;
        onEslintBaseEslintFormattingConfigRules?: TFlatConfigItem['rules'] | boolean;
        onEslintRecommendedConfigRules?: TFlatConfigItem['rules'] | boolean;
    }>;
}

type TOptionsTypescript =
    | (IOptionsOverrides & IOptionsTypeScriptParserOptions)
    | (IOptionsOverrides & IOptionsTypeScriptWithTypes);

interface IOptionsConfig extends IOptionsComponentExtensions, IOptionsProjectType {
    gitignore?: FlatGitignoreOptions | boolean;
    js?: IOptionsJs | IOptionsOverrides;

    /**
     * By default, the plugins is enabled
     */
    node?: IOptionsOverrides | boolean;
    comments?: IOptionsOverrides | boolean;
    esx?: IOptionsOverrides | boolean;
    import?: IOptionsImport | IOptionsOverrides | boolean;
    mutation?: IOptionsOverrides | boolean;
    perfectionist?: IOptionsOverrides | boolean;
    promise?: IOptionsOverrides | boolean;
    regexp?: (IOptionsOverrides & IOptionsRegExp) | boolean;
    unicorn?: IOptionsOverrides | boolean;

    /**
     * By default, the plugins is enabled if the current package is in your project
     * @example typescript, react, tailwindcss, etc
     */
    next?: IOptionsOverrides | boolean;
    prettier?: IOptionsPrettier | boolean;
    react?: IOptionsOverrides | boolean;
    ts?: TOptionsTypescript | boolean;
    tw?: IOptionsOverrides | boolean;

    /**
     * By default, the plugins is disabled
     */
    arca?: IOptionsOverrides | boolean;
    json?: IOptionsOverrides | boolean;
    jsx?: boolean;
    ['no-commented-code']?: boolean;
    sonarjs?: IOptionsOverrides | boolean;
    ['sort-class-members']?: IOptionsOverrides | boolean;

    /**
     * Rename plugins
     */
    autoRenamePlugins?: boolean;

    /**
     * Override rules
     */
    overrides?: {
        node?: TFlatConfigItem['rules'];
        arca?: TFlatConfigItem['rules'];
        comments?: TFlatConfigItem['rules'];
        esx?: TFlatConfigItem['rules'];
        import?: TFlatConfigItem['rules'];
        js?: TFlatConfigItem['rules'];
        json?: TFlatConfigItem['rules'];
        mutation?: TFlatConfigItem['rules'];
        next?: TFlatConfigItem['rules'];
        perfectionist?: TFlatConfigItem['rules'];
        promise?: TFlatConfigItem['rules'];
        react?: TFlatConfigItem['rules'];
        sonarjs?: TFlatConfigItem['rules'];
        ['sort-class-members']?: TFlatConfigItem['rules'];
        ts?: TFlatConfigItem['rules'];
        tw?: TFlatConfigItem['rules'];
        unicorn?: TFlatConfigItem['rules'];
    };
}

export type {
    Awaitable,
    IOptionsComponentExtensions,
    IOptionsConfig,
    IOptionsFiles,
    IOptionsImport,
    IOptionsIsInEditor,
    IOptionsJs,
    IOptionsOverrides,
    IOptionsPrettier,
    IOptionsProjectType,
    IOptionsRegExp,
    IOptionsTypeScriptParserOptions,
    IOptionsTypeScriptWithTypes,
    TConfig,
    TConfigNames,
    TFlatConfigItem,
    TOptionsTypescript,
    TRules,
};
