import {Collection as ImmutableCollection, fromJS} from 'immutable';
import toPath from 'lodash/toPath';
import BasicStore from './BasicStore';

const toPlain = x => x instanceof ImmutableCollection ? x.toJS() : x;

class ImmutableStore extends BasicStore {
    getState() {
        return toPlain(this.state);
    }
    get(path, defaultValue) {
        return toPlain(this.state.getIn(toPath(path), defaultValue));
    }
    setState(x) {
        this.state = typeof x === 'function' ? x(this) : fromJS(x || {});
        this.dispatchUpdate();
    }
    set(path, x) {
        this.state = this.state.setIn(toPath(path), fromJS(x));
        this.dispatchUpdate();
    }
    mergeState(x) {
        this.state = this.state.merge(fromJS(x));
        this.dispatchUpdate();
    }
    merge(path, x) {
        this.state = this.state.mergeIn(toPath(path), fromJS(x));
        this.dispatchUpdate();
    }
    remove(path) {
        this.state = this.state.deleteIn(toPath(path));
        this.dispatchUpdate();
    }
}

export default ImmutableStore;
