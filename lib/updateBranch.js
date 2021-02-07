import toPath from 'lodash/toPath';
import shallowCopy from './shallowCopy';

export default (state, path) => {
    if (!state)
        return state;

    let chainPath = toPath(path);
    let nextState = shallowCopy(state);

    if (chainPath.length === 0)
        return nextState;

    let diver = nextState;

    for (let key of chainPath) {
        if (diver[key] === undefined)
            break;
        diver[key] = shallowCopy(diver[key]);
        diver = diver[key];
    }

    return nextState;
};
