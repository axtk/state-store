import { isObject } from './isObject';
import { isPropertyKey } from './isPropertyKey';
export function getValue(source, keyPath, defaultValue) {
    if (!isObject(source))
        return defaultValue;
    if (isPropertyKey(keyPath))
        return keyPath in source ? source[keyPath] : defaultValue;
    if (!Array.isArray(keyPath))
        return defaultValue;
    let sourceBranch = source;
    for (let i = 0; i < keyPath.length; i++) {
        let key = keyPath[i], item = sourceBranch[key];
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
