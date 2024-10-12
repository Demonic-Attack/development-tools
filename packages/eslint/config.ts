import type { Linter } from 'eslint';
import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';

import {
    arca,
    comments,
    disables,
    esx,
    ignores,
    imrt,
    javascript,
    // json,
    jsx,
    mutation,
    next,
    noCommentedCode,
    node,
    perfectionist,
    prettier,
    promise,
    react,
    regexp,
    sonarjs,
    sortClassMembers,
    tailwindcss,
    typescript,
    unicorn,
} from './configs';
import type { RuleOptions } from './typegen';
import type { Awaitable, IOptionsConfig, TConfigNames, TFlatConfigItem } from './types';
import { interopDefault, isBoolean } from './utils';

const defaultPluginRenaming = {
    '@typescript-eslint': 'ts',
    'better-mutation': 'mutation',
    n: 'node',
    tailwindcss: 'tw',
};

/**
 * The name of the language used for linting. This is used to determine the
 * parser and other language-specific settings.
 * @since 9.7.0
 */
// language?: string;
const flatConfigProperties = [
    'name',
    'languageOptions',
    'language',
    'linterOptions',
    'processor',
    'plugins',
    'rules',
    'settings',
] satisfies (keyof TFlatConfigItem)[];

type TResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;
type TOptionConfigKey = keyof IOptionsConfig;
type TOverridesKey = keyof NonNullable<IOptionsConfig['overrides']>;
type TResolvedOptionsConfig<K extends TOptionConfigKey> = TResolvedOptions<IOptionsConfig[K]>;
type TOverridesType = Partial<Linter.RulesRecord & RuleOptions>;

const isSubOptions = <K extends TOptionConfigKey>(options: IOptionsConfig, key: K): TResolvedOptionsConfig<K> => {
    const option = options[key];

    return isBoolean(option) ? ({} as TResolvedOptionsConfig<K>) : ((option ?? {}) as TResolvedOptionsConfig<K>);
};
const getOverrides = <K extends TOverridesKey>(options: IOptionsConfig, key: K): TOverridesType => {
    const sub = isSubOptions(options, key);

    return {
        ...options.overrides?.[key],
        ...('overrides' in sub ? sub.overrides : {}),
    };
};

