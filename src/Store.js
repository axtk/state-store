import BasicStore from './BasicStore';
import get from 'lodash/get';
import set from 'lodash/set';
import merge from 'lodash/merge';
import unset from 'lodash/unset';

class Store extends BasicStore {
    get(path, defaultValue) {
        return get(this.state, path, defaultValue);
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

export default Store;
