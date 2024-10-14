const reformattedRules = (rules: Record<string, any>) =>
    Object.keys(rules).reduce((accumulator: Record<string, any>, rule: string) => {
        if (
            rule.startsWith('babel/') ||
            rule.startsWith('@babel/') ||
            rule.startsWith('vue/') ||
            rule.startsWith('standard/') ||
            rule.startsWith('flowtype/')
        )
            return accumulator;

        const newKey = rule.startsWith('@typescript-eslint/') ? rule.replace('@typescript-eslint/', 'ts/') : rule;

        accumulator[newKey] = rules[rule];
        return accumulator;
    }, {});
export { reformattedRules };
