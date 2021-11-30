export function isPropertyKey(x: any): x is PropertyKey {
    return typeof x === 'string' || typeof x === 'number' || typeof x === 'symbol';
}
