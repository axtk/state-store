import { EventManager } from '@axtk/event-manager';
import { get, set, merge, unset } from 'lodash-es';
const UPDATE_EVENT = 'update';
export class Store {
    eventManager;
    revision;
    state;
    constructor(initialState) {
        this.eventManager = new EventManager();
        this.revision = 0;
        this.setState(initialState);
        this.eventManager.addListener(UPDATE_EVENT, () => {
            this.revision = this.revision === Number.MAX_SAFE_INTEGER ? 1 : this.revision + 1;
        });
    }
    onUpdate(handler) {
        if (typeof handler !== 'function')
            throw new Error('handler is not a function');
        let listener = this.eventManager.addListener(UPDATE_EVENT, () => {
            handler(this);
        });
        return () => listener.remove();
    }
    dispatchUpdate() {
        this.eventManager.dispatch(UPDATE_EVENT);
    }
    getRevision() {
        return this.revision;
    }
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
