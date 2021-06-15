import {get, set, merge, unset} from 'lodash-es';
import {AbstractStore} from './AbstractStore';
import {Path} from './types';

export type StateTransform<State> = (store?: Store<State>) => State;

export class Store<State> extends AbstractStore<State, State> {
    getState(): State {
        return this.state;
    }
    get<T>(path: Path, defaultValue?: T): T {
        return get(this.state, path, defaultValue);
    }
    setState(x: State | StateTransform<State> | null): void {
        this.state = typeof x === 'function' ? (x as StateTransform<State>)(this) : (x || {} as State);
        this.dispatchUpdate();
    }
    set<T>(path: Path, x: T): void {
        this.state = set<State>(this.state as unknown as object, path, x);
        this.dispatchUpdate();
    }
    mergeState(x: State): void {
        this.state = merge(this.state, x);
        this.dispatchUpdate();
    }
    merge<T>(path: Path, x: T): void {
        this.state = set<State>(this.state as unknown as object, path, merge(get(this.state, path), x));
        this.dispatchUpdate();
    }
    remove(path: Path): void {
        unset(this.state, path);
        this.dispatchUpdate();
    }
}
