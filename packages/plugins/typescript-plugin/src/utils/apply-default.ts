import { merge } from 'ts-deepmerge';

const isObjectNotArray = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && !Array.isArray(value);

const applyDefault = <T>(defaultOptions: readonly T[], userOptions?: readonly T[]): T[] => {
    if (!userOptions) return structuredClone(defaultOptions) as T[];

    return defaultOptions.map((defaultOption, index) => {
        const userOption = userOptions[index];

        if (userOption !== undefined) {
            if (isObjectNotArray(userOption) && isObjectNotArray(defaultOption))
                return merge(defaultOption, userOption) as T;

            return userOption;
        }

        return defaultOption;
    });
};

export { applyDefault };
