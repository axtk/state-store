import {EventManager} from '@axtk/event-manager';
import {get, set, merge, unset} from 'lodash-es';

const UPDATE_EVENT = 'update';

export type Path = string | number | Array<string | number>;

export class Store {
    eventManager: EventManager;
    revision: number;
    state: any;

    constructor(initialState?: any) {
        this.eventManager = new EventManager();
        this.revision = 0;
        this.setState(initialState);

        this.eventManager.addListener(UPDATE_EVENT, () => {
            this.revision = this.revision === Number.MAX_SAFE_INTEGER ? 1 : this.revision + 1;
        });
    }
    onUpdate(handler: (store?: Store) => void): () => void {
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
    get<T>(path: Path, defaultValue?: T): T {
        return get(this.state, path, defaultValue);
    }
    setState(x: any): void {
        this.state = typeof x === 'function' ? x(this) : (x || {});
        this.dispatchUpdate();
    }
    set<T>(path: Path, x: T): void {
        this.state = set(this.state as unknown as object, path, x);
        this.dispatchUpdate();
    }
    mergeState(x: any): void {
        this.state = merge(this.state, x);
        this.dispatchUpdate();
    }
    merge<T>(path: Path, x: T): void {
        this.state = set(this.state as unknown as object, path, merge(get(this.state, path), x));
        this.dispatchUpdate();
    }
    removeState() {
        this.setState(null);
    }
    remove(path: Path): void {
        unset(this.state, path);
        this.dispatchUpdate();
    }
}
