import { typeOf } from './type-of';

const transformKeys = <T>(object: T, transform: (s: string) => string): T => {
    if (typeOf(object) !== 'object') return object;
    const res = {} as T;
    for (const key in object) {
        res[transform(key) as keyof T] = object[key];
    }

    return res;
};

export { transformKeys };
