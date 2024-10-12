import { eslintSortClassMembersPlugin } from '../plugins';
import type { IOptionsOverrides, TFlatConfigItem } from '../types';

const sortClassMembers = async (options: IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
    const { overrides = {} } = options;

    return [
        {
            name: 'sort-class-members/rules',
            plugins: {
                ['sort-class-members']: eslintSortClassMembersPlugin,
            },
            rules: {
                ...eslintSortClassMembersPlugin.configs['flat/recommended'].rules,
                ...overrides,
            },
        },
    ];
};

export { sortClassMembers };
