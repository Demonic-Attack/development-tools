import type { CamelCase } from 'string-ts';

import { applyDefault, createRule } from '../utils';

const RULE_NAME = 'interface-prefix';
const defaultOptions = ['never'];

const isPrefixedWithI = (name: string) => typeof name === 'string' && /^I[A-Z]/u.test(name);

export default createRule<[], CamelCase<typeof RULE_NAME>>({
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Require that interface names be prefixed with `I`',
        },
        fixable: 'code',
        messages: {
            interfacePrefix: 'Interface names must be prefixed with `I`',
        },
        schema: [
            {
                type: 'string',
                default: 'always',
                enum: [
                    'always',
                    'never',
                ],
            },
        ],
    },
    name: RULE_NAME,
    create(context, options) {
        const option = applyDefault(defaultOptions, options)[0];
        // console.log('🚀 ~ create ~ option:', option); // never
        const never = option !== 'always';
        return {
            TSInterfaceDeclaration(interfaceNode) {
                if (never) {
                    if (!isPrefixedWithI(interfaceNode.id.name)) {
                        context.report({
                            messageId: 'interfacePrefix',
                            node: interfaceNode.id,
                            fix(fixer) {
                                return fixer.replaceText(interfaceNode.id, `I${interfaceNode.id.name}`);
                            },
                        });
                    }
                } else if (isPrefixedWithI(interfaceNode.id.name)) {
                    context.report({
                        messageId: 'interfacePrefix',
                        node: interfaceNode.id,
                    });
                }
            },
        };
    },
    defaultOptions: [],
});

// const rule = createRule<[], CamelCase<typeof RULE_NAME>>({

// });

// export { rule };
