import {EventManager} from '@axtk/event-manager';
import type {KeyPath, NestedProperty} from './lib/types';
import {getValue} from './lib/getValue';
import {setValue} from './lib/setValue';
import {removeValue} from './lib/removeValue';

const UPDATE_EVENT = 'update';

export class Store<
    State extends object = Record<PropertyKey, unknown>,
    TypedKeyPathDepth extends number = 5
> {
    eventManager: EventManager;
    revision: number;
    state: State;

    constructor(initialState?: State) {
        this.eventManager = new EventManager();
        this.revision = 0;
        this.setState(initialState);

        this.eventManager.addListener(UPDATE_EVENT, () => {
            this.revision = this.revision === Number.MAX_SAFE_INTEGER ? 1 : this.revision + 1;
        });
    }
    onUpdate(handler: (store?: Store<State, TypedKeyPathDepth>) => void): () => void {
        if (typeof handler !== 'function')
            throw new Error('handler is not a function');

        let listener = this.eventManager.addListener(UPDATE_EVENT, () => {
            handler(this);
        });

        return () => listener.remove();
    }
    dispatchUpdate(): void {
        this.eventManager.dispatch(UPDATE_EVENT);
    }
    getRevision(): number {
        return this.revision;
    }
    getState() {
        return this.state;
    }
    get<K extends KeyPath<State, TypedKeyPathDepth>>(
        keyPath: K,
        defaultValue?: NestedProperty<State, K>,
    ): NestedProperty<State, K> {
        return getValue(this.state, keyPath, defaultValue);
    }
    setState(value: State): void {
        this.state = value;
        this.dispatchUpdate();
    }
    set<K extends KeyPath<State, TypedKeyPathDepth>>(
        keyPath: K,
        value: NestedProperty<State, K>,
    ): void {
        if (this.state == null && keyPath != null)
            this.state = {} as State;
        setValue(this.state, keyPath, value);
        this.dispatchUpdate();
    }
    removeState() {
        this.setState(undefined);
    }
    remove<K extends KeyPath<State, TypedKeyPathDepth>>(keyPath: K): void {
        removeValue(this.state, keyPath);
        this.dispatchUpdate();
    }
}

export type {KeyPath, NestedProperty};
