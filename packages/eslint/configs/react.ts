import { isPackageExists } from 'local-pkg';

import { JAVASCRIPT_FILES, TYPESCRIPT_FILES } from '../constants';
import {
    eslintJsxA11yPlugin,
    eslintReactDomPlugin,
    eslintReactEslintPlugin,
    eslintReactHooksExtraPlugin,
    eslintReactHooksPlugin,
    eslintReactNamingConventionPlugin,
    eslintReactPlugin,
    eslintReactRefreshPlugin,
    eslintReactWebApiPlugin,
    eslintReactXPlugin,
} from '../plugins';
import type { IOptionsFiles, IOptionsOverrides, IOptionsTypeScriptWithTypes, TFlatConfigItem } from '../types';
import { toArray } from '../utils';

import { airbnbBaseReactRules } from './airbnb';

const ReactRefreshAllowConstantExportPackages = [
    'vite',
];

const NextJsPackages = [
    'next',
];

const react = async (
    options: IOptionsFiles & IOptionsOverrides & IOptionsTypeScriptWithTypes = {},
): Promise<TFlatConfigItem[]> => {
    const {
        files = [
            JAVASCRIPT_FILES,
            TYPESCRIPT_FILES,
        ],
        overrides = {},
    } = options;
    const tsconfigPath = options?.tsconfigPath ? toArray(options.tsconfigPath) : undefined;
    const isTypeAware = Boolean(tsconfigPath);

    const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some(index => isPackageExists(index));
    const isUsingNext = NextJsPackages.some(index => isPackageExists(index));

    const parserModule = await import('@typescript-eslint/parser');
    const tsParser = parserModule.default;

    return [
        {
            name: 'react/setup',
            plugins: {
                ['@eslint-react']: eslintReactEslintPlugin,
                ['jsx-a11y']: eslintJsxA11yPlugin,
                ['react']: eslintReactPlugin,
                ['react-dom']: eslintReactDomPlugin,
                ['react-hooks']: eslintReactHooksPlugin,
                ['react-hooks-extra']: eslintReactHooksExtraPlugin,
                ['react-naming-convention']: eslintReactNamingConventionPlugin,
                ['react-refresh']: eslintReactRefreshPlugin,
                ['react-web-api']: eslintReactWebApiPlugin,
                ['react-x']: eslintReactXPlugin,
            },
        },
        {
            name: 'react/rules',
            files,
            languageOptions: {
                parser: tsParser,
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                    ...(isTypeAware ? { project: tsconfigPath } : {}),
                },
                sourceType: 'module',
            },
            rules: {
                ...eslintJsxA11yPlugin.flatConfigs.recommended.rules,

                /**
                 *  TODO: airbnb rules
                 */
                ...(await airbnbBaseReactRules()),

                /**
                 * TODO: @eslint-react rules
                 */
                '@eslint-react/no-useless-fragment': 'warn',
                '@eslint-react/prefer-destructuring-assignment': 'warn',

                '@eslint-react/prefer-shorthand-boolean': 'warn',
                '@eslint-react/prefer-shorthand-fragment': 'warn',
                /**
                 * TODO: Default React Rules
                 */
                'react/button-has-type': 'error',
                'react/display-name': 'error',

                'react/function-component-definition': [
                    'error',
                    {
                        namedComponents: 'arrow-function',
                        unnamedComponents: 'arrow-function',
                    },
                ],
                'react/jsx-key': 'error',
                'react/jsx-no-comment-textnodes': 'error',
                'react/jsx-no-duplicate-props': 'error',

                'react/jsx-no-target-blank': 'error',
                'react/jsx-no-undef': 'error',
                'react/jsx-uses-react': 'error',
                'react/jsx-uses-vars': 'error',
                'react/no-children-prop': 'error',
                'react/no-danger-with-children': 'error',
                'react/no-deprecated': 'error',
                'react/no-find-dom-node': 'error',
                'react/no-is-mounted': 'error',
                'react/no-render-return-value': 'error',
                'react/no-unescaped-entities': 'error',

                'react/no-unknown-property': 'error',

                'react/no-unsafe': 'off',
                'react/prop-types': 'error',
                'react/react-in-jsx-scope': 'error',
                'react/require-render-return': 'error',
                /**
                 *  TODO: react-dom rules
                 */
                'react-dom/no-children-in-void-dom-elements': 'warn',
                'react-dom/no-dangerously-set-innerhtml': 'warn',
                'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
                'react-dom/no-find-dom-node': 'error',
                'react-dom/no-missing-button-type': 'warn',
                'react-dom/no-missing-iframe-sandbox': 'warn',
                'react-dom/no-namespace': 'error',
                'react-dom/no-render-return-value': 'error',
                'react-dom/no-script-url': 'warn',
                'react-dom/no-unsafe-iframe-sandbox': 'warn',
                'react-dom/no-unsafe-target-blank': 'warn',
                /**
                 *  TODO: react-hooks-extra rules
                 */
                'react-hooks-extra/ensure-custom-hooks-using-other-hooks': 'warn',
                'react-hooks-extra/no-direct-set-state-in-use-effect': 'warn',
                'react-hooks-extra/no-redundant-custom-hook': 'warn',
                'react-hooks-extra/prefer-use-state-lazy-initialization': 'warn',
                /**
                 *  TODO: react-naming-convention rules
                 */
                'react-naming-convention/filename-extension': [
                    'warn',
                    'as-needed',
                ],
                'react-naming-convention/use-state': 'warn',
                /**
                 *  TODO: react-refresh
                 */
                'react-refresh/only-export-components': [
                    'warn',
                    {
                        allowConstantExport: isAllowConstantExport,
                        allowExportNames: [
                            ...(isUsingNext ?
                                [
                                    'dynamic',
                                    'dynamicParams',
                                    'revalidate',
                                    'fetchCache',
                                    'runtime',
                                    'preferredRegion',
                                    'maxDuration',
                                    'config',
                                    'generateStaticParams',
                                    'metadata',
                                    'generateMetadata',
                                    'viewport',
                                    'generateViewport',
                                ]
                            :   []),
                        ],
                    },
                ],

                /**
                 *  TODO: react-web-api rules
                 */
                'react-web-api/no-leaked-event-listener': 'error',
                'react-web-api/no-leaked-interval': 'error',
                'react-web-api/no-leaked-resize-observer': 'error',
                'react-web-api/no-leaked-timeout': 'error',

                /**
                 * TODO: React-X rules
                 */
                'react-x/ensure-forward-ref-using-ref': 'warn',
                'react-x/no-access-state-in-setstate': 'error',
                'react-x/no-array-index-key': 'warn',
                'react-x/no-children-count': 'warn',
                'react-x/no-children-for-each': 'warn',
                'react-x/no-children-map': 'warn',
                'react-x/no-children-only': 'warn',
                'react-x/no-children-to-array': 'warn',
                'react-x/no-clone-element': 'warn',
                'react-x/no-comment-textnodes': 'warn',
                'react-x/no-component-will-mount': 'error',
                'react-x/no-component-will-receive-props': 'error',
                'react-x/no-component-will-update': 'error',
                'react-x/no-create-ref': 'error',
                'react-x/no-default-props': 'error',
                'react-x/no-direct-mutation-state': 'error',
                'react-x/no-duplicate-key': 'error',
                'react-x/no-implicit-key': 'warn',
                'react-x/no-missing-key': 'error',
                'react-x/no-nested-components': 'warn',
                'react-x/no-prop-types': 'error',
                'react-x/no-redundant-should-component-update': 'error',
                'react-x/no-set-state-in-component-did-mount': 'warn',
                'react-x/no-set-state-in-component-did-update': 'warn',
                'react-x/no-set-state-in-component-will-update': 'warn',
                'react-x/no-string-refs': 'error',
                'react-x/no-unsafe-component-will-mount': 'warn',
                'react-x/no-unsafe-component-will-receive-props': 'warn',
                'react-x/no-unsafe-component-will-update': 'warn',
                'react-x/no-unstable-context-value': 'error',
                'react-x/no-unstable-default-props': 'error',
                'react-x/no-unused-class-component-members': 'warn',
                'react-x/no-unused-state': 'warn',
                ...(isTypeAware ?
                    {
                        '@eslint-react/no-leaked-conditional-rendering': 'warn',
                    }
                :   {}),
                ...overrides,
            },
            settings: {
                react: { version: 'detect' },
            },
        },
    ];
};

export { react };
