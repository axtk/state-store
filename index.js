import EventManager from '@axtk/event-manager';
import get from 'lodash/get';
import set from 'lodash/set';
import unset from 'lodash/unset';
import merge from 'lodash/merge';

const StoreEvent = {
    UPDATE: 'UPDATE'
};

class Store {
    constructor(initialState) {
        this.state = null;
        this.eventManager = new EventManager();
        this.revision = 0;

        if (initialState != null)
            this.setState(initialState);
    }
    onUpdate(handler) {
        if (typeof handler !== 'function')
            throw new Error('handler is not a function');

        let listener = this.eventManager.addListener(StoreEvent.UPDATE, () => {
            this.revision = this.revision === Number.MAX_SAFE_INTEGER ? 0 : this.revision + 1;
            handler(this.getState());
        });

        return () => listener.remove();
    }
    dispatchUpdate() {
        this.eventManager.dispatch(StoreEvent.UPDATE);
    }
    getState() {
        return this.state;
    }
    get(path, defaultValue) {
        return get(this.state, path, defaultValue);
    }
    setState(x) {
        this.state = typeof x === 'function' ? x(this.state) : x;
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
    removeState() {
        this.state = null;
        this.dispatchUpdate();
    }
    remove(path) {
        unset(this.state, path);
        this.dispatchUpdate();
    }
    getRevision() {
        return this.revision;
    }
}

export default Store;
