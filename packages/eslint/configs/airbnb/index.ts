// @ts-expect-error eslint-config-airbnb-base/rules/react is not typed
import eslintConfigAirbnbRulesReact from 'eslint-config-airbnb/rules/react';
// @ts-expect-error eslint-config-airbnb-base/rules/react-a11y is not typed
import eslintConfigAirbnbRulesReactA11y from 'eslint-config-airbnb/rules/react-a11y';
// @ts-expect-error eslint-config-airbnb-base/rules/react-hooks is not typed
import eslintConfigAirbnbRulesReactHooks from 'eslint-config-airbnb/rules/react-hooks';
// @ts-expect-error eslint-config-airbnb-base/rules/best-practices is not typed
import eslintConfigAirbnbBaseRulesBestPractices from 'eslint-config-airbnb-base/rules/best-practices';
// @ts-expect-error eslint-config-airbnb-base/rules/errors is not typed
import eslintConfigAirbnbBaseRulesErrors from 'eslint-config-airbnb-base/rules/errors';
// @ts-expect-error eslint-config-airbnb-base/rules/es6 is not typed
import eslintConfigAirbnbBaseRulesEs6 from 'eslint-config-airbnb-base/rules/es6';
// @ts-expect-error eslint-config-airbnb-base/rules/imports is not typed
import eslintConfigAirbnbBaseRulesImports from 'eslint-config-airbnb-base/rules/imports';
// @ts-expect-error eslint-config-airbnb-base/rules/node is not typed
import eslintConfigAirbnbBaseRulesNode from 'eslint-config-airbnb-base/rules/node';
// @ts-expect-error eslint-config-airbnb-base/rules/strict is not typed
import eslintConfigAirbnbBaseRulesStrict from 'eslint-config-airbnb-base/rules/strict';
// @ts-expect-error eslint-config-airbnb-base/rules/style is not typed
import eslintConfigAirbnbBaseRulesStyle from 'eslint-config-airbnb-base/rules/style';
// @ts-expect-error eslint-config-airbnb-base/rules/variables is not typed
import eslintConfigAirbnbBaseRulesVariables from 'eslint-config-airbnb-base/rules/variables';

import type { TFlatConfigItem } from '../../types';

import { bestPractices } from './best-practices';
import { errors } from './errors';
import { es6 } from './es6';
import { node } from './node';
import { strict } from './strict';
import { style } from './style';
import { variables } from './variables';

const deprecatedRules = async (): Promise<TFlatConfigItem['rules']> => ({
    'array-bracket-spacing': 'off',
    'arrow-parens': 'off',
    'arrow-spacing': 'off',
    'block-spacing': 'off',
    'brace-style': 'off',
    'comma-dangle': 'off',
    'comma-spacing': 'off',
    'comma-style': 'off',
    'computed-property-spacing': 'off',
    'dot-location': 'off',
    'eol-last': 'off',
    'func-call-spacing': 'off',
    'function-call-argument-newline': 'off',
    'function-paren-newline': 'off',
    'generator-star-spacing': 'off',
    'global-require': 'off',
    'handle-callback-err': 'off',
    'implicit-arrow-linebreak': 'off',
    indent: 'off',
    'key-spacing': 'off',
    'keyword-spacing': 'off',
    'linebreak-style': 'off',
    'lines-around-directive': 'off',
    'lines-between-class-members': 'off',
    'max-len': 'off',
    'max-statements-per-line': 'off',
    'multiline-ternary': 'off',
    'new-parens': 'off',
    'newline-per-chained-call': 'off',
    'no-buffer-constructo': 'off',
    'no-buffer-constructor': 'off',
    'no-confusing-arrow': 'off',
    'no-extra-semi': 'off',
    'no-floating-decimal': 'off',
    'no-mixed-operators': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-multi-spaces': 'off',
    'no-multiple-empty-lines': 'off',
    'no-new-object': 'off',
    'no-new-require': 'off',
    'no-new-symbol': 'off',
    'no-path-concat': 'off',
    'no-return-await': 'off',
    'no-spaced-func': 'off',
    'no-tabs': 'off',
    'no-trailing-spaces': 'off',
    'no-whitespace-before-property': 'off',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': 'off',
    'object-curly-spacing': 'off',
    'object-property-newline': 'off',
    'one-var-declaration-per-line': 'off',
    'operator-linebreak': 'off',
    'padded-blocks': 'off',
    'quote-props': 'off',
    quotes: 'off',
    'rest-spread-spacing': 'off',
    semi: 'off',
    'semi-spacing': 'off',
    'semi-style': 'off',
    'space-before-blocks': 'off',
    'space-before-function-paren': 'off',
    'space-in-parens': 'off',
    'space-infix-ops': 'off',
    'space-unary-ops': 'off',
    'spaced-comment': 'off',
    'switch-colon-spacing': 'off',
    'template-curly-spacing': 'off',
    'template-tag-spacing': 'off',
    'wrap-iife': 'off',
    'yield-star-spacing': 'off',
});

const airbnbBaseRules = async (): Promise<TFlatConfigItem['rules']> => {
    const [
        bestPracticesRules,
        errorRules,
        es6Rules,
        nodeRules,
        strictRules,
        styleRules,
        variableRules,
        deprecatedRulesList,
    ] = await Promise.all([
        bestPractices(),
        errors(),
        es6(),
        node(),
        strict(),
        style(),
        variables(),
        deprecatedRules(),
    ]);
    return {
        ...eslintConfigAirbnbBaseRulesBestPractices.rules,
        ...eslintConfigAirbnbBaseRulesErrors.rules,
        ...eslintConfigAirbnbBaseRulesEs6.rules,
        ...eslintConfigAirbnbBaseRulesNode.rules,
        ...eslintConfigAirbnbBaseRulesStrict.rules,
        ...eslintConfigAirbnbBaseRulesStyle.rules,
        ...eslintConfigAirbnbBaseRulesVariables.rules,
        ...bestPracticesRules,
        ...errorRules,
        ...es6Rules,
        ...nodeRules,
        ...strictRules,
        ...styleRules,
        ...variableRules,
        ...deprecatedRulesList,
    };
};

const airbnbBaseReactRules = async (): Promise<TFlatConfigItem['rules']> => ({
    ...eslintConfigAirbnbRulesReact.rules,
    ...eslintConfigAirbnbRulesReactA11y.rules,
    ...eslintConfigAirbnbRulesReactHooks.rules,
    /**
     * deprecated rules
     */
    'jsx-quotes': 'off',
});

const airbnbBaseImports = async (): Promise<{
    rules: TFlatConfigItem['rules'];
    settings: TFlatConfigItem['settings'];
}> => ({
    rules: {
        ...eslintConfigAirbnbBaseRulesImports.rules,
    },
    settings: {
        ...eslintConfigAirbnbBaseRulesImports.settings,
    },
});

export { airbnbBaseImports, airbnbBaseReactRules, airbnbBaseRules };
