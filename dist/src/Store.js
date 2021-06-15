import { get, set, merge, unset } from 'lodash-es';
import { AbstractStore } from './AbstractStore';
export class Store extends AbstractStore {
    getState() {
        return this.state;
    }
    get(path, defaultValue) {
        return get(this.state, path, defaultValue);
    }
    setState(x) {
        this.state = typeof x === 'function' ? x(this) : (x || {});
        this.dispatchUpdate();
    }
    set(path, x) {
        this.state = set(this.state, path, x);
        this.dispatchUpdate();
    }
    mergeState(x) {
        this.state = merge(this.state, x);
        this.dispatchUpdate();
    }
    merge(path, x) {
        this.state = set(this.state, path, merge(get(this.state, path), x));
        this.dispatchUpdate();
    }
    remove(path) {
        unset(this.state, path);
        this.dispatchUpdate();
    }
}
