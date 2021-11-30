import { isObject } from './isObject';
import { isPropertyKey } from './isPropertyKey';
export function setValue(target, keyPath, value) {
    if (!isObject(target))
        return;
    if (isPropertyKey(keyPath)) {
        target[keyPath] = value;
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
