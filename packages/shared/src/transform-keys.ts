import { typeOf } from './type-of';

const transformKeys = <T extends Record<string, unknown>>(object: T, transform: (s: string) => string): T => {
    if (typeOf(object) !== 'object') return object;
    return Object.keys(object).reduce((accumulator, key) => {
        if (Object.hasOwn(object, key)) {
            const value = object[key];
            if (value !== undefined && value !== null) {
                accumulator[transform(key) as keyof T] = value as T[keyof T];
            }
        }
        return accumulator;
    }, {} as T);
};

export { transformKeys };
