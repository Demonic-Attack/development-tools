import type { CamelCase } from 'string-ts';

import { applyDefault, createRule } from '../utils';

const RULE_NAME = 'interface-prefix';
const defaultOptions = ['never'];

const isPrefixedWithI = (name: string) => typeof name === 'string' && /^I[A-Z]/u.test(name);

const rule = createRule<[], CamelCase<typeof RULE_NAME>>({
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Require that interface names be prefixed with `I`',
        },
        messages: {
            interfacePrefix: 'Interface names must be prefixed with `I`',
        },
        schema: [],
    },
    name: RULE_NAME,
    create(context, options) {
        const option = applyDefault(defaultOptions, options)[0];
        const never = option !== 'always';
        return {
            TSInterfaceDeclaration(interfaceNode) {
                if (never) {
                    if (isPrefixedWithI(interfaceNode.id.name)) {
                        context.report({
                            messageId: 'interfacePrefix',
                            node: interfaceNode.id,
                        });
                    }
                } else if (!isPrefixedWithI(interfaceNode.id.name)) {
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

export { rule };
