import {Map as ImmutableMap, Collection as ImmutableCollection, fromJS} from 'immutable';
import EventManager from 'event-manager';

const StoreEvent = {
    UPDATE: 'UPDATE'
};

const toPath = path => Array.isArray(path) ? path : (typeof path === 'string' ? path.split('.') : [path]);
const toPlain = x => x instanceof ImmutableCollection ? x.toJS() : x;

class Store {
    constructor() {
        this.state = new ImmutableMap();
        this.eventManager = new EventManager();
    }
    onUpdate(handler) {
        return this.eventManager.addEventListener(StoreEvent.UPDATE, handler);
    }
    getState() {
        return toPlain(this.state);
    }
    getImmutableState() {
        return this.state;
    }
    get(path) {
        return toPlain(this.getImmutable(path));
    }
    getImmutable(path) {
        return this.state.getIn(toPath(path));
    }
    setState(plainObject = {}) {
        this.state = fromJS(plainObject);
        this.eventManager.dispatchEvent(StoreEvent.UPDATE);
    }
    set(path, plainValue) {
        this.state = this.state.setIn(toPath(path), fromJS(plainValue));
        this.eventManager.dispatchEvent(StoreEvent.UPDATE);
    }
    mergeState(plainObject = {}) {
        this.state = this.state.merge(fromJS(plainObject));
        this.eventManager.dispatchEvent(StoreEvent.UPDATE);
    }
    merge(path, plainObject = {}) {
        this.state = this.state.mergeIn(toPath(path), fromJS(plainObject));
        this.eventManager.dispatchEvent(StoreEvent.UPDATE);
    }
    removeState() {
        this.setState({});
    }
    remove(path) {
        this.state = this.state.removeIn(toPath(path));
        this.eventManager.dispatchEvent(StoreEvent.UPDATE);
    }
}

export default Store;
