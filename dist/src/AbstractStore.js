import { EventManager } from '@axtk/event-manager';
const UPDATE_EVENT = 'update';
export class AbstractStore {
    constructor(initialState) {
        this.eventManager = new EventManager();
        this.revision = 0;
        this.setState(initialState);
        this.eventManager.addListener(UPDATE_EVENT, () => {
            this.revision = this.revision === Number.MAX_SAFE_INTEGER ? 1 : this.revision + 1;
        });
    }
    onUpdate(handler) {
        if (typeof handler !== 'function')
            throw new Error('handler is not a function');
        let listener = this.eventManager.addListener(UPDATE_EVENT, () => {
            handler(this);
        });
        return () => listener.remove();
    }
    dispatchUpdate() {
        this.eventManager.dispatch(UPDATE_EVENT);
    }
    getRevision() {
        return this.revision;
    }
    setState(x) { }
    removeState() {
        this.setState(null);
    }
}
