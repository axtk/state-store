import get from 'lodash/get';
import set from 'lodash/set';
import merge from 'lodash/merge';
import unset from 'lodash/unset';
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
        this.state = set(this.state, path, x);
        this.dispatchUpdate();
    }
    mergeState(x: State): void {
        this.state = merge(this.state, x);
        this.dispatchUpdate();
    }
    merge<T>(path: Path, x: T): void {
        this.state = set(this.state, path, merge(get(this.state, path), x));
        this.dispatchUpdate();
    }
    remove(path: Path): void {
        unset(this.state, path);
        this.dispatchUpdate();
    }
}
