export default x => {
    if (Array.isArray(x))
        return x.slice();

    if (typeof x === 'object' && x !== null)
        return Object.assign({}, x);

    return x;
};
