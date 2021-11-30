import {isObject} from './isObject';
import {isPropertyKey} from './isPropertyKey';
import type {KeyPath, NestedProperty} from './types';

export function getValue<T, K extends KeyPath<T>>(
    source: T,
    keyPath: K,
    defaultValue?: NestedProperty<T, K>,
): NestedProperty<T, K> {
    if (!isObject(source))
        return defaultValue;

    if (isPropertyKey(keyPath))
        return keyPath in source ? source[keyPath as PropertyKey] : defaultValue;

    if (!Array.isArray(keyPath))
        return defaultValue;

    let sourceBranch = source;

    for (let i = 0; i < keyPath.length; i++) {
        let key = keyPath[i], item = sourceBranch[key] as NestedProperty<T, K>;
        if (i === keyPath.length - 1)
            return key in sourceBranch ? item : defaultValue;
        else if (!isObject(item))
            return defaultValue;
        else {
            // @ts-ignore
            sourceBranch = item;
        }
    }
}
