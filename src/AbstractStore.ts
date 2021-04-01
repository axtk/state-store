import {EventManager, RemoveListener} from '@axtk/event-manager';
import {State} from './types';

export type UpdateHandler = (x: AbstractStore) => void;
export type StateTransform = (x: AbstractStore) => State;

const UPDATE_EVENT = 'update';

export class AbstractStore {
    eventManager: EventManager<string, string>;
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
    onUpdate(handler: UpdateHandler): RemoveListener {
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
    getState(): State {
        return this.state;
    }
    setState(x: State | StateTransform): void {
        this.state = typeof x === 'function' ? x(this) : (x || {});
        this.dispatchUpdate();
    }
    removeState(): void {
        this.setState(null);
    }
    getRevision(): number {
        return this.revision;
    }
}
