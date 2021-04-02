import {EventManager, RemoveListener} from '@axtk/event-manager';

export type AbstractUpdateHandler<E, I> = (store?: AbstractStore<E, I>) => void;
export type AbstractStateTransform<E, I> = (store?: AbstractStore<E, I>) => I;

const UPDATE_EVENT = 'update';

export class AbstractStore<ExposedState, InternalState> {
    eventManager: EventManager<string, string>;
    revision: number;
    state: InternalState;

    constructor(initialState?: ExposedState) {
        this.eventManager = new EventManager();
        this.revision = 0;
        this.setState(initialState);

        this.eventManager.addListener(UPDATE_EVENT, () => {
            this.revision = this.revision === Number.MAX_SAFE_INTEGER ? 1 : this.revision + 1;
        });
    }
    onUpdate(handler: AbstractUpdateHandler<ExposedState, InternalState>): RemoveListener {
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
    setState(x: ExposedState | AbstractStateTransform<ExposedState, InternalState> | null): void {}
    removeState() {
        this.setState(null);
    }
}
