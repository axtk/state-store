import EventManager from '@axtk/event-manager';

const UPDATE_EVENT = 'update';

class BasicStore {
    constructor(initialState) {
        this.eventManager = new EventManager();
        this.revision = 0;
        this.setState(initialState);
    }
    onUpdate(handler) {
        if (typeof handler !== 'function')
            throw new Error('handler is not a function');

        let listener = this.eventManager.addListener(UPDATE_EVENT, () => {
            this.revision = this.revision === Number.MAX_SAFE_INTEGER ? 1 : this.revision + 1;
            handler(this);
        });

        return () => listener.remove();
    }
    dispatchUpdate() {
        this.eventManager.dispatch(UPDATE_EVENT);
    }
    getState() {
        return this.state;
    }
    setState(x) {
        this.state = typeof x === 'function' ? x(this) : (x || {});
        this.dispatchUpdate();
    }
    removeState() {
        this.setState(null);
    }
    getRevision() {
        return this.revision;
    }
}

export default BasicStore;
