import {Collection as ImmutableCollection, Map as ImmutableMap, fromJS} from 'immutable';
import toPath from 'lodash/toPath';
import {AbstractStore} from './AbstractStore';
import {Path} from './types';

export type ImmutableStateTransform<State> = (store?: ImmutableStore<State>) => ImmutableMap<any, any>;

const toPlain = x => x instanceof ImmutableCollection ? (x as ImmutableCollection<any, any>).toJS() : x;

export class ImmutableStore<State> extends AbstractStore<State, ImmutableMap<any, any>> {
    getState(): State {
        return toPlain(this.state);
    }
    get<T>(path: Path, defaultValue?: T): T {
        return toPlain(this.state.getIn(toPath(path), defaultValue));
    }
    setState(x: State | ImmutableStateTransform<State> | null): void {
        this.state = typeof x === 'function' ? (x as ImmutableStateTransform<State>)(this) : fromJS(x || {}).toMap();
        this.dispatchUpdate();
    }
    set<T>(path: Path, x: T): void {
        this.state = this.state.setIn(toPath(path), fromJS(x));
        this.dispatchUpdate();
    }
    mergeState(x: State): void {
        this.state = this.state.merge(fromJS(x).toMap());
        this.dispatchUpdate();
    }
    merge<T>(path: Path, x: T): void {
        this.state = this.state.mergeIn(toPath(path), fromJS(x));
        this.dispatchUpdate();
    }
    remove(path: Path): void {
        this.state = this.state.deleteIn(toPath(path));
        this.dispatchUpdate();
    }
}
