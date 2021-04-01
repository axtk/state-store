import {Collection as ImmutableCollection, fromJS} from 'immutable';
import toPath from 'lodash/toPath';
import {AbstractStore} from './AbstractStore';
import {State, ImmutableState, Path} from './types';

export type ImmutableStateTransform = (x: ImmutableStore) => ImmutableState;

const toPlain = x => x instanceof ImmutableCollection ? (x as ImmutableCollection<any, any>).toJS() : x;

export class ImmutableStore extends AbstractStore {
    state: ImmutableState;
    getState(): State {
        return toPlain(this.state);
    }
    get(path: Path, defaultValue?: any): any {
        return toPlain(this.state.getIn(toPath(path), defaultValue));
    }
    setState(x: State | ImmutableStateTransform): void {
        this.state = typeof x === 'function' ? x(this) : fromJS(x || {}).toMap();
        this.dispatchUpdate();
    }
    set(path: Path, x: any): void {
        this.state = this.state.setIn(toPath(path), fromJS(x));
        this.dispatchUpdate();
    }
    mergeState(x: State): void {
        this.state = this.state.merge(fromJS(x).toMap());
        this.dispatchUpdate();
    }
    merge(path: Path, x: any): void {
        this.state = this.state.mergeIn(toPath(path), fromJS(x));
        this.dispatchUpdate();
    }
    remove(path: Path): void {
        this.state = this.state.deleteIn(toPath(path));
        this.dispatchUpdate();
    }
}