const config = async (
    options: IOptionsConfig & Omit<TFlatConfigItem, 'files'> = {},
    ...config: Awaitable<
        FlatConfigComposer<Linter.Config, TConfigNames> | Linter.Config[] | TFlatConfigItem | TFlatConfigItem[]
    >[]
): Promise<FlatConfigComposer<TFlatConfigItem, TConfigNames>> => {
    const {
        autoRenamePlugins = true,
        componentExtensions = [],

        /**
         * By default, the plugins is enabled
         */
        node: enableNode = true,
        comments: enableComments = true,
        esx: enableEsx = true,
        gitignore: enableGitignore = true,
        import: enableImport = true,
        mutation: enableMutation = true,
        perfectionist: enablePerfectionist = true,
        promise: enablePromise = true,
        regexp: enableRegexp = true,
        unicorn: enableUnicorn = true,

        /**
         * By default, the plugins is enabled if the current package is in your project
         * @example typescript, react, tailwindcss, etc
         */
        next: enableNext = isPackageExists('next'),
        prettier: enablePrettier = isPackageExists('prettier'),
        react: enableReact = isPackageExists('react'),
        ts: enableTypeScript = isPackageExists('typescript'),
        tw: enableTailwindcss = isPackageExists('tailwindcss'),

        /**
         * By default, the plugins is disabled
         */
        arca: enableArca = false,

        // json: enableJson = false,
        jsx: enableJsx = false,
        'no-commented-code': enableNoCommentsCode = false,
        sonarjs: enableSonarjs = false,
        'sort-class-members': enableSortClassMembers = false,
    } = options;

    const configs: Awaitable<TFlatConfigItem[]>[] = [];

    if (enableGitignore) {
        if (typeof enableGitignore === 'boolean') {
            configs.push(
                interopDefault(import('eslint-config-flat-gitignore')).then(r => [
                    r({
                        name: 'git/gitignore',
                        strict: false,
                    }),
                ]),
            );
        } else {
            configs.push(
                interopDefault(import('eslint-config-flat-gitignore')).then(r => [
                    r({
                        name: 'git/gitignore',
                        ...enableGitignore,
                    }),
                ]),
            );
        }
    }

    /**
     * By default config
     */
    const jsOptions = isSubOptions(options, 'js');

    configs.push(
        ignores(options.ignores),
        javascript({
            ...jsOptions,
            overrides: getOverrides(options, 'js'),
        }),
    );

    /**
     * By default, the plugins is enabled
     */
    if (enableNode) {
        configs.push(
            node({
                overrides: getOverrides(options, 'node'),
            }),
        );
    }
    if (enableArca) {
        configs.push(
            arca({
                overrides: getOverrides(options, 'arca'),
            }),
        );
    }
    if (enableComments) {
        configs.push(
            comments({
                overrides: getOverrides(options, 'comments'),
            }),
        );
    }
    if (enableEsx) {
        configs.push(
            esx({
                overrides: getOverrides(options, 'esx'),
            }),
        );
    }
    if (enableImport) {
        configs.push(
            imrt({
                overrides: getOverrides(options, 'import'),
                react: isPackageExists('react'),
                typescript: isPackageExists('typescript'),
            }),
        );
    }
    if (enableMutation) {
        configs.push(
            mutation({
                overrides: getOverrides(options, 'mutation'),
            }),
        );
    }
    if (enablePerfectionist) {
        configs.push(
            perfectionist({
                overrides: getOverrides(options, 'perfectionist'),
            }),
        );
    }
    if (enablePromise) {
        configs.push(
            promise({
                overrides: getOverrides(options, 'promise'),
            }),
        );
    }
    if (enableRegexp) configs.push(regexp(typeof enableRegexp === 'boolean' ? {} : enableRegexp));
    if (enableUnicorn) {
        configs.push(
            unicorn({
                overrides: getOverrides(options, 'unicorn'),
            }),
        );
    }

    /**
     * By default, the plugins is disabled
     */
    if (enableJsx) configs.push(jsx());
    if (enableNoCommentsCode) configs.push(noCommentedCode());
    if (enableSortClassMembers) {
        configs.push(
            sortClassMembers({
                overrides: getOverrides(options, 'sort-class-members'),
            }),
        );
    }
    if (enableSonarjs) {
        configs.push(
            sonarjs({
                overrides: getOverrides(options, 'sonarjs'),
            }),
        );
    }

    // if (enableJson) {
    //     configs.push(
    //         json({
    //             overrides: getOverrides(options, 'json'),
    //         }),
    //     );
    // }
    /**
     * By default, the plugins is enabled if the current package is in your project
     * @example typescript, react, tailwindcss, prettier etc
     */
    if (enableTailwindcss) {
        configs.push(
            tailwindcss({
                overrides: getOverrides(options, 'tw'),
            }),
        );
    }
    if (enableNext) {
        configs.push(
            next({
                overrides: getOverrides(options, 'next'),
            }),
        );
    }

    const typescriptOptions = isSubOptions(options, 'ts');
    const tsconfigPath = 'tsconfigPath' in typescriptOptions ? typescriptOptions.tsconfigPath : undefined;

    if (enableTypeScript) {
        configs.push(
            typescript({
                ...typescriptOptions,
                type: options.type,
                componentExtensions,
                overrides: getOverrides(options, 'ts'),
            }),
        );
    }

    if (enableReact) {
        configs.push(
            react({
                overrides: getOverrides(options, 'react'),
                tsconfigPath,
            }),
        );
    }

    /**
     *
     * LAST POSITIONS enablePrettier
     */
    const prettierOption = isSubOptions(options, 'prettier');
    const isDisablingRecommendedRulesForPrettier =
        'isDisablingRecommendedRulesForPrettier' in prettierOption ?
            prettierOption.isDisablingRecommendedRulesForPrettier
        :   false;

    if (enablePrettier) {
        configs.push(
            prettier({
                isDisablingRecommendedRulesForPrettier,
            }),
        );
    }

    configs.push(disables());

    const fusedConfig = flatConfigProperties.reduce((accumulator, key) => {
        if (key in options) accumulator[key] = options[key] as never;
        return accumulator;
    }, {} as TFlatConfigItem);

    if (Object.keys(fusedConfig).length !== 0) configs.push([fusedConfig]);

    let composer = new FlatConfigComposer<TFlatConfigItem, TConfigNames>();
    const resolvedConfig = await Promise.all(config);

    const configArray = resolvedConfig.map(item => {
        if (Array.isArray(item)) return item;
        return [item];
    });

    composer = composer.append(...configs, ...configArray);

    if (autoRenamePlugins) composer = composer.renamePlugins(defaultPluginRenaming);

    return composer;
};

export { config };
