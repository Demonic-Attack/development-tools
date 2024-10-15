import type { CamelCase } from 'string-ts';

import { applyDefault, createRule } from '../utils';

// eslint-disable-next-line ts-plugin/interface-prefix
interface myOptions {
    never?: boolean;
}

const RULE_NAME = 'interface-prefix';
const defaultOptions = ['never'];

const isPrefixedWithI = (name: string) => typeof name === 'string' && /^I[A-Z]/u.test(name);
// eslint-disable-next-line arca/no-default-export
export default createRule<[], CamelCase<typeof RULE_NAME>>({
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
    create(context) {
        // console.log("🚀 ~ create ~ options:", options)
        // const option = applyDefault(defaultOptions, options)[0];
        // console.log("🚀 ~ create ~ option:", option)
        // const never = option !== 'always';
        return {
            TSInterfaceDeclaration(interfaceNode) {
                if (isPrefixedWithI(interfaceNode.id.name)) {
                    context.report({
                        messageId: 'interfacePrefix',
                        node: interfaceNode.id,
                    });
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

// const rule = createRule<[], CamelCase<typeof RULE_NAME>>({

// });

// export { rule };
