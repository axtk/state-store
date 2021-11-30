import { isObject } from './isObject';
import { isPropertyKey } from './isPropertyKey';
export function removeValue(source, keyPath) {
    if (!isObject(source))
        return;
    if (isPropertyKey(keyPath)) {
        if (keyPath in source)
            delete source[keyPath];
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
