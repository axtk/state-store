import get from 'lodash/get';
import set from 'lodash/set';
import merge from 'lodash/merge';
import unset from 'lodash/unset';
import {AbstractStore} from './AbstractStore';
import {State, Path} from './types';

export class Store extends AbstractStore {
    get(path: Path, defaultValue?: any): any {
        return get(this.state, path, defaultValue);
    }
    set(path: Path, x: any): void {
        this.state = set(this.state, path, x);
        this.dispatchUpdate();
    }
    mergeState(x: State): void {
        this.state = merge(this.state, x);
        this.dispatchUpdate();
    }
    merge(path: Path, x: any): void {
        this.state = set(this.state, path, merge(get(this.state, path), x));
        this.dispatchUpdate();
    }
    remove(path: Path): void {
        unset(this.state, path);
        this.dispatchUpdate();
    }
}
