import {isObject} from './isObject';
import {isPropertyKey} from './isPropertyKey';
import type {KeyPath, NestedProperty} from './types';

export function setValue<T, K extends KeyPath<T>>(
    target: T,
    keyPath: K,
    value: NestedProperty<T, K>,
): void {
    if (!isObject(target))
        return;

    if (isPropertyKey(keyPath)) {
        target[keyPath as PropertyKey] = value;
        return;
    }

    if (!Array.isArray(keyPath))
        return;

    let targetBranch = target;

    for (let i = 0; i < keyPath.length; i++) {
        let key = keyPath[i];
        if (i === keyPath.length - 1) {
            // @ts-ignore
            targetBranch[key] = value;
        }
        else {
            if (!isObject(targetBranch[key])) {
                // @ts-ignore
                targetBranch[key] = {};
            }
            // @ts-ignore
            targetBranch = targetBranch[key];
        }
    }
}
