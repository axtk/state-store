import EventManager from '@axtk/event-manager';
import updateBranch from './lib/updateBranch';
import get from 'lodash/get';
import set from 'lodash/set';
import unset from 'lodash/unset';
import merge from 'lodash/merge';

const StoreEvent = {
    UPDATE: 'UPDATE'
};

class Store {
    constructor(initialState) {
        this.state = {};
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
    getState() {
        return this.state;
    }
    get(path, defaultValue) {
        return get(this.state, path, defaultValue);
    }
    setState(x) {
        this.state = updateBranch(x);
        this.eventManager.dispatch(StoreEvent.UPDATE);
    }
    set(path, x) {
        this.state = updateBranch(set(this.state, path, x), path);
        this.eventManager.dispatch(StoreEvent.UPDATE);
    }
    mergeState(x) {
        this.state = updateBranch(merge(this.state, x));
        this.eventManager.dispatch(StoreEvent.UPDATE);
    }
    merge(path, x) {
        this.state = updateBranch(set(this.state, path, merge(get(this.state, path), x)), path);
        this.eventManager.dispatch(StoreEvent.UPDATE);
    }
    removeState() {
        this.state = {};
        this.eventManager.dispatch(StoreEvent.UPDATE);
    }
    remove(path) {
        unset(this.state, path);
        this.state = updateBranch(this.state, path);
        this.eventManager.dispatch(StoreEvent.UPDATE);
    }
    getRevision() {
        return this.revision;
    }
}

export default Store;
