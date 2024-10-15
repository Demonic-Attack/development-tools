import { transformKeys } from './transform-keys';

type PadKeysLeft<T, U extends string = ''> = T extends [] ? T : { [K in keyof T as `${U}${Extract<K, string>}`]: T[K] };

const padKeysLeft = <const T extends Record<string, unknown>, const U extends string = ''>(
    object: T,
    left: U,
): PadKeysLeft<T, U> => transformKeys(object, key => `${left}${key}`) as never;

export { padKeysLeft };
export type { PadKeysLeft };
