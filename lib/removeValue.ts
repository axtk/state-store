import {isObject} from './isObject';
import {isPropertyKey} from './isPropertyKey';
import type {KeyPath, NestedProperty} from './types';

export function removeValue<T, K extends KeyPath<T>>(
    source: T,
    keyPath: K,
): void {
    if (!isObject(source))
        return;

    if (isPropertyKey(keyPath)) {
        if (keyPath in source)
            delete source[keyPath as PropertyKey];
        return;
    }

    if (!Array.isArray(keyPath))
        return;

    let sourceBranch = source;

    for (let i = 0; i < keyPath.length; i++) {
        let key = keyPath[i];
        if (i === keyPath.length - 1) {
            if (key in sourceBranch)
                delete sourceBranch[key];
            return;
        }
        else if (!isObject(sourceBranch[key]))
            return;
        else {
            // @ts-ignore
            sourceBranch = sourceBranch[key];
        }
    }
}
