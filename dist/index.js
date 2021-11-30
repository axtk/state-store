import { EventManager } from '@axtk/event-manager';
import { getValue } from './lib/getValue';
import { setValue } from './lib/setValue';
import { removeValue } from './lib/removeValue';
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
    get(keyPath, defaultValue) {
        return getValue(this.state, keyPath, defaultValue);
    }
    setState(value) {
        this.state = value;
        this.dispatchUpdate();
    }
    set(keyPath, value) {
        if (this.state == null && keyPath != null)
            this.state = {};
        setValue(this.state, keyPath, value);
        this.dispatchUpdate();
    }
    removeState() {
        this.setState(undefined);
    }
    remove(keyPath) {
        removeValue(this.state, keyPath);
        this.dispatchUpdate();
    }
}
