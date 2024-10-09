import { isPackageExists } from 'local-pkg';
import { fileURLToPath } from 'node:url';

import type { Awaitable, TFlatConfigItem } from './types';

const scopeUrl = fileURLToPath(new URL('.', import.meta.url));

const isPackageInScope = (name: string): boolean => isPackageExists(name, { paths: [scopeUrl] });

const combine = async (...configs: Awaitable<TFlatConfigItem | TFlatConfigItem[]>[]): Promise<TFlatConfigItem[]> => {
    const result = await Promise.all(configs);
    return result.flat();
};

const interopDefault = async <T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> => {
    const resolved = await m;
    return (resolved as any).default || resolved;
};
const renameRules = (rules: Record<string, any>, map: Record<string, string>): Record<string, any> =>
    Object.fromEntries(
        Object.entries(rules).map(
            ([
                key,
                value,
            ]) => {
                for (const [
                    from,
                    to,
                ] of Object.entries(map)) {
                    if (key.startsWith(`${from}/`)) {
                        return [
                            to + key.slice(from.length),
                            value,
                        ];
                    }
                }
                return [
                    key,
                    value,
                ];
            },
        ),
    );

const toArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);
const isBoolean = <T>(value: T): boolean => typeof value === 'boolean';

export { combine, interopDefault, isBoolean, isPackageInScope, renameRules, toArray };
